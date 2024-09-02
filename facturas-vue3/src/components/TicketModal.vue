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
            <q-item-label header>Datos del Ticket</q-item-label>
            <q-item>
              <q-input
                class="full-width"
                v-model="ticket.numero"
                type="text"
                label="Número de Ticket"
                :error="numeroTicketRepetido"
                error-message="El número de ticket ya existe"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="ticket.ptoVenta"
                type="text"
                label="Punto de Venta"
                @blur="formatPtoVenta"
              ></q-input>
            </q-item>
            <q-item>
              <q-input
                class="full-width"
                v-model="ticket.fechaEmision"
                type="date"
                label="Fecha de Emisión"
              ></q-input>
            </q-item>
            <q-item>
              <q-select
                class="full-width"
                v-model="ticket.condIva"
                label="Condición de IVA"
                :options="opcionesIva"
              ></q-select>
            </q-item>
            <q-item-label header>Datos del Producto/Servicio</q-item-label>
            <div v-for="(producto, index) in ticket.productosFactura" :key="index">
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
                  v-model="producto.unidad"
                  label="Unidad de medida"
                  :options="opcionesUnidades"
                ></q-select>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model.number="producto.precio"
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
              <q-btn flat round dense icon="delete" @click="eliminarProducto(index)" class="q-ml-sm"></q-btn>
            </div>
            <q-btn flat round dense icon="add" @click="agregarProducto" class="q-mt-md"></q-btn>
          </q-list>
        </div>
        <div v-if="!isFormValid" class="q-mt-md text-negative text-center">Todos los campos deben estar completos para poder guardar el ticket.</div>
        <q-btn :disable="!isFormValid || numeroTicketRepetido" label="Guardar" @click="guardarTicket" class="buttonsave"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useModalStore } from '../stores/modalVariables.js';
import { useQuasar } from 'quasar';

const modalStore = useModalStore();

const isOpen = computed(() => modalStore.ticketIsOpen);

const ticket = ref({
  confirmed: false,
  numero: '',
  ptoVenta: '',
  fechaEmision: '',
  fechaCobro: '',
  condIva: '',
  productosFactura: [
    {
      nombre: '',
      cantidad: 0,
      precio: 0,
      unidad: '',
      subtotal: 0
    }
  ]
});

watch(ticket.value.productosFactura, (newVal) => {
  newVal.forEach(producto => {
    producto.subtotal = producto.cantidad * producto.precio;
  });
}, { deep: true });

const opcionesIva = ref([
  'Responsable Inscripto',
  'Monotributista',
  'Exento',
  'No Responsable',
  'Consumidor Final'
]);
const opcionesUnidades = ['Unidad', 'Kg', 'Litro'];

const $q = useQuasar();

const emit = defineEmits(['ticket-guardado']);

const closeModal = () => {
  modalStore.toggleTicket();
};

const agregarProducto = () => {
  ticket.value.productosFactura.push({
    nombre: '',
    cantidad: 0,
    precio: 0,
    unidad: '',
    subtotal: 0
  });
};

const eliminarProducto = (index) => {
  ticket.value.productosFactura.splice(index, 1);
};

const calcularSubtotal = (producto) => {
  producto.subtotal = producto.cantidad * producto.precio;
};

// Método para formatear la fecha a dd/mm/aaaa
const formatFecha = (fecha) => {
  const [year, month, day] = fecha.split('-');
  return `${day}/${month}/${year}`;
};

// Método para formatear punto de venta
const formatPtoVenta = () => {
  ticket.value.ptoVenta = ('0000' + ticket.value.ptoVenta).substr(-4);
};

const limpiarInputs = () => {
  ticket.value = {
    confirmed: false,
    numero: '',
    ptoVenta: '',
    fechaEmision: '',
    condIva: '',
    productosFactura: [
      {
        nombre: '',
        cantidad: 0,
        precio: 0,
        unidad: '',
        subtotal: 0
      }
    ]
  };
  // Establecer la fecha inicial en el formato correcto
  ticket.value.fechaEmision = formatFecha(new Date().toISOString().split('T')[0]);
};

const isFormValid = computed(() => {
  return (
    ticket.value.numero &&
    ticket.value.ptoVenta &&
    ticket.value.fechaEmision &&
    ticket.value.condIva &&
    ticket.value.productosFactura.every(producto =>
      producto.nombre && producto.cantidad > 0 && producto.precio > 0 && producto.unidad
    )
  );
});

const numeroTicketRepetido = computed(() => {
  let tickets = $q.localStorage.getItem('tickets') || [];
  return tickets.some(t => t.numero === ticket.value.numero);
});

const guardarTicket = () => {
  if (!isFormValid.value || numeroTicketRepetido.value) {
    $q.notify({
      type: 'negative',
      message: 'Hay errores en el formulario o el número de ticket ya existe.',
    });
    return;
  }

  let tickets = $q.localStorage.getItem('tickets') || [];

  // Asegurar que el punto de venta tenga 4 dígitos
  formatPtoVenta();

  const nuevoTicket = {
    ...ticket.value,
    fechaEmision: formatFecha(ticket.value.fechaEmision),
    fechaCobro: formatFecha(ticket.value.fechaCobro),
    index: tickets.length,
  };

  tickets.push(nuevoTicket);

  $q.localStorage.set('tickets', tickets);

  emit('ticket-guardado', nuevoTicket);

  closeModal();
  limpiarInputs();
};

// Establecer la fecha inicial en el formato correcto
ticket.value.fechaEmision = formatFecha(new Date().toISOString().split('T')[0]);

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
