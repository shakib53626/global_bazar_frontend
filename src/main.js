import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import './style.css'
import './template.js'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import "skeleton-screen-css";
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
app.use(ElementPlus);

app.config.globalProperties.$filters={
    currencySymbol(value){
        return  "৳ " + value.toLocaleString();
    },

    makeImgPath(image){
        return   "http://127.0.0.1:8000/" + image;
    }
}

app.mount('#app')
