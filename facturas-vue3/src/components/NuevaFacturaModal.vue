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
            <q-item-label header>Datos generales</q-item-label>
            <div class="row">
              <q-item class="half-width">
                <q-input
                  v-model="factura.numero"
                  @input="formatNumero"
                  type="number"
                  label="Número de Factura"
                  class="full-width"
                  :error="numeroFacturaRepetido"
                  error-message="El número de Factura ya existe"
                ></q-input>
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
                <q-select
                  v-model="factura.condTipo"
                  label="Tipo de Factura"
                  :options="opcionesTipo"
                  class="full-width"
                ></q-select>
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
            <q-item-label header>Datos del cliente</q-item-label>
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
            <q-item-label header>Productos</q-item-label>
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
                <div class="col-sm-2 q-pa-xs">
                  <q-select
                    v-model="producto.unidad"
                    label="Unidad de Medida"
                    :options="opcionesUnidades"
                  ></q-select>
                </div>
                <div class="col-sm-1 q-pa-xs">
                  <q-btn icon="delete" flat round dense color="negative" @click="eliminarProducto(index)"></q-btn>
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
            <q-item-label header>Resumen</q-item-label>
            <q-item>
              <div class="row">
                <div class="col-sm-4 q-pa-xs">
                  <q-input v-model="subtotal" readonly label="Subtotal"></q-input>
                </div>
                <div class="col-sm-4 q-pa-xs">
                  <q-input v-model="factura.ivaPorcentaje" type="number" label="IVA (%)"></q-input>
                </div>
                <div class="col-sm-4 q-pa-xs">
                  <q-input v-model="total" readonly label="Total"></q-input>
                </div>
              </div>
            </q-item>
          </q-list>
        </div>

        <div v-if="!isFormValid" class="q-mt-md text-negative text-center">Todos los campos deben estar completos para poder guardar el comprobante.</div>
        <q-btn :disable="!isFormValid || numeroFacturaRepetido" label="Guardar" @click="guardarFactura" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>



<script setup>
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useModalStore } from '../stores/modalVariables.js';

const modalStore = useModalStore();

// Computed para controlar el estado del modal
const isOpen = computed(() => modalStore.facturaIsOpen);

// Datos de la factura
const factura = ref({
  confirmed: false,
  condTipo: '',
  ptoVenta: '',
  numero: '',
  fecha: new Date().toISOString().split('T')[0],
  condVenta: '',
  ivaPorcentaje: 0,
  total: 0,
  subtotal: 0,
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
});

const opcionesTipo = ['A', 'B', 'C'];
const opcionesCondVenta = ['Contado', 'Crédito'];
const opcionesIvaCliente = ['Responsable Inscripto', 'Monotributista', 'Exento', 'No Responsable', 'Consumidor Final'];
const opcionesUnidades = ['Unidad', 'Kg', 'Litro'];
const ivaPorcentaje = ref(factura.value.ivaPorcentaje);

watch(() => factura.value.ivaPorcentaje, (newVal) => {
  ivaPorcentaje.value = newVal;
});

const subtotal = computed(() =>
  factura.value.productosFactura.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0)
);
const iva = computed(() => subtotal.value * (ivaPorcentaje.value / 100));
const total = computed(() => subtotal.value + iva.value);

watch(subtotal, (newVal) => {
  factura.value.subtotal = newVal;
});
watch(total, (newVal) => {
  factura.value.total = newVal;
});

const $q = useQuasar();

const emit = defineEmits(['factura-guardada']);

const closeModal = () => {
  modalStore.toggleFactura(); 
};

// Método para formatear la fecha a dd/mm/aaaa
const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Método para formatear punto de venta
const formatPtoVenta = (event) => {
  const val = event.target.value;
  factura.value.ptoVenta = ('0000' + val).substr(-4);
};

// Método para formatear número de factura
const formatNumero = (event) => {
  const val2 = event.target.value;
  factura.value.numero = ('00000000' + val2).substr(-8);
};

// Método para limpiar los inputs
const limpiarInputs = () => {
  factura.value = {
    confirmed: false,
    condTipo: '',
    ptoVenta: '',
    numero: '',
    fecha: new Date().toISOString().split('T')[0],
    condVenta: '',
    ivaPorcentaje: 0,
    total: 0,
    subtotal: 0,
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
  };
};

// Computed para verificar si el formulario es válido
const isFormValid = computed(() => {
  return (
    factura.value.condTipo &&
    factura.value.ptoVenta &&
    factura.value.numero &&
    factura.value.fecha &&
    factura.value.condVenta &&
    factura.value.cliente.cuit &&
    factura.value.cliente.nombre &&
    factura.value.cliente.direccion &&
    factura.value.cliente.condIva &&
    factura.value.productosFactura.every(producto => 
      producto.nombre &&
      producto.cantidad > 0 &&
      producto.precio > 0 &&
      producto.unidad
    )
  );
});

// Computed para verificar si el número de factura está repetido
const numeroFacturaRepetido = computed(() => {
  let facturas = $q.localStorage.getItem('facturas') || [];
  return facturas.some(facturaItem => facturaItem.numero === factura.value.numero );
});

// Método para guardar la factura
const guardarFactura = () => {
  let facturas = $q.localStorage.getItem('facturas') || [];

  if (numeroFacturaRepetido.value) {
    $q.notify({
      type: 'negative',
      message: 'El número de Factura ya existe.',
      timeout: 2000,
    });
    return;
  }

  // Asegurar que el punto de venta tenga 4 dígitos
  factura.value.ptoVenta = ('0000' + factura.value.ptoVenta).substr(-4);

  const nuevaFactura = {
    ...factura.value,
    fecha: formatFecha(factura.value.fecha),
    subtotal: subtotal.value,
    iva: iva.value,
    total: total.value,
    index: facturas.length,
    editable: true,
  };

  facturas.push(nuevaFactura);
  $q.localStorage.set('facturas', facturas);

  // Emitir evento
  emit('factura-guardada', nuevaFactura);

  closeModal();
  limpiarInputs();
};

const agregarProducto = () => {
  factura.value.productosFactura.push({
    nombre: '',
    cantidad: 0,
    precio: 0,
    unidad: '',
  });
};

const eliminarProducto = (index) => {
  if (factura.value.productosFactura.length > 1) {
    factura.value.productosFactura.splice(index, 1);
  }
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
