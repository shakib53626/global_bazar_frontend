import { defineStore } from 'pinia'

export const useProducts = defineStore('products', {
    state: () => ({ 
        products: [],
    }),
    getters: {

    },
    actions: {
        async getProductsData(){
            try {
                this.products = [
                    {   
                        id:1,
                        name:'Accusantium dolorem1',
                        image:'./src/assets/images/product/large-size/1.jpg',
                        regular_price: 46.00,
                        offer_price: 0,
                        discount:0,
                    },
                    {   
                        id:2,
                        name:'Accusantium dolorem2',
                        image:'./src/assets/images/product/large-size/2.jpg',
                        regular_price: 50.00,
                        offer_price: 42.00,
                        discount:10,
                    },
                    {   
                        id:1,
                        name:'Accusantium dolorem3',
                        image:'./src/assets/images/product/large-size/3.jpg',
                        regular_price: 46.00,
                        offer_price: 0,
                        discount:0,
                    },
                    {   
                        id:2,
                        name:'Accusantium dolorem4',
                        image:'./src/assets/images/product/large-size/4.jpg',
                        regular_price: 50.00,
                        offer_price: 42.00,
                        discount:10,
                    },
                    {   
                        id:1,
                        name:'Accusantium dolorem5',
                        image:'./src/assets/images/product/large-size/5.jpg',
                        regular_price: 46.00,
                        offer_price: 0,
                        discount:0,
                    },
                    {   
                        id:2,
                        name:'Accusantium dolorem6',
                        image:'./src/assets/images/product/large-size/3.jpg',
                        regular_price: 50.00,
                        offer_price: 42.00,
                        discount:10,
                    },
                ]
            } catch (error) {
                console.log(error);
            }
        }
    },
})