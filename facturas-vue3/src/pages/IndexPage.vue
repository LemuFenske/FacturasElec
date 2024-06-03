<template>
  <q-page-container>
    <q-page class="page-content">
      <!-- Botón para abrir el modal de empresa -->
      <q-btn
        label="Empresa"
        icon="apartment"
        class="btn-square no-print"
        @click="showEmpresa = true"
        flat
      ></q-btn>
      
      <!-- Modal de Empresa -->
      <EmpresaModal
        v-if="showEmpresa"
        :value="showEmpresa"
        @input="showEmpresa = $event"
      />

      <!-- Botón para abrir el modal de nueva factura -->
      <q-btn
        label="Factura"
        icon="receipt_long"
        class="btn-square no-print"
        @click="showFactura = true"
        flat
      ></q-btn>
      
      <!-- Modal de Nueva Factura -->
      <NuevaFacturaModal
        v-if="showFactura"
        :value="showFactura"
        @input="showFactura = $event"
      />

      <!-- Botón para abrir el modal de ticket -->
      <q-btn
        label="Ticket"
        icon="receipt"
        class="btn-square no-print"
        @click="showTicket = true"
        flat
      ></q-btn>
      
      <!-- Modal de Ticket -->
      <NuevoTicketModal
        v-if="showTicket"
        :value="showTicket"
        @input="showTicket = $event"
      />

      <!-- Botón para abrir el modal de nota de crédito -->
      <q-btn
        label="Nota de Crédito"
        icon="credit_card"
        class="btn-square no-print"
        @click="showNotaCredito = true"
        flat
      ></q-btn>
      
      <!-- Modal de Nota de Crédito -->
      <NuevaNotaCreditoModal
        v-if="showNotaCredito"
        :value="showNotaCredito"
        @input="showNotaCredito = $event"
      />
    
      <!-- Botón para abrir el modal de nota de débito -->
      <q-btn
        label="Nota de Débito"
        icon="payment"
        class="btn-square no-print"
        @click="showNotaDebito = true"
        flat
      ></q-btn>
      
      <!-- Modal de Nota de Débito -->
      <NuevaNotaDebitoModal
        v-if="showNotaDebito"
        :value="showNotaDebito"
        @input="showNotaDebito = $event"
      />

      <!-- Botón para abrir el modal de cheque -->
      <q-btn
        label="Cheque"
        icon="account_balance"
        class="btn-square no-print"
        @click="showCheque = true"
        flat
      ></q-btn>
      
      <!-- Modal de Cheque -->
      <NuevoChequeModal
        v-if="showCheque"
        :value="showCheque"
        @input="showCheque = $event"
      />
    </q-page>
  </q-page-container>
</template>

<script>
import EmpresaModal from '../components/EmpresaModal.vue'; 
import NuevaFacturaModal from '../components/NuevaFacturaModal.vue';
import NuevoTicketModal from '../components/TicketModal.vue';
import NuevaNotaCreditoModal from '../components/CreditoModal.vue';
import NuevaNotaDebitoModal from '../components/DebitoModal.vue';
import NuevoChequeModal from '../components/ChequeModal.vue';

export default {
  components: {
    EmpresaModal,
    NuevaFacturaModal,
    NuevoTicketModal,
    NuevaNotaCreditoModal,
    NuevaNotaDebitoModal,
    NuevoChequeModal,
  },
  data() {
    return {
      showEmpresa: false,
      showFactura: false,
      showTicket: false,
      showNotaCredito: false,
      showNotaDebito: false,
      showCheque: false,
    };
  },
};
</script>

<style>
.btn-square {
  width: 200px; /* Ajusta el ancho del botón */
  height: 200px; /* Ajusta la altura del botón */
  font-size: 18px; /* Tamaño de la fuente */
  background-color: #ffffff; /* Fondo blanco */
  color: rgb(0, 0, 0);
  border: none; /* Sin borde */
  box-shadow: none; /* Sombra inicial */
  border-radius: 8px;
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centro vertical */
  padding: 20px; /* Espacio interno */
  margin: 10px; /* Margen alrededor de cada botón */
}

.btn-square .q-icon {
  font-size: 100px; /* Tamaño del icono */
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 20px;
}

.btn-square:hover,
.btn-square:focus,
.btn-square:active {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); /* Sombra hacia adentro */
  background-color: #ffffff; /* Mantener el fondo blanco */
  color: rgb(0, 0, 63);
}

.page-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centrar los botones horizontalmente */
  align-items: center;
  height: calc(100vh - 56px); /* Altura total menos la altura de la cabecera */
  overflow: auto; /* Permite el desplazamiento si es necesario */
}

@media (min-width: 768px) {
  .page-content {
    justify-content: space-around;
  }
  
  .btn-square {
    flex: 1 1 30%; /* Tres botones por fila en escritorio */
    max-width: 30%;
  }
}

@media (max-width: 767px) {
  .btn-square {
    flex: 1 1 40%; /* Dos botones por fila en dispositivos móviles */
    max-width: 45%;
  }
}

.no-print {
  display: block;
}
</style>



