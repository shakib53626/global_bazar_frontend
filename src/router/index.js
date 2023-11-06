

import {createRouter, createWebHistory} from 'vue-router'
import Index from '../views/pages/Index.vue'
import Shop from '../views/pages/Shop.vue'
import Blog from '../views/pages/Blog.vue'
import BlogDetails from '../views/pages/BlogDetails.vue'
import About from '../views/pages/About.vue'
import Contact from '../views/pages/Contact.vue'
import ProductDetails from '../views/pages/ProductDetails.vue'
import Wishlist from '../views/pages/Wishlist.vue'
import Cart from '../views/pages/Cart.vue'
import Checkout from '../views/pages/Checkout.vue'


const routes =[	
    { path: '/', name:'home' , component: Index},
    { path: '/shop', name:'shop' , component: Shop},
    { path: '/blog', name:'blog' , component: Blog},
    { path: '/blog-details', name:'blog-details' , component: BlogDetails},
    { path: '/about-us', name:'about' , component: About},
    { path: '/contact-us', name:'contact' , component: Contact},
    { path: '/product-details', name:'product-details' , component: ProductDetails},
    { path: '/wishlist', name:'wishlist' , component: Wishlist},
    { path: '/cart', name:'cart' , component: Cart},
    { path: '/checkout', name:'checkout' , component: Checkout},
  ];


const router = createRouter({
    history: createWebHistory(),
    routes,
  })


export default router;