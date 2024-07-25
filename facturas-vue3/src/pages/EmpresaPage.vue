<template>
  <q-page-container>
    <q-page class="page-content">
      <div class="all-container">
      <EmpresaComponent/>
      <!-- <FacturaPage/> -->
      <FacturaComponet/>
      <!-- <DebitoPage/> -->
      <DebitoComponent/>
      <!-- <CreditoPage/> -->
      <CreditoComponent/>
      <!-- <ChequePage/> -->
       <ChequeComponent/>
      <!-- <TicketPage/> -->
       <TicketComponent/>
    </div>


      
    </q-page>
  </q-page-container>
</template>

<script setup>
import EmpresaModal from '../components/EmpresaModal.vue';
import FacturaComponet from '../components/FacturaComponent.vue'
import DebitoComponent from 'src/components/DebitoComponent.vue';
import CreditoComponent from 'src/components/CreditoComponent.vue';
import ChequeComponent from 'src/components/ChequeComponent.vue';
import TicketComponent from 'src/components/TicketComponent.vue';
import EmpresaComponent from 'src/components/EmpresaComponent.vue';


</script>

<style scoped>
.page-content { 
  padding: 16px;
}

.all-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

</style>

