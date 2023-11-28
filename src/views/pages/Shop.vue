<script setup>
    import { Bootstrap5Pagination } from 'laravel-vue-pagination';
    import {ref, onMounted, computed, watch} from 'vue'
    import {QuickViewModal, Products, ProductSkeleton, SidebarSkalaton} from '@/components';
    import {useShop} from '@/stores'
    import { storeToRefs } from 'pinia';
    import { useRoute } from 'vue-router';


    // Products show code here *********************************************************************
    const all              = ref('all');
    const sort             = ref('default');
    const show             = ref(48);
    const route            = useRoute();
    const shop             = useShop();
    const searchByBrand    = ref("");
    const searchByCategory = ref("");
    const searchQuery      = ref("");
    const price_range      = ref("");
    const selectedBrand    = ref([]);
    const selectedCategory = ref([]);
    const {products, loader, sidebar, sidebarLoader} = storeToRefs(shop);

    const getProducts = (page = 1) =>{
        shop.getProducts(page, show.value, all.value, selectedBrand.value, selectedCategory.value, price_range.value, searchQuery.value, sort.value);
    }

    const clearCategory = () =>{
        selectedCategory.value = [];
        getProducts();
    }
    
    const clearBrand = () =>{
        selectedBrand.value = [];
        getProducts();
    }

    const queryProducts = () =>{
        selectedCategory.value = [];
        if(route.query.products){
            selectedCategory.value.push(route.query.products);
        }
    }
    
    const queryHeaderSearch = () =>{
        searchQuery.value = '';
        if(route.query.search){
            searchQuery.value = route.query.search;
        }
    }

    // Brand and Category Search Code 

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

    // product search for type code here
    watch(() => [...searchQuery.value], (newValue, oldValue) => {
        if (newValue.length >= 3 || oldValue.length >= 3) {
            getProducts();
        }
    })

    // Menu bar category product show *************
    watch(() => route.query.products, (newValue, oldValue) => {
        queryProducts();
        getProducts();
    })
    
    watch(() => route.query.search, (newValue, oldValue) => {
        queryHeaderSearch();
        getProducts();
    })
    
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

    onMounted(() => {
        queryProducts();
        queryHeaderSearch();
        shop.getSidebarData();
        getProducts();
        myModal = new bootstrap.Modal(document.getElementById('quickViewModal'))
    })
</script>
<template>
    <div>
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

        <div class="content-wraper pt-60 pb-60 pt-sm-30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 order-1 order-lg-2">
                        <div class="shop-top-bar">
                            <div class="shop-bar-inner">
                                <div class="product-view-mode">
                                    <ul class="nav shop-item-filter-list" role="tablist">
                                        <li class="active" role="presentation"><a @click.prevent="showTabItem('grid')"><i class="fa fa-th"></i></a></li>
                                        <li role="presentation"><a @click.prevent="showTabItem('list')"><i class="fa fa-th-list"></i></a></li>
                                    </ul>
                                </div>
                                <!-- <div class="toolbar-amount" v-if="products.data">
                                    <span>Showing {{ products.meta.from }}-{{ products.meta.to > products.meta.total ? products.meta.total : products.meta.to }} of {{ products.meta.total }} item(s)</span>
                                </div> -->
                            </div>
                            <div class="product-select-box d-flex">
                                <div class="product-short me-2">
                                    <p>Show :</p>
                                    <select class="nice-select" style="width: 60px;" v-model="show" @change="getProducts">
                                        <option value="20">20</option>
                                        <option value="48">48</option>
                                        <option value="80">80</option>
                                        <option value="120">120</option>
                                    </select>
                                </div>  
                                <div class="product-short me=2">
                                    <p>Conditions:</p>
                                    <select class="nice-select" style="width: 100px;" v-model="all" @change="getProducts">
                                        <option value="all">All</option>
                                        <option value="new">New</option>
                                        <option value="feature">Featured</option>
                                        <option value="winter">Winter</option>
                                        <option value="popular">Popular</option>
                                    </select>
                                </div>
                                <div class="product-short ms-2">
                                    <p>Sort By:</p>
                                    <select class="nice-select" style="width: 150px;" v-model="sort" @change="getProducts">
                                        <option value="default">Default</option>
                                        <option value="priceLowToHigh">Lower to Higher Price</option>
                                        <option value="priceHighToLow">Higher to Lower Price</option>
                                        <option value="nameAtoZ">Name A to Z</option>
                                        <option value="nameZtoA">Name Z to A</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="shop-products-wrapper">
                            <div class="tab-content">
                                <div id="grid-view" class="tab-pane fade show" :class="gridProducts" role="tabpanel">
                                    <div class="product-area shop-product-area">
                                        <div class="row" v-if="products.data">
                                            <div class="col-lg-3 col-md-3 col-sm-6 mt-40" v-for="(product, index) in products.data" :key="index">
                                                <templete v-if="loader">
                                                    <div class="row" style="margin-top: -20px;">
                                                        <ProductSkeleton :dataAmount="1"/>
                                                    </div>
                                                </templete>
                                                <template v-else>
                                                    <Products :product="product" :showQuickViewModal="() => showQuickViewModal(product)"/>
                                                </template>
                                            </div>
                                            <div v-show="products.data.length == 0">
                                                <el-empty description="No Product Found" />
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
                                                        <span class="sticker">{{ product.conditions }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-5 col-md-7">
                                                    <div class="product_desc">
                                                        <div class="product_desc_info">
                                                            <div class="product-review">
                                                                <h5 class="manufacturer">
                                                                    <router-link :to="{name: 'shop', query: { products: product.slug } }">Graphic Corner</router-link>
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
                                                                <span class="new-price new-price-2">{{ $filters.currencySymbol(product.price - (product.discount/100)*product.price) }}</span>
                                                                <span class="old-price">{{ $filters.currencySymbol(product.price) }}</span>
                                                                <span class="discount-percentage">- {{ product.discount }}%</span>
                                                            </div>
                                                            <p>{{$filters.makeDescription(product.description, 150)}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="shop-add-action mb-xs-30">
                                                        <ul class="add-actions-link">
                                                            <li class="add-cart">
                                                                <a href="#"  @click.prevent="addToCart(product)">
                                                                    <i class="fas fa-spinner fa-spin" v-if="loading==product.id"></i> Add to Cart
                                                                </a>
                                                            </li>
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
                                                    :limit="1"
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
                    </div>
                    <div class="col-lg-3 order-2 order-lg-1">
                        <template v-if="sidebarLoader">
                            <SidebarSkalaton/>
                        </template>
                        <template v-else>
                            <div class="sidebar-categores-box mt-sm-30 mt-xs-30">
                                <input type="text" class="search-product mb-4 search-btn" placeholder="Search Products...." v-model="searchQuery">
                                
                                <div class="row mb-4" v-if="sidebar.price">
                                    <h5 class="filter-sub-titel" style="font-size: 18px;color: #fff;">Filter By Price</h5>   
                                
                                    <el-slider v-model="price_range" range :min="sidebar.price.min_price" :max="sidebar.price.max_price" @change="getProducts" />

                                    <div class="col-md-6 mt-2" v-if="sidebar.price">
                                        <input type="text" class="search-btn price-btn" disabled :placeholder="`Min-${price_range[0] == null ? $filters.currencySymbol(sidebar.price.min_price) : $filters.currencySymbol(price_range[0])}`">
                                    </div>
                                    <div class="col-md-6 mt-2" v-if="sidebar.price">
                                        <input type="text" class="search-btn price-btn" disabled :placeholder="`Max-${price_range[1] == null ? $filters.currencySymbol(sidebar.price.max_price) : $filters.currencySymbol(price_range[1])}`">
                                    </div>
                                </div>

                                <div class="sidebar-title">
                                    <h2>Categories</h2>
                                </div>
                                <div class="category-sub-menu" v-if="shop.sidebar.categories">
                                    <input type="text" class="search-btn mt-2" style="border-radius: 10px;" placeholder="Search Cetegory" v-model="searchByCategory">
                                    <ul>
                                        <li class="has-sub d-flex align-items-center" v-for="(category, index) in searchCategory" :key="index">
                                            <input :id="`category${index}`" style="height: 15px;width: 15px;" type="checkbox" :value="category.slug" v-model="selectedCategory" @change.prevent="getProducts">
                                            <label :for="`category${index}`" class="text-light ms-2 mb-0" style="cursor: pointer;">{{category.name}} ({{ category.products_count }})</label>
                                        </li>
                                        <li v-if="searchCategory.length == 0">
                                            <el-empty description="No Category Found"/>
                                        </li>
                                    </ul>
                                    <button class="search-btn mt-4 text-dark" @click.prevent="clearCategory"><i class="fas fa-trash"></i> Clear Filter</button>
                                </div>
                            </div>
                        </template>
                        
                        <div class="sidebar-categores-box" v-if="!sidebarLoader">
                            <div class="sidebar-title">
                                <h2>Brand</h2>
                            </div>
                            <div class="filter-sub-area">
                                <input type="text" class="search-btn mt-2" style="border-radius: 10px;" placeholder="Search Brand" v-model="searchByBrand">
                                <div class="categori-checkbox">
                                    <form action="#">
                                        <ul v-if="shop.sidebar.brands">
                                            <li v-for="(brand, index) in searchBrand" :key="index">
                                                <input :id="`brand${index}`" type="checkbox" :value="brand.slug" v-model="selectedBrand" @change.prevent="getProducts">
                                                <label :for="`brand${index}`" class="text-light ms-2" style="cursor: pointer;">{{brand.name}} ({{ brand.products_count }})</label>
                                            </li>
                                            <li v-if="searchBrand.length == 0">
                                                <el-empty description="No Brand Found"/>
                                            </li>
                                        </ul>
                                    </form>
                                    <button class="search-btn mt-4 text-dark" @click.prevent="clearBrand"><i class="fas fa-trash"></i> Clear Filter</button>
                                </div>
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
        padding: 5px 20px;
        border: none;
        width: 100%;
        letter-spacing: 2px;
        border-radius: 10px;
    }
    .price-btn{
        padding: 5px 10px;
        letter-spacing: 0.5px;
    }
    .search-product{
        padding: 10px 20px !important;
    }
    .search-btn:focus{
        background-color: #fff;
    }
    .search-product{
        height: 45px !important;
    }
    .sidebar-categores-box input{
        height: 30px;
    }
    .category-sub-menu ul {
        max-height: 300px;
        overflow-y: scroll;
        scrollbar-width: thin;
        margin-top: 10px;
    }

    .category-sub-menu .el-empty__description p, 
    .categori-checkbox .el-empty__description p{
        color: #fff;
        font-size: 20px;
        font-weight: 700;
    }
    .el-empty__description p{
        font-size: 24px;
        font-weight: 700;
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
    .el-slider {
        --el-slider-main-bg-color: #FFDE59 !important;
        --el-slider-runway-bg-color: white !important;
    }
</style>