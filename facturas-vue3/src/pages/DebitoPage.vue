<template>
  <q-page-container>
    <q-page class="page-content">
      <div class="all-container">
      <DebitoComponent/>
    </div>


      
    </q-page>
  </q-page-container>
</template>

<script setup>
import DebitoComponent from 'src/components/DebitoComponent.vue';

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


  