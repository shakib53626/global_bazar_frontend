import axios from 'axios';
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
                const res = await axios.get('/sliders');
                this.sliders = res.data
            } catch (error) {
                console.log(error);
            }
        }
    },
})