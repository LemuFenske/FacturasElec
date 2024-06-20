<template>
  <q-page-container>
    <q-page class="page-content">
      <q-btn
        label="Factura"
        icon="receipt_long"
        class="btn-square no-print"
        @click="openFacturaModal"
        flat
      ></q-btn>

      <div v-if="facturas.length" class="factura-container">
        <div v-for="(factura, index) in facturas" :key="index" class="factura-item">
          <div class="factura-number">{{ factura.numero }}</div>
          <div class="factura-actions">
            <q-btn icon="save" @click="guardarPDF(factura)" flat></q-btn>
            <q-btn icon="print" @click="prepImpresion(factura)" flat></q-btn>
            <q-btn icon="visibility" @click="verPDF(factura)" flat></q-btn>
          </div>
        </div>
      </div>

      <NuevaFacturaModal
        ref="facturaModal"
        @factura-guardada="actualizarFacturas"
      />
    </q-page>
  </q-page-container>
</template>




<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useModalStore } from '../stores/modalVariables.js';
import NuevaFacturaModal from '../components/NuevaFacturaModal.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import afipImage from '../assets/AFIP.png';

// Crear referencia reactiva para facturas y la imagen del código de barras
const facturas = ref([]);
const barcodeImage = ref(null);

// Obtener instancia de Quasar
const $q = useQuasar();

// Ejecutar al montar el componente
onMounted(() => {
  const storedFacturas = $q.localStorage.getItem('facturas');
  if (storedFacturas) {
    facturas.value = storedFacturas;
  }

  // Cargar la imagen y convertirla a base64
  const img = new Image();
  img.src = afipImage;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    barcodeImage.value = canvas.toDataURL('image/png');
  };
});

// Método para abrir el modal de factura
const openFacturaModal = () => {
  const modalStore = useModalStore();
  modalStore.toggleFactura();
};

// Método para actualizar las facturas
const actualizarFacturas = (nuevaFactura) => {
  facturas.value.push(nuevaFactura);
  $q.localStorage.set('facturas', facturas.value);
};

// Método para generar el PDF de la factura
const generarPDF = (factura) => {
  const doc = new jsPDF();

  // Datos de la empresa del localStorage
  const empresa = $q.localStorage.getItem('empresa') || {
    nombre: "Acuaber",
    direccion: "Crespo 3450",
    cuit: "20447152321",
    ingBrutos: "3000",
    condIva: "Consumidor Final"
  };

  // Rectángulo superior (datos de la empresa y detalles de la factura)
  doc.setFontSize(10);
  doc.rect(10, 10, 190, 32);
  doc.line(105, 10, 105, 42);

  // Datos de la empresa (lado izquierdo)
  doc.setFontSize(16);
  doc.text(empresa.nombre, 57.5, 17, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Dirección empresarial: ${empresa.direccion}`, 12, 27);
  doc.text(`Razón Social: ${empresa.razonSocial}`, 12, 31);
  doc.text(`Cond. IVA: ${empresa.condIva}`, 12, 35);

  // Detalles de la factura (lado derecho)
  doc.setFontSize(17);
  doc.text('Factura', 152.5, 17, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`N°: ${factura.ptoVenta} - ${factura.numero.padStart(8, '0')}`, 107, 23);
  doc.text(`Fecha: ${factura.fecha}`, 107, 27);
  doc.text(`CUIT: ${empresa.cuit}`, 107, 31);
  doc.text(`Ingresos Brutos: ${empresa.ingBrutos}`, 107, 35);
  doc.text(`Inicio Actividades: ${factura.inicioActividades || '2024/05/31'}`, 107, 39);

  // Tipo de factura (en el centro, pegado al borde superior)
  doc.setFontSize(20);
  doc.setDrawColor(0, 0, 0);
  doc.setFillColor(255, 255, 255);
  doc.rect(95, 10, 20, 8, 'FD');
  doc.text(factura.condTipo, 105, 14, { align: 'center', baseline: 'middle' });

  // Rectángulo abajo de los anteriores (datos del cliente)
  doc.rect(10, 44, 190, 20);
  doc.setFontSize(11);
  doc.text(`CUIT: ${factura.cliente.cuit}`, 12, 51);
  doc.text(`Condición de IVA: ${factura.cliente.condIva}`, 12, 55);
  doc.text(`Condición de Venta: ${factura.condVenta}`, 12, 59);
  doc.text(`Nombre: ${factura.cliente.nombre}`, 100, 51);
  doc.text(`Domicilio: ${factura.cliente.direccion}`, 100, 55);

  // Mapea los productos de la factura a un formato adecuado para autoTable
  const productos = factura.productosFactura.map(prod => [
    prod.codigo || '-',
    prod.nombre,
    prod.cantidad,
    prod.unidad || 'Unidades',
    parseFloat(prod.precio).toFixed(2),
    (parseFloat(prod.precio) * parseFloat(prod.cantidad)).toFixed(2)
  ]);

  // Genera la tabla con autoTable
  doc.autoTable({
    head: [['Código', 'Producto / Servicio', 'Cantidad', 'Unidad Medida', 'Precio Unitario', 'Subtotal']],
    body: productos,
    startY: 66,
    margin: { left: 10 },
    styles: {
      cellPadding: 2,
      fontSize: 10,
      valign: 'middle',
      halign: 'center',
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      fillColor: [255, 255, 255]
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.1
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 70 },
      2: { cellWidth: 20 },
      3: { cellWidth: 30 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 },
      lineWidth: 0
    },
    didDrawCell: (data) => {
      if (data.section === 'head') {
        if (data.column.index < 5) {
          doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
        }
      }
    }
  });

  // Obtiene la coordenada Y final de la tabla
  const finalY = doc.autoTable.previous.finalY;

  // Resumen de la factura
  const resumenY = finalY + 2;
  doc.rect(10, resumenY, 190, 20);
  doc.setFontSize(10);
  const marginRight = 13;
  const pageWidth = 210;
  const subtotalText = `Subtotal: $${factura.subtotal.toFixed(4)}`;
  const ivaText = `IVA 21%: $${factura.iva.toFixed(4)}`;
  const totalText = `Total: $${factura.total.toFixed(4)}`;
  const subtotalTextWidth = doc.getTextWidth(subtotalText);
  const ivaTextWidth = doc.getTextWidth(ivaText);
  const totalTextWidth = doc.getTextWidth(totalText);
  doc.text(subtotalText, pageWidth - subtotalTextWidth - marginRight, resumenY + 7);
  doc.text(ivaText, pageWidth - ivaTextWidth - marginRight, resumenY + 11);
  doc.text(totalText, pageWidth - totalTextWidth - marginRight, resumenY + 15);

  // Agregar imagen de código de barras
  if (barcodeImage.value) {
    const imgWidth = 50;
    const imgHeight = 20;
    doc.addImage(barcodeImage.value, 'PNG', 10, finalY + 30, imgWidth, imgHeight);
  }

  return doc;
};

// Método para ver el PDF de la factura
const verPDF = (factura) => {
  const doc = generarPDF(factura);
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};

// Método para preparar la impresión de la factura
const prepImpresion = (factura) => {
  const doc = generarPDF(factura);
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0px';
  iframe.style.height = '0px';
  iframe.style.border = 'none';
  iframe.src = pdfUrl;

  document.body.appendChild(iframe);

  iframe.onload = () => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };
};

// Método para guardar el PDF de la factura
const guardarPDF = (factura) => {
  const doc = generarPDF(factura);
  doc.save(`Factura_${factura.numero}.pdf`);
};
</script>





<style scoped>
.factura-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 10px;
}

.factura-item {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 5px;
}

.factura-number {
  font-weight: bold;
}

.factura-actions {
  display: flex;
}

</style>
