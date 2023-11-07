import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './template.js'
import App from './App.vue'
import { createPersistedState } from 'pinia-plugin-persistedstate';
import router from './router'

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState());
app.use(router);
app.use(pinia);
app.mount('#app')
