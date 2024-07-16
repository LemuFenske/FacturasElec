<template>
  <q-page-container>
    <q-page class="page-content">
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
              <q-btn icon="save" @click="guardarChequePDF(cheque)" flat></q-btn>
              <q-btn icon="visibility" @click="verChequePDF(cheque)" flat></q-btn>
              <q-btn icon="print" @click="imprimirChequePDF(cheque)" flat></q-btn>
            </div>
          </div>
        </div>
      </div>

      <ChequeModal
        ref="chequeModal"
        @cheque-guardado="actualizarCheque"
      />
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';
import { usePdfStore } from '../stores/pdf';
import ChequeModal from '../components/ChequeModal.vue';

const cheques = ref([]);

const $q = useQuasar();

const pdfStore = usePdfStore();

onMounted(() => {
  const storedCheques = $q.localStorage.getItem('cheques');
  if (storedCheques) {
    cheques.value = storedCheques;
  }
  pdfStore.loadBarcodeImage();
});

const openChequeModal = () => {
  const modalStore = useModalStore();
  modalStore.toggleCheque();
};

const actualizarCheque = (nuevoCheque) => {
  cheques.value.push(nuevoCheque);
  $q.localStorage.set('cheques', cheques.value);
};

const guardarChequePDF = (cheque) => {
  pdfStore.guardarPDF('cheque', cheque);
};

const verChequePDF = (cheque) => {
  pdfStore.verPDF('cheque', cheque);
};

const imprimirChequePDF = (cheque) => {
  pdfStore.prepImpresion('cheque', cheque);
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
  max-width: 400px;
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
</style>
