<template>
  <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
    <q-card class="modal-card">
      <q-toolbar class="navbar">
        <q-toolbar-title>Nueva Nota de Débito</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
      </q-toolbar>
      <q-card-section class="modal-content">
        <div>
          <q-list class="full-width">
            <q-item-label header>Datos de la Nota de Débito</q-item-label>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaDebito.numero"
                type="number"
                label="Número de Nota de Débito"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaDebito.monto"
                type="number"
                label="Monto"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaDebito.concepto"
                label="Concepto"
              ></q-input>
            </q-item>
          </q-list>
        </div>
        <q-btn label="Guardar" @click="guardarNotaDebito" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';

// Definir props
// const props = defineProps({
//   value: Boolean,
// });

// Crear referencia reactiva para el modal store
const modalStore = useModalStore();

// Computed para controlar el estado del modal
const isOpen = computed(() => modalStore.debitoIsOpen);

// Datos de la nota de débito
const notaDebito = ref({
  numero: '',
  fecha: new Date().toISOString().split('T')[0],
  monto: '',
  concepto: '',
});

// Obtener instancia de Quasar
const $q = useQuasar();

// Definir el método `emit`
const emit = defineEmits(['debito-guardado']);

// Método para cerrar el modal
const closeModal = () => {
  modalStore.toggleDebito(); // Llama a la acción para cerrar el modal
};

// Método para guardar la nota de débito
const guardarNotaDebito = () => {
  let notasDebito = $q.localStorage.getItem('notasDebito') || [];

  const nuevaNotaDebito = {
    ...notaDebito.value,
    index: notasDebito.length,
  };

  notasDebito.push(nuevaNotaDebito);

  $q.localStorage.set('notasDebito', notasDebito);

  // Emitir evento
  emit('debito-guardado', nuevaNotaDebito);

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
  background-color: #24ff95; /* Color verde */
  color: #ffffff; /* Texto blanco */
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  text-align: center;
}

.modal-content {
  padding: 24px;
  background-color: #ffffff; /* Fondo blanco */
}

.buttonsave {
  background-color: #24ff95; /* Color verde */
  display: block;
  margin: 10px auto 0 auto; /* Reducido el margen inferior */
  text-align: center;
  width: 100px;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  height: 40px; /* Ajusta la altura del botón */
  line-height: 35px; /* Centra el texto verticalmente */
}

.buttonsave:hover {
  background-color: #1ed87a;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
  </style>
  