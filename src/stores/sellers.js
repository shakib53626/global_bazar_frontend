import axiosInstance from "@/service/axiosService";
import { defineStore } from "pinia";

export const useSellers = defineStore('sellers',{
    state:()=>({
        sellers : [],    
    }),

    actions:{
        async getSellers(){
            try {
                const res = await axiosInstance.get('/sellers');
                if(res.status === 200){
                    this.sellers = res.data.data
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
})