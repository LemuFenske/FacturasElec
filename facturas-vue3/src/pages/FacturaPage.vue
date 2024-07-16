<template>
  <q-page-container>
    <q-page class="page-content">
      <div class="button-container">
        <q-btn
          label="Crear Factura"
          icon="receipt_long"
          class="btn-create no-print"
          @click="openFacturaModal"
          flat
        ></q-btn>
      </div>

      <div v-if="facturas.length" class="info-container q-pa-md mb-6">
        <q-item-label header class="info-header">Facturas</q-item-label>
        <div class="info-box">
          <div v-for="(factura, index) in facturas" :key="index" class="info-item">
            <div class="info-text">
              <div><strong>Factura N°:</strong> {{ factura.numero }}</div>
              <div><strong>Fecha:</strong> {{ factura.fecha }}</div>
              <div><strong>Total:</strong> {{ factura.total }}</div>
            </div>
            <div class="factura-actions">
              <q-btn icon="save" @click="guardarPDF(factura)" flat></q-btn>
              <q-btn icon="print" @click="prepImpresion(factura)" flat></q-btn>
              <q-btn icon="visibility" @click="verPDF(factura)" flat></q-btn>
            </div>
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

<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useModalStore } from '../stores/modalVariables.js';
import { usePdfStore } from 'src/stores/pdf.js';
import NuevaFacturaModal from 'src/components/NuevaFacturaModal.vue';

const facturas = ref([]);

const $q = useQuasar();

const pdfStore = usePdfStore();

onMounted(() => {
  const storedFacturas = $q.localStorage.getItem('facturas');
  if (storedFacturas) {
    facturas.value = storedFacturas;
  }
  pdfStore.loadBarcodeImage();
});

const openFacturaModal = () => {
  const modalStore = useModalStore();
  modalStore.toggleFactura();
};

const actualizarFacturas = (nuevaFactura) => {
  facturas.value.push(nuevaFactura);
  $q.localStorage.set('facturas', facturas.value);
};

const verPDF = (factura) => {
  pdfStore.verPDF('factura', factura);
};

const prepImpresion = (factura) => {
  pdfStore.prepImpresion('factura', factura);
};

const guardarPDF = (factura) => {
  pdfStore.guardarPDF('factura', factura);
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

