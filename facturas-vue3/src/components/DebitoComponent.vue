<template>
    <div>
        <div class="button-container">
          <q-btn
            label="Crear Nota de Débito"
            icon="payment"
            class="btn-create no-print"
            @click="openDebitoModal"
            flat
          ></q-btn>
        </div>
  
        <div v-if="debitos.length" class="info-container">
          <q-item-label header class="info-header">Lista de Notas de Débito</q-item-label>
          <div class="info-box">
            <div v-for="(debito, index) in debitos" :key="index" class="info-item">
              <div class="info-text">
                <div><strong>Número:</strong> {{ debito.numero }}</div>
                <div><strong>Período:</strong> {{ debito.periodo.desde }} - {{ debito.periodo.hasta }}</div>
                <div><strong>Vencimiento:</strong> {{ debito.vencimientoPago }}</div>
              </div>
              <div class="factura-actions">
                <q-btn icon="save" @click="showConfirmationModal(debito)" flat></q-btn>
                <q-btn icon="visibility" @click="verPDF(debito)" flat></q-btn>
                <q-btn v-if="!debito.confirmed" icon="edit" @click="openDebitoEditModal(debito)" flat></q-btn>
                <q-btn icon="delete" @click="eliminarDebito(index)" flat></q-btn>
              </div>
            </div>
          </div>
        </div>
  
        <DebitoModal
          ref="debitoModal"
          @debito-guardado="actualizarDebito"
        />
  
        <DebitoModalEdit
          ref="debitoEditModal"
          @debito-editado="actualizarDebitoEditado"
        />
  
        <div v-if="confirmationModal" class="modal-overlay">
          <div class="modal-container">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Confirmación</h5>
                <p class="modal-subtitle">¿Estás seguro de guardar la nota de débito?</p>
              </div>
              <div class="modal-footer">
                <q-btn class="buton-cancel" label="Cancelar" @click="confirmationModal = false" flat></q-btn>
                <q-btn class="buton-confirm" label="Confirmar" @click="guardarDebitoPDF" flat></q-btn>
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
  import DebitoModal from '../components/DebitoModal.vue';
  import DebitoModalEdit from '../components/DebitoModalEdit.vue';
  import { usePdfStore } from '../stores/pdf.js';
  
  const debitos = ref([]);
  const confirmationModal = ref(false);
  const debitoActual = ref(null);
  
  const $q = useQuasar();
  const pdfStore = usePdfStore();
  
  onMounted(() => {
    const storedDebitos = $q.localStorage.getItem('notasDebito');
    if (storedDebitos) {
      debitos.value = storedDebitos;
    }
  });
  
  const openDebitoModal = () => {
    const modalStore = useModalStore();
    modalStore.toggleDebito();
  };
  
  const openDebitoEditModal = (credito) => {
    const modalStore = useModalStore();
    modalStore.setDebitoToEdit(credito);
    modalStore.toggleDebitoEdit();
  };
  
  const actualizarDebito = (nuevaNotaDebito) => {
    debitos.value.push(nuevaNotaDebito);
    $q.localStorage.set('notasDebito', debitos.value);
  };
  
  const actualizarDebitoEditado = (debitoEditado) => {
    const index = debitos.value.findIndex(c => c.numero === debitoEditado.numero);
    if (index !== -1) {
      debitos.value[index] = debitoEditado;
      $q.localStorage.set('notasDebito', debitos.value);
    }
  };
  
  const showConfirmationModal = (debito) => {
    debitoActual.value = debito;
    confirmationModal.value = true;
  };
  
  const guardarDebitoPDF = () => {
    if (debitoActual.value) {
      debitoActual.value.confirmed = true;
      const debitoIndex = debitos.value.findIndex(d => d.numero === debitoActual.value.numero);
      if (debitoIndex !== -1) {
        debitos.value[debitoIndex] = { ...debitoActual.value };
        $q.localStorage.set('notasDebito', debitos.value);
      }
      pdfStore.guardarPDF('debito', debitoActual.value);
      confirmationModal.value = false;
    }
  };
  
  const verPDF = (debito) => {
    pdfStore.verPDF('debito', debito);
  };
  
  const eliminarDebito = (index) => {
  debitos.value.splice(index, 1);
  $q.localStorage.set('notasDebito', debitos.value);
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