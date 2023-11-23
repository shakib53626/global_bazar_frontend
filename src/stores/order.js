import axiosInstance from '@/service/axiosService';
import { defineStore } from "pinia";

export const useOrder = defineStore('order',{
    state:()=>({
        categories   : [],
    }),

    actions:{
        async placeOrder(orderInfo){
            try {
                const res = await axiosInstance.post('/place-order', orderInfo);
                console.log(res);
                if(res.status === 200){
                    this.categories = res.data.data
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
})