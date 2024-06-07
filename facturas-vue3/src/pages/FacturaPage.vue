<template>
  <q-page-container>
    <q-page class="page-content">
      

      <q-btn
        label="Factura"
        icon="receipt_long"
        class="btn-square no-print"
        @click="openFacturaModal"
        flat
      ></q-btn>


      <div v-if="facturas.length">
        <q-list bordered class="q-pa-sm">
          <q-item-label header>Lista de Facturas</q-item-label>
          <q-item v-for="(factura, index) in facturas" :key="index">
            <q-item-section>
              <div>
                <div><strong>Número:</strong> {{ factura.numero }}</div>
                <div><strong>Fecha:</strong> {{ factura.fecha }}</div>
                <div><strong>Subtotal:</strong> {{ factura.subtotal }}</div>
                <div><strong>IVA:</strong> {{ factura.iva }}</div>
                <div><strong>Condición de Venta:</strong> {{ factura.condVenta }}</div>
                <div><strong>Cliente:</strong> {{ factura.cliente.nombre }}</div>
                <div><strong>CUIT:</strong> {{ factura.cliente.cuit }}</div>
                <div><strong>Dirección:</strong> {{ factura.cliente.direccion }}</div>
                <div><strong>Condición de IVA:</strong> {{ factura.cliente.condIva }}</div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>


      <NuevaFacturaModal
        ref="facturaModal"
        @factura-guardada="actualizarFacturas"
      />
    </q-page>
  </q-page-container>
</template>

<script>
import NuevaFacturaModal from '../components/NuevaFacturaModal.vue';

export default {
  components: {
    NuevaFacturaModal
  },
  data() {
    return {
      facturas: []
    };
  },
  mounted() {
    const storedFacturas = localStorage.getItem('facturas');
    if (storedFacturas) {
      this.facturas = JSON.parse(storedFacturas);
    }
  },
  methods: {
    openFacturaModal() {
      this.$refs.facturaModal.openModal();
    },
    actualizarFacturas(nuevaFactura) {
      // Actualizar la lista de facturas en la data
      this.facturas.push(nuevaFactura);
    }
  }
};
</script>

