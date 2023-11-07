<script setup>
    const props = defineProps({
        product:{
            type:String,
            required: true,
        }
    });
</script>
<template>
    <div>
        <div class="col-lg-12">
            <!-- single-product-wrap start -->
            <div class="single-product-wrap">
                <div class="product-image">
                    <router-link :to="{name:'product-details'}">
                        <img :src="product.image" alt="Li's Product Image">
                    </router-link>
                    <span class="sticker">New</span>
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
                        <h4><router-link class="product_name" :to="{name:'product-details'}">{{product.name}}</router-link></h4>
                        <div class="price-box" v-if="product.offer_price==0">
                            <span class="new-price">$ {{ product.regular_price }}</span>
                        </div>
                        <div class="price-box" v-else>
                            <span class="new-price new-price-2">$ {{ product.offer_price }}</span>
                            <span class="old-price">$ {{ product.regular_price }}</span>
                            <span class="discount-percentage">- {{ product.discount }}%</span>
                        </div>
                    </div>
                    <div class="add-actions">
                        <ul class="add-actions-link">
                            <li class="add-cart active"><a href="#">Add to cart</a></li>
                            <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                            <li><a title="quick view" class="quick-view-btn" @click="showQuickViewModal"><i class="fa fa-eye"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- single-product-wrap end -->
        </div>
    </div>
</template>
<style>
    
</style>