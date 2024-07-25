<template>
  <q-page-container>
    <q-page class="page-content">
      <div class="all-container">
       <ChequeComponent/>
    </div>


      
    </q-page>
  </q-page-container>
</template>

<script setup>
import ChequeComponent from 'src/components/ChequeComponent.vue';

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