<script setup>
   import { Form, Field } from 'vee-validate';
   import * as yup from 'yup';
   import { reactive, ref } from 'vue';
   import { useRouter } from 'vue-router';
   import {useAuth, useNotification} from '@/stores'


   const showPassword = ref(false);
   const veryfiOtp    = ref(false);
   const verifyData   = reactive({
    phone: '',
    otp_code : '',
   })
   const auth         = useAuth();
   const router       = useRouter();
   const notification = useNotification();

    const schema = yup.object({
        name: yup.string().required(),
        email: yup.string().required().email(),
        phone: yup.string().required("Phone Number field is required").min(11),
        password: yup.string().required().min(8),
        password_confirmation: yup.string().required('Password Confirmation is required').min(8).oneOf([yup.ref('password'), null], 'Password and confirmation password must be match'),
    });

     const submit = async(values, {setErrors}) =>{
        let res = await auth.register(values);
        if(res.data){
            router.push({name:'home'})
            notification.Success("Registration Seccess")
        }else{
            setErrors(res);
        }
    }

    const toggleShow = () =>{
        showPassword.value = !showPassword.value
    }

    // For Otp Veryfication******************************

    const schemaotpVerify = yup.object({
        otp_code: yup.string().required('Input You Otp Code').min(6),
    });

    const otpVerify = async(values, {setErrors}) =>{
        let res = await auth.otpVerify(verifyData);
        if(res.data){
            router.push({name:'home'})
            veryfiOtp.value=false;
            notification.Success("Registration Seccess")
        }else{
            setErrors(res);
        }
    }
</script>
<template>
    <div>
        <!-- Begin Li's Breadcrumb Area -->
        <div class="breadcrumb-area">
            <div class="container">
                <div class="breadcrumb-content">
                    <ul>
                        <li><router-link :to="{name:'home'}">Home</router-link></li>
                        <li class="active">Register</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Li's Breadcrumb Area End Here -->
        <!-- Begin Login Content Area -->
        <div class="page-section mb-60">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xs-12 mt-30 mx-auto" v-if="!veryfiOtp">
                        <Form @submit="submit" :validation-schema="schema" v-slot="{errors, isSubmitting}">
                            <div class="login-form">
                                <h4 class="login-title">Register</h4>
                                <div class="row">
                                    <div class="col-md-12 col-12 mb-20">
                                        <label>Name <span class="text-danger">*</span></label>
                                        <Field 
                                            name="name"
                                            class="mb-0" 
                                            type="text" 
                                            placeholder="Enter Full Name"
                                        />
                                        <span class="text-danger">{{errors.name}}</span>
                                    </div>
                                    <div class="col-md-12 mb-20">
                                        <label>Email Address <span class="text-danger">*</span></label>
                                        <Field 
                                            name="email"
                                            class="mb-0" 
                                            type="email" 
                                            placeholder="Email Address"
                                        />
                                        <span class="text-danger">{{errors.email}}</span>
                                    </div>
                                    <div class="col-md-12 mb-20">
                                        <label>Phone Number <span class="text-danger">*</span></label>
                                        <Field 
                                            name="phone"
                                            class="mb-0" 
                                            type="text"
                                            v-model="verifyData.phone"
                                            placeholder="Enter Phone Number"
                                        />
                                        <span class="text-danger">{{errors.phone}}</span>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Password</label>
                                        <Field 
                                            name="password"
                                            class="mb-0" 
                                            :type="showPassword?'text':'password'" 
                                            placeholder="Password"
                                        />
                                        <span class="text-danger">{{errors.password}}</span>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Confirm Password</label>
                                        <Field
                                            name="password_confirmation" 
                                            class="mb-0" 
                                            :type="showPassword?'text':'password'" 
                                            placeholder="Confirm Password"
                                        />
                                        <span class="text-danger">{{errors.password_confirmation}}</span>
                                    </div>
                                    <div class="col-md-6 mb-20">
                                        <span class="d-flex align-items-center"><input type="checkbox" class="my-auto me-2" @click="toggleShow"> Show Password</span>
                                    </div>
                                    <div class="col-12 d-flex justify-content-between">
                                        <button class="register-button mt-0" v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> Loading</button>
                                        <button class="register-button mt-0" v-else>Register</button>
                                        <p>If you have any acount ? <router-link :to="{name:'login'}">Login</router-link></p>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xs-12 mt-30 mx-auto" v-else>
                        <Form @submit="otpVerify" :validation-schema="schemaotpVeryfi" v-slot="{errors, isSubmitting}">
                            <div class="login-form">
                                <h4 class="login-title">Veryfi Your Phone</h4>
                                <div class="row">
                                    <div class="col-md-12 col-12 mb-20">
                                        <label>Veryfication Code <span class="text-danger">*</span></label>
                                        <Field 
                                            name="otp_code"
                                            class="mb-0" 
                                            type="text"
                                            v-model="verifyData.otp_code"
                                            placeholder="Enter Otp Code"
                                        />
                                        <span class="text-danger">{{errors.otp_code}}</span>
                                    </div>
                                    <div class="col-12 d-flex justify-content-between">
                                        <button class="register-button mt-0" v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> Loading</button>
                                        <button class="register-button mt-0" v-else>Verify</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Login Content Area End Here --> 
    </div>
</template>
<style>
    
</style>