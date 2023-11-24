import axiosInstance from '@/service/axiosService';
import { defineStore } from "pinia";

export const useOrder = defineStore('order',{
    state:()=>({
        categories: [],
        loading   : false,
    }),

    actions:{
        async placeOrder(orderInfo){
            this.loading = true;
            try {
                const res = await axiosInstance.post('/place-order', orderInfo);
                if(res.status === 201){
                    return new Promise((resolve) => {
                        resolve(res.data);
                    });
                }
            } catch (error) {
                if(error.response.data){
                    return new Promise((reject) => {
                        reject(error.response.data.errors);
                    });
                }
            }finally{
                this.loading = false;
            }
        }
    }
})