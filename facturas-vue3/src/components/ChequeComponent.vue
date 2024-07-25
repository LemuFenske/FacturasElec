<template>
  <div>
    <div class="button-container">
      <q-btn
        label="Crear Cheque"
        icon="account_balance"
        class="btn-create no-print"
        @click="openChequeModal"
        flat
      ></q-btn>
    </div>

    <div v-if="cheques.length" class="info-container q-pa-md mb-6">
      <q-item-label header class="info-header">Lista de Cheques</q-item-label>
      <div class="info-box">
        <div v-for="(cheque, index) in cheques" :key="index" class="info-item">
          <div class="info-text">
            <div><strong>Número:</strong> {{ cheque.numero }}</div>
            <div><strong>Monto:</strong> ${{ cheque.montoNumero }}</div>
            <div><strong>Receptor:</strong> {{ cheque.receptor }}</div>
          </div>
          <div class="factura-actions">
            <q-btn icon="save" @click="showConfirmationModal(cheque)" flat></q-btn>
            <q-btn icon="visibility" @click="verChequePDF(cheque)" flat></q-btn>
            <!-- <q-btn icon="print" @click="imprimirChequePDF(cheque)" flat></q-btn> -->
            <q-btn v-if="!cheque.confirmed" icon="edit" @click="openChequeEditModal(cheque)" flat></q-btn>
            <q-btn icon="delete" @click="eliminarCheque(index)" flat></q-btn>
          </div>
        </div>
      </div>
    </div>

    <ChequeModal ref="chequeModal" @cheque-guardado="actualizarCheque" />
    <ChequeModalEdit ref="chequeModalEdit" @cheque-editado="actualizarChequeEditado" />

    <div v-if="confirmationModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmación</h5>
            <p class="modal-subtitle">Si confirmas la operación ya no la podrás editar.</p>
          </div>
          <div class="modal-footer">
            <q-btn class="buton-cancel" label="Cancelar" @click="confirmationModal = false" flat></q-btn>
            <q-btn class="buton-confirm" label="Confirmar" @click="guardarChequePDF" flat></q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';
import { usePdfStore } from '../stores/pdf';
import ChequeModal from '../components/ChequeModal.vue';
import ChequeModalEdit from '../components/ChequeModalEdit.vue';

const cheques = ref([]);
const confirmationModal = ref(false);
const chequeActual = ref(null);

const $q = useQuasar();
const pdfStore = usePdfStore();

onMounted(() => {
  const storedCheques = $q.localStorage.getItem('cheques');
  if (storedCheques) {
    cheques.value = storedCheques;
  }
  pdfStore.loadBarcodeImage();
});

const modalStore = useModalStore();

const openChequeModal = () => {
  modalStore.toggleCheque();
};

const openChequeEditModal = (cheque) => {
  modalStore.setChequeToEdit(cheque);
  modalStore.toggleChequeEdit();
};

const actualizarCheque = (nuevoCheque) => {
  cheques.value.push(nuevoCheque);
  $q.localStorage.set('cheques', cheques.value);
};

const actualizarChequeEditado = (chequeEditado) => {
  const index = cheques.value.findIndex(cheque => cheque.numero === chequeEditado.numero);
  if (index !== -1) {
    cheques.value[index] = chequeEditado;
    $q.localStorage.set('cheques', cheques.value);
  }
};

const showConfirmationModal = (cheque) => {
  chequeActual.value = cheque;
  if (!cheque.confirmed) {
    confirmationModal.value = true;
    return;
  }
  pdfStore.guardarPDF('cheque', chequeActual.value);
  confirmationModal.value = false;
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
    confirmationModal.value = false;
  }
};

const verChequePDF = (cheque) => {
  pdfStore.verPDF('cheque', cheque);
};

const eliminarCheque = (index) => {
  cheques.value.splice(index, 1);
  $q.localStorage.set('cheques', cheques.value);
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
    margin-bottom: 16px;
  }
  
  .btn-create {
    width: 100%;
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
    padding: 0px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .modal-header {
    margin-top: auto;
    margin-bottom: 00px;
    text-align: center;
  }
  
  .modal-title {
    font-size: 1.2em;
    color: #00613c;
    font-weight: 700;
    
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
    background-color:red;
    color: #ffffff;
  }
  </style>
  