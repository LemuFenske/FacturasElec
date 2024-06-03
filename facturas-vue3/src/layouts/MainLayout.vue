<template>
  <q-layout view="lHr Lpr fFf">
    <q-header elevated>
      <q-toolbar class="navbar">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="navbar">Facturas Electronicas</q-toolbar-title>
        <q-btn flat dense round icon="info" aria-label="Info" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="left-drawer">
      <q-list>
        <q-item-label header>Menú</q-item-label>
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" show-if-above bordered class="right-drawer" side="right">
      <q-list>
        <q-item-label header>Información</q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container style="padding: 0;">
    <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>

<style>
.navbar {
  background-color: rgb(36, 255, 149);
}

.left-drawer {
  background-color: rgb(98, 255, 179);
  width: 100px;
}

.right-drawer {
  background-color: rgb(98, 255, 179); 

}

q-page-container {
  padding: 0; /* Override default padding */
}

body {
  overflow-y: hidden; /* Hide vertical scrollbar */
}
</style>


