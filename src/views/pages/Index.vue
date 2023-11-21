<script setup>
import { ref, onMounted } from 'vue';
import {useProducts, useSlider, useOfferBanner} from '@/stores'
import {QuickViewModal, Products, SliderSkeleton, ProductSkeleton, OfferBannerSkalaton} from '@/components';
import { storeToRefs } from 'pinia';

//Swiper ja Code Here ************************************************************************
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
const modules = ref([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

// Sliders Code Here ********************************************************************
const slider = useSlider();
const {sliders} = storeToRefs(slider);

// offers Banner Code Here ********************************************************************
const offerbanner = useOfferBanner();
const {offersBanner} = storeToRefs(offerbanner);

// Products show code here *********************************************************************
const Product = useProducts();
const {products, sale, popular, feature, productLoading} = storeToRefs(Product);

// Products Tab Code HEre *******************************************************************
const newProducts     = ref('active');
const bestProducts    = ref();
const feturedProducts = ref();

const showTabItem = (type) =>{
    if(type=='new'){
        newProducts.value     = 'active';
        bestProducts.value    = '';
        feturedProducts.value = '';
    }
    else if(type=='best'){
        bestProducts.value    = 'active';
        newProducts.value     = '';
        feturedProducts.value = '';

    }else{
        feturedProducts.value = 'active';
        newProducts.value     = '';
        bestProducts.value    = '';
    }
}

// Quick view Modal Code Here **************************************************************
let myModal;
const selectedProduct =ref({});
const showQuickViewModal = (product) =>{
    selectedProduct.value = product;
    myModal.show();
}


onMounted(() => {
    offerbanner.getOfferBannerData();
    slider.getSliderData();
    Product.getProductsData();
    Product.getProductsData('sale');
    Product.getProductsData('popular');
    Product.getProductsData('feature');
    myModal = new bootstrap.Modal(document.getElementById('quickViewModal'))
})
</script>

<template>
    <div>
        <!-- Begin Slider With Banner Area -->
        <div class="slider-with-banner">
            <div class="container">
                <div class="row">
                    <!-- Begin Slider Area -->
                    <div class="col-lg-12 col-md-12">
                        <div class="slider-area">
                            
                            <templete v-if="!sliders.data">
                                <SliderSkeleton/>
                            </templete>
                            <templete v-else>
                                <swiper
                                    :cssMode="true"
                                    :loop="true"
                                    :autoplay="{
                                        delay: 3000,
                                    }"
                                    :navigation="true"
                                    :pagination="true"
                                    :mousewheel="true"
                                    :keyboard="true"
                                    :modules="modules"
                                    class="mySwiper"
                                >
                                    <swiper-slide v-for="(slider, index) in sliders.data" :key="index">
                                        <div class="single-slide align-center-left animation-style-02 bg-2">
                                            <div class="slider-progress"></div>
                                            <div class="slider-content">
                                                <img :src="$filters.makeImgPath(slider.image)" alt="">
                                            </div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </templete>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Slider With Banner Area End Here -->
        <!-- Begin Product Area -->
        <div class="product-area pt-60 pb-50">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="li-product-tab">
                            <ul class="nav li-product-menu">
                                <li><a :class="newProducts" data-toggle="tab" @click="showTabItem('new')"><span>Sale</span></a></li>
                                <li><a :class="bestProducts" data-toggle="tab"  @click="showTabItem('best')"><span>Popular</span></a></li>
                                <li><a :class="feturedProducts" data-toggle="tab" @click="showTabItem('fetured')"><span>Featured</span></a></li>
                            </ul>               
                        </div>
                        <!-- Begin Li's Tab Menu Content Area -->
                    </div>
                </div>
                <div class="tab-content">
                    <div id="li-new-product" class="tab-pane show" role="tabpanel" :class="newProducts">
                        <div class="product-active mt-3">
                            <templete v-if="productLoading">
                                <ProductSkeleton :dataAmount="5"/>
                            </templete>
                            <templete v-else>
                                <swiper
                                    :slidesPerView="5"
                                    :loop=true
                                    :autoplay="{
                                        delay: 5000,
                                    }"
                                    :modules="modules"
                                    class="mySwiper"
                                >
                                    <swiper-slide v-for="(product, index) in sale" :key="index">
                                        <div class="col-lg-12">
                                            <Products :product="product" :showQuickViewModal="() => showQuickViewModal(product)"/>
                                        </div>
                                    </swiper-slide>

                                </swiper>
                            </templete>
                        </div>
                    </div>
                    <div id="li-bestseller-product" class="tab-pane" role="tabpanel" :class="bestProducts">
                        <div class="product-active">

                            <swiper
                                :slidesPerView="5"
                                :loop=true
                                :autoplay="{
                                    delay: 5000,
                                }"
                                :modules="modules"
                                class="mySwiper"
                            >
                                <swiper-slide v-for="(product, index) in popular" :key="index">
                                    <div class="col-lg-12">
                                        <Products :product="product" :showQuickViewModal="() => showQuickViewModal(product)"/>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                    <div id="li-featured-product" class="tab-pane" role="tabpanel" :class="feturedProducts">
                        <div class="product-active">

                            <swiper
                                :slidesPerView="5"
                                :loop=true
                                :autoplay="{
                                    delay: 5000,
                                }"
                                :modules="modules"
                                class="mySwiper"
                            >
                                <swiper-slide v-for="(product, index) in feature" :key="index">
                                    <div class="col-lg-12">
                                        <Products :product="product" :showQuickViewModal="() => showQuickViewModal(product)"/>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Product Area End Here -->
        <!-- Begin Li's Static Banner Area -->
        <div class="li-static-banner">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-4 text-center mb-4" v-for="(offerBanner, index) in offersBanner" :key="index">
                        <templete v-if="offersBanner">
                            <div class="single-banner">
                                <a href="#">
                                    <img :src="offerBanner.image" alt="Li's Static Banner">
                                </a>
                            </div>
                        </templete>
                        <templete v-else>
                            <OfferBannerSkalaton :dataAmount="3"/>
                        </templete>
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- Li's Static Banner Area End Here -->
        <!-- Begin Li's Laptop Product Area -->
        <section class="product-area li-laptop-product pt-60 pb-45">
            <div class="container">
                <div class="row">
                    <!-- Begin Li's Section Area -->
                    <div class="col-lg-12">
                        <div class="li-section-title">
                            <h2>
                                <span>Laptop</span>
                            </h2>
                            <ul class="li-sub-category-list">
                                <li class="active"><a href="shop-left-sidebar.html">Prime Video</a></li>
                                <li><a href="shop-left-sidebar.html">Computers</a></li>
                                <li><a href="shop-left-sidebar.html">Electronics</a></li>
                            </ul>
                        </div>
                        <div class="product-active">
                            <templete v-if="productLoading">
                                <ProductSkeleton :dataAmount="5"/>
                            </templete>
                            <templete v-else>
                                <swiper
                                    :slidesPerView="5"
                                    :loop=true
                                    :autoplay="{
                                        delay: 5000,
                                    }"
                                    :modules="modules"
                                    class="mySwiper"
                                >
                                    <swiper-slide v-for="(product, index) in sale" :key="index">
                                        <div class="col-lg-12">
                                            <Products :product="product" :showQuickViewModal="() => showQuickViewModal(product)"/>
                                        </div>
                                    </swiper-slide>

                                </swiper>
                            </templete>
                        </div>
                    </div>
                    <!-- Li's Section Area End Here -->
                </div>
            </div>
        </section>
        <!-- Li's Laptop Product Area End Here -->
        <!-- Begin Li's TV & Audio Product Area -->
        <section class="product-area li-laptop-product li-tv-audio-product pb-45">
            <div class="container">
                <div class="row">
                    <!-- Begin Li's Section Area -->
                    <div class="col-lg-12">
                        <div class="li-section-title">
                            <h2>
                                <span>TV & Audio</span>
                            </h2>
                            <ul class="li-sub-category-list">
                                <li class="active"><a href="shop-left-sidebar.html">Chamcham</a></li>
                                <li><a href="shop-left-sidebar.html">Sanai</a></li>
                                <li><a href="shop-left-sidebar.html">Meito</a></li>
                            </ul>
                        </div>
                        <div class="product-active">
                            <templete v-if="productLoading">
                                <ProductSkeleton :dataAmount="5"/>
                            </templete>
                            <templete v-else>
                                <swiper
                                    :slidesPerView="5"
                                    :loop=true
                                    :autoplay="{
                                        delay: 5000,
                                    }"
                                    :modules="modules"
                                    class="mySwiper"
                                >
                                    <swiper-slide v-for="(product, index) in sale" :key="index">
                                        <div class="col-lg-12">
                                            <Products :product="product" :showQuickViewModal="() => showQuickViewModal(product)"/>
                                        </div>
                                    </swiper-slide>

                                </swiper>
                            </templete>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <QuickViewModal :selectedProduct="selectedProduct"/>
    </div>
</template>

<style>
    .slider-content{
        padding-left: 0;
    }
    .slider-content img{
        max-width:100%;
    }
    .mySwiper{
        padding-bottom:24px;
    }
    .li-product-menu li a {
        color: #c8c8c8 !important;
        cursor: pointer;
        font-family: 'Rubik', sans-serif;
        font-size: 20px;
        font-weight: 500;
        line-height: 18px;
        text-transform: capitalize;
        letter-spacing: 0.25px;
    }
    .li-product-menu li .active {
        color: #000000 !important;
    }
</style>