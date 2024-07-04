import { register } from 'register-service-worker'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration


register(process.env.SERVICE_WORKER_FILE, {
  ready (registration) {
    console.log('Service worker is active.')
  },

  registered (registration) {
    console.log('Service worker has been registered.')
  },

  cached (registration) {
    console.log('Content has been cached for offline use.')
  },

  updatefound (registration) {
    console.log('New content is downloading.')
  },

  updated (registration) {
    console.log('New content is available; please refresh.')
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
