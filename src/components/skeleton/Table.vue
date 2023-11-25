<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        dataAmount:{
            type:Number,
            required: true,
            default:10,
        }
    });

</script>
<template>
    <tr v-for="(data , index) in dataAmount" :key="index">
        <th scope="row"><div class="ssc-head-line w-100"></div></th>
        <td><div class="ssc-head-line w-100"></div></td>
        <td><div class="ssc-head-line w-100"></div></td>
        <td><div class="ssc-head-line w-100"></div></td>
        <td><div class="ssc-head-line w-100"></div></td>
        <td><div class="ssc-head-line w-100"></div></td>
        <td><div class="ssc-head-line w-100"></div></td>
        <td><div class="ssc-head-line w-100"></div></td>
        <td><div class="ssc-head-line w-100"></div></td>
    </tr>
</template>
<style lang="">
    
</style>