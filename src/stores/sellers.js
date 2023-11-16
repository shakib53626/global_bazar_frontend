import axiosInstance from "@/service/axiosService";
import { defineStore } from "pinia";

export const useSellers = defineStore('sellers',{
    state:()=>({
        sellers      : [],
        store        : [],
        storeProducts: [],
        sellerLoader : false,
    }),

    actions:{
        async getSellers(page, showAmound){
            this.sellerLoader = true;
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
            }finally{
                this.sellerLoader = false;
            }
        },

        async sellerProduct(sellerSlug, page, showAmound, sort){
            this.sellerLoader = true;
            try {
                const res = await axiosInstance.get(`/seller/products/${sellerSlug}`, {
                    params:{
                        page: page,
                        show: showAmound,
                        sort: sort,
                    }
                });
                if(res.status === 200){
                    this.store         = res.data.data
                    this.storeProducts = res.data.products
                    console.log(res.data.products);
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.sellerLoader = false;
            }
        }
    }
})