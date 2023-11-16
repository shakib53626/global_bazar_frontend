<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import {useSellers} from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue';

const seller    = useSellers();
const {sellers} = storeToRefs(seller);
const itemAmount= ref(20);

const getSellers = async(page=1) =>{
    await seller.getSellers(page, itemAmount.value);
}

onMounted(()=>{
    getSellers();   
})

</script>
<template>
    <div>
        <div class="breadcrumb-area">
            <div class="container">
                <div class="breadcrumb-content">
                    <ul>
                        <li><router-link :to="{name:'home'}">Home</router-link></li>
                        <li class="active">Sellers</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="li-main-blog-page pt-4 pb-55">
            <div class="container">
                <div class="row">
                    <!-- Begin Li's Main Content Area -->
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-2 d-flex align-items-center mb-4">
                                <label for="">Show : </label>
                                <select name="" id="" class="form-control ms-2" style="width: 60px;" v-model="itemAmount" @change="getSellers">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
                        <div class="row li-main-content">
                            <div class="col-lg-2 col-md-2 sellers-body me-4 mb-4" v-for="(seller, index) in sellers.data" :key="index">
                                <div class="li-blog-single-item">
                                    <div class="li-blog-banner">
                                        <a href="blog-details-left-sidebar.html">
                                            <img class="img-full" :src="seller.image" alt="">
                                        </a>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details text-center">
                                            <h5 class="li-blog-heading seller-title">
                                                <a href="blog-details-left-sidebar.html">{{ seller.name }}</a>
                                            </h5>
                                            <p>{{ seller.products_count }} Products</p>
                                            <router-link :to="{name:'seller_store', params:{slug: seller.slug}}" class="btn btn-info" style="width: 100%;">Visit Store</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Begin Li's Pagination Area -->
                            <div class="col-lg-12 mt-5">
                                <div class="li-paginatoin-area text-center pt-25">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <ul class="li-pagination-box">
                                                <Bootstrap5Pagination
                                                    :data="sellers"
                                                    @pagination-change-page="getSellers"
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
                            <!-- Li's Pagination End Here Area -->
                        </div>
                    </div>
                    <!-- Li's Main Content Area End Here -->
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .sellers-body{
        border: 1px solid #d1d1d1;
        border-radius: 10px;
        padding: 10px;
    }
    .sellers-body:hover{
        border: 1px solid green;
    }
    .seller-title{
        margin-bottom: 0;
        margin-top: 10px;
    }
    .li-blog-heading{
        font-size: 16px;
        font-weight: 500;
    }
    .page-item.active .page-link{
        background-color: transparent;
        border: 1px solid #dee2e6;
    }
    .pagination{
        justify-content: center;
    }
</style>