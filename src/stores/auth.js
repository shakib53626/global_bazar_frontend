import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuth = defineStore("auth", {
    state:() => ({ 
        user:{},
        errors:{},
     }),

     persist:['user'],

     getters:{},
     
     actions:{
        async login(formData){
            try {
                const res = await axios.post('/user/login', formData);
                if(res.status === 200){
                    this.user = res.data;

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
            }
        },
     },

})