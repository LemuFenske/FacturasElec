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
              <q-list-header>Datos de la Nota de Débito</q-list-header>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.numero"
                  type="number"
                  label="Número de Nota de Débito"
                ></q-input>
              </q-item>
              <q-item>
                <q-datetime
                  class="full-width"
                  v-model="notaDebito.fecha"
                  type="date"
                  format="YYYY/MM/DD"
                  label="Fecha de Emisión"
                ></q-datetime>
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
          <q-btn label="Guardar" @click="guardarNotaDebito" class="q-ml-md full-width"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  export default {
    name: 'NuevaNotaDebitoModal',
    props: {
      value: Boolean,
    },
    data() {
      return {
        isOpen: this.value,
        notaDebito: {
          numero: '',
          fecha: new Date().toISOString().split('T')[0], // Fecha actual
          monto: '',
          concepto: '',
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
      guardarNotaDebito() {
        // Lógica para guardar la nota de débito (placeholder)
        console.log('Nota de Débito guardada', this.notaDebito);
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
  