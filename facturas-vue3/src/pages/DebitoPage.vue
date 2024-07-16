<template>
  <q-page-container>
    <q-page class="page-content">
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
              <q-btn icon="visibility" @click="verPDF(debito)" flat></q-btn>
              <q-btn icon="print" @click="prepImpresion(debito)" flat></q-btn>
              <q-btn icon="save" @click="guardarPDF(debito)" flat></q-btn>
            </div>
          </div>
        </div>
      </div>

      <DebitoModal
        ref="debitoModal"
        @debito-guardado="actualizarDebito"
      />
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';
import DebitoModal from '../components/DebitoModal.vue';
import { usePdfStore } from '../stores/pdf.js';

// Crear referencia reactiva para debitos
const debitos = ref([]);

// Obtener instancia de Quasar
const $q = useQuasar();
const pdfStore = usePdfStore();

// Ejecutar al montar el componente
onMounted(() => {
  const storedDebitos = $q.localStorage.getItem('notasDebito');
  if (storedDebitos) {
    debitos.value = storedDebitos;
  }
});

// Método para abrir el modal de debito
const openDebitoModal = () => {
  const modalStore = useModalStore();
  modalStore.toggleDebito();
};

// Método para actualizar el debito
const actualizarDebito = (nuevaNotaDebito) => {
  debitos.value.push(nuevaNotaDebito);
  $q.localStorage.set('notasDebito', debitos.value);
};

// Método para ver el PDF de la nota de débito
const verPDF = (debito) => {
  pdfStore.verPDF('debito', debito);
};

// Método para preparar la impresión de la nota de débito
const prepImpresion = (debito) => {
  pdfStore.prepImpresion('debito', debito);
};

// Método para guardar el PDF de la nota de débito
const guardarPDF = (debito) => {
  pdfStore.guardarPDF('debito', debito);
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

  