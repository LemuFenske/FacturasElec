<template>
  <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
    <q-card class="modal-card">
      <q-toolbar class="navbar">
        <q-toolbar-title>Nueva Nota de Crédito</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
      </q-toolbar>
      <q-card-section class="modal-content">
        <div>
          <q-list class="full-width">
            <q-item-label header>Datos de la Nota de Crédito</q-item-label>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.numero"
                type="number"
                label="Número de Nota de Crédito"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.monto"
                type="number"
                label="Monto"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.concepto"
                label="Concepto"
              ></q-input>
            </q-item>
          </q-list>
        </div>
        <q-btn label="Guardar" @click="guardarNotaCredito" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';


const modalStore = useModalStore();


const isOpen = computed(() => modalStore.creditoIsOpen);


const notaCredito = ref({
  numero: '',
  fecha: new Date().toISOString().split('T')[0],
  monto: '',
  concepto: '',
});


const $q = useQuasar();


const emit = defineEmits(['credito-guardado']);


const closeModal = () => {
  modalStore.toggleCredito(); 
};

const guardarNotaCredito = () => {
  let notasCredito = $q.localStorage.getItem('notasCredito') || [];

  const nuevaNotaCredito = {
    ...notaCredito.value,
    index: notasCredito.length,
  };

  notasCredito.push(nuevaNotaCredito);

  $q.localStorage.set('notasCredito', notasCredito);


  emit('credito-guardado', nuevaNotaCredito);

  closeModal();
};
</script>

  
  <style scoped>
  .centered-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-card {
  width: 80vw;
  max-width: 600px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.navbar {
  background-color: #24ff95; 
  color: #ffffff; 
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  text-align: center;
}

.modal-content {
  padding: 24px;
  background-color: #ffffff; 
}

.buttonsave {
  background-color: #24ff95; 
  display: block;
  margin: 10px auto 0 auto;
  text-align: center;
  width: 100px;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  height: 40px;
  line-height: 35px; 
}

.buttonsave:hover {
  background-color: #1ed87a;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
  </style>
  