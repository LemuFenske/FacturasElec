<template>
    <q-page-container>
      <q-page class="page-content">
        <q-btn
          label="Nota de Crédito"
          icon="credit_card"
          class="btn-square no-print"
          @click="openCreditoModal"
          flat
        ></q-btn>
  
        <div v-if="notasCredito.length">
          <q-list bordered class="q-pa-sm">
            <q-item-label header>Lista de Notas de Crédito</q-item-label>
            <q-item v-for="(nota, index) in notasCredito" :key="index">
              <q-item-section>
                <div>
                  <div><strong>Número:</strong> {{ nota.numero }}</div>
                  <div><strong>Fecha:</strong> {{ nota.fecha }}</div>
                  <div><strong>Monto:</strong> {{ nota.monto }}</div>
                  <div><strong>Concepto:</strong> {{ nota.concepto }}</div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
  
        <!-- Modal de Nota de Crédito -->
        <CreditoModal
          ref="creditoModal"
          @credito-guardado="actualizarCredito"
        />
      </q-page>
    </q-page-container>
  </template>
  
  <script>
  import CreditoModal from '../components/CreditoModal.vue';
  
  export default {
    components: {
      CreditoModal
    },
    data() {
      return {
        notasCredito: []
      };
    },
    mounted() {
     
      const storedNotasCredito = localStorage.getItem('notasCredito');
      if (storedNotasCredito) {
        this.notasCredito = JSON.parse(storedNotasCredito);
      }
    },
    methods: {
      openCreditoModal() {
        this.$refs.creditoModal.openModal();
      },
      actualizarCredito(nuevaNotaCredito) {
      this.notasCredito.push(nuevaNotaCredito);
    }
    }
  };
  </script>
  