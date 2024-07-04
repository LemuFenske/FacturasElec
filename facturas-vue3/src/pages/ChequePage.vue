<template>
  <q-page-container>
    <q-page class="page-content">
      <q-btn
        label="Cheque"
        icon="account_balance"
        class="btn-square no-print"
        @click="openChequeModal"
        flat
      ></q-btn>

      <div v-if="cheques.length">
        <q-list bordered class="q-pa-sm">
          <q-item-label header>Lista de Cheques</q-item-label>
          <q-item v-for="(cheque, index) in cheques" :key="index">
            <q-item-section>
              <div>
                <div><strong>Número:</strong> {{ cheque.numero }}</div>
                <div><strong>Monto:</strong> {{ cheque.montoNumero }}</div>
                <div><strong>Receptor:</strong> {{ cheque.receptor }}</div>
              </div>
              <q-btn icon="save" @click="guardarChequePDF(cheque)" flat></q-btn>
              <q-btn icon="visibility" @click="verChequePDF(cheque)" flat></q-btn>
              <q-btn icon="print" @click="imprimirChequePDF(cheque)" flat></q-btn>
            </q-item-section>
          </q-item>
        </q-list>
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