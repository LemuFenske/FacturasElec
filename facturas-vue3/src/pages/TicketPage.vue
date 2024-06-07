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
        @ticket-guardado="actualizarTickets"
      />
    </q-page>
  </q-page-container>
</template>

<script>
import TicketModal from '../components/TicketModal.vue';

export default {
  components: {
    TicketModal
  },
  data() {
    return {
      tickets: []
    };
  },
  mounted() {
    // Cargar los tickets desde el localStorage al iniciar la página
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      this.tickets = JSON.parse(storedTickets);
    }
  },
  methods: {
    openTicketModal() {
      this.$refs.ticketModal.openModal();
    },
    actualizarTickets(nuevoTicket) {
      this.tickets.push(nuevoTicket);
    }
  }
};
</script>
