<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        dataAmount:{
            type:Number,
            required: true,
            default:3,
        }
    });
</script>
<template>
    <div class="single-banner">
        <a href="#">
            <div class="ssc ssc-card p-3" style="border:1px solid #cecece">
                <div class="ssc-square" style="height:200px"></div>
            </div>
        </a>
    </div>
    
</template>
<style lang="">
    
</style>