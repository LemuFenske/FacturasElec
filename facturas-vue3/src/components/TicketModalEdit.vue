<template>
    <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
      <q-card class="modal-card">
        <q-toolbar class="navbar">
          <q-toolbar-title>Editar Ticket</q-toolbar-title>
          <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
        </q-toolbar>
        <q-card-section class="modal-content">
          <div>
            <q-list class="full-width">
              <q-item-label header>Datos del Ticket</q-item-label>
              <!-- <q-item>
                <q-input
                  class="full-width"
                  v-model="ticket.numero"
                  type="text"
                  label="Número de Ticket"
                ></q-input>
              </q-item> -->
              <q-item>
                <q-input
                  class="full-width"
                  v-model="ticket.fecha"
                  type="date"
                  label="Fecha"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="ticket.cuit"
                  type="text"
                  label="CUIT"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="ticket.apellidoNombre"
                  type="text"
                  label="Apellido y Nombre"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="ticket.razonSocial"
                  type="text"
                  label="Razón Social"
                ></q-input>
              </q-item>
              <q-item>
                <q-input
                  class="full-width"
                  v-model="ticket.domicilio"
                  type="text"
                  label="Domicilio"
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
          <q-btn label="Guardar" @click="guardarTicket" class="buttonsave"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useModalStore } from '../stores/modalVariables.js';
  import { useQuasar } from 'quasar';
  
  const modalStore = useModalStore();
  const isOpen = computed(() => modalStore.ticketEditIsOpen);
  
  const ticket = ref({
    confirmed: false,
    numero: '',
    fecha: '',
    cuit: '',
    apellidoNombre: '',
    razonSocial: '',
    domicilio: '',
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
  
  // Watcher to calculate subtotal whenever cantidad or precio changes
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
  
  const emit = defineEmits(['ticket-editado']);
  
  const closeModal = () => {
    modalStore.toggleTicketEdit();
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
  
  const guardarTicket = () => {
    let tickets = $q.localStorage.getItem('tickets') || [];
    const indice = tickets.findIndex(nota => nota.numero === ticket.value.numero);
    if (indice !== -1) {
        tickets[indice] = { ...ticket.value };
    } else {
        tickets.push({ ...ticket.value });
    }
    $q.localStorage.set('tickets', tickets);
    emit('tickets-editado', ticket.value);
    closeModal();
  
  };
  watch(isOpen, (val) => {
    if (val && modalStore.ticketToEdit) {
        ticket.value = { ...modalStore.ticketToEdit };
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