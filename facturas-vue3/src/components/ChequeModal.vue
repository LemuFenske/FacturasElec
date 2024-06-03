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
              <q-list-header>Datos del Cheque</q-list-header>
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
                  v-model="cheque.numero"
                  type="number"
                  label="Número de Cheque"
                ></q-input>
              </q-item>
              <q-item>
                <q-datetime
                  class="full-width"
                  v-model="cheque.fecha"
                  type="date"
                  format="YYYY/MM/DD"
                  label="Fecha de Emisión"
                ></q-datetime>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="cheque.monto"
                  type="number"
                  label="Monto"
                ></q-input>
              </q-item>
            </q-list>
          </div>
          <q-btn label="Guardar" @click="guardarCheque" class="q-ml-md full-width"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  export default {
    name: 'NuevoChequeModal',
    props: {
      value: Boolean,
    },
    data() {
      return {
        isOpen: this.value,
        cheque: {
          banco: '',
          numero: '',
          fecha: new Date().toISOString().split('T')[0], // Fecha actual
          monto: '',
        },
      };
    },
    watch: {
      value(newValue) {
        this.isOpen = newValue;
      },
      isOpen(newValue) {
        this.$emit('input', newValue);
      }
    },
    methods: {
      closeModal() {
        this.isOpen = false; // Actualiza isOpen para cerrar el modal
      },
      guardarCheque() {
        // Lógica para guardar el cheque (placeholder)
        console.log('Cheque guardado', this.cheque);
      },
    },
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
  }
  
  .navbar {
    background-color: rgb(36, 255, 149); /* Color azul de Quasar */
    color: rgb(255, 255, 255);
    text-align: center;
  }
  
  .modal-content {
    padding: 16px;
    background-color: #fff; /* Fondo blanco para el contenido del modal */
  }
  </style>
  