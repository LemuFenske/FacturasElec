<template>
  <q-page-container>
    <q-page class="page-content">
      <div class="all-container">
       <TicketComponent/>
    </div>


      
    </q-page>
  </q-page-container>
</template>

<script setup>
import TicketComponent from 'src/components/TicketComponent.vue';


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