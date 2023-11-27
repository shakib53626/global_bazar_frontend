import { defineStore } from 'pinia';
import axiosInstance from '../service/axiosService';

export const useAuth = defineStore("auth", {
    state:() => ({ 
        user:{},
        errors:{},
        logoutLoading : false,
        profileLoading: false,
     }),

     persist:['user'],

     getters:{},
     
     actions:{
        async login(formData){
            try {
                const res = await axiosInstance.post('/user/login', formData);
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

        async register(formData){
            try {
                const res = await axiosInstance.post('/user/register', formData);
                if(res.status === 201){
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
        
        async otpVerify(verifyData){
            try {
                const res = await axiosInstance.post('/user/otp-verify', verifyData);
                console.log(res.data);
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

        async logout(){
            this.logoutLoading = true;
            try {
                const res = await axiosInstance.post('user/logout');
                if(res.status === 200){
                    this.user = {};
                    return new Promise((resolve) => {
                        resolve(res.data);
                    });
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.logoutLoading = false;
            }
        },

        async updateProfile(profileInfo){
            this.profileLoading = true;
            try {
                const res = await axiosInstance.post('/user/profile-update', profileInfo);
                if (res.status===200) {
                    this.user.data = res.data.data
                    return new Promise((resolve) => {
                        resolve(res.data);
                    });
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.profileLoading = false;
            }
        },

        async updatePassword(data){
            try {
                const res = await axiosInstance.put('/user/password-update', data);
                if(res.status===200){
                    return new Promise((resolve) => {
                        resolve(res);
                    });
                }
            } catch (error) {
                if(error.response){
                    return new Promise((reject) => {
                        reject(error.response.data.errors);
                    });
                }
            }
        }
     },

})