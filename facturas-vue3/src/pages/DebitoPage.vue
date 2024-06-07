<template>
    <q-page-container>
      <q-page class="page-content">
       
        <q-btn
          label="Nota de Débito"
          icon="payment"
          class="btn-square no-print"
          @click="openDebitoModal"
          flat
        ></q-btn>
  
        
        <div v-if="debitos.length">
          <q-list bordered class="q-pa-sm">
            <q-item-label header>Lista de Notas de Débito</q-item-label>
            <q-item v-for="(debito, index) in debitos" :key="index">
              <q-item-section>
                <div>
                  <div><strong>Número:</strong> {{ debito.numero }}</div>
                  <div><strong>Fecha:</strong> {{ debito.fecha }}</div>
                  <div><strong>Monto:</strong> {{ debito.monto }}</div>
                  <div><strong>Concepto:</strong> {{ debito.concepto }}</div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
  
       
        <DebitoModal
          ref="debitoModal"
          @debito-guardado="actualizarDebito"
        />
      </q-page>
    </q-page-container>
  </template>
  
  <script>
  import DebitoModal from '../components/DebitoModal.vue';
  
  export default {
    components: {
      DebitoModal
    },
    data() {
      return {
        debitos: []
      };
    },
    mounted() {
      const storedDebitos = localStorage.getItem('notasDebito');
      if (storedDebitos) {
        this.debitos = JSON.parse(storedDebitos);
      }
    },
    methods: {
      openDebitoModal() {
        this.$refs.debitoModal.openModal();
      },
      actualizarDebito(nuevaNotaDebito) {
        this.debitos.push(nuevaNotaDebito);
      }
    }
  };
  </script>
  