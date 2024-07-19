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
      <FacturaComponet/>
      <DebitoPage/>
      <CreditoPage/>
      <ChequePage/>
      <TicketPage/>
      <EmpresaModal ref="empresaModal" :empresa="empresa" @empresa-guardada="mostrarEmpresa"/>
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
import ChequePage from './ChequePage.vue';
import FacturaPage from './FacturaPage.vue';
import TicketPage from './TicketPage.vue';
import DebitoPage from './DebitoPage.vue';
import CreditoPage from './CreditoPage.vue';
import FacturaComponet from '../components/FacturaComponent.vue'

const empresa = ref({});


const $q = useQuasar();


onMounted(() => {
  const storedEmpresa = $q.localStorage.getItem('empresa');
  if (storedEmpresa) {
    empresa.value = storedEmpresa;
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
  margin-top: 0; /* Ajusta el margen superior a 0 */
}

.max-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 100px; /* Asegura que haya espacio suficiente para el contenido */
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

