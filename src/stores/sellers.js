import axiosInstance from "@/service/axiosService";
import { defineStore } from "pinia";

export const useSellers = defineStore('sellers',{
    state:()=>({
        sellers : [],    
    }),

    actions:{
        async getSellers(page, showAmound){
            try {
                const res = await axiosInstance.get(`/sellers`,{
                    params:{
                        page : page,
                        show : showAmound,
                    }
                });
                if(res.status === 200){
                    this.sellers = res.data
                }
            } catch (error) {
                console.log(error);
            }
        },

        async sellerProduct(sellerId){
            console.log(sellerId);
            try {
                const res = await axiosInstance.get(`/seller/products/${sellerId}`);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
    }
})