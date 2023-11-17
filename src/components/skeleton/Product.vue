<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        dataAmount:{
            type:Number,
            required: true,
            default:5,
        }
    });
</script>
<template>
        <div class="col-lg-12 d-flex">
            <div class="ssc ssc-card me-3 seller" style="max-width: 220px" v-for="(data, index) in dataAmount" :key="index">
                <div class="ssc-wrapper">
                    <div class="ssc-square mb"></div>
                    <div class="flex align-center justify-between">
                        <div class="w-40">
                            <div class="ssc-line w-70 mbs"></div>
                            <div class="ssc-line w-100 mbs"></div>
                        </div>
                        <div class="ssc-head-line w-50"></div>
                    </div>
                </div>
                <div class="ssc-hr"></div>
                <div class="ssc-wrapper">
                    <div class="ssc-line w-90 mbs"></div>
                    <div class="ssc-line w-30 mbs"></div>
                    <div class="ssc-line w-70 mbs"></div>
                    <div class="ssc-line w-50 mbs"></div>
                </div>
                <div class="ssc-hr"></div>
                <div class="ssc-wrapper">
                    <div class="ssc-head-line"></div>
                </div>
            </div>
        </div>
    
</template>
<style lang="">
    
</style>