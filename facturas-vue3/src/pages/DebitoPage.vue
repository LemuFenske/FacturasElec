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
  


  <script setup>
  import { ref, onMounted } from 'vue';
  import { useModalStore } from '../stores/modalVariables.js';
  import { useQuasar } from 'quasar';
  import DebitoModal from '../components/DebitoModal.vue';

  // Crear referencia reactiva para debitos
  const debitos = ref([]);

  // Obtener instancia de Quasar
  const $q = useQuasar();

  // Ejecutar al montar el componente
  onMounted(() => {
    const storedDebitos = $q.localStorage.getItem('notasDebito');
    if (storedDebitos) {
      debitos.value = storedDebitos;
    }
  });

  // Método para abrir el modal de debito
  const openDebitoModal = () => {
    const modalStore = useModalStore();
    modalStore.toggleDebito();
  };

  // Método para actualizar el debito
  const actualizarDebito = (nuevaNotaDebito) => {
    debitos.value.push(nuevaNotaDebito);
  };
  </script>

  <!-- <script>
import { useModalStore } from '../stores/modalVariables.js'; 
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
      const storedDebitos = this.$q.localStorage.getItem('notasDebito');
      if (storedDebitos) {
        this.debitos = storedDebitos;
      }

    },
    methods: {
      openDebitoModal() {
        const modalStore = useModalStore();
        modalStore.toggleDebito();
      },
      actualizarDebito(nuevaNotaDebito) {
        this.debitos.push(nuevaNotaDebito);
      }
    }
  };
  </script> -->
  