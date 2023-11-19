import axios from "axios";
import { defineStore } from "pinia";

export const useShop = defineStore('shop',{
    state:()=>({
        products     : [],
        sidebar      : [],
        loader       : false,
        sidebarLoader: false,
    }),

    actions:{
        async getProducts(page, show, sort, brand, category, price){
            this.loader = true;
            try {
                const res = await axios.get('/shop-products', {
                    params:{
                        page    : page,
                        show    : show,
                        sort    : sort,
                        brand   : brand,
                        category: category,
                        price   : price,
                    }
                });
                if(res.status === 200){
                    this.products = res.data
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loader = false;
            }
        },
        
        async getSidebarData(){
            this.sidebarLoader = true;
            try {
                const res = await axios.get('/shop-sidebar');
                if(res.status === 200){
                    this.sidebar = res.data.data
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.sidebarLoader = false;
            }
        }
    }
})