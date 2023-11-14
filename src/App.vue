<script setup>
    import {Header, Footer} from '@/components';
</script>

<template>
  <div class="body-wrapper">
    <!-- Begin Header Area -->
    <Header/>

    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <!-- Begin Footer Area -->
    <Footer/>
    <!-- Quick View | Modal Area End Here -->
    
</div>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

</style>
