<template>
  <q-page-container>
    <q-page class="page-content">
      <!-- Botón para abrir el modal de empresa -->
      <q-btn
        label="Empresa"
        icon="apartment"
        class="btn-square no-print"
        @click="showEmpresa = true"
        flat
      ></q-btn>
      
      <!-- Modal de Empresa -->
      <EmpresaModal
        v-if="showEmpresa"
        :value="showEmpresa"
        @input="showEmpresa = $event"
      />

      <!-- Botón para abrir el modal de nueva factura -->
      <q-btn
        label="Factura"
        icon="receipt_long"
        class="btn-square no-print"
        @click="showFactura = true"
        flat
      ></q-btn>
      
      <!-- Modal de Nueva Factura -->
      <NuevaFacturaModal
        v-if="showFactura"
        :value="showFactura"
        @input="showFactura = $event"
      />

      <!-- Botón para ticket -->
      <q-btn
        label="Ticket"
        icon="receipt"
        class="btn-square no-print"
        flat
      ></q-btn>

      <!-- Botón para nota de crédito -->
     
      <q-btn
        label="Nota de Crédito"
        icon="credit_card"
        class="btn-square no-print"
        flat
      ></q-btn>
    
      <!-- Botón para nota de débito -->
      <q-btn
        label="Nota de Débito"
        icon="payment"
        class="btn-square no-print"
        flat
      ></q-btn>

      <!-- Botón para cheque -->
      <q-btn
        label="Cheque"
        icon="account_balance"
        class="btn-square no-print"
        flat
      ></q-btn>
      
    </q-page>
  </q-page-container>
</template>

<script>
import EmpresaModal from '../components/EmpresaModal.vue'; 
import NuevaFacturaModal from '../components/NuevaFacturaModal.vue';

export default {
  components: {
    EmpresaModal,
    NuevaFacturaModal,
  },
  data() {
    return {
      showEmpresa: false,
      showFactura: false,
    };
  },
};
</script>

<style>
.btn-square {
  width: 200px; /* Ajusta el ancho del botón */
  height: 200px; /* Ajusta la altura del botón */
  font-size: 18px; /* Tamaño de la fuente */
  background-color: #ffffff; /* Fondo blanco */
  color: rgb(0, 0, 0);
  border: none; /* Sin borde */
  box-shadow: none; /* Sin sombra */
  border-radius: 8px;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centro vertical */
  padding: 20px; /* Espacio interno */
  margin: 10px; /* Margen alrededor de cada botón */
}

.btn-square .q-icon {
  font-size: 100px; /* Tamaño del icono */
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 20px;
}

.btn-square:hover {
  background-color: #bdbdbd; /* Mantiene el fondo blanco al pasar el mouse */
  color: rgb(9, 0, 90);
}

.page-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centrar los botones horizontalmente */
  align-items: center;
  height: calc(100vh - 56px); /* Altura total menos la altura de la cabecera */
  overflow: auto; /* Permite el desplazamiento si es necesario */
}

@media (min-width: 768px) {
  .page-content {
    justify-content: space-around;
  }
  
  .btn-square {
    flex: 1 1 30%; /* Tres botones por fila en escritorio */
    max-width: 30%;
  }
}

@media (max-width: 767px) {
  .btn-square {
    flex: 1 1 40%; /* Dos botones por fila en dispositivos móviles */
    max-width: 45%;
  }
}

.no-print {
  display: block;
}
</style>

