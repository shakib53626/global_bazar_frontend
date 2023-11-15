<script setup>
import {useSellers} from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';

const seller    = useSellers();
const {sellers} = storeToRefs(seller);

onMounted(()=>{
    // seller.getSellers();
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
        <div class="li-main-blog-page pt-60 pb-55">
            <div class="container">
                <div class="row">
                    <!-- Begin Li's Main Content Area -->
                    <div class="col-lg-12">
                        <div class="row li-main-content">
                            <div class="col-lg-2 col-md-2 sellers-body">
                                <div class="li-blog-single-item">
                                    <div class="li-blog-banner">
                                        <a href="blog-details-left-sidebar.html">
                                            <img class="img-full" src="seller.image" alt="">
                                        </a>
                                    </div>
                                    <div class="li-blog-content">
                                        <div class="li-blog-details text-center">
                                            <h5 class="li-blog-heading seller-title">
                                                <a href="blog-details-left-sidebar.html"></a>
                                            </h5>
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
                                                <li><a class="Previous" href="#">Previous</a></li>
                                                <li class="active"><a href="#">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a class="Next" href="#">Next</a></li>
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
</style>