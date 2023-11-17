<script setup>
    import { Bootstrap5Pagination } from 'laravel-vue-pagination';
    import {ref, onMounted, computed} from 'vue'
    import {QuickViewModal, Products, ProductSkeleton, SidebarSkalaton} from '@/components';
    import {useShop} from '@/stores'
    import { storeToRefs } from 'pinia';


    // Products show code here *********************************************************************
    const sort             = ref('default');
    const show             = ref(48);
    const shop             = useShop();
    const searchByBrand    = ref("");
    const searchByCategory = ref("");
    const {products, loader, sidebar} = storeToRefs(shop);

    const getProducts = (page = 1) =>{
        shop.getProducts(page, show.value, sort.value);
    }

    const searchBrand = computed(() => {
        return shop.sidebar.brands.filter((brand) => {
            return brand.name.toLowerCase().match(searchByBrand.value.toLowerCase());
        });
    });
    
    const searchCategory = computed(() => {
        return shop.sidebar.categories.filter((category) => {
            return category.name.toLowerCase().match(searchByCategory.value.toLowerCase());
        });
    });
    // For Quick View Modal ****************************************************
    let myModal;
    const selectedProduct =ref({
        id:1,
        name:'Accusantium dolorem1',
        image:'./src/assets/images/product/large-size/1.jpg',
        gallery_image: [
            './src/assets/images/product/large-size/1.jpg',
            './src/assets/images/product/large-size/2.jpg',
            './src/assets/images/product/large-size/3.jpg',
            './src/assets/images/product/large-size/4.jpg',
            './src/assets/images/product/large-size/5.jpg',
            './src/assets/images/product/large-size/6.jpg',
        ],
        regular_price: 46.00,
        offer_price: 0,
        discount:0,
    });
    const showQuickViewModal = (product) =>{
        myModal.show();
        selectedProduct.value = product;
    }

    // Product tab code here ***************************************************
    const gridProducts = ref('active');
    const listProducts = ref('');
    const showTabItem = (type) =>{
        if(type=='grid'){
            gridProducts.value = 'active';
            listProducts.value = '';
        }else{
            gridProducts.value = '';
            listProducts.value = 'active'; 
        }
    }

    const toggle = (event) => {
    const element = $(event.currentTarget).parent('li');

    if (element.hasClass('open')) {
        // If the submenu is open, close it
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp();
    } else {
        // If the submenu is closed, open it
        element.addClass('open');
        element.children('ul').slideDown();
        element.siblings('li').children('ul').slideUp();
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp();
    }
};

    onMounted(() => {
        shop.getSidebarData();
        getProducts();
        myModal = new bootstrap.Modal(document.getElementById('quickViewModal'))
    })
</script>
<template>
    <div>
        <!-- Begin Li's Breadcrumb Area -->
        <div class="breadcrumb-area">
            <div class="container">
                <div class="breadcrumb-content">
                    <ul>
                        <li><router-link :to="{name: 'home'}">Home</router-link></li>
                        <li class="active">Shop</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Li's Breadcrumb Area End Here -->
        <!-- Begin Li's Content Wraper Area -->
        <div class="content-wraper pt-60 pb-60 pt-sm-30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 order-1 order-lg-2">
                        <!-- shop-top-bar start -->
                        <div class="shop-top-bar">
                            <div class="shop-bar-inner">
                                <div class="product-view-mode">
                                    <!-- shop-item-filter-list start -->
                                    <ul class="nav shop-item-filter-list" role="tablist">
                                        <li class="active" role="presentation"><a @click.prevent="showTabItem('grid')"><i class="fa fa-th"></i></a></li>
                                        <li role="presentation"><a @click.prevent="showTabItem('list')"><i class="fa fa-th-list"></i></a></li>
                                    </ul>
                                    <!-- shop-item-filter-list end -->
                                </div>
                                <div class="toolbar-amount" v-if="products.data">
                                    <span>Showing {{ products.meta.from }}-{{ products.meta.to > products.meta.total ? products.meta.total : products.meta.to }} of {{ products.meta.total }} item(s)</span>
                                </div>
                            </div>
                            <!-- product-select-box start -->
                            <div class="product-select-box d-flex">
                                <div class="product-short me-2">
                                    <p>Show :</p>
                                    <select class="nice-select" style="width: 100px;" v-model="show" @change="getProducts">
                                        <option value="20">20</option>
                                        <option value="48">48</option>
                                        <option value="80">80</option>
                                        <option value="120">120</option>
                                    </select>
                                </div>  
                                <div class="product-short">
                                    <p>Sort By:</p>
                                    <select class="nice-select" style="width: 200px;" v-model="sort" @change="getProducts">
                                        <option value="default">Default</option>
                                        <option value="new">New</option>
                                        <option value="feature">Featured</option>
                                        <option value="winter">Winter</option>
                                        <option value="popular">Popular</option>
                                    </select>
                                </div>
                            </div>
                            <!-- product-select-box end -->
                        </div>
                        <!-- shop-top-bar end -->
                        <!-- shop-products-wrapper start -->
                        <div class="shop-products-wrapper">
                            <div class="tab-content">
                                <div id="grid-view" class="tab-pane fade show" :class="gridProducts" role="tabpanel">
                                    <div class="product-area shop-product-area">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-6 mt-40" v-for="(product, index) in products.data" :key="index">
                                                <templete v-if="loader">
                                                    <div class="row">
                                                        <ProductSkeleton :dataAmount="1"/>
                                                    </div>
                                                </templete>
                                                <template v-else>
                                                    <Products :product="product" :showQuickViewModal="() => showQuickViewModal(product)"/>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="list-view" class="tab-pane fade product-list-view" :class="listProducts" role="tabpanel">
                                    <div class="row">
                                        <div class="col">
                                            <div class="row product-layout-list" v-for="(product, index) in products.data" :key="index">
                                                <div class="col-lg-3 col-md-5 ">
                                                    <div class="product-image">
                                                        <router-link :to="{name: 'product-details', params: {slug: product.slug}}">
                                                            <img :src="$filters.makeImgPath(product.thumbnail)" alt="Li's Product Image">
                                                        </router-link>
                                                        <span class="sticker">New</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-5 col-md-7">
                                                    <div class="product_desc">
                                                        <div class="product_desc_info">
                                                            <div class="product-review">
                                                                <h5 class="manufacturer">
                                                                    <router-link :to="{name: 'product-details', params: {slug:product.slug}}">Graphic Corner</router-link>
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
                                                            <h4><router-link class="product_name" :to="{name: 'product-details', params: {slug:product.slug}}">{{product.name}}</router-link></h4>
                                                            <div class="price-box">
                                                                <span class="new-price new-price-2">$ {{ product.offer_price }}</span>
                                                                <span class="old-price">$ {{ product.regular_price }}</span>
                                                                <span class="discount-percentage">- {{ product.discount }}%</span>
                                                            </div>
                                                            <p>Beach Camera Exclusive Bundle - Includes Two Samsung Radiant 360 R3 Wi-Fi Bluetooth Speakers. Fill The Entire Room With Exquisite Sound via Ring Radiator Technology. Stream And Control R3 Speakers Wirelessly With Your Smartphone. Sophisticated, Modern Desig</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="shop-add-action mb-xs-30">
                                                        <ul class="add-actions-link">
                                                            <li class="add-cart"><a href="#">Add to cart</a></li>
                                                            <li class="wishlist"><a href="wishlist.html"><i class="fa fa-heart-o"></i>Add to wishlist</a></li>
                                                            <li><a class="quick-view" @click="showQuickViewModal" href="#"><i class="fa fa-eye"></i>Quick view</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="paginatoin-area" v-if="products.data">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 pt-xs-15 d-flex align-items-center">
                                            <p>Showing {{ products.meta.from }}-{{ products.meta.to > products.meta.total ? products.meta.total : products.meta.to }} of {{ products.meta.total }} item(s)</p>
                                        </div>
                                        <div class="col-lg-6 col-md-6">
                                            <ul class="pagination-box pt-xs-20 pb-xs-15">
                                                <Bootstrap5Pagination
                                                    :data="products"
                                                    @pagination-change-page="getProducts"
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
                    <div class="col-lg-3 order-2 order-lg-1">
                        <!--sidebar-categores-box start  -->
                        <template v-if="loader">
                            <SidebarSkalaton/>
                        </template>
                        <template v-else>
                            <div class="sidebar-categores-box mt-sm-30 mt-xs-30">
                                <div class="sidebar-title">
                                    <h2>Categories</h2>
                                </div>
                                <!-- category-sub-menu start -->
                                <div class="category-sub-menu" v-if="shop.sidebar.categories">
                                    <input type="text" class="search-btn mt-2" style="border-radius: 10px;" placeholder="Search Cetegory" v-model="searchByCategory">
                                    <ul>
                                        <li class="has-sub" v-for="(category, index) in searchCategory" :key="index">
                                            <a href="# " @click.prevent="toggle">{{ category.name }} ({{ category.products_count }})</a>
                                            <ul>
                                                <li><a href="#">All Videos</a></li>
                                                <li><a href="#">Blouses</a></li>
                                                <li><a href="#">Evening Dresses</a></li>
                                                <li><a href="#">Summer Dresses</a></li>
                                                <li><a href="#">T-Rent or Buy</a></li>
                                                <li><a href="#">Your Watchlist</a></li>
                                                <li><a href="#">Watch Anywhere</a></li>
                                                <li><a href="#">Getting Started</a></li>  
                                            </ul>
                                        </li>
                                        <li v-if="searchCategory.length == 0">
                                            <img :src="$filters.makeImgPath('/nodata.png')" width="240" style="border-radius:20px" alt="">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                        
                        <div class="sidebar-categores-box" v-if="!loader">
                            <div class="sidebar-title">
                                <h2>Brand</h2>
                            </div>
                            <div class="filter-sub-area">
                                <input type="text" class="search-btn mt-2" style="border-radius: 10px;" placeholder="Search Brand" v-model="searchByBrand">
                                <div class="categori-checkbox">
                                    <form action="#">
                                        <ul v-if="shop.sidebar.brands">
                                            <li v-for="(brand, index) in searchBrand" :key="index">
                                                <input :id="`brand${index}`" type="checkbox" name="product-category">
                                                <label :for="`brand${index}`" class="text-light ms-2" style="cursor: pointer;">{{brand.name}} ({{ brand.products_count }})</label>
                                            </li>
                                            <li v-if="searchBrand.length == 0">
                                                <img :src="$filters.makeImgPath('/nodata.png')" width="240" style="border-radius:20px" alt="">
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </div>


                            <div class="row">
                                <h5 class="filter-sub-titel" style="font-size: 18px;color: #fff;">Filter By Price</h5>    
                                <div class="col-md-12 mt-2" v-if="sidebar.price">
                                    <input type="text" class="search-btn" style="border-radius: 10px;" :placeholder="`Min - ${$filters.currencySymbol(sidebar.price.min_price)}`">
                                </div>
                                <div class="col-md-12 mt-2" v-if="sidebar.price">
                                    <input type="text" class="search-btn" style="border-radius: 10px;" :placeholder="`Min - ${$filters.currencySymbol(sidebar.price.max_price)}`">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-12 m-auto"><button class="search-btn"><i class="fas fa-search"> Search</i></button></div>
                            </div>
                            <!-- btn-clear-all end -->
                            
                        </div>
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
    .col-lg-3.col-md-3.col-sm-6.mt-40 {
      padding: 0;
    }
    .col-lg-3.col-md-3.col-sm-6.mt-40 .add-cart{
      width: 110px !important;
    }
    .search-btn{
        padding: 10px 20px;
        border: none;
        width: 100%;
        letter-spacing: 2px;
        border-radius: 10px;
    }
    .search-btn:focus{
        background-color: #fff;
    }

    .category-sub-menu ul {
        max-height: 300px;
        overflow-y: scroll;
        scrollbar-width: thin;
        margin-top: 10px;
    }

    .category-sub-menu ul::-webkit-scrollbar {
        width: 4px !important;
    }

    .category-sub-menu ul::-webkit-scrollbar-thumb {
        background-color: #0a7485 !important;
        border-radius: 4px;
    }

    .category-sub-menu ul::-webkit-scrollbar-track {
        background-color: #60d8eb !important;
    }
    
    .categori-checkbox ul {
        max-height: 300px;
        overflow-y: scroll;
        scrollbar-width: thin;
        margin-top: 10px;
    }

    .categori-checkbox ul::-webkit-scrollbar {
        width: 4px !important;
    }

    .categori-checkbox ul::-webkit-scrollbar-thumb {
        background-color: #0a7485 !important;
        border-radius: 4px;
    }

    .categori-checkbox ul::-webkit-scrollbar-track {
        background-color: #60d8eb !important;
    }
</style>