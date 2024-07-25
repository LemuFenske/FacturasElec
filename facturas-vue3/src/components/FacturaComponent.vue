<template>
    <div class="factura-page">
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
              <q-btn icon="save" @click="showConfirmationModal(factura)" flat></q-btn>
              <q-btn icon="visibility" @click="verFacturaPDF(factura)" flat></q-btn>
              <q-btn v-if="!factura.confirmed" icon="edit" @click="openFacturaEditModal(factura)" flat></q-btn>
              <q-btn icon="delete" @click="eliminarFactura(index)" flat></q-btn>
            </div>
          </div>
        </div>
      </div>
  
      <NuevaFacturaModal
        ref="facturaModal"
        @factura-guardada="actualizarFacturas"
      />
  
      <NuevaFacturaModalEdit
        ref="facturaEditModal"
        @factura-editada="actualizarFacturaEditado"
      />
  
      <div v-if="confirmationModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirmación</h5>
              <p class="modal-subtitle">Si confirmas la operación ya no la podrás editar.</p>
            </div>
            <div class="modal-footer">
              <q-btn class="button-cancel" label="Cancelar" @click="confirmationModal = false" flat></q-btn>
              <q-btn class="button-confirm" label="Confirmar" @click="guardarFacturaPDF" flat></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  import { useModalStore } from '../stores/modalVariables.js';
  import { usePdfStore } from 'src/stores/pdf.js';
  import NuevaFacturaModal from 'src/components/NuevaFacturaModal.vue';
  import NuevaFacturaModalEdit from 'src/components/NuevaFacturaModalEdit.vue';
  
  const facturas = ref([]);
  const confirmationModal = ref(false);
  const facturaActual = ref(null);
  
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
  
  const openFacturaEditModal = (factura) => {
    const modalStore = useModalStore();
    modalStore.setFacturaToEdit(factura);
    modalStore.toggleFacturaEdit();
  };
  
  const actualizarFacturas = (nuevaFactura) => {
    facturas.value.push(nuevaFactura);
    $q.localStorage.set('facturas', facturas.value);
  };
  
  const actualizarFacturaEditado = (facturaEditado) => {
    const index = facturas.value.findIndex(c => c.numero === facturaEditado.numero);
    if (index !== -1) {
      facturas.value[index] = facturaEditado;
      $q.localStorage.set('facturas', facturas.value);
    }
  };
  
  const showConfirmationModal = (factura) => {
    facturaActual.value = factura;
    confirmationModal.value = true;
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
  
  const verFacturaPDF = (factura) => {
    pdfStore.verPDF('factura', factura);
  };
  
  const eliminarFactura = (index) => {
    facturas.value.splice(index, 1);
    $q.localStorage.set('facturas', facturas.value);
  };
  </script>
  
  <style scoped>


.button-container {
  width: 100%;
  
  margin-bottom: 16px;
  text-align: center;
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

.button-confirm {
  background-color: #00613c;
  color: #ffffff;
}

.button-cancel {
  background-color: red;
  color: #ffffff;
}
</style>
