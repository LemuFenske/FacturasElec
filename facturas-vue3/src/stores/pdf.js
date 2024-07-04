import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import afipImage from '../assets/AFIP.png';

export const usePdfStore = defineStore('pdf', () => {
  const $q = useQuasar();
  const barcodeImage = ref(null);

  const loadBarcodeImage = () => {
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
  };

  const generarPDF = (tipo, data) => {
    const doc = new jsPDF();
    const pageWidth = 210; 
    const pageHeight = 297;

    switch (tipo) {
      
      case 'factura':
    // Datos de la empresa del localStorage
    const empresa = $q.localStorage.getItem('empresa') || {
        nombre: "Empresa Ejemplo",
        direccion: "Empresa 123",
        cuit: "20109080601",
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
    doc.text(`N°: ${data.ptoVenta} - ${data.numero.padStart(8, '0')}`, 107, 23);
    doc.text(`Fecha: ${data.fecha}`, 107, 27);
    doc.text(`CUIT: ${empresa.cuit}`, 107, 31);
    doc.text(`Ingresos Brutos: ${empresa.ingBrutos}`, 107, 35);
    doc.text(`Inicio Actividades: ${data.inicioActividades || '2024/05/31'}`, 107, 39);

    // Tipo de factura (en el centro, pegado al borde superior)
    doc.setFontSize(20);
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.rect(95, 10, 20, 8, 'FD');
    doc.text(data.condTipo, 105, 14, { align: 'center', baseline: 'middle' });

    // Rectángulo abajo de los anteriores (datos del cliente)
    doc.rect(10, 44, 190, 20);
    doc.setFontSize(11);
    doc.text(`CUIT: ${data.cliente.cuit}`, 12, 51);
    doc.text(`Condición de IVA: ${data.cliente.condIva}`, 12, 55);
    doc.text(`Condición de Venta: ${data.condVenta}`, 12, 59);
    doc.text(`Nombre: ${data.cliente.nombre}`, 100, 51);
    doc.text(`Domicilio: ${data.cliente.direccion}`, 100, 55);

    // Mapea los productos de la factura a un formato adecuado para manualTable
    const productos = data.productosFactura.map(prod => [
        prod.codigo || '-',
        prod.nombre,
        prod.cantidad,
        prod.unidad || 'Unidades',
        parseFloat(prod.precio).toFixed(2),
        (parseFloat(prod.precio) * parseFloat(prod.cantidad)).toFixed(2)
    ]);

    // Genera la tabla manualmente
    const startY = 70;
    const rowHeight = 10;
    let currentY = startY;

    // Dibujar encabezado de la tabla
    doc.setFontSize(10);
    const headers = ['Código', 'Producto / Servicio', 'Cantidad', 'Unidad Medida', 'Precio Unitario', 'Subtotal'];
    headers.forEach((header, index) => {
        doc.text(header, 12 + index * 30, currentY);
    });
    doc.line(10, currentY + 2, 200, currentY + 2); // Línea debajo del encabezado
    currentY += rowHeight;

    // Dibujar filas de la tabla
    productos.forEach(producto => {
        producto.forEach((item, index) => {
            doc.text(item.toString(), 12 + index * 30, currentY);
        });
        doc.line(10, currentY + 2, 200, currentY + 2); // Línea debajo de la fila
        currentY += rowHeight;
    });

    // Resumen de la factura
    const resumenY = currentY + 2;
    doc.rect(10, resumenY, 190, 20);
    doc.setFontSize(10);
    const marginRight = 13;
    // const pageWidth = 210;
    const subtotalText = `Subtotal: $${data.subtotal.toFixed(4)}`;
    const ivaText = `IVA 21%: $${data.iva.toFixed(4)}`;
    const totalText = `Total: $${data.total.toFixed(4)}`;
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
        doc.addImage(barcodeImage.value, 'PNG', 10, resumenY + 22, imgWidth, imgHeight);
    }
    break;


        case 'ticket':
        // Código para generar el PDF de ticket
        doc.setFontSize(12);
        doc.text('Ticket', 10, 10);
        doc.text(`Número: ${data.numero}`, 10, 20);
        doc.text(`Fecha: ${data.fecha}`, 10, 30);
        doc.text(`Monto: ${data.monto}`, 10, 40);
        break;

        case 'cheque':
  // Estilo del cheque
  const borderColor = [0, 0, 0]; // Color del borde en formato RGB
  const borderWidth = 0.3; // Grosor del borde
  const textMargin = 10; // Margen para el texto desde el borde izquierdo
  const lineSpacing = 5; // Espaciado entre líneas de texto

  // Rectángulo del contenido del cheque
  const contentRectWidth = pageWidth - 20;
  const contentRectHeight = 90;
  const contentRectX = (pageWidth - contentRectWidth) / 2;
  const contentRectY = 30;

  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]); // Color del borde
  doc.setLineWidth(borderWidth); // Grosor del borde
  doc.rect(contentRectX, contentRectY, contentRectWidth, contentRectHeight); // Rectángulo del contenido

  // Banco (Nombre del banco en la parte superior central)
  doc.setFontSize(24); // Tamaño de la fuente grande
  doc.text(`Banco ${data.banco}`, pageWidth / 2, contentRectY + 15, { align: 'center' }); // Texto centrado en la página

  // Domicilio de pago (Texto debajo del nombre del banco)
  doc.setFontSize(16); // Tamaño de la fuente más pequeño
  doc.text(`Domicilio de pago: ${data.domicilioPago}`, pageWidth / 2, contentRectY + 25, { align: 'center' }); // Texto centrado

  // Serie y Monto (Serie a la izquierda, monto en un rectángulo a la derecha)
  const serie = "123456789"; // Puedes reemplazar esto con una serie dinámica si es necesario
  doc.setFontSize(12); // Tamaño de la fuente
  doc.text(`Serie: ${serie}`, contentRectX + textMargin, contentRectY + 40); // Serie a la izquierda
  doc.setLineWidth(0.1); // Grosor de la línea del rectángulo del monto
  doc.rect(contentRectX + contentRectWidth - 45, contentRectY + 32, 30, 12, 'S'); // Dibuja un rectángulo para el monto
  doc.setFontSize(16); // Tamaño de la fuente
  doc.text(`$${data.montoNumero}`, contentRectX + contentRectWidth - 40, contentRectY + 40); // Monto en números dentro del rectángulo

  // Fecha y Ciudad (Texto en una sola línea)
  doc.setFontSize(14); // Tamaño de la fuente
  doc.text(`${data.ciudad}  ,   ${data.dia}   DE   ${data.mes}   DE   ${data.ano}`, contentRectX + textMargin, contentRectY + 55); // Texto alineado a la izquierda

  // Receptor y Monto en Letras (Texto en dos líneas, receptor y monto en palabras)
  const receptorY = contentRectY + 60; // Posición Y del texto del receptor
  doc.text(`PÁGUESE   POR   ESTE   CHEQUE   A     ${data.receptor}`, contentRectX + textMargin, receptorY); // Texto del receptor
  doc.text(`LA   CANTIDAD   DE   PESOS      ${data.montoEscrito}.`, contentRectX + textMargin, receptorY + lineSpacing); // Texto del monto en letras

  // Cheque no válido y Firma (Texto y línea para la firma)
  doc.setFontSize(14); // Tamaño de la fuente más pequeño
  const firmaY = receptorY + 5 * lineSpacing; // Posición Y del texto y línea de firma
  doc.text('Cheque no válido', contentRectX + textMargin, firmaY); // Texto de cheque no válido a la izquierda
  doc.text('Firma:', contentRectX + contentRectWidth - 70, firmaY); // Etiqueta de firma a la derecha
  doc.line(contentRectX + contentRectWidth - 60, firmaY + 1, contentRectX + contentRectWidth - 10, firmaY + 1); // Línea para la firma

  break;



          case 'debito':
            // Generar PDF de nota de débito
            doc.setFontSize(16);
            doc.text('Nota de Débito', 105, 20, { align: 'center' });
            doc.setFontSize(12);
            doc.text(`Número: ${data.numero}`, 10, 30);
            doc.text(`Fecha: ${data.fecha}`, 10, 40);
            doc.text(`Monto: ${data.monto}`, 10, 50);
            doc.text(`Concepto: ${data.concepto}`, 10, 60);
            // Añadir más detalles de la nota de débito según sea necesario
            break;

          case 'credito':
                // Generar PDF de nota de débito
                doc.setFontSize(16);
                doc.text('Nota de Crédito', 105, 20, { align: 'center' });
                doc.setFontSize(12);
                doc.text(`Número: ${data.numero}`, 10, 30);
                doc.text(`Fecha: ${data.fecha}`, 10, 40);
                doc.text(`Monto: ${data.monto}`, 10, 50);
                doc.text(`Concepto: ${data.concepto}`, 10, 60);
                // Añadir más detalles de la nota de débito según sea necesario
                break;

      default:
        console.error(`Tipo de documento no soportado: ${tipo}`);
        break;
    }

    return doc;
  };

  
  const verPDF = (tipo, data) => {
    const doc = generarPDF(tipo, data);
    if (doc) {
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    }
  };

  // const prepImpresion = (tipo, data) => {
  //   const doc = generarPDF(tipo, data);
  //   if (doc) {
  //     const pdfBlob = doc.output('blob');
  //     const pdfUrl = URL.createObjectURL(pdfBlob);
  
  //     if (isMobile()) {
  //       // Si es móvil, abrir el PDF en una nueva ventana/solapa
  //       const newWindow = window.open(pdfUrl, '_blank');
  //       if (newWindow) {
  //         newWindow.focus();
  //       } else {
  //         // Si abrir una nueva ventana falla, muestra una alerta
  //         alert('Por favor, permita la apertura de ventanas emergentes para imprimir el PDF.');
  //       }
  //     } else {
  //       // Si no es móvil, usar un iframe
  //       const iframe = document.createElement('iframe');
  //       iframe.style.position = 'absolute';
  //       iframe.style.width = '0px';
  //       iframe.style.height = '0px';
  //       iframe.style.border = 'none';
  //       iframe.src = pdfUrl;
  
  //       document.body.appendChild(iframe);
  
  //       iframe.onload = () => {
  //         iframe.contentWindow.focus();
  //         iframe.contentWindow.print();
  //       };
  //     }
  //   }
  // };
  const prepImpresion = (tipo, data) => {
    const doc = generarPDF(tipo, data);
    if (doc) {
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
    }
  };

  const guardarPDF = (tipo, data) => {
    const doc = generarPDF(tipo, data);
    if (doc) {
      doc.save(`Documento_${data.numero}.pdf`);
    }
  };

  return {
    barcodeImage,
    loadBarcodeImage,
    verPDF,
    prepImpresion,
    guardarPDF,
  };
});

