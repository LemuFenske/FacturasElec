<template>
  <q-page-container>
    <q-page class="page-content">
      <h1>Página de Inicio</h1>
      <!-- <q-btn
        label="Empresa"
        icon="apartment"
        class="btn-square no-print"
        @click="openEmpresaModal"
        flat
      ></q-btn>

      <EmpresaModal
        ref="empresaModal"
      />

      <q-btn
        label="Factura"
        icon="receipt_long"
        class="btn-square no-print"
        @click="openFacturaModal"
        flat
      ></q-btn>
      
      <NuevaFacturaModal
        ref="facturaModal"
      />

      <q-btn
        label="Ticket"
        icon="receipt"
        class="btn-square no-print"
        @click="openTicketModal"
        flat
      ></q-btn>
      
      <NuevoTicketModal
        ref="ticketModal"
      />

      <q-btn
        label="Nota de Crédito"
        icon="credit_card"
        class="btn-square no-print"
        @click="openCreditoModal"
        flat
      ></q-btn>
      
      <NuevaNotaCreditoModal
        ref="creditoModal"
      />
    
      <q-btn
        label="Nota de Débito"
        icon="payment"
        class="btn-square no-print"
        @click="openDebitoModal"
        flat
      ></q-btn>
      
      <NuevaNotaDebitoModal
        ref="debitoModal"
      />

      <q-btn
        label="Cheque"
        icon="account_balance"
        class="btn-square no-print"
        @click="openChequeModal"
        flat
      ></q-btn>
      
      <NuevoChequeModal
        ref="chequeModal"
      /> -->
    </q-page>
  </q-page-container>
</template>

<script>
// import EmpresaModal from '../components/EmpresaModal.vue'; 
// import NuevaFacturaModal from '../components/NuevaFacturaModal.vue';
// import NuevoTicketModal from '../components/TicketModal.vue';
// import NuevaNotaCreditoModal from '../components/CreditoModal.vue';
// import NuevaNotaDebitoModal from '../components/DebitoModal.vue';
// import NuevoChequeModal from '../components/ChequeModal.vue';

// export default {
//   components: {
//     EmpresaModal,
//     NuevaFacturaModal,
//     NuevoTicketModal,
//     NuevaNotaCreditoModal,
//     NuevaNotaDebitoModal,
//     NuevoChequeModal,
//   },
  
//   data() {
//     return {
//       showTicket: false,
//       showNotaCredito: false,
//       showNotaDebito: false,
//       showCheque: false,
//     };
//   },
//   methods: {
//     openEmpresaModal() {
//       this.$refs.empresaModal.openModal();
//     },
//     openFacturaModal() {
//       this.$refs.facturaModal.openModal();
//     },
//     openTicketModal() {
//       this.$refs.ticketModal.openModal();
//     },
//     openCreditoModal() {
//       this.$refs.creditoModal.openModal();
//     },
//     openDebitoModal() {
//       this.$refs.debitoModal.openModal();
//     },
//     openChequeModal() {
//       this.$refs.chequeModal.openModal();
//     },
//   },
// };
</script>

<style>
.btn-square {
  width: 200px; 
  height: 200px; 
  font-size: 18px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: none; 
  box-shadow: none; 
  border-radius: 8px;
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px; 
  margin: 10px;
}

.btn-square .q-icon {
  font-size: 100px; 
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 20px;
}

.btn-square:hover,
.btn-square:focus,
.btn-square:active {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  color: rgb(0, 0, 63);
}

.page-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  align-items: center;
  height: calc(100vh - 56px); 
  overflow: auto; 
}

@media (min-width: 768px) {
  .page-content {
    justify-content: space-around;
  }
  
  .btn-square {
    flex: 1 1 30%; 
    max-width: 30%;
  }
}

@media (max-width: 767px) {
  .btn-square {
    flex: 1 1 40%;
    max-width: 45%;
  }
}

.no-print {
  display: block;
}
</style>



