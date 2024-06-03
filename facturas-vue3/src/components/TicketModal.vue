<template>
  <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
    <q-card class="modal-card">
      <q-toolbar class="navbar">
        <q-toolbar-title>Nuevo Ticket</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
      </q-toolbar>
      <q-card-section class="modal-content">
        <div>
          <q-list class="full-width">
            <q-list-header>Datos del Ticket</q-list-header>
            <q-item>
              <q-input
                class="full-width"
                v-model="ticket.numero"
                type="number"
                label="Número de Ticket"
              ></q-input>
            </q-item>
            <q-item>
              <q-datetime
                class="full-width"
                v-model="ticket.fecha"
                type="date"
                format="YYYY/MM/DD"
                label="Fecha de Emisión"
              ></q-datetime>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="ticket.monto"
                type="number"
                label="Monto"
              ></q-input>
            </q-item>
          </q-list>
        </div>
        <q-btn label="Guardar" @click="guardarTicket" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'NuevoTicketModal',
  props: {
    value: Boolean,
  },
  data() {
    return {
      isOpen: this.value,
      ticket: {
        numero: '',
        fecha: new Date().toISOString().split('T')[0], // Fecha actual
        monto: '',
      },
    };
  },
  watch: {
    value(newValue) {
      this.isOpen = newValue;
    },
    isOpen(newValue) {
      this.$emit('input', newValue);
    }
  },
  methods: {
    closeModal() {
      this.isOpen = false; // Actualiza isOpen para cerrar el modal
    },
    guardarTicket() {
      // Lógica para guardar el ticket (placeholder)
      console.log('Ticket guardado', this.ticket);
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

.full-width {
  width: 100%;
}

.q-list-header {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.buttonsave {
  background-color: #24ff95; /* Color verde */
  display: block;
  margin: 10px auto 0 auto; /* Reducido el margen inferior */
  text-align: center;
  width: 100px;
  color: white;
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
