<template>
  <q-page-container>
    <q-page class="page-content">
      <q-btn
        label="Nuevo Ticket"
        icon="receipt"
        class="btn-square no-print"
        @click="openTicketModal"
        flat
      ></q-btn>

      
      <div v-if="tickets.length">
        <q-list bordered class="q-pa-sm">
          <q-item-label header>Tickets</q-item-label>
          <q-item v-for="ticket in tickets" :key="ticket.index">
            <q-item-section>{{ ticket.numero }}</q-item-section>
            <q-item-section>{{ ticket.fecha }}</q-item-section>
            <q-item-section>{{ ticket.monto }}</q-item-section>
          </q-item>
        </q-list>
      </div>

      
      <TicketModal
        ref="ticketModal"
        @ticket-guardado="actualizarTicket"
      />
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';
import TicketModal from '../components/TicketModal.vue';

const tickets = ref([]);

const $q = useQuasar();

onMounted(() => {
    const storedTickets = $q.localStorage.getItem('tickets');
    if (storedTickets) {
      tickets.value = storedTickets;
    }
});

const openTicketModal = () => {
    const modalStore = useModalStore();
    modalStore.toggleTicket();
};

const actualizarTicket = (nuevoTicket) => {
    tickets.value.push(nuevoTicket);
  };
</script>
