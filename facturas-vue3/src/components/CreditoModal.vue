<template>
  <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
    <q-card class="modal-card">
      <q-toolbar class="navbar">
        <q-toolbar-title>Nueva Nota de Crédito</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
      </q-toolbar>
      <q-card-section class="modal-content">
        <div>
          <q-list class="full-width">
            <q-item-label header>Datos de la Nota de Crédito</q-item-label>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.numero"
                type="number"
                label="Número de Nota de Crédito"
                :error="numeroNotaCreditoRepetido"
                error-message="El número de Nota de Crédito ya existe"
              ></q-input>
            </q-item>
            <q-item>
              <q-select
                class="full-width"
                v-model="notaCredito.condTipo"
                label="Tipo"
                :options="opcionesTipo"
              ></q-select>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.fechaEmision"
                type="date"
                label="Fecha de Emisión"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.ptoVenta"
                label="Punto de Venta"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.vencimientoPago"
                type="date"
                label="Vencimiento del Pago"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.periodo.desde"
                type="date"
                label="Periodo Desde"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.periodo.hasta"
                type="date"
                label="Periodo Hasta"
              ></q-input>
            </q-item>
            <q-item-label header>Datos del Cliente</q-item-label>
            <q-item>
              <q-select
                class="full-width"
                v-model="notaCredito.cliente.condIva"
                label="Condición de IVA"
                :options="opcionesIva"
              ></q-select>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.cliente.apellidoNombre"
                label="Apellido y Nombre"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.cliente.cuit"
                label="CUIT"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.cliente.domicilio"
                label="Domicilio"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.cliente.razonSocial"
                label="Razón Social"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="notaCredito.cliente.condVenta"
                label="Condición de Venta"
              ></q-input>
            </q-item>
            <q-item-label header>Datos del Producto/Servicio</q-item-label>
            <div v-for="(producto, index) in notaCredito.productosServicios" :key="index">
              <q-item>
                <q-input
                  class="full-width"
                  v-model="producto.nombre"
                  label="Nombre del Producto/Servicio"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model.number="producto.cantidad"
                  type="number"
                  label="Cantidad"
                  @input="calcularSubtotal(producto)"
                ></q-input>
              </q-item>
              <q-item>
              <q-select
                class="full-width"
                v-model="producto.unidadMedida"
                label="Unidad de Medida"
                :options="opcionesUnidades"
              ></q-select>
            </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model.number="producto.precioUnitario"
                  type="number"
                  label="Precio Unitario"
                  @input="calcularSubtotal(producto)"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model.number="producto.subtotal"
                  type="number"
                  label="Subtotal"
                  readonly
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model.number="producto.iva"
                  type="number"
                  label="IVA (%)"
                  @input="calcularSubtotalConIva(producto)"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model.number="producto.subtotalConIva"
                  type="number"
                  label="Subtotal con IVA"
                  readonly
                ></q-input>
              </q-item>
              <q-btn flat round dense icon="delete" @click="eliminarProducto(index)" class="q-ml-sm"></q-btn>
            </div>
            <q-btn flat round dense icon="add" @click="agregarProducto" class="q-mt-md"></q-btn>
          </q-list>
        </div>
        <div v-if="!isFormValid" class="q-mt-md text-negative text-center">Todos los campos deben estar completos para poder guardar el comprobante.</div>
        <q-btn :disable="!isFormValid || numeroNotaCreditoRepetido" label="Guardar" @click="guardarNotaCredito" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';

const modalStore = useModalStore();
const isOpen = computed(() => modalStore.creditoIsOpen);

const notaCredito = ref({
  numero: '',
  confirmed: false,
  fecha: new Date().toISOString().split('T')[0],
  periodo: {
    desde: '',
    hasta: ''
  },
  condTipo: '',
  fechaEmision: '',
  ptoVenta: '',
  vencimientoPago: '',
  cliente: {
    condIva: '',
    apellidoNombre: '',
    cuit: '',
    domicilio: '',
    razonSocial: '',
    condVenta: '',
  },
  productosServicios: [
    {
      nombre: '',
      cantidad: 0,
      unidadMedida: '',
      precioUnitario: 0,
      subtotal: 0,
      iva: 0,
      subtotalConIva: 0
    }
  ]
});

const opcionesTipo = ref([
  'A',
  'B',
  'C',
]);

const opcionesIva = ref([
  'Responsable Inscripto',
  'Monotributista',
  'Exento',
  'No Responsable',
  'Consumidor Final'
]);

const opcionesUnidades = ['Unidad', 'Kg', 'Litro', 'Horas'];

const $q = useQuasar();
const emit = defineEmits(['credito-guardado']);

const closeModal = () => {
  modalStore.toggleCredito();
};

const agregarProducto = () => {
  notaCredito.value.productosServicios.push({
    nombre: '',
    cantidad: 0,
    unidadMedida: '',
    precioUnitario: 0,
    subtotal: 0,
    iva: 0,
    subtotalConIva: 0
  });
};

const eliminarProducto = (index) => {
  notaCredito.value.productosServicios.splice(index, 1);
};

const calcularSubtotal = (producto) => {
  producto.subtotal = producto.cantidad * producto.precioUnitario;
  calcularSubtotalConIva(producto);
};

const calcularSubtotalConIva = (producto) => {
  producto.subtotalConIva = producto.subtotal + (producto.subtotal * (producto.iva / 100));
};

watch(notaCredito.value.productosServicios, (newVal) => {
  newVal.forEach(producto => {
    calcularSubtotal(producto);
  });
}, { deep: true });

const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatPtoVenta = () => {
  notaCredito.value.ptoVenta = ('0000' + notaCredito.value.ptoVenta).substr(-4);
};

const limpiarInputs = () => {
  notaCredito.value = {
    numero: '',
    confirmed: false,
    fecha: new Date().toISOString().split('T')[0],
    periodo: {
      desde: '',
      hasta: ''
    },
    condTipo: '',
    fechaEmision: '',
    ptoVenta: '',
    vencimientoPago: '',
    cliente: {
      condIva: '',
      apellidoNombre: '',
      cuit: '',
      domicilio: '',
      razonSocial: '',
      condVenta: '',
    },
    productosServicios: [
      {
        nombre: '',
        cantidad: 0,
        unidadMedida: '',
        precioUnitario: 0,
        subtotal: 0,
        iva: 0,
        subtotalConIva: 0
      }
    ]
  };
};

const isFormValid = computed(() => {
  return (
    notaCredito.value.numero &&
    notaCredito.value.condTipo &&
    notaCredito.value.fechaEmision &&
    notaCredito.value.ptoVenta &&
    notaCredito.value.vencimientoPago &&
    notaCredito.value.periodo.desde &&
    notaCredito.value.periodo.hasta &&
    notaCredito.value.cliente.condIva &&
    notaCredito.value.cliente.apellidoNombre &&
    notaCredito.value.cliente.cuit &&
    notaCredito.value.cliente.domicilio &&
    notaCredito.value.cliente.razonSocial &&
    notaCredito.value.cliente.condVenta &&
    notaCredito.value.productosServicios.every(producto => 
      producto.nombre &&
      producto.cantidad > 0 &&
      producto.unidadMedida &&
      producto.precioUnitario > 0
    )
  );
});

const numeroNotaCreditoRepetido = computed(() => {
  let notasCredito = $q.localStorage.getItem('notasCredito') || [];
  return notasCredito.some(nota => nota.numero === notaCredito.value.numero);
});

const guardarNotaCredito = () => {
  let notasCredito = $q.localStorage.getItem('notasCredito') || [];

  if (numeroNotaCreditoRepetido.value) {
    $q.notify({
      type: 'negative',
      message: 'El número de Nota de Crédito ya existe.',
      timeout: 2000,
    });
    return;
  }

  formatPtoVenta();

  const nuevaNotaCredito = {
    ...notaCredito.value,
    fecha: formatFecha(notaCredito.value.fecha),
    periodo: {
      desde: formatFecha(notaCredito.value.periodo.desde),
      hasta: formatFecha(notaCredito.value.periodo.hasta),
    },
    fechaEmision: formatFecha(notaCredito.value.fechaEmision),
    vencimientoPago: formatFecha(notaCredito.value.vencimientoPago),
    index: notasCredito.length,
  };

  notasCredito.push(nuevaNotaCredito);
  $q.localStorage.set('notasCredito', notasCredito);

  emit('credito-guardado', nuevaNotaCredito);

  closeModal();
  limpiarInputs();
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

.buttonsave {
  background-color: #24ff95; 
  display: block;
  margin: 10px auto 0 auto;
  text-align: center;
  width: 100px;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  height: 40px;
  line-height: 35px; 
}

.buttonsave:hover {
  background-color: #1ed87a;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
  </style>
  