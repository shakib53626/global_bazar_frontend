<script setup>
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import {useSellers} from '@/stores'

const {params}  = useRoute();
const seller    = useSellers();

onMounted(() => {
    seller.sellerProduct(params.slug);
})
</script>
<template>
    <div>
        <div class="seller-banner">
            <img src="@/assets/images/bg-banner/1.png" alt="">
        </div>
        <div class="content-wraper pb-60 pt-sm-30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 order-1 order-lg-2">
                        <!-- shop-products-wrapper start -->
                        <div class="shop-products-wrapper">
                            <div class="tab-content">
                                <div id="grid-view" class="tab-pane fade show" :class="gridProducts" role="tabpanel">
                                    <div class="product-area shop-product-area">
                                        <div class="row seller-product">
                                            <div class="product-body mt-40" v-for="(product, index) in products" :key="index">
                                                <Products :product="product" :showQuickViewModal="() => showQuickViewModal(product)"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="paginatoin-area">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 pt-xs-15">
                                            <p>Showing 1-12 of 13 item(s)</p>
                                        </div>
                                        <div class="col-lg-6 col-md-6">
                                            <ul class="pagination-box pt-xs-20 pb-xs-15">
                                                <li><a href="#" class="Previous"><i class="fa fa-chevron-left"></i> Previous</a>
                                                </li>
                                                <li class="active"><a href="#">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li>
                                                    <a href="#" class="Next"> Next <i class="fa fa-chevron-right"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- shop-products-wrapper end -->
                    </div>
                </div>
            </div>
        </div>
        <!-- Content Wraper Area End Here -->
        <QuickViewModal :selectedProduct="selectedProduct"/>
    </div>
</template>
<style>
    .cart-width{
        width: 85px !important;
    }
    .product-body{
      padding: 0;
      width: 220px;
    }
    .seller-product .add-cart{
      width: 110px !important;
    }
    .seller-product{
        display: grid;
        grid-template-columns: auto auto auto auto auto;
    }
    .seller-banner img{
        max-width: 100%;
        width: 100%;
        max-height: 500px;
    }
    
</style>