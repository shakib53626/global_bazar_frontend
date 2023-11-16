<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import {useSellers} from '@/stores'
import { storeToRefs } from 'pinia';
import {SellerStoreSkalaton, Products, ProductSkeleton} from '@/components'

const itemAmount = ref(20);
const sort       = ref('default');
const {params}   = useRoute();
const seller     = useSellers();
const { store, sellerLoader, storeProducts } = storeToRefs(seller);

const getSellerProducts = async(page=1) =>{
    await seller.sellerProduct(params.slug, page, itemAmount.value, sort.value);
}

onMounted(() => {
    getSellerProducts();
})
</script>
<template>
    <div>
        <template v-if="sellerLoader">
            <SellerStoreSkalaton/>
        </template>
        <template v-else>
            <div class="seller-banner" :style="{ backgroundImage: `url(${$filters.makeImgPath(store.banner)})` }">
            </div>
            <div style="width:100%;margin-top:-75px;" class="text-center">
                <div class="d-flex justify-content-center">
                    <div class="seller-image">
                        <img :src="$filters.makeImgPath(store.image)" alt="">
                    </div>
                </div>
                <h3 class="mt-2 text-info">{{store.shop_name}}</h3>
                <p class="store-info text-dark">
                    <span class="text-info">Name: </span> {{store.name}}, 
                    <span class="text-info ms-2">Email:</span> {{store.email}}, 
                    <span class="text-info ms-2">Phone:</span> {{store.phone}}
                </p>
            </div>
        </template>
        
        <div class="content-wraper pb-60 pt-sm-30">
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-md-2 d-flex align-items-center justify-content-left mb-4">
                        <label for="">Show : </label>
                        <select name="" id="" class="form-control ms-2" style="width: 60px;" v-model="itemAmount" @change="getSellerProducts">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="col-md-2 d-flex align-items-center mb-4">
                        <label for="">Sort By : </label>
                        <select name="" id="" class="form-control ms-2" style="width: 100px;" v-model="sort" @change="getSellerProducts">
                            <option value="default">Default</option>
                            <option value="new">New</option>
                            <option value="feature">Featured</option>
                            <option value="winter">Winter</option>
                            <option value="popular">Popular</option>
                        </select>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-12 order-1 order-lg-2">
                        <!-- shop-products-wrapper start -->
                        <div class="shop-products-wrapper">
                            <div class="tab-content">
                                <div>
                                    <div class="product-area shop-product-area">
                                        <div class="row seller-product" v-if="storeProducts">
                                            <templete v-if="sellerLoader">
                                                <ProductSkeleton :dataAmount="5"/>
                                            </templete>
                                            <template v-else>
                                                <div class="product-body mt-40 mb-4" v-for="(product, index) in storeProducts.data" :key="index">
                                                    <Products :product="product" :showQuickViewModal="() => showQuickViewModal(product)"/>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                                <div class="paginatoin-area">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 pt-xs-15 d-flex align-items-center">
                                            <p>Showing {{ storeProducts.from }}-{{ storeProducts.to > storeProducts.total ? storeProducts.total : storeProducts.to }} of {{ storeProducts.total }} item(s)</p>
                                        </div>
                                        <div class="col-lg-6 col-md-6">
                                            <ul class="pagination-box pt-xs-20 pb-xs-15">
                                                <Bootstrap5Pagination
                                                    :data="storeProducts"
                                                    @pagination-change-page="getSellerProducts"
                                                >
                                                <template #prev-nav>
                                                    <a class="Previous" href="#">Previous</a>
                                                </template>
                                                <template #next-nav>
                                                    <a class="Next" href="#">Next</a>
                                                </template>
                                                </Bootstrap5Pagination>
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
    .seller-banner{
        max-width: 100%;
        width: 100%;
        height: 250px;
        background-position: center center;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .seller-image{
        border-radius:50%;
        height:150px;
        width:150px;
        border: 10px solid #fff;
    }
    .seller-image img{
        max-width: 100%;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .store-info{
        color: #fff;
        font-size: 18px;
    }
    .store-info span{
        font-weight: 700;
        letter-spacing: 1px;
        text-shadow: 0 0 10px 0;
    }
    .product-body .single-product-wrap:hover{
        margin: 0;
    }
    .seller-product .seller{
        width: 220px;
        margin-top: 15px;
    }
    
</style>