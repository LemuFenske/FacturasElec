<template>
  <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
    <q-card class="modal-card">
      <q-toolbar class="navbar">
        <q-toolbar-title>Nueva Factura</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
      </q-toolbar>
      <q-card-section class="modal-content">
        <!-- Aquí debería ir el contenido específico del modal -->
        <div>
          <q-list class="full-width">
            <q-list-header>Datos generales</q-list-header>
            <q-item>
              <q-select
                class="full-width"
                v-model="factura.condTipo"
                label="Tipo de Factura"
                :options="opcionesTipo"
              ></q-select>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                @focus="$event.target.select()"
                @change="val => { factura.ptoVenta = ('0000' + val).substr(-4, 4) }"
                :value="factura.ptoVenta"
                type="number"
                label="Punto de venta"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                @focus="$event.target.select()"
                @change="val2 => { factura.numero = ('00000000' + val2).substr(-8, 8) }"
                :value="factura.numero"
                type="number"
                label="Numero de Factura"
              ></q-input>
            </q-item>
            <q-item>
              <q-datetime
                class="full-width"
                v-model="factura.fecha"
                type="date"
                format="YYYY/MM/DD"
                label="Fecha"
              ></q-datetime>
            </q-item>
            <q-item>
              <q-select
                class="full-width"
                v-model="factura.condVenta"
                label="Condición de Venta"
                :options="opcionesCondVenta"
              ></q-select>
            </q-item>
          </q-list>
        </div>
        <div>
          <q-list class="full-width">
            <q-list-header>Datos del cliente</q-list-header>
            <q-item>
              <q-input
                class="full-width"
                v-model="factura.cliente.cuit"
                label="CUIT del Cliente"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="factura.cliente.nombre"
                label="Nombre del Cliente"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="factura.cliente.direccion"
                label="Dirección del Cliente"
              ></q-input>
            </q-item>
            <q-item>
              <q-select
                class="full-width"
                v-model="factura.cliente.condIva"
                label="Condición de IVA del Cliente"
                :options="opcionesIvaCliente"
              ></q-select>
            </q-item>
          </q-list>
        </div>
        <div>
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
                <div class="col-sm-1 q-pa-xs" v-if="index == factura.productosFactura.length - 1">
                  <q-btn icon="add_box" flat round dense color="primary" @click="agregarProducto"></q-btn>
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
export default {
  name: 'NuevaFacturaModal',
  props: {
    value: Boolean,
  },
  data() {
    return {
      isOpen: this.value,
      factura: {
        condTipo: '',
        ptoVenta: '',
        numero: '',
        fecha: new Date().toISOString().split('T')[0], // Fecha actual
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
            cantidad: '',
            precio: '',
            unidad: '',
          },
        ],
      },
      opcionesTipo: ['A', 'B', 'C'], // Opciones de tipo de factura
      opcionesCondVenta: ['Contado', 'Crédito'], // Opciones de condición de venta
      opcionesIvaCliente: ['Responsable Inscripto', 'Monotributista', 'Exento', 'No Responsable', 'Consumidor Final'], // Opciones de IVA del cliente
      opcionesUnidades: ['Unidad', 'Kg', 'Litro'], // Opciones de unidades
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
    guardarFactura() {
      // Lógica para guardar la factura (placeholder)
      console.log('Factura guardada', this.factura);
    },
    agregarProducto() {
      this.factura.productosFactura.push({
        nombre: '',
        cantidad: '',
        precio: '',
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
  line-height: 40px; /* Centra el texto verticalmente */
}

.buttonsave:hover {
  background-color: #1ed87a;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
</style>

  