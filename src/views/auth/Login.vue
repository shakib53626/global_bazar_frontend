<script setup>
    import {ref, reactive, onMounted} from 'vue';
    import { useAuth, useNotification } from '@/stores'
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { useRouter } from 'vue-router';

    
    const showPassword  = ref(false);
    const auth          = useAuth();
    const router        = useRouter();
    const notification  = useNotification();
    
    const schema = yup.object({
        phone: yup.string().required("Phone Number field is required").min(11),
        password: yup.string().required(),
    });

    const toggleShow = () =>{
        showPassword.value = !showPassword.value
    }

    const submit = async(values, {setErrors}) =>{
        let res = await auth.login(values);
        if(res.data){
            router.push({name:'home'});
            notification.Success("Login Success")
        }else{
            setErrors(res);
        }
    }

    onMounted(() =>{
        // auth.login();
    });
</script>
<template>
    <div>
        <!-- Begin Li's Breadcrumb Area -->
        <div class="breadcrumb-area">
            <div class="container">
                <div class="breadcrumb-content">
                    <ul>
                        <li><router-link :to="{name:'home'}">Home</router-link></li>
                        <li class="active">Login</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Li's Breadcrumb Area End Here -->
        <!-- Begin Login Content Area -->
        <div class="page-section mb-60">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30 mt-30 mx-auto">
                        <!-- Login Form s-->
                        <Form @submit="submit" :validation-schema="schema" v-slot="{errors, isSubmitting}">
                            <div class="login-form">
                                <h4 class="login-title">Login</h4>
                                <div class="row">
                                    <div class="col-md-12 col-12 mb-20">
                                        <label>Phone Number*</label>
                                        <Field
                                            name="phone"
                                            class="mb-0 form-control"
                                            type="text"
                                            placeholder="Enter Phone Number"
                                        />
                                        <span class="text-danger">{{errors.phone}}</span>
                                    </div>
                                    <div class="col-12 mb-20">
                                        <label>Password</label>
                                        <span style="position:relative;display:block;">
                                            <Field
                                                name="password"
                                                class="mb-0 form-control"
                                                :type="showPassword?'text':'password'"
                                                placeholder="Password"
                                            />
                                            <span class="text-danger">{{errors.password}}</span>
                                            <span @click="toggleShow">
                                                <i :class="{
                                                    'fas fa-eye eye_icon': !showPassword,
                                                    'fas fa-eye-slash eye_icon': showPassword,
                                                }"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="check-box d-inline-block ml-0 ml-md-2 mt-10">
                                            <input type="checkbox" id="remember_me">
                                            <label for="remember_me">Remember me</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4 mt-10 mb-20 text-left text-md-right">
                                        <a href="#"> Forgotten pasward?</a>
                                        <p><router-link :to="{name:'register'}">Register Here</router-link></p>
                                    </div>
                                    <div class="col-md-12">
                                        <button class="register-button mt-0" v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
                                        <button class="register-button mt-0" v-else>Login</button>
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
    .eye_icon{
        position:absolute;
        top:12px;
        right:18px;
        color:rgb(168, 164, 164);
        cursor:pointer;
        font-size:18px;
    }
</style>