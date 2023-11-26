import axiosInstance from '@/service/axiosService';
import { defineStore } from "pinia";

export const useOrder = defineStore('order',{
    state:()=>({
        orders     : [],
        loading    : false,
        tableLoader: false,
        orderInfo: {},
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
        },

        async getOrders(){
            this.tableLoader = true;
            try {
                const res = await axiosInstance.get('/user/orders');
                this.orders = res.data.data
            } catch (error) {
                console.log(error);
            }finally{
                this.tableLoader = false;
            }
        },

        async getDetails(orderId){
            try {
                const res = await axiosInstance.get(`/user/order/${orderId}`);
                if(res.status===200){
                    this.orderInfo = res.data.data
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
})