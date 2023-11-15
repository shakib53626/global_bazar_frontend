<script setup>
import { useAuth, useWishlist, useNotification, useCart } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const price        = ref();
const auth         = useAuth();
const cart         = useCart();
const wishlist     = useWishlist();
const notification = useNotification();
const {user}       = storeToRefs(auth);

const addToWishlist = async(product) =>{
    let res = await wishlist.addToWishlist(product);
    if(res){
        if(res.status==200){
            notification.Success(`${product.name} Remove For Your Wishlist`);
        }
    }
}

// Add to Cart*******
const addToCart = (product) =>{
    if(product.discount){
        price.value = product.price - (product.discount/100)*product.price;
    }else{
        price.value = product.price
    }
    cart.addToCart({
        id           : product.id,
        name         : product.name,
        quantity     : 1,
        price        : price.value.toFixed(),
        discount     : product.discount,
        regular_price: product.price,
        thumbnail    : product.thumbnail,
        slug         : product.slug
    });

    notification.Success(`${product.name} Added Your Cart`);
}

onMounted(()=>{
    wishlist.index();
})
</script>
<template>
    <div>
        <!-- Begin Li's Breadcrumb Area -->
        <div class="breadcrumb-area">
            <div class="container">
                <div class="breadcrumb-content">
                    <ul>
                        <li><router-link :to="{name:'home'}">Home</router-link></li>
                        <li class="active">Wishlist</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Li's Breadcrumb Area End Here -->
        <!--Wishlist Area Strat-->
        <div class="wishlist-area pt-60 pb-60">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <form action="#">
                            <div class="table-content table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="li-product-remove">remove</th>
                                            <th class="li-product-thumbnail">images</th>
                                            <th class="cart-product-name">Product</th>
                                            <th class="li-product-price">Unit Price</th>
                                            <th class="li-product-stock-status">Stock Status</th>
                                            <th class="li-product-add-cart">add to cart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(product, index) in user.meta.wishlists" :key="index">
                                            <td class="li-product-remove">
                                                <a href="#" @click.prevent="addToWishlist(product)">
                                                    <i class="fa fa-spinner fa-spin text-danger" style="font-size:20px" v-if="wishlist.wishlistLoading==product.id"></i>
                                                    <i class="fa fa-trash text-danger" style="font-size:20px" v-else></i>
                                                </a>
                                            </td>
                                            <td class="li-product-thumbnail"><a href="#"><img :src="$filters.makeImgPath(product.thumbnail)" width="50" alt=""></a></td>
                                            <td class="li-product-name"><a href="#">{{ product.name }}</a></td>
                                            <td class="li-product-price"><span class="amount">{{ $filters.currencySymbol(product.discount==0? product.price : product.price-(product.price*product.discount)/100) }}</span></td>
                                            <td class="li-product-stock-status">
                                                <span class="in-stock" style="font-size:16px;" v-if="product.stock>0">In Stock</span>
                                                <span class="in-stock text-danger" style="font-size:16px;" v-else>Out Of Stock</span>
                                            </td>
                                            <td class="li-product-add-cart">
                                                <a href="#" @click.prevent="addToCart(product)" class="anim-wish wish-cart" :class="{wishCart: cart.loading==product.id}">
                                                    <span>
                                                        <i class="fas fa-spinner fa-spin me-2" v-if="cart.loading==product.id"></i>
                                                        <i class="fa-solid fa-cart-plus me-2" v-else></i> Cart
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--Wishlist Area End-->
    </div>
</template>
<style>
    .wish-cart{
        border-radius: 5px;
        position: relative;
    }
    .wish-cart span{
        position: relative;
        z-index: 99;
        color: #fff !important;
    }
    .anim-wish::before {
        content: '';
        position: absolute;
        width: 0%;
        height: 100%;
        background-color: green;
        top: 0;
        left: 0;
        border-radius: 3px;
        transition: width 1s;
        z-index: 9;
        opacity: 0;
    }

    .wishCart::before {
        width: 100%;
        opacity: 1;
        transition: 1s;
    }
</style>