import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './template.js'
import App from './App.vue'
import { createPersistedState } from 'pinia-plugin-persistedstate';
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState());
app.use(router);
app.use(pinia);
app.mount('#app')
