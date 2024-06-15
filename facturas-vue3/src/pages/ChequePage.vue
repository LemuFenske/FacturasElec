<template>
    <q-page-container>
      <q-page class="page-content">
        <q-btn
          label="Cheque"
          icon="account_balance"
          class="btn-square no-print"
          @click="openChequeModal"
          flat
        ></q-btn>
  
        <div v-if="cheques.length">
          <q-list bordered class="q-pa-sm">
            <q-item-label header>Lista de Cheques</q-item-label>
            <q-item v-for="(cheque, index) in cheques" :key="index">
              <q-item-section>
                <div>
                  <div><strong>Banco:</strong> {{ cheque.banco }}</div>
                  <div><strong>Número:</strong> {{ cheque.numero }}</div>
                  <div><strong>Fecha:</strong> {{ cheque.fecha }}</div>
                  <div><strong>Monto:</strong> {{ cheque.monto }}</div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
  
        <ChequeModal
          ref="chequeModal"
          @cheque-guardado="actualizarCheque"
        />
      </q-page>
    </q-page-container>
  </template>
  
  <script>
  import ChequeModal from '../components/ChequeModal.vue';
  
  export default {
    components: {
      ChequeModal
    },
    data() {
      return {
        cheques: []
      };
    },
    mounted() {
      const storedCheques = this.$q.localStorage.getItem('cheques');
      if (storedCheques) {
      this.cheques = storedCheques;
      }

    },
    methods: {
      openChequeModal() {
        this.$refs.chequeModal.openModal();
      },
      actualizarCheque(nuevoCheque) {
      this.cheques.push(nuevoCheque);
    }
    }
  };
  </script>
  