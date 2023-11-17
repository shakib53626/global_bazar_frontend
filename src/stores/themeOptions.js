import { defineStore } from 'pinia'

export const useThemeSetting = defineStore('themeSetting', {
    state: () => ({ 
        themesInfo: {},
        currency:'taka',
        language:'bangla',
    }),
    persist: {
        paths: ['currency', 'language'],
    },
    getters: {

    },
    actions: {
        async getThemeData(){
            try {
                this.themesInfo = {
                    phone_number: '+880 178 480 1663',
                    logo_image: './src/assets/images/menu/logo/logo.png',
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
})