<template>
  <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
    <q-card class="modal-card">
      <q-toolbar class="navbar">
        <q-toolbar-title>Nuevo Cheque</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
      </q-toolbar>
      <q-card-section class="modal-content">
        <div>
          <q-list class="full-width">
            <q-item-label header>Datos del Cheque</q-item-label>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.numero"
                type="number"
                label="Número de Cheque"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.banco"
                label="Banco"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.domicilioPago"
                label="Domicilio de Pago"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.ciudad"
                label="Ciudad"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.dia"
                type="number"
                label="Día"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.mes"
                label="Mes (escrito)"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.ano"
                type="number"
                label="Año"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.receptor"
                label="Receptor"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.montoNumero"
                type="number"
                label="Monto (Número)"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="cheque.montoEscrito"
                label="Monto (Escrito)"
              ></q-input>
            </q-item>
          </q-list>
        </div>
        <q-btn label="Guardar" @click="guardarCheque" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';

const modalStore = useModalStore();

const isOpen = computed(() => modalStore.chequeIsOpen);

const cheque = ref({
  numero: '',
  banco: '',
  domicilioPago: '',
  ciudad: '',
  dia: '',
  mes: '',
  ano: '',
  receptor: '',
  montoNumero: '',
  montoEscrito: '',
});

const $q = useQuasar();

const emit = defineEmits(['cheque-guardado']);

const closeModal = () => {
  modalStore.toggleCheque(); 
};

const guardarCheque = () => {
  let cheques = $q.localStorage.getItem('cheques') || [];

  const nuevoCheque = {
    ...cheque.value,
    index: cheques.length,
  };

  cheques.push(nuevoCheque);

  $q.localStorage.set('cheques', cheques);

  // Emitir evento
  emit('cheque-guardado', nuevoCheque);

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
  padding: 16px;
  background-color: #fff;
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

  