<template>
    <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
      <q-card class="modal-card">
        <q-toolbar class="navbar">
          <q-toolbar-title>Editar Nota de Débito</q-toolbar-title>
          <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
        </q-toolbar>
        <q-card-section class="modal-content">
          <div>
            <q-list class="full-width">
              <q-item-label header>Datos de la Nota de Débito</q-item-label>
              <q-item>
                <q-select
                  class="full-width"
                  v-model="notaDebito.condTipo"
                  label="Tipo"
                  :options="opcionesTipo"
                ></q-select>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.fechaEmision"
                  type="date"
                  label="Fecha de Emisión"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.ptoVenta"
                  label="Punto de Venta"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.vencimientoPago"
                  type="date"
                  label="Vencimiento del Pago"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.periodo.desde"
                  type="date"
                  label="Periodo Desde"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.periodo.hasta"
                  type="date"
                  label="Periodo Hasta"
                ></q-input>
              </q-item>
              <q-item-label header>Datos del Cliente</q-item-label>
              <q-item>
                <q-select
                  class="full-width"
                  v-model="notaDebito.cliente.condIva"
                  label="Condición de IVA"
                  :options="opcionesIva"
                ></q-select>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.cliente.apellidoNombre"
                  label="Apellido y Nombre"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.cliente.cuit"
                  label="CUIT"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.cliente.domicilio"
                  label="Domicilio"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.cliente.razonSocial"
                  label="Razón Social"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="notaDebito.cliente.condVenta"
                  label="Condición de Venta"
                ></q-input>
              </q-item>
              <q-item-label header>Datos del Producto/Servicio</q-item-label>
              <div v-for="(producto, index) in notaDebito.productosServicios" :key="index">
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
                    label="IVA"
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
          <q-btn label="Guardar" @click="guardarNotaDebito" class="buttonsave"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
 <script setup>
import { ref, computed, watch } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';

const modalStore = useModalStore();
const isOpen = computed(() => modalStore.debitoIsOpen);

const notaDebito = ref({
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
  ],
  total: 0
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
const emit = defineEmits(['debito-guardado']);

const closeModal = () => {
  modalStore.toggleDebito();
};

const agregarProducto = () => {
  notaDebito.value.productosServicios.push({
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
  notaDebito.value.productosServicios.splice(index, 1);
};

const calcularSubtotal = (producto) => {
  producto.subtotal = producto.cantidad * producto.precioUnitario;
  calcularSubtotalConIva(producto);
};

const calcularSubtotalConIva = (producto) => {
  producto.subtotalConIva = producto.subtotal + (producto.subtotal * (producto.iva / 100));
  calcularTotal();
};

const calcularTotal = () => {
  notaDebito.value.total = notaDebito.value.productosServicios.reduce((sum, producto) => sum + producto.subtotalConIva, 0);
};

watch(notaDebito.value.productosServicios, (newVal) => {
  newVal.forEach(producto => {
    calcularSubtotal(producto);
  });
}, { deep: true });

// Método para formatear la fecha a dd/mm/aaaa
const formatFecha = (fecha) => {
  const date = new Date(fecha);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Método para formatear punto de venta
const formatPtoVenta = () => {
  notaDebito.value.ptoVenta = ('0000' + notaDebito.value.ptoVenta).substr(-4);
};

const limpiarInputs = () => {
  notaDebito.value = {
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
    ],
    total: 0
  };
};

const isFormValid = computed(() => {
  return (
    notaDebito.value.numero &&
    notaDebito.value.condTipo &&
    notaDebito.value.fechaEmision &&
    notaDebito.value.ptoVenta &&
    notaDebito.value.vencimientoPago &&
    notaDebito.value.periodo.desde &&
    notaDebito.value.periodo.hasta &&
    notaDebito.value.cliente.condIva &&
    notaDebito.value.cliente.apellidoNombre &&
    notaDebito.value.cliente.cuit &&
    notaDebito.value.cliente.domicilio &&
    notaDebito.value.cliente.razonSocial &&
    notaDebito.value.cliente.condVenta &&
    notaDebito.value.productosServicios.every(producto => 
      producto.nombre &&
      producto.cantidad > 0 &&
      producto.unidadMedida &&
      producto.precioUnitario > 0
    )
  );
});

const numeroNotaDebitoRepetido = computed(() => {
  let notasDebito = $q.localStorage.getItem('notasDebito') || [];
  return notasDebito.some(nota => nota.numero === notaDebito.value.numero);
});

const guardarNotaDebito = () => {
  let notasDebito = $q.localStorage.getItem('notasDebito') || [];

  if (numeroNotaDebitoRepetido.value) {
    $q.notify({
      type: 'negative',
      message: 'El número de Nota de Crédito ya existe.',
      timeout: 2000,
    });
    return;
  }

  // Asegurar que el punto de venta tenga 4 dígitos
  formatPtoVenta();

  const nuevaNotaDebito = {
    ...notaDebito.value,
    fecha: formatFecha(notaDebito.value.fecha),
    periodo: {
      desde: formatFecha(notaDebito.value.periodo.desde),
      hasta: formatFecha(notaDebito.value.periodo.hasta),
    },
    fechaEmision: formatFecha(notaDebito.value.fechaEmision),
    vencimientoPago: formatFecha(notaDebito.value.vencimientoPago),
    index: notasDebito.length,
  };

  notasDebito.push(nuevaNotaDebito);
  $q.localStorage.set('notasDebito', notasDebito);
  emit('debito-guardado', nuevaNotaDebito);
  closeModal();
  limpiarInputs();
};

const actualizarNotaDebito = () => {
  let notasDebito = $q.localStorage.getItem('notasDebito') || [];

  // Asegurar que el punto de venta tenga 4 dígitos
  formatPtoVenta();

  const notaOriginal = modalStore.debitoToEdit;
  
  const notaActualizada = {
    ...notaDebito.value,
    fecha: notaDebito.value.fecha !== notaOriginal.fecha ? formatFecha(notaDebito.value.fecha) : notaDebito.value.fecha,
    periodo: {
      desde: notaDebito.value.periodo.desde !== notaOriginal.periodo.desde ? formatFecha(notaDebito.value.periodo.desde) : notaDebito.value.periodo.desde,
      hasta: notaDebito.value.periodo.hasta !== notaOriginal.periodo.hasta ? formatFecha(notaDebito.value.periodo.hasta) : notaDebito.value.periodo.hasta,
    },
    fechaEmision: notaDebito.value.fechaEmision !== notaOriginal.fechaEmision ? formatFecha(notaDebito.value.fechaEmision) : notaDebito.value.fechaEmision,
    vencimientoPago: notaDebito.value.vencimientoPago !== notaOriginal.vencimientoPago ? formatFecha(notaDebito.value.vencimientoPago) : notaDebito.value.vencimientoPago,
    index: modalStore.debitoIndex,
  };

  notasDebito.splice(modalStore.debitoIndex, 1, notaActualizada);
  $q.localStorage.set('notasDebito', notasDebito);
  emit('debito-guardado', notaActualizada);
  closeModal();
  limpiarInputs();
};

watch(isOpen, (val) => {
  if (val && modalStore.debitoToEdit) {
    notaDebito.value = { ...modalStore.debitoToEdit };
  }
});
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

.buttonsave {
  background-color: #24ff95; /* Color verde */
  display: block;
  margin: 10px auto 0 auto; /* Reducido el margen inferior */
  text-align: center;
  width: 100px;
  color: rgb(0, 0, 0);
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