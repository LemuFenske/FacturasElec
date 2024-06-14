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
  
  <script>
  export default {
  name: 'DebitoModal',
  props: {
    value: Boolean,
  },
  data() {
    return {
      isOpen: false,
      notaDebito: {
        numero: '',
        fecha: new Date().toISOString().split('T')[0],
        monto: '',
        concepto: '',
      },
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
    guardarNotaDebito() {
      
      let notasDebito = JSON.parse(localStorage.getItem('notasDebito')) || [];

     
      const nuevaNotaDebito = {
        ...this.notaDebito,
        index: notasDebito.length, 
      };

      
      notasDebito.push(nuevaNotaDebito);

     
      localStorage.setItem('notasDebito', JSON.stringify(notasDebito));


      
      this.closeModal();
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
  