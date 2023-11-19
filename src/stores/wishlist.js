import { defineStore } from "pinia";
import axiosInstance from "@/service/axiosService";
import { useAuth } from "@/stores";

export const useWishlist = defineStore('wishlist',{
    state:()=>({
        wishlist : [],
        wishlistLoading : false,
    }),

    actions:{
        async index(){
            const res = await axiosInstance.get("/user/wishlists");
            if(res.status === 200){
                const auth = useAuth();
                auth.user.meta.wishlists = res.data.data
            }
        },

        async addToWishlist(product){
            this.wishlistLoading = product.id;
            try {
                const res = await axiosInstance.post('/user/wishlists', {
                    product_id :product.id,
                });
                if(res.status){
                    if(res.status===201){
                        const auth = useAuth();
                        auth.user.meta.wishlists.push(product);
                    }else{
                        const auth = useAuth();
                        let index = auth.user.meta.wishlists.findIndex((i) => i.id === product.id);
                        auth.user.meta.wishlists.splice(index, 1);
                    }
                    return new Promise((resolve) => {
                        resolve(res);
                    });
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.wishlistLoading = false;
            }
        }
    }
})