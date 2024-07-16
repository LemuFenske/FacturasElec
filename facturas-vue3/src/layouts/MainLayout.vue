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
        <q-item>
          <q-item-section>
            <q-btn @click="installPWA">Instalar PWA</q-btn>
          </q-item-section>
          
        </q-item>
        <q-item>
        <q-item-section>
            <q-btn @click="clearCacheAndStorage">Actualizar</q-btn>
          </q-item-section>
        </q-item>
        <q-item v-if="swVersion">
          <q-item-section>
            <div>Versión (con mensaje): {{ swVersion }}</div>
          </q-item-section>
        </q-item>
        <q-item v-if="!swVersion">
          <q-item-section>
            <div>Versión (con mensaje): Cargando...</div>
          </q-item-section>
        </q-item>
        <q-item v-if="jsonVersion">
          <q-item-section>
            <div>Versión (JSON): {{ jsonVersion }}</div>
          </q-item-section>
        </q-item>
        <q-item v-if="!jsonVersion">
          <q-item-section>
            <div>Versión (JSON): Cargando...</div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container style="padding: 0;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const swVersion = ref('')
const jsonVersion = ref('')
const router = useRouter()
let deferredPrompt

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function navigateTo(route) {
  router.push(route)
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
})

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      deferredPrompt = null
    })
  }
}

function postMsg(sw, sAction, pResp) {
  try {
    var msgCh = new MessageChannel();
    msgCh.port1.onmessage = pResp;
    sw.postMessage({ action: sAction }, [msgCh.port2]);
  } catch (err) {
    console.error(sAction + ' error: ' + err);
  }
}

function fetchVersionFromSW() {
  if (navigator.serviceWorker.controller) {
    postMsg(navigator.serviceWorker.controller, 'getSWVer', (event) => {
      swVersion.value = event.data.version;
    });
  }
}

// Obtener la versión desde version.json
function fetchVersionFromJSON() {
  fetch('/facturas-test/version.json')
    .then(response => response.json())
    .then(data => {
      jsonVersion.value = data.version
    })
    .catch(error => console.error('Error fetching version:', error))
}

async function clearCacheAndStorage() {
  try {
    // Clear local storage
    localStorage.clear()
    
    // Clear cache storage
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
    }
    
    // Reload the page
    window.location.reload(true)
  } catch (error) {
    console.error("Error clearing cache and storage:", error)
  }
}

onMounted(() => {
  fetchVersionFromSW()
  fetchVersionFromJSON()
})
</script>





<style>
.navbar {
  background-color: rgb(66, 221, 146);
  color: black;
}

.left-drawer {
  background-color: rgb(170, 255, 214);
}

.right-drawer {
  margin-top: 0;
  background-color: rgb(170, 255, 214);
}

q-page-container {
  padding: 0; 
}

body {
  overflow-y: auto; 
}
</style>


