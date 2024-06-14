<template>
  <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
    <q-card class="modal-card">
      <q-toolbar class="navbar">
        <q-toolbar-title>Nueva Factura</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
      </q-toolbar>
      <q-card-section class="modal-content">
        <div class="form-container">
          <q-list class="full-width">
            <q-list-header>Datos generales</q-list-header>
            <div class="row">
              <q-item class="half-width">
                <q-select
                  v-model="factura.condTipo"
                  label="Tipo de Factura"
                  :options="opcionesTipo"
                  class="full-width"
                ></q-select>
              </q-item>
              <q-item class="half-width">
                <q-input
                  v-model="factura.ptoVenta"
                  @input="formatPtoVenta"
                  type="number"
                  label="Punto de venta"
                  class="full-width"
                ></q-input>
              </q-item>
            </div>
            <div class="row">
              <q-item class="half-width">
                <q-input
                  v-model="factura.numero"
                  @input="formatNumero"
                  type="number"
                  label="Número de Factura"
                  class="full-width"
                ></q-input>
              </q-item>
              <q-item class="half-width">
                <q-select
                  v-model="factura.condVenta"
                  label="Condición de Venta"
                  :options="opcionesCondVenta"
                  class="full-width"
                ></q-select>
              </q-item>
            </div>
          </q-list>
        </div>

        <div class="form-container">
          <q-list class="full-width">
            <q-list-header>Datos del cliente</q-list-header>
            <div class="row">
              <q-item class="half-width">
                <q-input
                  v-model="factura.cliente.cuit"
                  label="CUIT del Cliente"
                  class="full-width"
                ></q-input>
              </q-item>
              <q-item class="half-width">
                <q-input
                  v-model="factura.cliente.nombre"
                  label="Nombre del Cliente"
                  class="full-width"
                ></q-input>
              </q-item>
            </div>
            <div class="row">
              <q-item class="half-width">
                <q-input
                  v-model="factura.cliente.direccion"
                  label="Dirección del Cliente"
                  class="full-width"
                ></q-input>
              </q-item>
              <q-item class="half-width">
                <q-select
                  v-model="factura.cliente.condIva"
                  label="Condición de IVA del Cliente"
                  :options="opcionesIvaCliente"
                  class="full-width"
                ></q-select>
              </q-item>
            </div>
          </q-list>
        </div>

        <div class="form-container">
          <q-list class="full-width">
            <q-list-header>Productos</q-list-header>
            <q-item v-for="(producto, index) in factura.productosFactura" :key="index">
              <div class="row">
                <div class="col-sm-3 q-pa-xs">
                  <q-input v-model="producto.nombre" label="Nombre del Producto"></q-input>
                </div>
                <div class="col-sm-2 q-pa-xs">
                  <q-input v-model="producto.cantidad" type="number" label="Cant."></q-input>
                </div>
                <div class="col-sm-3 q-pa-xs">
                  <q-input v-model="producto.precio" type="number" label="Precio Unitario"></q-input>
                </div>
                <div class="col-sm-3 q-pa-xs">
                  <q-select
                    v-model="producto.unidad"
                    label="Unidad"
                    :options="opcionesUnidades"
                  ></q-select>
                </div>
                <div class="col-sm-1 q-pa-xs" v-if="index === factura.productosFactura.length - 1">
                  <q-btn icon="add_box" flat round dense color="primary" @click="agregarProducto"></q-btn>
                </div>
              </div>
            </q-item>
          </q-list>
        </div>

        <!-- Aquí mostramos el IVA, el subtotal y el total en tiempo real -->
        <div class="form-container">
          <q-list class="full-width">
            <q-list-header>Resumen</q-list-header>
            <q-item>
              <div class="row">
                <div class="col-sm-4 q-pa-xs">
                  <q-input v-model="subtotal" readonly label="Subtotal"></q-input>
                </div>
                <div class="col-sm-4 q-pa-xs">
                  <q-input v-model="iva" readonly label="IVA"></q-input>
                </div>
                <div class="col-sm-4 q-pa-xs">
                  <q-input v-model="total" readonly label="Total"></q-input>
                </div>
              </div>
            </q-item>
          </q-list>
        </div>

        <q-btn label="Guardar" @click="guardarFactura" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
import { computed } from 'vue';

export default {
  name: 'NuevaFacturaModal',
  data() {
    return {
      isOpen: false,
      factura: {
        condTipo: '',
        ptoVenta: '',
        numero: '',
        fecha: new Date().toISOString().split('T')[0],
        condVenta: '',
        cliente: {
          cuit: '',
          nombre: '',
          direccion: '',
          condIva: '',
        },
        productosFactura: [
          {
            nombre: '',
            cantidad: 0,
            precio: 0,
            unidad: '',
          },
        ],
      },
      opcionesTipo: ['A', 'B', 'C'],
      opcionesCondVenta: ['Contado', 'Crédito'],
      opcionesIvaCliente: ['Responsable Inscripto', 'Monotributista', 'Exento', 'No Responsable', 'Consumidor Final'],
      opcionesUnidades: ['Unidad', 'Kg', 'Litro'],
      ivaPorcentaje: 21, // Porcentaje de IVA
    };
  },
  computed: {
    subtotal() {
      return this.factura.productosFactura.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    },
    iva() {
      return this.subtotal * (this.ivaPorcentaje / 100);
    },
    total() {
      return this.subtotal + this.iva;
    },
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
    formatPtoVenta(event) {
      const val = event.target.value;
      this.factura.ptoVenta = ('0000' + val).substr(-4);
    },
    formatNumero(event) {
      const val2 = event.target.value;
      this.factura.numero = ('00000000' + val2).substr(-8);
    },
    guardarFactura() {
      let facturas = JSON.parse(localStorage.getItem('facturas')) || [];
      const nuevaFactura = {
        ...this.factura,
        subtotal: this.subtotal,
        iva: this.iva,
        total: this.total,
        index: facturas.length,
        editable: true,
      };

      facturas.push(nuevaFactura);
      localStorage.setItem('facturas', JSON.stringify(facturas));
      this.$emit('factura-guardada', nuevaFactura);
      this.closeModal();
    },
    agregarProducto() {
      this.factura.productosFactura.push({
        nombre: '',
        cantidad: 0,
        precio: 0,
        unidad: '',
      });
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
  max-width: 800px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.navbar {
  background-color: #24ff95; 
  color: #ffffff; 
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  text-align: center;
}

.modal-content {
  padding: 24px;
  background-color: #ffffff; 
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
  background-color: #24ff95; 
  display: block;
  margin: 10px auto 0 auto; 
  text-align: center;
  width: 100px;
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  height: 40px; 
  line-height: 40px;
}

.buttonsave:hover {
  background-color: #1ed87a;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.form-container {
  margin-bottom: 16px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.half-width {
  flex: 1;
}
</style>
