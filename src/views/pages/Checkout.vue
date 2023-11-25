<script setup>
    import {computed, onMounted, ref} from 'vue';
    import {OrderSuccess} from '@/components'
    import { useAuth, useNotification, useAddress, useCart, useCoupon, useOrder } from '@/stores'
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { useRouter } from 'vue-router';
    import { storeToRefs } from 'pinia';

    
    const showPassword   = ref(false);
    const divisionId     = ref('');
    const districtId     = ref('');
    const couponCode     = ref('');
    const divisionName   = ref('');
    const districtName   = ref('');
    const orderAddress   = ref('');
    const password       = ref();
    const isRegister     = ref(false);
    const errors         = ref();
    const deliveryCharge = ref(0);
    const auth           = useAuth();
    const cart           = useCart();
    const order          = useOrder();
    const coupon         = useCoupon();
    const address        = useAddress();
    const router         = useRouter();
    const notification   = useNotification();
    const {user}         = storeToRefs(auth);
    const {cartItems}    = storeToRefs(cart);
    const name           = ref(auth.user.data? auth.user.data.name :'');
    const phone          = ref(auth.user.data? auth.user.data.phone :'');
    const email          = ref(auth.user.data? auth.user.data.email :'');
    const {divisions, districts, districtLoader}  = storeToRefs(address);

    


    const schema = yup.object({
        phone: yup.string().required("Phone Number field is required").min(11),
        password: yup.string().required(),
    });

    const toggleShow = () =>{
        showPassword.value = !showPassword.value
    }

    const getDistrict = (divisionId) =>{
        address.getDistrict(divisionId);
        const division = divisions.value.find(division => division.id === divisionId);
        divisionName.value = division.name
        deliveryCharge.value = division.charge;
    }

    const login = async(values, {setErrors}) =>{
        let res = await auth.login(values);
        if(res.data){
            name.value  = res.data.name;
            phone.value = res.data.phone;
            email.value = res.data.email;
            notification.Success("Login Success")
        }else{
            setErrors(res);
        }
    }

    const applyCoupon = () =>{
        coupon.apply(couponCode.value);
    }

    const placeOrder = async(couponCode) =>{
        let res = await order.placeOrder({
            customer_name   : name.value,
            customer_phone  : phone.value,
            email           : email.value,
            division_id     : divisionId.value,
            district_id     : districtId.value,
            coupon_code     : couponCode,
            shipping_address: orderAddress.value,
            items           : cart.cartItems,
            isRegister      : isRegister.value,
            password        : password.value
        });
        if(res.data){
            if (res.meta) {
                auth.user = res;
                notification.Success("Order Created Success");
                cart.$reset();
                $("#OrderSuccess").modal("show");
            } else {
                notification.Success("Order Created Success");
                cart.$reset();
                $("#OrderSuccess").modal("show");
            }
        } else {
            errors.value = res;
        }
    }


    const showLogin = () =>{
        $('#checkout-login').slideToggle(900);
    }

    const showCoupon = () =>{
        $('#checkout_coupon').slideToggle(900);
    }
    
    const showCreateAccount = () =>{
        $('#cbox-info').slideToggle(900);
    }
    
    const showDifferentAddress = () =>{
        $('#ship-box-info').slideToggle(1000);
    }

    onMounted(() => {
        address.getDivisions();
    })
</script>
<template>
    <div>
        <!-- Begin Li's Breadcrumb Area -->
        <div class="breadcrumb-area">
            <div class="container">
                <div class="breadcrumb-content">
                    <ul>
                        <li><router-link :to="{name:'home'}">Home</router-link></li>
                        <li class="active">Checkout</li>
                    </ul>
                    {{ userData }}
                </div>
            </div>
        </div>
        <!-- Li's Breadcrumb Area End Here -->
        <!--Checkout Area Strat-->
        <div class="checkout-area pt-60 pb-30">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="coupon-accordion">
                            <!--Accordion Start-->
                            <template v-if="!user.data">
                                <h3 style="margin-bottom:0px;">Returning customer? <span id="showlogin" @click="showLogin">Click here to login</span></h3>
                                <div id="checkout-login" class="coupon-content">
                                    <div class="coupon-info">
                                        <p class="coupon-text">If you want to store you order and tracking order, so login first then order submit.</p>
                                        <Form @submit="login" :validation-schema="schema" v-slot="{errors, isSubmitting}">
                                            <div>
                                                <div class="row">
                                                  <div class="col-md-4">
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
                                                        <div class="col-md-12  text-left text-md-right">
                                                            <a href="#"> Forgotten pasward?</a>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <button class="register-button mt-0" v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
                                                            <button class="register-button mt-0" v-else>Login</button>
                                                        </div>
                                                    </div>
                                                  </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </template>
                            <!--Accordion End-->
                            <!--Accordion Start-->
                            <h3 style="margin-top: 15px;">Have a coupon? <span id="showcoupon" @click="showCoupon">Click here to enter your code</span></h3>
                            <div id="checkout_coupon" class="coupon-checkout-content">
                                <div class="coupon-info">
                                    <form @submit.prevent="applyCoupon">
                                        <p class="checkout-coupon">
                                            <input placeholder="Coupon code" type="text" v-model="couponCode">
                                            <input value="Apply Coupon" type="submit">
                                        </p>
                                    </form>
                                </div>
                            </div>
                            <!--Accordion End-->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-12">
                        <form action="#">
                            <div class="checkbox-form">
                                <h3>Billing Details</h3>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="checkout-form-list">
                                            <label>Full Name <span class="required">*</span></label>
                                            <input placeholder="Enter full name" type="text" v-model="name">
                                            <span v-if="errors">
                                                <span v-for="(error, index) in errors.customer_name" :key="index" class="text-danger">{{ error }}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="checkout-form-list">
                                            <label>Phone Number <span class="required">*</span></label>
                                            <input type="text" v-model="phone" min="11" placeholder="Enter Phone Number">
                                            <span v-if="errors">
                                                    <span v-for="(error, index) in errors.customer_phone" :key="index" class="text-danger">{{ error }}</span>
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="checkout-form-list">
                                            <label>Email Address (Optional)</label>
                                            <input placeholder="Enter Email" type="email" v-model="email">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="country-select clearfix">
                                            <label>Division <span class="required">*</span></label>
                                            <select class="nice-select wide" v-model="divisionId" @change="getDistrict(divisionId)">
                                                <option value="">Select Division</option>
                                                <option :value="division.id" v-for="(division, index) in divisions" :key="index">{{ division.name }} - {{ division.bn_name }}</option>
                                            </select>
                                            <span v-if="errors">
                                                <span v-for="(error, index) in errors.division_id" :key="index" class="text-danger">{{ error }}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="country-select clearfix">
                                            <label>District <span class="required">*</span></label>
                                            <span class="nice-select wide" v-if="districtLoader"><i class="fa fa-spinner fa-spin"></i> Loading....</span>
                                            <select class="nice-select wide" v-model="districtId" v-else >
                                                <option value="">Select District</option>
                                                <option :value="district.id" v-for="(district, index) in districts" :key="index">{{ district.name }} - {{ district.bn_name }}</option>
                                            </select>
                                            <span v-if="errors">
                                                <span v-for="(error, index) in errors.district_id" :key="index" class="text-danger">{{ error }}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="checkout-form-list">
                                            <label>Address <span class="required">*</span></label>
                                            <input placeholder="Street address" type="text" v-model="orderAddress">
                                            <span v-if="errors">
                                                <span v-for="(error, index) in errors.shipping_address" :key="index" class="text-danger">{{ error }}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="checkout-form-list create-acc">
                                            <input id="cbox" type="checkbox" @click="showCreateAccount" v-model="isRegister">
                                            <label for="cbox">Create an account?</label>
                                        </div>
                                        <div id="cbox-info" class="checkout-form-list create-account">
                                            <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                            <label>Account password  <span class="required">*</span></label>
                                            <input placeholder="password" type="password" v-model="password">
                                        </div>
                                    </div>
                                </div>
                                <div class="different-address"> 
                                    <div class="order-notes">
                                        <div class="checkout-form-list">
                                            <label>Order Notes</label>
                                            <textarea id="checkout-mess" cols="30" rows="10" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-6 col-12">
                        <div class="your-order">
                            <h3>Your order</h3>
                            <div class="your-order-table table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style="width:20%;">Image</th>
                                            <th style="width:60%;" class="cart-product-name">Product</th>
                                            <th style="width:20%;" class="cart-product-total">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="cart_item" v-for="(item, index) in cartItems" :key="index">
                                            <td><img :src="$filters.makeImgPath(item.thumbnail)" width="30" alt=""></td>
                                            <td class="cart-product-name"> {{ item.name }}<strong class="product-quantity"> × {{ item.quantity }}</strong></td>
                                            <td class="cart-product-total"><span class="amount">{{ $filters.currencySymbol(item.regular_price*item.quantity) }}</span></td>  
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr class="cart-subtotal">
                                            <th colspan="2">Cart Subtotal</th>
                                            <td><span class="amount">{{ $filters.currencySymbol(cart.totalPrice) }}</span></td>
                                        </tr>
                                        <tr class="cart-subtotal">
                                            <th colspan="2">Offer Discount</th>
                                            <td><span class="amount">{{ $filters.currencySymbol(cart.totalPrice-cart.totalDiscountPrice) }}</span></td>
                                        </tr>
                                        <tr class="cart-subtotal">
                                            <th colspan="2">Coupon Discount</th>
                                            <td><span class="amount">{{ $filters.currencySymbol(coupon.coupnDiscount) }}</span></td>
                                        </tr>
                                        <tr class="cart-subtotal">
                                            <th colspan="2">Delivery Charge</th>
                                            <td><span class="amount">{{ $filters.currencySymbol(deliveryCharge) }}</span></td>
                                        </tr>
                                        <tr class="order-total">
                                            <th colspan="2">Order Total</th>
                                            <td><strong><span class="amount">{{ $filters.currencySymbol(cart.totalDiscountPrice+deliveryCharge-coupon.coupnDiscount) }}</span></strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div class="payment-method">
                                <div class="payment-accordion">
                                    <div id="accordion">
                                        <div class="card">
                                        <div class="card-header" id="#payment-1">
                                            <h5 class="panel-title">
                                            <a class="" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Direct Bank Transfer.
                                            </a>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" class="collapse show" data-parent="#accordion">
                                            <div class="card-body">
                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="card">
                                        <div class="card-header" id="#payment-2">
                                            <h5 class="panel-title">
                                            <a class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Cheque Payment
                                            </a>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" class="collapse" data-parent="#accordion">
                                            <div class="card-body">
                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="card">
                                        <div class="card-header" id="#payment-3">
                                            <h5 class="panel-title">
                                            <a class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                PayPal
                                            </a>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" class="collapse" data-parent="#accordion">
                                            <div class="card-body">
                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="order-button-payment">
                                        <button class="btn btn-info" style="width: 100%;" v-if="order.loading"><i class="fa fa-spinner fa-spin"></i> Loading....</button>
                                        <button class="btn btn-info" style="width: 100%;" @click.prevent="placeOrder(coupon.coupon.code?coupon.coupon.code:null)" v-else>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Checkout Area End-->
        <OrderSuccess/>
    </div>
</template>
<style lang="">
    
</style>