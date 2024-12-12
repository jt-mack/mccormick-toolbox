import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {router} from './router'
import PrimeVue from 'primevue/config';
import {definePreset} from "@primevue/themes";
import Aura from '@primevue/themes/Aura';
import Lara from '@primevue/themes/Lara';

import App from './App.vue'
import './style.css'
import '/node_modules/primeflex/primeflex.css';

import 'primeicons/primeicons.css';

const app = createApp(App)
const pinia = createPinia()

const mcPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}'
    }
  }
});

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: mcPreset,
    options: {
      darkModeSelector: '.app-dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  },
})
app.mount('#app')