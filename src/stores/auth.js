import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuth = defineStore("auth", {
    state:() => ({ 
        errors:{},
     }),
     getters:{

     },
     actions:{
        async login(formData){
            try {
                const res = await axios.post('/user/login', formData);
                if(res.status === 200){

                }      
            } catch (error) {
                if(error.response.data){
                    this.errors = error.response.data.errors;
                }
            }
        },
     },

})