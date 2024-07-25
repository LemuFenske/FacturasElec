<template>
    <div class="all-container">
      <div class="button-container">
        <q-btn
          label="Crear/Editar Empresa"
          icon="apartment"
          class="btn-create no-print"
          @click="openEmpresaModal"
          flat
          style="width: 100%;"
        ></q-btn>
      </div>
  
      <div class="max-container">
        <div v-if="empresa && Object.keys(empresa).length" class="info-container q-pa-md mb-6">
          <q-item-label header class="info-header">Datos de la Empresa</q-item-label>
          <div class="info-box">
            <div><strong>Nombre:</strong> {{ empresa.nombre }}</div>
            <div><strong>Dirección:</strong> {{ empresa.direccion }}</div>
            <div><strong>Cuit:</strong> {{ empresa.cuit }}</div>
            <div><strong>Condición de IVA:</strong> {{ empresa.condIva }}</div>
            <div><strong>Fecha de Inicio:</strong> {{ empresa.fechaInicio }}</div>
            <div><strong>Ingresos Brutos:</strong> {{ empresa.ingBrutos }}</div>
            <div><strong>Razón Social:</strong> {{ empresa.razonSocial }}</div>
          </div>
        </div>
        <EmpresaModal ref="empresaModal" :empresa="empresa" @empresa-guardada="mostrarEmpresa"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  import { useModalStore } from '../stores/modalVariables.js';
  import EmpresaModal from './EmpresaModal.vue';
  
  const empresa = ref({});
  const $q = useQuasar();
  
  onMounted(() => {
    const storedEmpresa = $q.localStorage.getItem('empresa');
    if (storedEmpresa) {
      empresa.value = storedEmpresa;
    }
  });
  
  const openEmpresaModal = () => {
    const modalStore = useModalStore();
    modalStore.toggleEmpresa();
  };
  
  const mostrarEmpresa = (empresaData) => {
    empresa.value = empresaData;
    $q.localStorage.set('empresa', empresaData);
  };
  </script>
  
  <style scoped>
  .all-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .button-container {
    width: 100%;
    text-align: center;
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
  
  .max-container {
    display: flex;
    flex-direction: column;
    width: 100%;
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
  </style>
  