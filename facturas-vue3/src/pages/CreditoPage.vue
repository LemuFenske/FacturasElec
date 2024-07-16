<template>
  <q-page-container>
    <q-page class="page-content">
      <div class="button-container">
        <q-btn
          label="Crear Nota de Crédito"
          icon="credit_card"
          class="btn-create no-print"
          @click="openCreditoModal"
          flat
        ></q-btn>
      </div>

      <div v-if="creditos.length" class="info-container q-pa-md mb-6">
        <q-item-label header class="info-header">Lista de Notas de Crédito</q-item-label>
        <div class="info-box">
          <div v-for="(nota, index) in creditos" :key="index" class="info-item">
            <div class="info-text">
              <div><strong>Número:</strong> {{ nota.numero }}</div>
              <div><strong>Período:</strong> {{ nota.periodo.desde }} - {{ nota.periodo.hasta }}</div>
              <div><strong>Vencimiento:</strong> {{ nota.vencimientoPago }}</div>
            </div>
            <div class="factura-actions">
              <q-btn icon="visibility" @click="verPDF(nota)" flat></q-btn>
              <q-btn icon="print" @click="prepImpresion(nota)" flat></q-btn>
              <q-btn icon="save" @click="guardarPDF(nota)" flat></q-btn>
            </div>
          </div>
        </div>
      </div>

      <CreditoModal
        ref="creditoModal"
        @credito-guardado="actualizarCredito"
      />
    </q-page>
  </q-page-container>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import CreditoModal from '../components/CreditoModal.vue';
import { usePdfStore } from '../stores/pdf.js';

const creditos = ref([]);

// Obtener instancia de Quasar
const $q = useQuasar();
const pdfStore = usePdfStore();

onMounted(() => {
  const storedCreditos = $q.localStorage.getItem('notasCredito');
  if (storedCreditos) {
    creditos.value = storedCreditos;
  }
});

const openCreditoModal = () => {
  const modalStore = useModalStore();
  modalStore.toggleCredito();
};

const actualizarCredito = (nuevaNotaCredito) => {
  creditos.value.push(nuevaNotaCredito);
  $q.localStorage.set('notasCredito', creditos.value);
};

const verPDF = (credito) => {
  pdfStore.verPDF('credito', credito);
};

const prepImpresion = (credito) => {
  pdfStore.prepImpresion('credito', credito);
};

const guardarPDF = (credito) => {
  pdfStore.guardarPDF('credito', credito);
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

  