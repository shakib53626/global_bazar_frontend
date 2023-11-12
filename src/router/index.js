
import NProgress from 'nprogress'
import {createRouter, createWebHistory} from 'vue-router'
import {useAuth} from '@/stores'
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
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import MyAccount from '../views/auth/MyAccount.vue'


const routes =[	
    {
      path: '/',
      name: 'home',
      component: Index,
      meta: { title: 'Home' }
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      meta: { title: 'Shop' }
    },
    {
      path: '/blog',
      name: 'blog' ,
      component: Blog,
      meta: { title: 'Blog' }
    },
    {
      path: '/blog-details',
      name: 'blog-details',
      component: BlogDetails,
      meta: { title: 'Blog Details' }
    },
    {
      path: '/about-us',
      name: 'about',
      component: About,
      meta: { title: 'About Us' }
    },
    {
      path: '/contact-us',
      name: 'contact' ,
      component: Contact,
      meta: { title: 'Contact Us' }
    },
    {
      path: '/product-details/:slug',
      name: 'product-details',
      component: ProductDetails,
      meta: { title: 'Product Details' }
    },
    {
      path: '/wishlist',
      name: 'wishlist' ,
      component: Wishlist,
      meta: { title: 'Wishlist', requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart' ,
      component: Cart,
      meta: { title: 'Cart' }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: { title: 'Checkout' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Login', guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { title: 'Register', guest: true }
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: MyAccount,
      meta: { title: 'My Account', requiresAuth: true }
    },
  ];


const router = createRouter({
  history: createWebHistory(),
  routes,
})

const DEFAULT_TITLE = "404";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  NProgress.start();
  const loggedIn = useAuth();
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(!loggedIn.user.meta){
      next({name:"login"});  
    }else{
      next();
    }
  }else if(to.matched.some((record) => record.meta.guest)){
    if(loggedIn.user.meta){
      next({name:"my-account"});  
    }else{
      next();
    }
  }else{
    next();
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router;