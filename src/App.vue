<script setup>
    import {Header, Footer} from '@/components/comon';
</script>

<template>
  <div class="body-wrapper">
    <!-- Begin Header Area -->
    <Header/>

    <router-view></router-view>
    
    <!-- Begin Footer Area -->
    <Footer/>
    <!-- Quick View | Modal Area End Here -->
    
</div>
</template>

<style>
</style>
