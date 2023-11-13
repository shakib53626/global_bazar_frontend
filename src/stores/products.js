import axios from 'axios';
import { defineStore } from 'pinia'

export const useProducts = defineStore('products', {
    state: () => ({ 
        products: [],
        sale: [],
        popular:[],
        feature:[],
    }),
    getters: {

    },
    actions: {
        async getProductsData(type=''){
            try {
                const res = await axios.get(`/products?conditions=${type}`);
                
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
            }
        }
    },
})