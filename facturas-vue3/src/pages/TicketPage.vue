<template>
  <q-page-container>
    <q-page class="page-content">
      <div class="button-container">
        <q-btn
          label="Crear Ticket"
          icon="receipt"
          class="btn-create no-print"
          @click="openTicketModal"
          flat
        ></q-btn>
      </div>

      <div v-if="tickets.length" class="info-container">
        <q-list bordered class="q-pa-sm">
          <q-item-label header class="info-header">Tickets</q-item-label>
          <div class="info-box">
            <div v-for="ticket in tickets" :key="ticket.index" class="info-item">
              <div class="info-text">
                <div><strong>Número:</strong> {{ ticket.numero }}</div>
                <div><strong>Fecha:</strong> {{ ticket.fecha }}</div>
                <div><strong>IVA:</strong> {{ ticket.condIva }}</div>
              </div>
              <div class="factura-actions">
                <q-btn icon="save" @click="guardarTicketPDF(ticket)" flat></q-btn>
                <q-btn icon="visibility" @click="verTicketPDF(ticket)" flat></q-btn>
                <q-btn icon="print" @click="imprimirTicketPDF(ticket)" flat></q-btn>
              </div>
            </div>
          </div>
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

<style scoped>
.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.button-container {
  width: 100%;
  max-width: 400px;
  margin-bottom: 16px;
}

.btn-create {
  width: 100%;
  padding: 12px 24px;
  font-size: 1.1em;
  font-weight: bold;
  background-color: #00613c;
  color: #fff;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.btn-create:hover {
  background-color: #00472c;
}

.info-container {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 16px;
}

.info-header {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 8px;
}

.info-box {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
}

.info-text {
  flex: 1;
}

.factura-actions {
  display: flex;
  gap: 8px;
}
</style>
