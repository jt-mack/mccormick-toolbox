import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {router} from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/Aura';
import Lara from '@primevue/themes/Lara';

import App from './App.vue'
import './style.css'
import '/node_modules/primeflex/primeflex.css';

import 'primeicons/primeicons.css';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Lara
  },
  options: {
    darkModeSelector: '.app-dark',
    cssLayer: {
      name: 'primevue',
      order: 'tailwind-base, primevue, tailwind-utilities'
    }
  }
})
app.mount('#app')