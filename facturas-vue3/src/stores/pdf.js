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
    const docTicket = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 160] // Formato de ticket
    });
    const pageWidthTicket = 80; 
    const pageWidth = 210; 
    const pageHeight = 297;

    const empresa = $q.localStorage.getItem('empresa') || {
      nombre: "Empresa Ejemplo",
      direccion: "Empresa 123",
      cuit: "20109080601",
      ingBrutos: "3000",
      condIva: "Consumidor Final"
  };

    switch (tipo) {
      
    //   case 'factura':
    // // Datos de la empresa del localStorage
    //     const empresa = $q.localStorage.getItem('empresa') || {
    //         nombre: "Empresa Ejemplo",
    //         direccion: "Empresa 123",
    //         cuit: "20109080601",
    //         ingBrutos: "3000",
    //         condIva: "Consumidor Final"
    //     };

    //     // Rectángulo superior (datos de la empresa y detalles de la factura)
    //     doc.setFontSize(10);
    //     doc.rect(10, 10, 190, 32);
    //     doc.line(105, 10, 105, 42);

    //     // Datos de la empresa (lado izquierdo)
    //     doc.setFontSize(16);
    //     doc.text(empresa.nombre, 57.5, 17, { align: 'center' });
    //     doc.setFontSize(10);
    //     doc.text(`Dirección empresarial: ${empresa.direccion}`, 12, 27);
    //     doc.text(`Razón Social: ${empresa.razonSocial}`, 12, 31);
    //     doc.text(`Cond. IVA: ${empresa.condIva}`, 12, 35);

    //     // Detalles de la factura (lado derecho)
    //     doc.setFontSize(17);
    //     doc.text('Factura', 152.5, 17, { align: 'center' });
    //     doc.setFontSize(10);
    //     doc.text(`N°: ${data.ptoVenta} - ${data.numero.padStart(8, '0')}`, 107, 23);
    //     doc.text(`Fecha: ${data.fecha}`, 107, 27);
    //     doc.text(`CUIT: ${empresa.cuit}`, 107, 31);
    //     doc.text(`Ingresos Brutos: ${empresa.ingBrutos}`, 107, 35);
    //     doc.text(`Inicio Actividades: ${data.inicioActividades || '2024/05/31'}`, 107, 39);

    //     // Tipo de factura (en el centro, pegado al borde superior)
    //     doc.setFontSize(20);
    //     doc.setDrawColor(0, 0, 0);
    //     doc.setFillColor(255, 255, 255);
    //     doc.rect(95, 10, 20, 8, 'FD');
    //     doc.text(data.condTipo, 105, 14, { align: 'center', baseline: 'middle' });

    //     // Rectángulo abajo de los anteriores (datos del cliente)
    //     doc.rect(10, 44, 190, 20);
    //     doc.setFontSize(11);
    //     doc.text(`CUIT: ${data.cliente.cuit}`, 12, 51);
    //     doc.text(`Condición de IVA: ${data.cliente.condIva}`, 12, 55);
    //     doc.text(`Condición de Venta: ${data.condVenta}`, 12, 59);
    //     doc.text(`Nombre: ${data.cliente.nombre}`, 100, 51);
    //     doc.text(`Domicilio: ${data.cliente.direccion}`, 100, 55);

    //     // Mapea los productos de la factura a un formato adecuado para manualTable
    //     const productos = data.productosFactura.map(prod => [
    //         prod.codigo || '-',
    //         prod.nombre,
    //         prod.cantidad,
    //         prod.unidad || 'Unidades',
    //         parseFloat(prod.precio).toFixed(2),
    //         (parseFloat(prod.precio) * parseFloat(prod.cantidad)).toFixed(2)
    //     ]);

    //     // Genera la tabla manualmente
    //     const startY = 70;
    //     const rowHeight = 10;
    //     let currentY = startY;

    //     // Dibujar encabezado de la tabla
    //     doc.setFontSize(10);
    //     const headers = ['Código', 'Producto / Servicio', 'Cantidad', 'Unidad Medida', 'Precio Unitario', 'Subtotal'];
    //     headers.forEach((header, index) => {
    //         doc.text(header, 12 + index * 30, currentY);
    //     });
    //     doc.line(10, currentY + 2, 200, currentY + 2); // Línea debajo del encabezado
    //     currentY += rowHeight;

    //     // Dibujar filas de la tabla
    //     productos.forEach(producto => {
    //         producto.forEach((item, index) => {
    //             doc.text(item.toString(), 12 + index * 30, currentY);
    //         });
    //         doc.line(10, currentY + 2, 200, currentY + 2); // Línea debajo de la fila
    //         currentY += rowHeight;
    //     });

    //     // Resumen de la factura
    //     const resumenY = currentY + 2;
    //     doc.rect(10, resumenY, 190, 20);
    //     doc.setFontSize(10);
    //     const marginRight = 13;
    //     // const pageWidth = 210;
    //     const subtotalText = `Subtotal: $${data.subtotal.toFixed(4)}`;
    //     const ivaText = `IVA 21%: $${data.iva.toFixed(4)}`;
    //     const totalText = `Total: $${data.total.toFixed(4)}`;
    //     const subtotalTextWidth = doc.getTextWidth(subtotalText);
    //     const ivaTextWidth = doc.getTextWidth(ivaText);
    //     const totalTextWidth = doc.getTextWidth(totalText);
    //     doc.text(subtotalText, pageWidth - subtotalTextWidth - marginRight, resumenY + 7);
    //     doc.text(ivaText, pageWidth - ivaTextWidth - marginRight, resumenY + 11);
    //     doc.text(totalText, pageWidth - totalTextWidth - marginRight, resumenY + 15);

    // // Agregar imagen de código de barras
    // if (barcodeImage.value) {
    //     const imgWidth = 50;
    //     const imgHeight = 20;
    //     doc.addImage(barcodeImage.value, 'PNG', 10, resumenY + 22, imgWidth, imgHeight);
    // }
    // break;


      // case 'ticket':
      //   // Código para generar el PDF de ticket
        
      //   const empresa = $q.localStorage.getItem('empresa') || {
      //     nombre: "Empresa Ejemplo",
      //     direccion: "Empresa 123",
      //     cuit: "20109080601",
      //     ingBrutos: "3000",
      //     condIva: "Consumidor Final"
      // };
      // docTicket.setFont('courier');
        
      //   // Datos de la empresa y del cliente
      //   docTicket.setFontSize(9);
      //   docTicket.text(`${empresa.nombreTitular}`, 3, 10);
      //   docTicket.text(`C.U.I.T: ${empresa.cuit}`, 3, 14);
      //   docTicket.text(`Domicilio: ${empresa.direccion}`, 3, 18);
      //   docTicket.text(`Inicio de Actividades: ${empresa.fechaInicio}`, 3, 22);
      //   docTicket.text(`IVA ${empresa.condIva}`, 3, 26);
      //   docTicket.text(`A ${data.condIva}`, 3, 30);
        
      //   // Nombre de la empresa en grande
      //   docTicket.setFont('courier', 'bold');
      //   docTicket.setFontSize(13);
      //   docTicket.text(empresa.nombre, 40, 36, { align: 'center' });
        
      //   // Información del ticket
      //   docTicket.setFont('courier', 'normal');
      //   docTicket.setFontSize(8);
      //   docTicket.text(`TIQUE (Cod. 083)`, 3, 43);
      //   const currentDate = new Date();
      //   const formattedDate = currentDate.toISOString().split('T')[0];
      //   const formattedTime = currentDate.toTimeString().split(' ')[0];
      //   docTicket.text(`Fecha: ${formattedDate}`, 20, 46);
      //   docTicket.text(`Hora: ${formattedTime}`, 50, 46);
        
      //   // Detalles de los items
      //   let total = 0
      //   let startY = 53;
      //   data.productosFactura.forEach((item, index) => {
      //       let y = startY + (index * 6); // Incrementa la coordenada Y por cada item
      //       docTicket.text(`${item.cantidad} x ${item.precio}`, 3, y);
      //       docTicket.text(`${item.nombre}`, 3, y + 3);
      //       docTicket.text(`${item.subtotal}`, pageWidthTicket - 3, y + 3, { align: 'right' });
      //       total = total + item.subtotal
      //   });
        
      //   // Total
      //   startY += data.productosFactura.length * 7;
      //   docTicket.setFont('courier', 'bold');
      //   docTicket.setFontSize(12);
      //   docTicket.text(`Total`, 3, startY);
      //   docTicket.text(`${total}`, pageWidthTicket - 3, startY, { align: 'right' });
        
      //   // Información de pago
      //   docTicket.setFont('courier', 'normal');
      //   docTicket.setFontSize(8);
      //   docTicket.text(`RECIBI/MOS`, 3, startY + 4);
      //   docTicket.text(`Efectivo`, 3, startY + 8);
      //   docTicket.text(`${total}`,  pageWidthTicket - 3, startY + 8, { align: 'right' });
      //   docTicket.text(`Suma de sus pagos`, 3, startY + 12);
      //   docTicket.text(`${total}`,  pageWidthTicket - 3, startY + 12, { align: 'right' });
      //   docTicket.text(`Su Vuelto`, 3, startY + 16);
      //   docTicket.text(`0`,  pageWidthTicket - 3, startY + 16, { align: 'right' });
        
      //   break;

      case 'cheque':
// Estilo del cheque
        const borderColor = [0, 0, 0]; // Color del borde en formato RGB
        const borderWidth = 1; // Grosor del borde
        const fillColor = [173, 206, 240]; // Color de fondo en formato RGB (gris claro)
        const textMargin = 12; // Margen para el texto desde el borde izquierdo
        const lineSpacing = 7; // Espaciado entre líneas de texto

        // Rectángulo del contenido del cheque
        const contentRectWidth = pageWidth - 2;
        const contentRectHeight = 105;
        const contentRectX = (pageWidth - contentRectWidth) / 2;
        const contentRectY = 1;

        doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]); // Color del borde
        doc.setLineWidth(borderWidth); // Grosor del borde
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]); // Color de fondo
        doc.rect(contentRectX, contentRectY, contentRectWidth, contentRectHeight, 'FD'); // Rectángulo del contenido con fondo

        // Banco (Nombre del banco en la parte superior central)
        doc.setFontSize(24); // Tamaño de la fuente grande
        doc.text(`Banco ${data.banco}`, pageWidth / 2, contentRectY + 15, { align: 'center' }); // Texto centrado en la página

        // Domicilio de pago (Texto debajo del nombre del banco)
        doc.setFontSize(15); // Tamaño de la fuente más pequeño
        doc.text(`Domicilio de pago: ${data.domicilioPago}`, pageWidth / 2, contentRectY + 22, { align: 'center' }); // Texto centrado

        // Serie y Monto (Serie a la izquierda, monto en un rectángulo a la derecha)
        const serie = "L00129929"; // Puedes reemplazar esto con una serie dinámica si es necesario
        doc.setFontSize(12); // Tamaño de la fuente
        doc.text(`Serie: ${serie}`, contentRectX + textMargin, contentRectY + 40); // Serie a la izquierda
        doc.setLineWidth(0.1); // Grosor de la línea del rectángulo del monto
        doc.rect(contentRectX + contentRectWidth - 45, contentRectY + 32, 30, 12, 'S'); // Dibuja un rectángulo para el monto
        doc.setFontSize(16); // Tamaño de la fuente
        doc.text(`$${data.montoNumero}`, contentRectX + contentRectWidth - 40, contentRectY + 40); // Monto en números dentro del rectángulo

        // Fecha y Ciudad (Texto en una sola línea)
        doc.setFontSize(16); // Tamaño de la fuente

        // Receptor y Monto en Letras (Texto en tres líneas, cada uno con su propia posición X)
        const receptorY = contentRectY + 60; // Posición Y del texto del receptor

        // Línea 1: {ciudad,} {dia} {de} {mes} {de} {ano}
        doc.text(`${data.ciudad},`, contentRectX + 13, contentRectY + 55); // Posición X personalizada para cada texto
        doc.text(`${data.dia}`, contentRectX + 60, contentRectY + 54);
        doc.text('DE', contentRectX + 73, contentRectY + 55);
        doc.text(`${data.mes}`, contentRectX + 100, contentRectY + 54);
        doc.text('DE', contentRectX + 150, contentRectY + 55);
        doc.text(`${data.ano}`, contentRectX + 173, contentRectY + 54);

        // Línea para completar el ancho
        doc.line(54, contentRectY + 55, 73, contentRectY + 55);
        doc.line(84, contentRectY + 55, 149, contentRectY + 55);
        doc.line(160, contentRectY + 55, 195, contentRectY + 55);

        // Línea 2: {paguese por este cheque a}{receptor}
        doc.text('PÁGUESE POR ESTE CHEQUE A', contentRectX + 13, receptorY + 3); // Posición X personalizada para cada texto
        doc.text(`${data.receptor}`, contentRectX + 110, receptorY + 2);

        // Línea para completar el ancho
        doc.line(106, receptorY + 3, 195, receptorY + 3);

        // Línea 3: {la cantidad de pesos}{montoescrito}
        doc.text('LA CANTIDAD DE PESOS', contentRectX + 13, receptorY + lineSpacing + 4); // Posición X personalizada para cada texto
        doc.text(`${data.montoEscrito}`, contentRectX + 90, receptorY + lineSpacing + 3);

        // Línea para completar el ancho
        doc.line(85, receptorY + lineSpacing + 4, 195, receptorY + lineSpacing + 4);

        doc.line(7, receptorY + lineSpacing + 13, 203, receptorY + lineSpacing + 13);
        doc.line(7, receptorY + lineSpacing + 14, 203, receptorY + lineSpacing + 14);

        // Cheque no válido y Firma (Texto y línea para la firma)
        doc.setFontSize(14); // Tamaño de la fuente más pequeño
        const firmaY = receptorY + 5 * lineSpacing; // Posición Y del texto y línea de firma
        doc.text('Cheque de Prueba', contentRectX + textMargin, firmaY); // Texto de cheque no válido a la izquierda
        doc.text('Firma:', contentRectX + contentRectWidth - 70, firmaY); // Etiqueta de firma a la derecha
        doc.line(contentRectX + contentRectWidth - 55, firmaY + 1, contentRectX + contentRectWidth - 15, firmaY + 1);


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
        //doc.rect(10, 10, 190, 10);
doc.setFontSize(10);
doc.rect(10, 10, 190, 37);
doc.line(105, 10, 105, 47);

// Datos de la empresa (lado izquierdo)
doc.setFontSize(16);
doc.text(empresa.nombre, 57.5, 17, { align: 'center' });
doc.setFontSize(10);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Razón Social:', 12, 27);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(empresa.razonSocial, 38, 27);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Dirección empresarial:', 12, 35);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(empresa.direccion, 52, 35);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Cond. IVA:', 12, 43);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(empresa.condIva, 38, 43);

// Detalles de la factura (lado derecho)
doc.setFontSize(17);
doc.text('NOTA DE CRÉDITO', 152.5, 17, { align: 'center' });
doc.setFontSize(10);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Punto de Venta:', 107, 25);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(`${data.ptoVenta} - ${data.numero.padStart(8, '0')}`, 145, 25);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Fecha de Emisión:', 107, 29);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(data.fechaEmision, 145, 29);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('CUIT:', 107, 35);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(empresa.cuit, 120, 35);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Ingresos Brutos:', 107, 39);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(empresa.ingBrutos, 145, 39);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Fecha de Inicio Actividades:', 107, 43);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(empresa.fechaInicio || '2024/05/31', 162, 43);

// Tipo de factura (en el centro, pegado al borde superior)
doc.setFontSize(20);
doc.setDrawColor(0, 0, 0);
doc.setFillColor(255, 255, 255);
doc.rect(95, 10, 20, 8, 'FD');
doc.text(data.condTipo, 105, 14, { align: 'center', baseline: 'middle' });

// Rectángulo abajo de los anteriores (datos del cliente)
doc.rect(10, 47, 190, 10);
doc.setFontSize(11);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Periodo Facturado', 12, 53);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(`Desde: ${data.periodo.desde}`, 48, 53);
doc.text(`Hasta: ${data.periodo.hasta}`, 83, 53);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Fecha de Vto. para el pago: ', 120, 53);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(data.vencimientoPago, 171, 53);

doc.rect(10, 58, 190, 25);
doc.setFontSize(11);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('CUIT:', 13, 65);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(data.cliente.cuit, 27, 65);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Condición frente al IVA:', 13, 72);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(data.cliente.condIva, 58, 72);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Condición de venta:', 13, 79);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(data.cliente.condVenta, 51, 79);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Apellido y Nombre / Razón Social:', 65, 65);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(`${data.cliente.apellidoNombre} / ${data.razonSocial}`, 130, 65);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Domicilio:', 100, 72);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(data.cliente.domicilio, 120, 72);

// Texto en negrita
doc.setFont('helvetica', 'bold');
doc.text('Período Asociado:', 100, 79);
// Texto normal
doc.setFont('helvetica', 'normal');
doc.text(`${data.periodo.desde} - ${data.periodo.hasta}`, 136, 79);

   doc.setFillColor(222, 222, 222); // Color gris
doc.rect(10, 85, 190, 10, 'F'); // Dibuja el rectángulo con fondo gris
doc.setDrawColor(50, 50, 50); // Color del borde
doc.rect(10, 85, 190, 10); // Dibuja el borde del rectángulo

// Líneas verticales para separar las columnas
doc.line(24, 85, 24, 95);  // Línea después de 'Código'
doc.line(77, 85, 77, 95);  // Línea después de 'Producto/Servicio'
doc.line(95, 85, 95, 95);  // Línea después de 'Cantidad'
doc.line(110, 85, 110, 95);  // Línea después de 'U. Medida'
doc.line(136, 85, 136, 95);  // Línea después de 'Precio Unitario'
doc.line(148, 85, 148, 95);  // Línea después de '% Bonif'
doc.line(169, 85, 169, 95);  // Línea después de 'Subtotal'
doc.line(179, 85, 179, 95);  // Línea después de 'IVA'

// Configuración de texto en negrita para los encabezados de las columnas
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.text('Código', 12, 91);
doc.text('Producto/Servicio', 26, 91);
doc.text('Cantidad', 80, 91);
doc.text('U. Medida', 96, 91);
doc.text('Precio Unit.', 115, 91);
doc.text('% Bonif', 137, 91);
doc.text('Subtotal', 153, 91);
doc.text('IVA', 172, 91);
doc.text('Subtotal c/IVA', 180, 91);

let startY = 95;

// Iterar sobre los items y añadirlos al PDF
data.productosServicios.forEach((item, index) => {
    let y = startY + (index * 10); // Incrementa la coordenada Y por cada item

    // Líneas horizontales para cada fila de items
    doc.setDrawColor(0, 0, 0); // Color del borde
    doc.line(10, y, 200, y); // Dibuja la línea horizontal para cada item

    // Datos de cada columna
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(String(index + 1), 12, y + 5); // Código (número de item)
    doc.text(item.nombre, 26, y + 5);
    doc.text(String(item.cantidad), 80, y + 5);
    doc.text(item.unidadMedida, 96, y + 5);
    doc.text(String(item.precioUnitario), 115, y + 5);
    // doc.text(String(item.porcentajeBonificacion), 137, y + 5);
    doc.text(String(item.subtotal), 153, y + 5);
    doc.text(String(item.iva), 172, y + 5);
    doc.text(String(item.subtotalConIva), 180, y + 5);
});
        break;

      default:
        console.error(`Tipo de documento no soportado: ${tipo}`);
        break;
    }
    // if (tipo = 'ticket') {
    //   return docTicket
    // }
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

// /* global jsPDF */
// var doc = new jsPDF();

// const pageWidth = 210; 
// const pageHeight = 297;

// const data = {
//     numero: '12345',
//     fecha: '2024-07-08',
//     periodoFacturado: {
//         desde: '2024-06-01',
//         hasta: '2024-06-30'
//     },
//     condTipo: 'A',
//     fechaEmision: '12-02-03',
//     ptoVenta: 121212,
//     vencimientoPago: '2024-07-15',
//     apellidoNombre: 'Juan Pérez',
//     razonSocial: 'Pérez y Asociados S.A.',
//     cuit: '20-12345678-9',
//     condIva: 'Responsable Inscripto',
//     condVenta: 'Contado',
//     domicilio: 'Av. Siempre Viva 123, Buenos Aires',
//     items: [
//         {
//             productoServicio: 'Consultoría',
//             cantidad: 10,
//             unidadMedida: 'Horas',
//             precioUnitario: 1500,
//             porcentajeBonificacion: 10,
//             subtotal: 13500,
//             iva: 21,
//             subtotalConIva: 16335
//         },
//         {
//             productoServicio: 'Desarrollo de Software',
//             cantidad: 1,
//             unidadMedida: 'Proyecto',
//             precioUnitario: 50000,
//             porcentajeBonificacion: 0,
//             subtotal: 50000,
//             iva: 21,
//             subtotalConIva: 60500
//         }
//     ]
// };

// const empresa = {
//     razonSocial: 'Innovate Solutions S.A.',
//     nombre: 'Innovate Solutions',
//     cuit: '30-98765432-1',
//     direccion: 'Calle Falsa 456, Córdoba',
//     condIva: 'Responsable Inscripto',
//     ingBrutos: '123456789',
//     fechaInicio: new Date().toISOString().split('T')[0]
// };


// //doc.rect(10, 10, 190, 10);
// doc.setFontSize(10);
// doc.rect(10, 10, 190, 37);
// doc.line(105, 10, 105, 47);

// // Datos de la empresa (lado izquierdo)
// doc.setFontSize(16);
// doc.text(empresa.nombre, 57.5, 17, { align: 'center' });
// doc.setFontSize(10);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Razón Social:', 12, 27);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(empresa.razonSocial, 38, 27);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Dirección empresarial:', 12, 35);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(empresa.direccion, 52, 35);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Cond. IVA:', 12, 43);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(empresa.condIva, 38, 43);

// // Detalles de la factura (lado derecho)
// doc.setFontSize(17);
// doc.text('NOTA DE CRÉDITO', 152.5, 17, { align: 'center' });
// doc.setFontSize(10);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Punto de Venta:', 107, 25);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(`${data.ptoVenta} - ${data.numero.padStart(8, '0')}`, 145, 25);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Fecha de Emisión:', 107, 29);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(data.fechaEmision, 145, 29);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('CUIT:', 107, 35);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(empresa.cuit, 120, 35);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Ingresos Brutos:', 107, 39);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(empresa.ingBrutos, 145, 39);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Fecha de Inicio Actividades:', 107, 43);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(empresa.fechaInicio || '2024/05/31', 162, 43);

// // Tipo de factura (en el centro, pegado al borde superior)
// doc.setFontSize(20);
// doc.setDrawColor(0, 0, 0);
// doc.setFillColor(255, 255, 255);
// doc.rect(95, 10, 20, 8, 'FD');
// doc.text(data.condTipo, 105, 14, { align: 'center', baseline: 'middle' });

// // Rectángulo abajo de los anteriores (datos del cliente)
// doc.rect(10, 47, 190, 10);
// doc.setFontSize(11);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Periodo Facturado', 12, 53);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(`Desde: ${data.periodoFacturado.desde}`, 48, 53);
// doc.text(`Hasta: ${data.periodoFacturado.hasta}`, 83, 53);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Fecha de Vto. para el pago: ', 120, 53);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(data.vencimientoPago, 171, 53);

// doc.rect(10, 58, 190, 25);
// doc.setFontSize(11);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('CUIT:', 13, 65);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(data.cuit, 27, 65);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Condición frente al IVA:', 13, 72);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(data.condIva, 58, 72);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Condición de venta:', 13, 79);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(data.condVenta, 51, 79);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Apellido y Nombre / Razón Social:', 65, 65);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(`${data.apellidoNombre} / ${data.razonSocial}`, 130, 65);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Domicilio:', 100, 72);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(data.domicilio, 120, 72);

// // Texto en negrita
// doc.setFont('helvetica', 'bold');
// doc.text('Período Asociado:', 100, 79);
// // Texto normal
// doc.setFont('helvetica', 'normal');
// doc.text(`${data.periodoFacturado.desde} - ${data.periodoFacturado.hasta}`, 136, 79);

//    doc.setFillColor(222, 222, 222); // Color gris
// doc.rect(10, 85, 190, 10, 'F'); // Dibuja el rectángulo con fondo gris
// doc.setDrawColor(50, 50, 50); // Color del borde
// doc.rect(10, 85, 190, 10); // Dibuja el borde del rectángulo

// // Líneas verticales para separar las columnas
// doc.line(24, 85, 24, 95);  // Línea después de 'Código'
// doc.line(77, 85, 77, 95);  // Línea después de 'Producto/Servicio'
// doc.line(95, 85, 95, 95);  // Línea después de 'Cantidad'
// doc.line(110, 85, 110, 95);  // Línea después de 'U. Medida'
// doc.line(136, 85, 136, 95);  // Línea después de 'Precio Unitario'
// doc.line(148, 85, 148, 95);  // Línea después de '% Bonif'
// doc.line(169, 85, 169, 95);  // Línea después de 'Subtotal'
// doc.line(179, 85, 179, 95);  // Línea después de 'IVA'

// // Configuración de texto en negrita para los encabezados de las columnas
// doc.setFont('helvetica', 'bold');
// doc.setFontSize(8);
// doc.text('Código', 12, 91);
// doc.text('Producto/Servicio', 26, 91);
// doc.text('Cantidad', 80, 91);
// doc.text('U. Medida', 96, 91);
// doc.text('Precio Unit.', 115, 91);
// doc.text('% Bonif', 137, 91);
// doc.text('Subtotal', 153, 91);
// doc.text('IVA', 172, 91);
// doc.text('Subtotal c/IVA', 180, 91);

// let startY = 95;

// // Iterar sobre los items y añadirlos al PDF
// data.items.forEach((item, index) => {
//     let y = startY + (index * 10); // Incrementa la coordenada Y por cada item

//     // Líneas horizontales para cada fila de items
//     doc.setDrawColor(0, 0, 0); // Color del borde
//     doc.line(10, y, 200, y); // Dibuja la línea horizontal para cada item

//     // Datos de cada columna
//     doc.setFont('helvetica', 'normal');
//     doc.setFontSize(8);
//     doc.text(String(index + 1), 12, y + 5); // Código (número de item)
//     doc.text(item.productoServicio, 26, y + 5);
//     doc.text(String(item.cantidad), 80, y + 5);
//     doc.text(item.unidadMedida, 96, y + 5);
//     doc.text(String(item.precioUnitario), 115, y + 5);
//     doc.text(String(item.porcentajeBonificacion), 137, y + 5);
//     doc.text(String(item.subtotal), 153, y + 5);
//     doc.text(String(item.iva), 172, y + 5);
//     doc.text(String(item.subtotalConIva), 180, y + 5);
// });