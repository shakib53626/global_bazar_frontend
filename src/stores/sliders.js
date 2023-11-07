import { defineStore } from 'pinia'

export const useSlider = defineStore('slider', {
    state: () => ({ 
        sliders: [],
    }),
    getters: {

    },
    actions: {
        async getSliderData(){
            try {
                this.sliders = [
                    {   
                        id:1,
                        name:'Accusantium dolorem1',
                        image:'./src/assets/images/bg-banner/1.png',
                    },
                    {   
                        id:2,
                        name:'Accusantium dolorem2',
                        image:'./src/assets/images/bg-banner/2.png',
                    },
                    {   
                        id:3,
                        name:'Accusantium dolorem3',
                        image:'./src/assets/images/bg-banner/3.png',
                    },
                ]
            } catch (error) {
                console.log(error);
            }
        }
    },
})