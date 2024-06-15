<template>
  <q-page-container>
    <q-page class="pagecontainer">
       
      <div class="buttonmodal">
        <q-btn
          label="Crear/Editar Empresa"
          icon="apartment"
          class="btn-square no-print"
          @click="openEmpresaModal"
          flat
          style="width: 100%;"
        ></q-btn>
      </div>

      <!-- Sección de datos de la empresa -->
      <div v-if="empresa && Object.keys(empresa).length" class="datos">
  <q-list bordered class="q-pa-sm mb-6">
    <q-item-label header>Datos de la Empresa</q-item-label>
    <q-item>
      <div class="row">
        <div v-for="(value, key) in empresa" :key="key" class="col q-pa-sm">
          <q-item-section>{{ key }}</q-item-section>
          <q-item-section>{{ value }}</q-item-section>
        </div>
      </div>
    </q-item>
  </q-list>
</div>

      <!-- Sección de facturas -->
      <div v-if="facturas.length" class="datos">
  <q-list bordered class="q-pa-sm mb-6">
    <q-item-label header>Facturas de la Empresa {{ empresa.nombre }}</q-item-label>
    <q-item>
      <div class="row">
        <div v-for="factura in facturas" :key="factura.numero" class="col q-pa-sm">
          <q-item-section>Factura N°: {{ factura.numero }}</q-item-section>
          <q-item-section>Fecha: {{ factura.fecha }}</q-item-section>
          <q-item-section>Total: {{ factura.monto }}</q-item-section>
        </div>
      </div>
    </q-item>
  </q-list>
</div>

<div v-if="notasCredito.length" class="datos">
  <q-list bordered class="q-pa-sm mb-6">
    <q-item-label header>Notas de Crédito de la Empresa {{ empresa.nombre }}</q-item-label>
    <q-item>
      <div class="row">
        <div v-for="nota in notasCredito" :key="nota.numero" class="col q-pa-sm">
          <q-item-section>Nota N°: {{ nota.numero }}</q-item-section>
          <q-item-section>Fecha: {{ nota.fecha }}</q-item-section>
          <q-item-section>Monto: {{ nota.monto }}</q-item-section>
          <q-item-section>Concepto: {{ nota.concepto }}</q-item-section>
        </div>
      </div>
    </q-item>
  </q-list>
</div>

<div v-if="notasDebito.length" class="datos">
  <q-list bordered class="q-pa-sm mb-6">
    <q-item-label header>Notas de Débito de la Empresa {{ empresa.nombre }}</q-item-label>
    <q-item>
      <div class="row">
        <div v-for="nota in notasDebito" :key="nota.numero" class="col q-pa-sm">
          <q-item-section>Nota N°: {{ nota.numero }}</q-item-section>
          <q-item-section>Fecha: {{ nota.fecha }}</q-item-section>
          <q-item-section>Monto: {{ nota.monto }}</q-item-section>
          <q-item-section>Concepto: {{ nota.concepto }}</q-item-section>
        </div>
      </div>
    </q-item>
  </q-list>
</div>

<div v-if="tickets.length" class="datos">
  <q-list bordered class="q-pa-sm mb-6">
    <q-item-label header>Tickets de la Empresa {{ empresa.nombre }}</q-item-label>
    <q-item>
      <div class="row">
        <div v-for="ticket in tickets" :key="ticket.numero" class="col q-pa-sm">
          <q-item-section>Ticket N°: {{ ticket.numero }}</q-item-section>
          <q-item-section>Fecha: {{ ticket.fecha }}</q-item-section>
          <q-item-section>Monto: {{ ticket.monto }}</q-item-section>
        </div>
      </div>
    </q-item>
  </q-list>
</div>

<div v-if="cheques.length" class="datos">
  <q-list bordered class="q-pa-sm mb-6">
    <q-item-label header>Cheques de la Empresa {{ empresa.nombre }}</q-item-label>
    <q-item>
      <div class="row">
        <div v-for="cheque in cheques" :key="cheque.numero" class="col q-pa-sm">
          <q-item-section>Banco: {{ cheque.banco }}</q-item-section>
          <q-item-section>Número: {{ cheque.numero }}</q-item-section>
          <q-item-section>Fecha: {{ cheque.fecha }}</q-item-section>
          <q-item-section>Monto: {{ cheque.monto }}</q-item-section>
        </div>
      </div>
    </q-item>
  </q-list>
</div>


      
      <EmpresaModal
        ref="empresaModal"
        :empresa="empresa"
        @empresa-guardada="mostrarEmpresa"
      />
    </q-page>
  </q-page-container>
</template>

<script>
import EmpresaModal from '../components/EmpresaModal.vue';

export default {
  components: {
    EmpresaModal
  },
  data() {
    return {
      empresa: {},
      facturas: [],
      notasCredito: [],
      notasDebito: [],
      tickets: [],
      cheques: []
    };
  },
  mounted() {
  // Cargar los datos desde el localStorage al iniciar la página
  const storedEmpresa = this.$q.localStorage.getItem('empresa');
  if (storedEmpresa) {
    this.empresa = storedEmpresa;
  }

  const storedFacturas = this.$q.localStorage.getItem('facturas');
  if (storedFacturas) {
    this.facturas = storedFacturas;
  }

  const storedNotasCredito = this.$q.localStorage.getItem('notasCredito');
  if (storedNotasCredito) {
    this.notasCredito = storedNotasCredito;
  }

  const storedNotasDebito = this.$q.localStorage.getItem('notasDebito');
  if (storedNotasDebito) {
    this.notasDebito = storedNotasDebito;
  }

  const storedTickets = this.$q.localStorage.getItem('tickets');
  if (storedTickets) {
    this.tickets = storedTickets;
  }

  const storedCheques = this.$q.localStorage.getItem('cheques');
  if (storedCheques) {
    this.cheques = storedCheques;
  }
},


  methods: {
    openEmpresaModal() {
      this.$refs.empresaModal.openModal();
    },
    mostrarEmpresa(empresaData) {
    this.empresa = empresaData;
    this.$q.localStorage.set('empresa', empresaData);
}
  }
};
</script>

<style scoped>
.pagecontainer {
  overflow: auto;
}
.buttonmodal{
  width: 100%;
  align-items: center;
  background-color: rgba(0, 0, 255, 0);
}
.btn-square {
  margin-inline: auto;
}

.datos {
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.datos .row {
  display: flex;
  flex-wrap: wrap;
}

.datos .col {
  flex: 1;
  min-width: 100px; 
}
</style>
