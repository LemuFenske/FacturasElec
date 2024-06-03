<template>
  <q-dialog v-model="isOpen" persistent class="q-pa-md centered-modal">
    <q-card class="modal-card">
      <q-toolbar class="navbar">
        <q-toolbar-title>Configuración de la Empresa</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" class="text-white"></q-btn>
      </q-toolbar>
      <q-card-section class="modal-content">
        <!-- Aquí debería ir el contenido específico del modal -->
        <div class="full-width">
          <q-list class="full-width">
            <q-item>
              <q-input v-model="empresa.nombreFantasia" label="Nombre de Fantasía" class="full-width"></q-input>
            </q-item>
            <q-item>
              <q-input v-model="empresa.nombre" label="Razón Social de la Empresa" class="full-width"></q-input>
            </q-item>
            <q-item>
              <q-input v-model="empresa.cuit" label="CUIT" class="full-width"></q-input>
            </q-item>
            <q-item>
              <q-input v-model="empresa.direccion" label="Dirección" class="full-width"></q-input>
            </q-item>
            <q-item>
              <q-select
                v-model="empresa.condIva"
                label="Condición de IVA"
                :options="opcionesIva"
                class="full-width"
              ></q-select>
            </q-item>
            <q-item>
              <q-input v-model="empresa.ingBrutos" label="Ingresos Brutos" class="full-width"></q-input>
            </q-item>
            <q-item>
              <q-datetime
                v-model="empresa.fechaInicio"
                float-label="Fecha de Inicio de Actividades"
                type="date"
                format="YYYY/MM/DD"
                class="full-width"
              ></q-datetime>
            </q-item>
          </q-list>
        </div>
        <q-btn label="Guardar" @click="guardarEmpresa" class="q-ml-md full-width"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'EmpresaModal',
  props: {
    value: Boolean,
  },
  data() {
    return {
      isOpen: this.value,
      empresa: {
        nombreFantasia: '',
        nombre: '',
        cuit: '',
        direccion: '',
        condIva: '',
        ingBrutos: '',
        fechaInicio: new Date().toISOString().split('T')[0], // Fecha actual
      },
      opcionesIva: [
        'Responsable Inscripto',
        'Monotributista',
        'Exento',
        'No Responsable',
        'Consumidor Final'
      ],
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
    guardarEmpresa() {
      // Lógica para guardar la empresa (placeholder)
      console.log('Empresa guardada', this.empresa);
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
}

.navbar {
  background-color: rgb(36, 255, 149); /* Color azul de Quasar */
  color: rgb(255, 255, 255);
  text-align: center;
}

.modal-content {
  padding: 16px;
  background-color: #fff; /* Fondo blanco para el contenido del modal */
}
</style>



  
  
  
  
<!-- <q-modal-layout>
  <q-toolbar slot="header">
    <q-btn
      flat
      round
      dense
      v-close-overlay
      icon="keyboard_arrow_left"
    ></q-btn>
    <q-toolbar-title>
      Configuración de la Empresa
    </q-toolbar-title>
  </q-toolbar>

  <div class="full-width">
    <q-list class="full-width">
      <q-item>
        <q-input v-model="empresa.nombreFantasia" float-label="Nombre de Fantasía" class="full-width"></q-input>
      </q-item>
      <q-item>
        <q-input v-model="empresa.nombre" float-label="Razon Social de la Empresa" class="full-width"></q-input>
      </q-item>
      <q-item>
        <q-input v-model="empresa.cuit" float-label="CUIT" class="full-width"></q-input>
      </q-item>
      <q-item>
        <q-input v-model="empresa.direccion" float-label="Dirección" class="full-width"></q-input>
      </q-item>
      <q-item>
        <q-select
          v-model="empresa.condIva"
          float-label="Condicion de IVA"
          radio
         :options="opcionesIva"
         class="full-width"
        ></q-select>
      </q-item>
      <q-item>
        <q-input v-model="empresa.ingBrutos" float-label="Ingresos Brutos" class="full-width"></q-input>
      </q-item>
      <q-item>
      <q-datetime class="full-width" :value="empresa.fechaInicio" float-label="Fecha de Inicio de Actividades" type="date" format="YYYY/MM/DD" @change="val => {empresa.fechaInicio=new Date(val).toISOString().split('T')[0].replace(/-/g, '/'); }"></q-datetime>
      </q-item>
    </q-list>  
  </div>
  
  <q-btn label="Guardar" @click="guardarEmpresa()" v-close-overlay class="q-ml-md full-width"></q-btn>

</q-modal-layout> -->