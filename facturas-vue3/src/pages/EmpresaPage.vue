<template>
  <q-page-container>
    <q-page class="page-content">
      <div class="all-container">
      <div class="button-container">
        <q-btn
          label="Crear/Editar Empresa"
          icon="apartment"
          class="btn-create no-print"
          @click="openEmpresaModal"
          flat
          style="width: 100%;"
        ></q-btn>
      </div>

      <!-- Sección de datos de la empresa -->
       <div class='max-container'>
      <div v-if="empresa && Object.keys(empresa).length" class="info-container q-pa-md mb-6">
        <q-item-label header class="info-header">Datos de la Empresa</q-item-label>
        <div class="info-box">
          <div><strong>Nombre:</strong> {{ empresa.nombre }}</div>
          <div><strong>Dirección:</strong> {{ empresa.direccion }}</div>
          <div><strong>Cuit:</strong> {{ empresa.cuit }}</div>
          <div><strong>Condición de IVA:</strong> {{ empresa.condIva }}</div>
          <div><strong>Fecha de Inicio:</strong> {{ empresa.fechaInicio }}</div>
          <div><strong>Ingresos Brutos:</strong> {{ empresa.ingBrutos }}</div>
          <div><strong>Razón Social:</strong> {{ empresa.razonSocial }}</div>
        </div>
      </div>
      <FacturaPage/>
      <DebitoPage/>
      <CreditoPage/>
      <ChequePage/>
      <TicketPage/>
    </div>
  </div>

      
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useModalStore } from '../stores/modalVariables.js';
import EmpresaModal from '../components/EmpresaModal.vue';
import { usePdfStore } from 'src/stores/pdf.js';
import ChequeModalEdit from 'src/components/ChequeModalEdit.vue';
import CreditoModalEdit from 'src/components/CreditoModalEdit.vue';
import DebitoModalEdit from 'src/components/DebitoModalEdit.vue';
import NuevaFacturaModalEdit from 'src/components/NuevaFacturaModalEdit.vue';
import TicketModalEdit from 'src/components/TicketModalEdit.vue';
import ChequePage from './ChequePage.vue';
import FacturaPage from './FacturaPage.vue';
import TicketPage from './TicketPage.vue';
import DebitoPage from './DebitoPage.vue';
import CreditoPage from './CreditoPage.vue';

const empresa = ref({});
const facturas = ref([]);
const notasCredito = ref([]);
const notasDebito = ref([]);
const tickets = ref([]);
const cheques = ref([]);
const confirmationModalFactura = ref(false);
const confirmationModalCredito = ref(false);
const confirmationModalDebito = ref(false);
const confirmationModalCheque = ref(false);
const confirmationModalTicket = ref(false);

const facturaActual = ref(null);
const creditoActual = ref(null);
const debitoActual = ref(null);
const ticketActual = ref(null);
const chequeActual = ref(null);

const $q = useQuasar();
const pdfStore = usePdfStore();

onMounted(() => {
  const storedEmpresa = $q.localStorage.getItem('empresa');
  if (storedEmpresa) {
    empresa.value = storedEmpresa;
  }

  const storedFacturas = $q.localStorage.getItem('facturas');
  if (storedFacturas) {
    facturas.value = storedFacturas;
  }

  const storedNotasCredito = $q.localStorage.getItem('notasCredito');
  if (storedNotasCredito) {
    notasCredito.value = storedNotasCredito;
  }

  const storedNotasDebito = $q.localStorage.getItem('notasDebito');
  if (storedNotasDebito) {
    notasDebito.value = storedNotasDebito;
  }

  const storedTickets = $q.localStorage.getItem('tickets');
  if (storedTickets) {
    tickets.value = storedTickets;
  }

  const storedCheques = $q.localStorage.getItem('cheques');
  if (storedCheques) {
    cheques.value = storedCheques;
  }
});

const openEmpresaModal = () => {
  const modalStore = useModalStore();
  modalStore.toggleEmpresa();
};

const openFacturaEditModal = (factura) => {
  const modalStore = useModalStore();
  modalStore.setFacturaToEdit(factura);
  modalStore.toggleFacturaEdit();
};

const mostrarEmpresa = (empresaData) => {
  empresa.value = empresaData;
  $q.localStorage.set('empresa', empresaData);
};

const actualizarFacturaEditado = (facturaEditado) => {
  const index = facturas.value.findIndex(c => c.numero === facturaEditado.numero);
  if (index !== -1) {
    facturas.value[index] = facturaEditado;
    $q.localStorage.set('facturas', facturas.value);
  }
};
const showConfirmationModalFactura = (factura) => {
  facturaActual.value = factura;
  if (!factura.confirmed) {
    confirmationModalFactura.value = true;
    return;
  }
  pdfStore.guardarPDF('factura', facturaActual.value);
  confirmationModalFactura.value = false;
};

const showConfirmationModalCredito = (nota) => {
  creditoActual.value = nota;
  if (!nota.confirmed) {
    confirmationModalCredito.value = true;
    return;
  }
  pdfStore.guardarPDF('credito', creditoActual.value);
  confirmationModalCredito.value = false;
};

const showConfirmationModalDebito = (nota) => {
  debitoActual.value = nota;
  if (!nota.confirmed) {
    confirmationModalDebito.value = true;
    return;
  }
  pdfStore.guardarPDF('debito', debitoActual.value);
  confirmationModalDebito.value = false;
};

const showConfirmationModalTicket = (nota) => {
  ticketActual.value = nota;
  if (!nota.confirmed) {
    confirmationModalTicket.value = true;
    return;
  }
  pdfStore.guardarPDF('ticket', ticketActual.value);
  confirmationModalTicket.value = false;
};

const showConfirmationModalCheque = (nota) => {
  chequeActual.value = nota;
  if (!nota.confirmed) {
    confirmationModalCheque.value = true;
    return;
  }
  pdfStore.guardarPDF('cheque', chequeActual.value);
  confirmationModalCheque.value = false;
};
// Función para ver el PDF de un documento según el tipo y los datos proporcionados
const verPDF = (tipo, data) => {
  pdfStore.verPDF(tipo, data);
};


const guardarFacturaPDF = () => {
  if (facturaActual.value) {
    facturaActual.value.confirmed = true;
    const facturaIndex = facturas.value.findIndex(f => f.numero === facturaActual.value.numero);
    if (facturaIndex !== -1) {
      facturas.value[facturaIndex] = { ...facturaActual.value };
      $q.localStorage.set('facturas', facturas.value);
    }
    pdfStore.guardarPDF('factura', facturaActual.value);
    confirmationModal.value = false;
  }
};

const guardarCreditoPDF = () => {
  if (creditoActual.value) {
    creditoActual.value.confirmed = true;
    const creditoIndex = notasCredito.value.findIndex(c => c.numero === creditoActual.value.numero);
    if (creditoIndex !== -1) {
      notasCredito.value[creditoIndex] = { ...creditoActual.value };
      $q.localStorage.set('notasCredito', notasCredito.value);
    }
    pdfStore.guardarPDF('credito', creditoActual.value);
    confirmationModalCredito.value = false;
  }
};
const guardarDebitoPDF = () => {
  if (debitoActual.value) {
    debitoActual.value.confirmed = true;
    const debitoIndex = notasDebito.value.findIndex(d => d.numero === debitoActual.value.numero);
    if (debitoIndex !== -1) {
      notasDebito.value[debitoIndex] = { ...debitoActual.value };
      $q.localStorage.set('notasDebito', notasDebito.value);
    }
    pdfStore.guardarPDF('debito', debitoActual.value);
    confirmationModalDebito.value = false;
  }
};

const guardarTicketPDF = () => {
  if (ticketActual.value) {
    ticketActual.value.confirmed = true;
    const ticketIndex = tickets.value.findIndex(t => t.numero === ticketActual.value.numero);
    if (ticketIndex !== -1) {
      tickets.value[ticketIndex] = { ...ticketActual.value };
      $q.localStorage.set('tickets', tickets.value);
    }
    pdfStore.guardarPDF('ticket', ticketActual.value);
    confirmationModalTicket.value = false;
  }
};

const guardarChequePDF = () => {
  if (chequeActual.value) {
    chequeActual.value.confirmed = true;
    const chequeIndex = cheques.value.findIndex(cheque => cheque.numero === chequeActual.value.numero);
    if (chequeIndex !== -1) {
      cheques.value[chequeIndex] = { ...chequeActual.value };
      $q.localStorage.set('cheques', cheques.value);
    }
    pdfStore.guardarPDF('cheque', chequeActual.value);
    confirmationModalCheque.value = false;
  }
};
// const guardarPDF = (tipo, data) => {
//   pdfStore.guardarPDF(tipo, data);
// };

</script>

<style scoped>
.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  
}

.button-container {
  width: 100%;
  
  text-align: center;
  margin-bottom: 16px;
}

.btn-create {
  width: 100%;
  max-width: 400px;
  padding: 12px 24px;
  font-size: 1.1em;
  font-weight: bold;
  background-color: #00613c;
  color: #fff;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.btn-create:hover {
  background-color: #00472c;
}
.all-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0;
}
.max-container {
  display: flex;
  flex-direction: column;
  width: 100%;
 
}
.info-container {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 16px;
}

.info-header {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 8px;
}

.info-box {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
}

.info-text {
  flex: 1;
}

.factura-actions {
  display: flex;
  gap: 8px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  margin-top: 0;
  margin-bottom: 10px;
  text-align: center;
}

.modal-title {
  font-size: 1.2em;
  color: #00613c;
  font-weight: 700;
}

.modal-subtitle {
  margin-bottom: 10px;
  color: #333;
}

.modal-footer {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  gap: 10px;
}

.buton-confirm {
  background-color: #00613c;
  color: #ffffff;
}

.buton-cancel {
  background-color: red;
  color: #ffffff;
}
</style>
