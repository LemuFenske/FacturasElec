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




<script>
import NuevaFacturaModal from '../components/NuevaFacturaModal.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import afipImage from '../assets/AFIP.png';

export default {
  components: {
    NuevaFacturaModal
  },
  data() {
    return {
      facturas: [],
      barcodeImage: null
    };
  },
  mounted() {
    const storedFacturas = localStorage.getItem('facturas');
    if (storedFacturas) {
      this.facturas = JSON.parse(storedFacturas);
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
      this.barcodeImage = canvas.toDataURL('image/png');
    };
  },
  methods: {
    openFacturaModal() {
      this.$refs.facturaModal.openModal();
    },
    actualizarFacturas(nuevaFactura) {
      this.facturas.push(nuevaFactura);
      localStorage.setItem('facturas', JSON.stringify(this.facturas));
    },
    generarPDF(factura) {
      const doc = new jsPDF();

      // Datos de la empresa del localStorage
      const empresa = JSON.parse(localStorage.getItem('empresa')) || {
        nombre: "Acuaber",
        direccion: "Crespo 3450",
        cuit: "20447152321",
        ingBrutos: "3000",
        condIva: "Consumidor Final"
      };

      // Rectángulo superior (datos de la empresa y detalles de la factura)
      // Configuración inicial de la fuente y el contorno del rectángulo principal
doc.setFontSize(10);
doc.rect(10, 10, 190, 32); // Dibuja el rectángulo principal que contiene los datos de la empresa y los detalles de la factura
doc.line(105, 10, 105, 42); // Línea divisoria que separa el rectángulo en dos mitades

// Datos de la empresa (lado izquierdo)
doc.setFontSize(16); // Tamaño de fuente más grande para el nombre de la empresa
doc.text(empresa.nombre, 57.5, 17, { align: 'center' }); // Centra el nombre de la empresa en su mitad
doc.setFontSize(10); // Tamaño de fuente estándar para el resto de los datos
doc.text(`Dirección empresarial: ${empresa.direccion}`, 12, 27); // Dibuja la dirección de la empresa
doc.text(`Razón Social: ${empresa.razonSocial}`, 12, 31); // Dibuja la razón social de la empresa
doc.text(`Cond. IVA: ${empresa.condIva}`, 12, 35); // Dibuja la condición frente al IVA de la empresa

// Detalles de la factura (lado derecho)
doc.setFontSize(17); // Tamaño de fuente más grande para el título "Factura"
doc.text('Factura', 152.5, 17, { align: 'center' }); // Centra el título "Factura" en su mitad
doc.setFontSize(10); // Tamaño de fuente estándar para el resto de los detalles
doc.text(`N°: ${factura.ptoVenta} - ${factura.numero.padStart(8, '0')}`, 107, 23); // Dibuja el número de la factura
doc.text(`Fecha: ${factura.fecha}`, 107, 27); // Dibuja la fecha de la factura
doc.text(`CUIT: ${empresa.cuit}`, 107, 31); // Dibuja el CUIT de la empresa
doc.text(`Ingresos Brutos: ${empresa.ingBrutos}`, 107, 35); // Dibuja los ingresos brutos de la empresa
doc.text(`Inicio Actividades: ${factura.inicioActividades || '2024/05/31'}`, 107, 39); // Dibuja la fecha de inicio de actividades

// Tipo de factura (en el centro, pegado al borde superior)
doc.setFontSize(20); // Tamaño de fuente más grande para el tipo de factura
doc.setDrawColor(0, 0, 0); // Establece el color del borde a negro
doc.setFillColor(255, 255, 255); // Establece el color de fondo a blanco
doc.rect(95, 10, 20, 8, 'FD'); // Dibuja un rectángulo con fondo y borde alrededor del tipo de factura
doc.text(factura.condTipo, 105, 14, { align: 'center', baseline: 'middle' }); // Dibuja el tipo de factura centrado dentro del rectángulo


      // Rectángulo abajo de los anteriores (datos del cliente)
      doc.rect(10, 44, 190, 20);

// Establece el tamaño de fuente más pequeño
doc.setFontSize(11);

// Dibuja el texto de los datos del cliente, centrado verticalmente
doc.text(`CUIT: ${factura.cliente.cuit}`, 12, 51);
doc.text(`Condición de IVA: ${factura.cliente.condIva}`, 12, 55);
doc.text(`Condición de Venta: ${factura.condVenta}`, 12, 59);
doc.text(`Nombre: ${factura.cliente.nombre}`, 100, 51);
doc.text(`Domicilio: ${factura.cliente.direccion}`, 100, 55);

// Mapea los productos de la factura a un formato adecuado para autoTable
const productos = factura.productosFactura.map(prod => [
  prod.codigo || '-', // Código del producto o '-' si no tiene
  prod.nombre, // Nombre del producto
  prod.cantidad, // Cantidad del producto
  prod.unidad || 'Unidades', // Unidad de medida o 'Unidades' si no tiene
  parseFloat(prod.precio).toFixed(2), // Precio unitario del producto con 2 decimales
  (parseFloat(prod.precio) * parseFloat(prod.cantidad)).toFixed(2) // Subtotal del producto (precio * cantidad) con 2 decimales
]);

// Genera la tabla con autoTable
// Genera la tabla con autoTable
doc.autoTable({
  head: [['Código', 'Producto / Servicio', 'Cantidad', 'Unidad Medida', 'Precio Unitario', 'Subtotal']], // Define la cabecera de la tabla
  body: productos, // Datos de la tabla (productos)
  startY: 66, // Coordenada Y donde comienza la tabla
  margin: { left: 10 }, // Ajusta el margen izquierdo para cambiar la posición horizontal de la tabla
  styles: {
    cellPadding: 2, // Espaciado interno de las celdas
    fontSize: 10, // Tamaño de fuente para las celdas
    valign: 'middle', // Alineación vertical en el medio
    halign: 'center', // Alineación horizontal al centro
    lineColor: [0, 0, 0], // Color de la línea (negro)
    lineWidth: 0.1, // Ancho de la línea
    fillColor: [255, 255, 255] // Fondo blanco para todas las celdas
  },
  headStyles: {
    fillColor: [255, 255, 255], // Fondo blanco para la cabecera
    textColor: [0, 0, 0], // Color del texto (negro)
    lineWidth: 0.1 // Ancho de la línea
  },
  columnStyles: {
    0: { cellWidth: 20 }, // Ajusta el ancho de la columna 'Código'
    1: { cellWidth: 70 }, // Ajusta el ancho de la columna 'Producto / Servicio'
    2: { cellWidth: 20 }, // Ajusta el ancho de la columna 'Cantidad'
    3: { cellWidth: 30 }, // Ajusta el ancho de la columna 'Unidad Medida'
    4: { cellWidth: 25 }, // Ajusta el ancho de la columna 'Precio Unitario'
    5: { cellWidth: 25 },  // Ajusta el ancho de la columna 'Subtotal'
    lineWidth: 0, // Elimina las líneas verticales en el cuerpo de la tabla
  },
  didDrawCell: (data) => {
    if (data.section === 'head') {
      // Añade líneas divisorias verticales solo en la cabecera
      if (data.column.index < 5) {
        // Dibuja una línea vertical en el borde derecho de la celda
        doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
      }
    }
  }
});

// Obtiene la coordenada Y final de la tabla
const finalY = doc.autoTable.previous.finalY;

// Resumen de la factura
// Posición Y del resumen
const resumenY = finalY + 2; 
doc.rect(10, resumenY, 190, 20); // Cuadro para el resumen
doc.setFontSize(10);

// Calcula el ancho del texto para alinearlo a la derecha
const marginRight = 13;
const pageWidth = 210;
const subtotalText = `Subtotal: $${factura.subtotal.toFixed(4)}`;
const ivaText = `IVA 21%: $${factura.iva.toFixed(4)}`;
const totalText = `Total: $${factura.total.toFixed(4)}`;
const subtotalTextWidth = doc.getTextWidth(subtotalText);
const ivaTextWidth = doc.getTextWidth(ivaText);
const totalTextWidth = doc.getTextWidth(totalText);

// Texto de subtotal alineado a la derecha
doc.text(subtotalText, pageWidth - subtotalTextWidth - marginRight, resumenY + 7); 

// Texto de IVA alineado a la derecha
doc.text(ivaText, pageWidth - ivaTextWidth - marginRight, resumenY + 11); 

// Texto de total alineado a la derecha
doc.text(totalText, pageWidth - totalTextWidth - marginRight, resumenY + 15); 


      // Agregar imagen de código de barras
      if (this.barcodeImage) {
        const imgWidth = 50;
        const imgHeight = 20;
        doc.addImage(this.barcodeImage, 'PNG', 10, finalY + 30, imgWidth, imgHeight);
      }

      return doc;
    },
    verPDF(factura) {
      const doc = this.generarPDF(factura);
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Abrir el PDF en una nueva ventana
      window.open(pdfUrl, '_blank');
    },
    prepImpresion(factura) {
      const doc = this.generarPDF(factura);
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Crear un iframe invisible y agregarlo al documento
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.border = 'none';
      iframe.src = pdfUrl;

      document.body.appendChild(iframe);

      // Esperar a que el iframe se cargue y luego llamar a imprimir
      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      };
    },
    guardarPDF(factura) {
      const doc = this.generarPDF(factura);
      doc.save(`Factura_${factura.numero}.pdf`);
    }
  }
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
