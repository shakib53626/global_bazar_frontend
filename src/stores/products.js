import axios from 'axios';
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
                const res = await axios.get('/products');
                this.products= res.data.data
                // this.products = [
                //     {   
                //         id:1,
                //         name:'Accusantium dolorem1',
                //         slug: 'product-1',
                //         image:'./src/assets/images/product/large-size/1.jpg',
                //         gallery_image: [
                //             './src/assets/images/product/large-size/1.jpg',
                //             './src/assets/images/product/large-size/2.jpg',
                //             './src/assets/images/product/large-size/3.jpg',
                //             './src/assets/images/product/large-size/4.jpg',
                //             './src/assets/images/product/large-size/5.jpg',
                //             './src/assets/images/product/large-size/6.jpg',
                //         ],
                //         regular_price: 46.00,
                //         offer_price: 0,
                //         discount:0,
                //     },
                //     {   
                //         id:2,
                //         name:'Accusantium dolorem2',
                //         slug: 'product-2',
                //         image:'./src/assets/images/product/large-size/2.jpg',
                //         gallery_image: [
                //             './src/assets/images/product/large-size/2.jpg',
                //             './src/assets/images/product/large-size/1.jpg',
                //             './src/assets/images/product/large-size/3.jpg',
                //             './src/assets/images/product/large-size/4.jpg',
                //             './src/assets/images/product/large-size/5.jpg',
                //             './src/assets/images/product/large-size/6.jpg',
                //         ],
                //         regular_price: 50.00,
                //         offer_price: 42.00,
                //         discount:10,
                //     },
                //     {   
                //         id:3,
                //         name:'Accusantium dolorem3',
                //         slug: 'product-3',
                //         image:'./src/assets/images/product/large-size/3.jpg',
                //         gallery_image: [
                //             './src/assets/images/product/large-size/3.jpg',
                //             './src/assets/images/product/large-size/1.jpg',
                //             './src/assets/images/product/large-size/2.jpg',
                //             './src/assets/images/product/large-size/4.jpg',
                //             './src/assets/images/product/large-size/5.jpg',
                //             './src/assets/images/product/large-size/6.jpg',
                //         ],
                //         regular_price: 46.00,
                //         offer_price: 0,
                //         discount:0,
                //     },
                //     {   
                //         id:4,
                //         name:'Accusantium dolorem4',
                //         slug: 'product-4',
                //         image:'./src/assets/images/product/large-size/4.jpg',
                //         gallery_image: [
                //             './src/assets/images/product/large-size/4.jpg',
                //             './src/assets/images/product/large-size/1.jpg',
                //             './src/assets/images/product/large-size/2.jpg',
                //             './src/assets/images/product/large-size/3.jpg',
                //             './src/assets/images/product/large-size/5.jpg',
                //             './src/assets/images/product/large-size/6.jpg',
                //         ],
                //         regular_price: 50.00,
                //         offer_price: 42.00,
                //         discount:10,
                //     },
                //     {   
                //         id:5,
                //         name:'Accusantium dolorem5',
                //         slug: 'product-5',
                //         image:'./src/assets/images/product/large-size/5.jpg',
                //         gallery_image: [
                //             './src/assets/images/product/large-size/5.jpg',
                //             './src/assets/images/product/large-size/1.jpg',
                //             './src/assets/images/product/large-size/2.jpg',
                //             './src/assets/images/product/large-size/3.jpg',
                //             './src/assets/images/product/large-size/4.jpg',
                //             './src/assets/images/product/large-size/6.jpg',
                //         ],
                //         regular_price: 46.00,
                //         offer_price: 0,
                //         discount:0,
                //     },
                //     {   
                //         id:6,
                //         name:'Accusantium dolorem6',
                //         slug: 'product-6',
                //         image:'./src/assets/images/product/large-size/6.jpg',
                //         gallery_image: [
                //             './src/assets/images/product/large-size/6.jpg',
                //             './src/assets/images/product/large-size/1.jpg',
                //             './src/assets/images/product/large-size/2.jpg',
                //             './src/assets/images/product/large-size/3.jpg',
                //             './src/assets/images/product/large-size/4.jpg',
                //             './src/assets/images/product/large-size/5.jpg',
                //         ],
                //         regular_price: 50.00,
                //         offer_price: 42.00,
                //         discount:10,
                //     },
                // ]

            } catch (error) {
                console.log(error);
            }
        }
    },
})