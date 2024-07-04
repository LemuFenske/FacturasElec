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
            <q-item-section>
              <q-btn icon="save" @click="guardarTicketPDF(ticket)" flat></q-btn>
              <q-btn icon="visibility" @click="verTicketPDF(ticket)" flat></q-btn>
              <q-btn icon="print" @click="imprimirTicketPDF(ticket)" flat></q-btn>
            </q-item-section>
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
import { usePdfStore } from '../stores/pdf';
import TicketModal from '../components/TicketModal.vue';

const tickets = ref([]);

const $q = useQuasar();

const pdfStore = usePdfStore();

onMounted(() => {
  const storedTickets = $q.localStorage.getItem('tickets');
  if (storedTickets) {
    tickets.value = storedTickets;
  }
  pdfStore.loadBarcodeImage();
});

const openTicketModal = () => {
  const modalStore = useModalStore();
  modalStore.toggleTicket();
};

const actualizarTicket = (nuevoTicket) => {
  tickets.value.push(nuevoTicket);
  $q.localStorage.set('tickets', tickets.value);
};


const guardarTicketPDF = (ticket) => {
  pdfStore.guardarPDF('ticket', ticket);
};

const verTicketPDF = (ticket) => {
  pdfStore.verPDF('ticket', ticket);
};


const imprimirTicketPDF = (ticket) => {
  pdfStore.prepImpresion('ticket', ticket);
};
</script>
