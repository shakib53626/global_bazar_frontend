import axios from "axios";
import { defineStore } from "pinia";

export const useCategories = defineStore('categories',{
    state:()=>({
        categories : [],    
    }),

    actions:{
        async getCaegories(){
            try {
                const res = await axios.get('/categories');
                if(res.status === 200){
                    this.categories = res.data.data
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
})