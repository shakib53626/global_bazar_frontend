import axiosInstance from "@/service/axiosService";
import { defineStore } from 'pinia'

export const useProducts = defineStore('products', {
    state: () => ({ 
        products: [],
        sale: [],
        popular:[],
        feature:[],
        productLoading:false,
        productDetailsData: {},
    }),
    getters: {

    },
    actions: {
        async getProductsData(type=''){
            this.productLoading = true;
            try {
                const res = await axiosInstance.get(`/products?conditions=${type}`);
                
                if(res.status==200){
                    if (type==='sale') {
                        this.sale= res.data.data
                    }else if (type==='popular') {
                        this.popular= res.data.data
                    }else if (type==='feature') {
                        this.feature= res.data.data
                    }else{
                        this.products= res.data.data
                    }
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.productLoading = false;
            }
        },
        
        async getSingleProductData(slug){
            try {
                const res = await axiosInstance.get(`/single-product/${slug}`);
                
                if(res.status==200){
                    this.productDetailsData = res.data.data
                }
            } catch (error) {
                console.log(error);
            }finally{
            }
        }
    },
})