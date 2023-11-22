import axiosInstance from '@/service/axiosService';
import { defineStore } from "pinia";

export const useAddress = defineStore('address',{
    state:()=>({
        divisions   : [],
        districts   : [],
        districtLoader: false,
    }),

    actions:{
        async getDivisions(){
            try {
                const res = await axiosInstance.get('/divisions');
                if(res.status === 200){
                    this.divisions = res.data.data
                }
            } catch (error) {
                console.log(error);
            }
        },

        async getDistrict( divisionId){
            this.districtLoader = true;
            try {
                const res = await axiosInstance.get(`/district/${divisionId}`);
                if(res.status === 200){
                    this.districts = res.data.data
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.districtLoader = false;
            }
        }
    }
})