

import {createRouter, createWebHistory} from 'vue-router'
import Index from '../views/pages/Index.vue'
import Shop from '../views/pages/Shop.vue'


const routes =[	
    { path: '/', name:'home' , component: Index},
    { path: '/shop', name:'shop' , component: Shop},
  ];


const router = createRouter({
    history: createWebHistory(),
    routes,
  })


export default router;