<script setup>
    import { useCart, useNotification, useAuth, useWishlist } from '@/stores';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';

    const cart         = useCart();
    const auth         = useAuth();
    const wishlist     = useWishlist();
    const notification = useNotification();
    const {loading}    = storeToRefs(cart);
    const price        = ref();

    const props = defineProps({
        product:{
            type:Object,
            required: true,
        },
        showQuickViewModal:{
            type: Function,
            required: true,
        },
    });

    const offer_price = props.product.price - (props.product.discount/100)*props.product.price;

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


    const addToWishlist = async(product) =>{
        if(auth.user.data){
            let res = await wishlist.addToWishlist(product);
            if(res){
                if(res.status==201){
                    notification.Success(`${product.name} Added Your Wishlist`);
                }else{
                    notification.Success(`${product.name} Remove For Your Wishlist`);
                }
            }
        }else{
            $("#LoginMOdal").modal("show");
        }
    }
</script>
<template>
    <div>
        
        <!-- single-product-wrap start -->
        <div class="single-product-wrap">
            <div class="product-image">
                <router-link :to="{ name: 'product-details', params: { slug: product.slug } }">
                    <img :src="$filters.makeImgPath(product.thumbnail)" alt="Li's Product Image">
                </router-link>
                <span class="sticker">{{product.conditions}}</span>
            </div>
            <div class="product_desc">
                <div class="product_desc_info">
                    <div class="product-review">
                        <h5 class="manufacturer">
                            <a href="shop-left-sidebar.html">Graphic Corner</a>
                        </h5>
                        <div class="rating-box">
                            <ul class="rating">
                                <li><i class="fa fa-star-o"></i></li>
                                <li><i class="fa fa-star-o"></i></li>
                                <li><i class="fa fa-star-o"></i></li>
                                <li class="no-star"><i class="fa fa-star-o"></i></li>
                                <li class="no-star"><i class="fa fa-star-o"></i></li>
                            </ul>
                        </div>
                    </div>
                    <h4>
                        <router-link class="product_name" :to="{name:'product-details', params: {slug: product.slug}}">
                            {{product.name}}
                        </router-link>
                    </h4>
                    <div class="price-box" v-if="product.discount==0">
                        <span class="new-price">
                            {{ $filters.currencySymbol(product.price) }}</span>
                    </div>
                    <div class="price-box" v-else>
                        <span class="new-price new-price-2">{{ $filters.currencySymbol(offer_price.toFixed()) }}</span>
                        <span class="old-price">{{ $filters.currencySymbol(product.price) }}</span>
                        <span class="discount-percentage">- {{ product.discount }}%</span>
                    </div>
                </div>
                <div class="add-actions">
                    <ul class="add-actions-link">
                        <li class="add-cart active anim-cart" :class="{animCart: loading==product.id}">
                            <a href="#"  @click.prevent="addToCart(product)">
                                <i class="fas fa-spinner fa-spin" v-if="loading==product.id"></i>
                                <i class="fa-solid fa-cart-plus" v-else></i> Cart
                            </a>
                        </li>
                        <li class="anim-cart" :class="{animCart: wishlist.wishlistLoading==product.id}">
                            <a class="links-details" @click.prevent="addToWishlist(product)">
                                <i class="fas fa-spinner fa-spin" v-if="wishlist.wishlistLoading==product.id"></i>
                                <i class="fa fa-heart-o" v-else></i>
                            </a>
                        </li>
                        <li><a title="quick view" class="quick-view-btn" @click="showQuickViewModal"><i class="fa fa-eye"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- single-product-wrap end -->
    </div>
</template>
<style>
    .quick-view-btn{
        cursor: pointer ;
    }
    .animCart a{
        position: relative;
        z-index: 99;
        color: #fff !important;
    }
    .animCart {
        position: relative;
        cursor: pointer;
    }

    .anim-cart::before {
        content: '';
        position: absolute;
        width: 0%;
        height: 100%;
        background-color: rgb(197, 17, 11);
        top: 0;
        left: 0;
        border-radius: 3px;
        transition: width 0.5s;
        z-index: 9;
        opacity: 0;
    }

    .animCart::before {
        width: 100%;
        opacity: 1;
        transition: 0.5s;
    }
    .links-details{
        cursor: pointer;
    }
</style>