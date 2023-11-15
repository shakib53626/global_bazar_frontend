import { defineStore } from "pinia";

export const useCart = defineStore('cart',{
    state:()=>({
        cartItems : [],
        loading   : false,   
    }),
    persist:['cartItems'],
    getters:{
        totalPrice: (state) =>{
            let total = 0;
            state.cartItems.map((el) =>{
                total += el["price"] * el["quantity"]
            })
            return total;
        },
        cartItemsCount: (state) =>{
            let total = 0;
            state.cartItems.map((el) =>{
                total += el["quantity"]
            })
            return total;
        },
    },
    actions:{
        async addToCart(product){
            let item = product;
            this.loading = item.id
            if(this.cartItems.length>0){
                let boolean = this.cartItems.some((i)=> i.id === item.id);
                if(boolean){
                    let index = this.cartItems.findIndex((i)=> i.id === item.id);
                    this.cartItems[index]['quantity'] += item.quantity;
                }else{
                    this.cartItems.push(item);
                }
            }else{
                this.cartItems.push(item);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.loading = false;
        },

        async deleteItem(itemId){
            let index = this.cartItems.findIndex((i)=> i.id === itemId);
            this.cartItems.splice(index, 1);
        },
        
        async addQuantity(itemId){
            let index = this.cartItems.findIndex((i)=> i.id === itemId);
            if(this.cartItems[index]['quantity'] !== 10){
                this.cartItems[index]['quantity'] += 1;
            }
        },
        
        async minusQuantity(itemId){
            let index = this.cartItems.findIndex((i)=> i.id === itemId);
            if(this.cartItems[index]['quantity'] !== 1){
                this.cartItems[index]['quantity'] -= 1;
            }
        }
    }
})