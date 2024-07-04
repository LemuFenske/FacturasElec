<template>
  <q-page-container>
    <q-page class="page-content">
      <q-btn
        label="Factura"
        icon="receipt_long"
        class="btn-square no-print"
        @click="openFacturaModal"
        flat
      ></q-btn>

      <div v-if="facturas.length" class="factura-container">
        <div v-for="(factura, index) in facturas" :key="index" class="factura-item">
          <div class="factura-number">{{ factura.numero }}</div>
          <div class="factura-actions">
            <q-btn icon="save" @click="guardarPDF(factura)" flat></q-btn>
            <q-btn icon="print" @click="prepImpresion(factura)" flat></q-btn>
            <q-btn icon="visibility" @click="verPDF(factura)" flat></q-btn>
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
.factura-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 10px;
}

.factura-item {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 5px;
}

.factura-number {
  font-weight: bold;
}

.factura-actions {
  display: flex;
}

</style>
