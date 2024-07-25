<template>
  <q-page-container>
    <q-page class="page-content">
      <div class="all-container">
      <FacturaComponet/>
    </div>


      
    </q-page>
  </q-page-container>
</template>

<script setup>
import FacturaComponet from '../components/FacturaComponent.vue'


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


