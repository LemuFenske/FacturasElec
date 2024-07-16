<template>
  <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
    <q-card class="modal-card">
      <q-toolbar class="navbar">
        <q-toolbar-title>Configuración de la Empresa</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
      </q-toolbar>
      <q-card-section class="modal-content">
        <div class="form-container">
          <div class="row">
            <div class="column">
              <q-input
                v-model="empresaLocal.nombre"
                label="Nombre de la Empresa"
                class="full-width"
              ></q-input>
            </div>
            <div class="column">
              <q-input
                v-model="empresaLocal.direccion"
                label="Dirección"
                class="full-width"
              ></q-input>
            </div>
          </div>
          <q-space></q-space>
          <div class="row">
            <div class="column">
              <q-input
                v-model="empresaLocal.razonSocial"
                label="Razón Social"
                class="full-width"
              ></q-input>
            </div>
            <div class="column">
              <q-input
                v-model="empresaLocal.cuit"
                label="CUIT"
                class="full-width"
              ></q-input>
            </div>
          </div>
          <q-space></q-space>
          <div class="row">
            <div class="column">
              <q-select
                v-model="empresaLocal.condIva"
                label="Condición de IVA"
                :options="opcionesIva"
                class="full-width"
              ></q-select>
            </div>
            <div class="column">
              <q-input
                v-model="empresaLocal.ingBrutos"
                label="Ingresos Brutos"
                class="full-width"
              ></q-input>
            </div>
          </div>
          <q-space></q-space>
          <div class="row">
            <div class="column">
              <q-input
                v-model="empresaLocal.fechaInicio"
                float-label="Fecha de Inicio de Actividades"
                type="date"
                format="YYYY/MM/DD"
                class="full-width"
              ></q-input>
            </div>
            <div class="column">
              <q-input
                v-model="empresaLocal.nombreTitular"
                label="Nombre del Titular"
                class="full-width"
              ></q-input>
            </div>
          </div>
        </div>
        <q-btn label="Guardar" @click="guardarEmpresa" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useModalStore } from '../stores/modalVariables.js';

// Props
const props = defineProps({
  empresa: {
    type: Object,
    default: () => ({})
  }
});

const empresaLocal = ref({
  razonSocial: '',
  nombre: '',
  cuit: '',
  direccion: '',
  condIva: '',
  ingBrutos: '',
  fechaInicio: new Date().toISOString().split('T')[0],
  nombreTitular: ''  
});

const opcionesIva = ref([
  'Responsable Inscripto',
  'Monotributista',
  'Exento',
  'No Responsable',
  'Consumidor Final'
]);

const $q = useQuasar();
const emit = defineEmits(['empresa-guardada']);

const isOpen = computed(() => {
  const modalStore = useModalStore();
  return modalStore.empresaIsOpen;
});

watch(isOpen, (newValue) => {
  if (newValue) {
    loadEmpresaData();
  }
});

const closeModal = () => {
  const modalStore = useModalStore();
  modalStore.toggleEmpresa();
};

const guardarEmpresa = () => {
  const empresaData = { ...empresaLocal.value };
  $q.localStorage.set('empresa', empresaData);
  emit('empresa-guardada', empresaData);
  closeModal();
};

const loadEmpresaData = () => {
  const storedEmpresa = $q.localStorage.getItem('empresa');
  if (storedEmpresa) {
    empresaLocal.value = storedEmpresa;
  } else if (props.empresa) {
    empresaLocal.value = { ...props.empresa };
  }
};

onMounted(() => {
  loadEmpresaData();
});
</script>






<style scoped>
.centered-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-card {
  width: 80vw;
  max-width: 800px;
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

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.column {
  flex: 1;
  min-width: 250px;
}

.q-mt-md {
  margin-top: 16px;
}
</style>

