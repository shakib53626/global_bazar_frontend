<script setup>
    import {ref, onMounted} from 'vue'
    import {useThemeSetting, useAuth, useNotification, useCategories, useCart} from '@/stores'
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
    
    const router        = useRouter();
    const themeInfo     = useThemeSetting();
    const auth          = useAuth();
    const notification  = useNotification();
    const category      = useCategories();
    const cart          = useCart();
    const {categories}  = storeToRefs(category);
    const {cartItems, cartItemsCount, totalPrice}   = storeToRefs(cart);
    const {user, logoutLoading} = storeToRefs(auth);
    const {themesInfo, currency, language} = storeToRefs(themeInfo);

    // theme Information code Here ******************************

    const cartBox = () =>{
        $('.hm-minicart-trigger').siblings('.ht-setting, .ht-currency, .ht-language, .minicart, .cw-sub-menu li').slideToggle();
        $('.hm-minicart-trigger').toggleClass('is-active');
    }
    
    const loginToggle = () =>{
        $('.ht-setting-trigger').siblings('.ht-setting, .ht-currency, .ht-language, .minicart, .cw-sub-menu li').slideToggle();
        $('.ht-setting-trigger').toggleClass('is-active');
    }

    // User Logout Code Here **************************************

    const userLogout = async() =>{
        let res = await auth.logout();
        if(res){
            router.push({name:'login'});
            notification.Success("Logout Success");
        }else{
        }
        $('.ht-setting-trigger').siblings('.ht-setting, .ht-currency, .ht-language, .minicart, .cw-sub-menu li').slideToggle();
        $('.ht-setting-trigger').toggleClass('is-active');
    }

    const deleteItem = (itemId) =>{
        cart.deleteItem(itemId)
    }

    onMounted(() => {
        themeInfo.getThemeData();
        category.getCaegories();
    })
</script>

<template>
    <div>
        <header>
            <div class="header-top">
                <div class="container">
                    <div class="row">
                        <!-- Begin Header Top Left Area -->
                        <div class="col-lg-3 col-md-4">
                            <div class="header-top-left">
                                <ul class="phone-wrap">
                                    <li><span>Telephone Enquiry: </span><a href="#">{{ themesInfo.phone_number }}</a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- Header Top Left Area End Here -->
                        <!-- Begin Header Top Right Area -->
                        <div class="col-lg-9 col-md-8">
                            <div class="header-top-right">
                                <ul class="ht-menu">
                                    <!-- Begin Setting Area -->
                                    <li>
                                        <div class="ht-setting-trigger" @click="loginToggle"><span>Setting</span></div>
                                        <div class="setting ht-setting">
                                            <ul class="ht-setting-list">
                                                <li><router-link :to="{name:'my-account'}" @click="loginToggle" v-if="user.data">My Account</router-link></li>
                                                <li><router-link :to="{name:'login'}" @click="loginToggle" v-if="!user.data">Sign In</router-link></li>
                                                <li><router-link :to="{name:'register'}" @click="loginToggle" v-if="!user.data">Sing Up</router-link></li>
                                                <li>
                                                    <a href="" @click.prevent="userLogout" v-if="user.data">
                                                        <span v-if="logoutLoading"><i class="fas fa-spinner fa-spin"></i> Loading</span>
                                                        <span v-else>Logout</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <span class="currency-selector-wrapper">Currency :</span>
                                        <select id="" class="ht-currency-trigger" v-model="currency">
                                            <option value="doller">USD $</option>
                                            <option value="taka">TAKA ৳</option>
                                        </select>
                                    </li>
                                    <li>
                                        <span class="language-selector-wrapper">Language :</span>
                                        <select class="ht-currency-trigger" id="" v-model="language">
                                            <option value="english">English</option>
                                            <option value="bangla">Bangla</option>
                                        </select>
                                    </li>
                                    <!-- Language Area End Here -->
                                </ul>
                            </div>
                        </div>
                        <!-- Header Top Right Area End Here -->
                    </div>
                </div>
            </div>
            <div class="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="logo pb-sm-30 pb-xs-30">
                                <router-link :to="{name: 'home'}"><img :src="themesInfo.logo_image" alt=""></router-link>
                            </div>
                        </div>
                        <div class="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
                            <form action="#" class="hm-searchbox">
                                <input type="text" placeholder="Enter your search key ...">
                                <button class="li-btn" type="submit"><i class="fa fa-search"></i></button>
                            </form>
                            <div class="header-middle-right">
                                <ul class="hm-menu">
                                    <li class="hm-wishlist" v-if="user.data">
                                        <router-link :to="{name:'wishlist'}">
                                            <span class="cart-item-count wishlist-item-count">{{ user.meta.wishlists.length }}</span>
                                            <i class="fa fa-heart-o"></i>
                                        </router-link>
                                    </li>
                                    <li class="hm-minicart">
                                        <div class="hm-minicart-trigger" @click="cartBox">
                                            <span class="item-icon"></span>
                                            <span class="item-text">{{ $filters.currencySymbol(totalPrice) }}
                                                <span class="cart-item-count">{{ cartItemsCount }}</span>
                                            </span>
                                        </div>
                                        <span></span>
                                        <div class="minicart">
                                            <ul class="minicart-product-list" v-if="cartItems.length>0">
                                                <TransitionGroup name="list" tag="ul">
                                                    <li v-for="item in cartItems" :key="item.id">
                                                        <router-link :to="{ name: 'product-details', params: { slug: item.slug } }" class="minicart-product-image">
                                                            <img :src="$filters.makeImgPath(item.thumbnail)" width="45" alt="cart products">
                                                        </router-link>
                                                        <div class="minicart-product-details">
                                                            <h6><a href="single-product.html">{{ item.name }}</a></h6>
                                                            <span>{{ $filters.currencySymbol(item.price) }} x {{item.quantity}}</span>
                                                        </div>
                                                        <button class="close" title="Remove" @click.prevent="deleteItem(item.id)">
                                                            <i class="fa fa-close"></i>
                                                        </button>
                                                    </li>
                                                </TransitionGroup>
                                                
                                            </ul>
                                            <div class="text-center" v-else>
                                                <img src="@/assets/images/basket.png" width="100" alt="">
                                                <h3 class="text-danger">Your Cart is Empty</h3>
                                            </div>
                                            <p class="minicart-total">SUBTOTAL: <span>{{ $filters.currencySymbol(totalPrice) }}</span></p>
                                            <div class="minicart-button">
                                                <router-link :to="{name: 'cart'}" class="li-button li-button-fullwidth li-button-dark" @click="cartBox">
                                                    <span>View Full Cart</span>
                                                </router-link>
                                                <router-link :to="{name:'checkout'}" class="li-button li-button-fullwidth" @click="cartBox">
                                                    <span>Checkout</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom header-sticky d-none d-lg-block d-xl-block">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="hb-menu">
                                <nav>
                                    <ul>
                                        <li class="dropdown-holder"><router-link :to="{name: 'home'}">Home</router-link></li>
                                        <li class="dropdown-holder"><router-link :to="{name: 'shop'}">Shop</router-link></li>
                                        <li class="megamenu-holder"><router-link :to="{name: 'shop'}">Categories</router-link>
                                            <ul class="megamenu hb-megamenu">
                                                <li v-for="(category, index) in categories" :key="index">
                                                    <a href="shop-left-sidebar.html">{{ category.name }}</a>
                                                    <!-- <ul>
                                                        <li><a href="shop-3-column.html">Shop 3 Column</a></li>
                                                        <li><a href="shop-4-column.html">Shop 4 Column</a></li>
                                                        <li><a href="shop-left-sidebar.html">Shop Left Sidebar</a></li>
                                                        <li><a href="shop-right-sidebar.html">Shop Right Sidebar</a></li>
                                                        <li><a href="shop-list.html">Shop List</a></li>
                                                        <li><a href="shop-list-left-sidebar.html">Shop List Left Sidebar</a></li>
                                                        <li><a href="shop-list-right-sidebar.html">Shop List Right Sidebar</a></li>
                                                    </ul> -->
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="dropdown-holder"><router-link :to="{name: 'sellers'}">Sellers</router-link></li>
                                        <li class="dropdown-holder"><router-link :to="{name: 'blog'}">Blog</router-link></li>
                                        <li><router-link :to="{name: 'about'}">About Us</router-link></li>
                                        <li><router-link :to="{name: 'contact'}">Contact</router-link></li>
                                    </ul>
                                </nav>
                            </div>
                            <!-- Header Bottom Menu Area End Here -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobile-menu-area d-lg-none d-xl-none col-12">
                <div class="container"> 
                    <div class="row">
                        <div class="mobile-menu">
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<style>
    .ht-currency-trigger{
        font-size: 12px;
        background-color: transparent;
        border: none;
        height: 20px;
        width: 68px;
    }
    .megamenu{
        display: grid;
        grid-template-columns: auto auto auto auto;
    }

    .minicart-product-list {
        max-height: 272px;
        overflow-y: scroll;
        scrollbar-width: thin;
    }

    .minicart-product-list::-webkit-scrollbar {
        width: 5px !important;
    }

    .minicart-product-list::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }

    .minicart-product-list::-webkit-scrollbar-track {
        background-color: #f1f1f1;
    }
    .list-move, /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
    transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
    }

    /* ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
    .list-leave-active {
    position: absolute;
    }
</style>