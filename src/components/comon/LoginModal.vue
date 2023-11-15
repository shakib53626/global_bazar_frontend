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
            $("#LoginMOdal").modal("hide");
            notification.Success("Login Success")
        }else{
            setErrors(res);
        }
    }

    onMounted(() =>{
        auth.login();
    });
</script>

<template>
    <div>
        <div class="modal fade modal-wrapper" id="LoginMOdal" >
            <div class="modal-dialog modal-dialog-centered" role="document" style="width: 500px;">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                        <div class="text-center py-4">
                            <Form @submit="submit" :validation-schema="schema" v-slot="{errors, isSubmitting}">
                                <h1>Login</h1>
                                <div style="margin-top: 30px; padding: 0 50px;">
                                    <Field
                                        name="phone"
                                        type="text"
                                        placeholder="Phone Number"
                                    />
                                    <span class="text-danger mb-3 d-block">{{errors.phone}}</span>
                                    <Field
                                        name="password"
                                        :type="showPassword?'text':'password'"
                                        placeholder="Password"
                                    />
                                    <span class="text-danger mb-2 d-block">{{errors.password}}</span>
                                    <div class="d-flex justify-content-between">
                                        <p><input type="checkbox" @click="toggleShow" style="width: 15px;height: 15px;"> Show Password</p>
                                        <p><router-link :to="{name:'register'}"><span data-bs-dismiss="modal" aria-label="Close">Register</span></router-link></p>
                                    </div>
                                    <button class="btn btn-info" style="width: 150px;" v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
                                    <button class="btn btn-info" style="width: 150px;" v-else>Login</button>
                                </div>
                            </Form>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>

<style>



    
</style>