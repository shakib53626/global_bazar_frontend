<script setup>
    import { useNotification, useCart} from '@/stores';
    import {ref, onMounted,defineProps, watch } from 'vue'
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
    const modules = ref([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);
    
    const props = defineProps({
        selectedProduct:{
            type:Object,
            required: true,
        },
    });
    const thumbnail   = ref("");

    const productThumbnail = (image) =>{
        thumbnail.value = image;
    }

    watch(() => props.selectedProduct.thumbnail, (newThumbnail) => {
        thumbnail.value = newThumbnail;
    });

    // Quantity increment and decrement code here 
    const quantity = ref(1);
    const qtyPlus = () =>{
        quantity.value += 1;
    }
    
    const qtyMinus = () =>{
        if(quantity.value != 1){
            quantity.value -= 1;
        }
    }

    // Add to cart code here ....
    const price        = ref();
    const notification = useNotification();
    const cart         = useCart();


    const addToCart = (product) =>{
        if(product.discount){
            price.value = product.price - (product.discount/100)*product.price;
        }else{
            price.value = product.price
        }
        cart.addToCart({
            id           : product.id,
            name         : product.name,
            quantity     : quantity.value,
            price        : price.value.toFixed(),
            discount     : product.discount,
            regular_price: product.price,
            thumbnail    : product.thumbnail,
            slug         : product.slug
        });

        notification.Success(`${product.name} Added Your Cart`);
    }

    onMounted(() => {
        
    })
</script>

<template>
    <div>
        <div class="modal fade modal-wrapper" id="quickViewModal" >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="modal-inner-area row">
                            <div class="col-lg-5 col-md-6 col-sm-6">
                                <div class="product-details-left">
                                    <div class="product-details-images slider-navigation-1">
                                        <div class="lg-image">
                                            <a class="popup-img venobox vbox-item" :href="$filters.makeImgPath( thumbnail ==''? selectedProduct.thumbnail : thumbnail )" data-gall="myGallery">
                                                <img :src="$filters.makeImgPath(thumbnail ==''? selectedProduct.thumbnail : thumbnail)" alt="product image">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="product-details-thumbs slider-thumbs-1">
                                        <swiper
                                            :slidesPerView="4"
                                            :loop=true
                                            :autoplay="{
                                                delay: 5000,
                                            }"
                                            :modules="modules"
                                            class="mySwiper"
                                        >
                                            <swiper-slide>
                                                <div class="sm-image">
                                                    <img :src="$filters.makeImgPath(selectedProduct.thumbnail)" alt="product image thumb" @click="productThumbnail(selectedProduct.thumbnail)">
                                                </div>
                                            </swiper-slide>
                                            <swiper-slide v-for="(image, index) in selectedProduct.images" :key="index">
                                                <div class="sm-image">
                                                    <img :src="$filters.makeImgPath(image)" alt="product image thumb" @click="productThumbnail(image)">
                                                </div>
                                            </swiper-slide>
                                        </swiper>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-7 col-md-6 col-sm-6">
                                <div class="product-details-view-content pt-60">
                                    <div class="product-info">
                                        <h2 v-if="selectedProduct">{{ selectedProduct.name }}</h2>
                                        <span class="product-details-ref">Category : {{ selectedProduct.category_id }}</span>
                                        <div class="price-box pt-20">
                                            <span class="new-price new-price-2 offer-price"> {{ $filters.currencySymbol(selectedProduct.price - (selectedProduct.discount/100)*selectedProduct.price) }}</span>
                                            <span class="old-price ms-3" v-if="selectedProduct.price"><del>{{ $filters.currencySymbol(selectedProduct.price) }}</del></span>
                                        </div>
                                        <div class="product-desc">
                                            <p>
                                                <span>{{$filters.makeDescription(selectedProduct.description, 200)}}</span>
                                            </p>
                                        </div>
                                        <div class="single-add-to-cart">
                                            <form action="#" class="cart-quantity">
                                                <div class="quantity">
                                                    <label>Quantity</label>
                                                    <div class="cart-plus-minus">
                                                        <input class="cart-plus-minus-box" v-model="quantity" type="text">
                                                        <div class="dec qtybutton" @click="qtyMinus"><i class="fa fa-angle-down"></i></div>
                                                        <div class="inc qtybutton" @click="qtyPlus"><i class="fa fa-angle-up"></i></div>
                                                    </div>
                                                </div>
                                                <button class="add-to-cart anim-cart" :class="{'animCart' : cart.loading === selectedProduct.id}" type="submit" @click.prevent="addToCart(selectedProduct)">
                                                    <span><i class="fa fa-spinner fa-spin" v-if="cart.loading === selectedProduct.id"></i> Add to cart</span>
                                                </button>
                                                <button class="add-to-cart mt-2" type="submit">Buy Now</button>
                                            </form>
                                        </div>
                                        <div class="product-additional-info pt-25">
                                            <div class="product-social-sharing pt-25">
                                                <ul>
                                                    <li class="facebook"><a href="#"><i class="fa fa-facebook"></i>Facebook</a></li>
                                                    <li class="twitter"><a href="#"><i class="fa fa-twitter"></i>Twitter</a></li>
                                                    <li class="google-plus"><a href="#"><i class="fa fa-google-plus"></i>Google +</a></li>
                                                    <li class="instagram"><a href="#"><i class="fa fa-instagram"></i>Instagram</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>

<style lang="">
    
</style>