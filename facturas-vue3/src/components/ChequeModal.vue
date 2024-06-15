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
              <q-input
                class="full-width"
                v-model="cheque.monto"
                type="number"
                label="Monto"
              ></q-input>
            </q-item>
          </q-list>
        </div>
        <q-btn label="Guardar" @click="guardarCheque" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ChequeModal',
  props: {
    value: Boolean,
  },
  data() {
    return {
      isOpen: false,
      cheque: {
        banco: '',
        numero: '',
        fecha: new Date().toISOString().split('T')[0],
        monto: '',
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
    guardarCheque() {
      let cheques = this.$q.localStorage.getItem('cheques') || [];

      if (typeof cheques === 'string') {
        cheques = JSON.parse(cheques);
      }

      const nuevoCheque = {
        ...this.cheque,
        index: cheques.length,
      };

      cheques.push(nuevoCheque);

      this.$q.localStorage.set('cheques', cheques);

      this.$emit('cheque-guardado', nuevoCheque);

     
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

  