import axiosInstance from '@/service/axiosService';
import { useNotification, useCart } from '@/stores';
import { defineStore } from "pinia";

export const useCoupon = defineStore('coupon',{
    state:()=>({
        coupon   : [],
    }),

    getters:{
        coupnDiscount: (state) =>{
            const cart = useCart();
            if(state.coupon.type == 'fixed'){
                return state.coupon.value;
            }else if(state.coupon.type == 'percent'){
                return parseInt((state.coupon.value/100)*cart.totalDiscountPrice);
            }else{
                return 0;
            }
        }
    },

    actions:{
        async apply(code){
            try {
                const res = await axiosInstance.post('/apply-coupon', {
                    code : code,
                });
                if(res.status === 200){
                    this.coupon = res.data.data
                    const notification = useNotification();
                    notification.Success("Coupon Applyed Successfully");
                }
            } catch (error) {
                if(error.response){
                    if(error.response.status == 404){
                        const notification = useNotification();
                        notification.Error("Coupon Code is Not Valid");
                        this.coupon = {};
                    }
                }
            }
        }
    }
})