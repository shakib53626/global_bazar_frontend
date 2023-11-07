import { defineStore } from 'pinia'

export const useOfferBanner = defineStore('banner', {
    state: () => ({ 
        offersBanner: [],
    }),
    getters: {

    },
    actions: {
        async getOfferBannerData(){
            try {
                this.offersBanner = [
                    {   
                        id:1,
                        name:'Accusantium dolorem1',
                        image:'./src/assets/images/banner/1_3.jpg',
                    },
                    {   
                        id:2,
                        name:'Accusantium dolorem2',
                        image:'./src/assets/images/banner/1_4.jpg',
                    },
                    {   
                        id:3,
                        name:'Accusantium dolorem3',
                        image:'./src/assets/images/banner/1_5.jpg',
                    },
                ]
            } catch (error) {
                console.log(error);
            }
        }
    },
})