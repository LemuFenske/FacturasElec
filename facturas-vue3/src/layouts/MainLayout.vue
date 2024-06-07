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
        <q-item clickable v-ripple @click="navigateTo('/')">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            Inicio
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/empresa')">
          <q-item-section avatar>
            <q-icon name="apartment" />
          </q-item-section>
          <q-item-section>
            Empresa
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/facturas')">
          <q-item-section avatar>
            <q-icon name="receipt_long" />
          </q-item-section>
          <q-item-section>
            Facturas
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/credito')">
          <q-item-section avatar>
            <q-icon name="credit_card" />
          </q-item-section>
          <q-item-section>
            Nota de Crédito
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/ticket')">
          <q-item-section avatar>
            <q-icon name="receipt" />
          </q-item-section>
          <q-item-section>
            Ticket
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/debito')">
          <q-item-section avatar>
            <q-icon name="payment" />
          </q-item-section>
          <q-item-section>
            Nota de Débito
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/cheques')">
          <q-item-section avatar>
            <q-icon name="account_balance" />
          </q-item-section>
          <q-item-section>
            Cheques
          </q-item-section>
        </q-item>
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
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const router = useRouter()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function navigateTo(route) {
  router.push(route)
}
</script>

<style>
.navbar {
  background-color: rgb(117, 255, 188);
  color: black;
}

.left-drawer {
  background-color: rgb(170, 255, 214);
}

.right-drawer {
  background-color: rgb(170, 255, 214);
}

q-page-container {
  padding: 0; 
}

body {
  overflow-y: auto; 
}
</style>


