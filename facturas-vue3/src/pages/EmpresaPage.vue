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

      <!-- Sección de facturas -->
      <div v-if="facturas.length" class="info-container q-pa-md mb-6">
        <q-item-label header class="info-header">Facturas de la Empresa {{ empresa.nombre }}</q-item-label>
        <div class="info-box">
          <div v-for="factura in facturas" :key="factura.numero" class="info-item">
            <div class="info-text">
              <div><strong>Factura N°:</strong> {{ factura.numero }}</div>
              <div><strong>Fecha:</strong> {{ factura.fecha }}</div>
              <div><strong>Total:</strong> {{ factura.total }}</div>
            </div>
            <div class="factura-actions">
              <q-btn icon="save" @click="guardarPDF('factura', factura)" flat></q-btn>
              <q-btn icon="print" @click="prepImpresion('factura', factura)" flat></q-btn>
              <q-btn icon="visibility" @click="verPDF('factura', factura)" flat></q-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de notas de crédito -->
      <div v-if="notasCredito.length" class="info-container q-pa-md mb-6">
        <q-item-label header class="info-header">Notas de Crédito de la Empresa {{ empresa.nombre }}</q-item-label>
        <div class="info-box">
          <div v-for="nota in notasCredito" :key="nota.numero" class="info-item">
            <div class="info-text">
              <div><strong>Número:</strong> {{ nota.numero }}</div>
              <div><strong>Período:</strong> {{ nota.periodo.desde }} - {{ nota.periodo.hasta }}</div>
              <div><strong>Vencimiento:</strong> {{ nota.vencimientoPago }}</div>
            </div>
            <div class="factura-actions">
              <q-btn icon="save" @click="guardarPDF('credito', nota)" flat></q-btn>
              <q-btn icon="print" @click="prepImpresion('credito', nota)" flat></q-btn>
              <q-btn icon="visibility" @click="verPDF('credito', nota)" flat></q-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de notas de débito -->
      <div v-if="notasDebito.length" class="info-container q-pa-md mb-6">
        <q-item-label header class="info-header">Notas de Débito de la Empresa {{ empresa.nombre }}</q-item-label>
        <div class="info-box">
          <div v-for="nota in notasDebito" :key="nota.numero" class="info-item">
            <div class="info-text">
              <div><strong>Número:</strong> {{ nota.numero }}</div>
              <div><strong>Período:</strong> {{ nota.periodo.desde }} - {{ nota.periodo.hasta }}</div>
              <div><strong>Vencimiento:</strong> {{ nota.vencimientoPago }}</div>
            </div>
            <div class="factura-actions">
              <q-btn icon="save" @click="guardarPDF('debito', nota)" flat></q-btn>
              <q-btn icon="print" @click="prepImpresion('debito', nota)" flat></q-btn>
              <q-btn icon="visibility" @click="verPDF('debito', nota)" flat></q-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de tickets -->
      <div v-if="tickets.length" class="info-container q-pa-md mb-6">
        <q-item-label header class="info-header">Tickets de la Empresa {{ empresa.nombre }}</q-item-label>
        <div class="info-box">
          <div v-for="ticket in tickets" :key="ticket.numero" class="info-item">
            <div class="info-text">
              <div><strong>Número:</strong> {{ ticket.numero }}</div>
                <div><strong>Fecha:</strong> {{ ticket.fecha }}</div>
                <div><strong>IVA:</strong> {{ ticket.condIva }}</div>
            </div>
            <div class="factura-actions">
              <q-btn icon="save" @click="guardarPDF('ticket', ticket)" flat></q-btn>
              <q-btn icon="print" @click="prepImpresion('ticket', ticket)" flat></q-btn>
              <q-btn icon="visibility" @click="verPDF('ticket', ticket)" flat></q-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de cheques -->
      <div v-if="cheques.length" class="info-container q-pa-md mb-6">
        <q-item-label header class="info-header">Cheques de la Empresa {{ empresa.nombre }}</q-item-label>
        <div class="info-box">
          <div v-for="cheque in cheques" :key="cheque.numero" class="info-item">
            <div class="info-text">
              <div><strong>Número de cheque:</strong> {{ cheque.numero }}</div>
              <div><strong>Monto:</strong> ${{ cheque.montoNumero }}</div>
              <div><strong>Receptor:</strong> {{ cheque.receptor }}</div>
            </div>
            <div class="factura-actions">
              <q-btn icon="save" @click="guardarPDF('cheque', cheque)" flat></q-btn>
              <q-btn icon="print" @click="prepImpresion('cheque', cheque)" flat></q-btn>
              <q-btn icon="visibility" @click="verPDF('cheque', cheque)" flat></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      <EmpresaModal
        ref="empresaModal"
        :empresa="empresa"
        @empresa-guardada="mostrarEmpresa"
      />
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useModalStore } from '../stores/modalVariables.js';
import EmpresaModal from '../components/EmpresaModal.vue';
import { usePdfStore } from 'src/stores/pdf.js';

const empresa = ref({});
const facturas = ref([]);
const notasCredito = ref([]);
const notasDebito = ref([]);
const tickets = ref([]);
const cheques = ref([]);

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

const mostrarEmpresa = (empresaData) => {
  empresa.value = empresaData;
  $q.localStorage.set('empresa', empresaData);
};

// Función para ver el PDF de un documento según el tipo y los datos proporcionados
const verPDF = (tipo, data) => {
  pdfStore.verPDF(tipo, data);
};

// Función para preparar la impresión de un documento según el tipo y los datos proporcionados
const prepImpresion = (tipo, data) => {
  pdfStore.prepImpresion(tipo, data);
};

// Función para guardar el PDF de un documento según el tipo y los datos proporcionados
const guardarPDF = (tipo, data) => {
  pdfStore.guardarPDF(tipo, data);
};

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
  margin-top: 0px;
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
</style>
