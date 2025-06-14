import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const app = createApp(App).use(
  Vue3Toastify,
  {
    autoClose: 2000,
    // ...
  }
).mount('#app');
