<script setup>
    import { storeToRefs } from 'pinia';
    import {useCart} from '@/stores'

    const cart = useCart();
    const {cartItems, totalPrice, cartItemsCount} = storeToRefs(cart);

    const deleteItem = (itemId) =>{
        cart.deleteItem(itemId);
    }

    const addQuantity = (itemId) =>{
        cart.addQuantity(itemId);
    }
    
    const minusQuantity = (itemId) =>{
        cart.minusQuantity(itemId);
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
                        <li class="active">Shopping Cart</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Li's Breadcrumb Area End Here -->
        <!--Shopping Cart Area Strat-->
        <div class="Shopping-cart-area pt-60 pb-60">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <form action="#">
                            <div class="table-content table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="li-product-remove">remove</th>
                                            <th class="li-product-thumbnail">images</th>
                                            <th class="cart-product-name">Product</th>
                                            <th class="li-product-price">Unit Price</th>
                                            <th class="li-product-quantity">Quantity</th>
                                            <th class="li-product-subtotal">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in cartItems" :key="index">
                                            <td class="li-product-remove"><a href="#" @click.prevent="deleteItem(item.id)"><i class="fa fa-times"></i></a></td>
                                            <td class="li-product-thumbnail"><a href="#"><img :src="$filters.makeImgPath(item.thumbnail)" width="80" alt="Li's Product Image"></a></td>
                                            <td class="li-product-name"><a href="#">{{ item.name }}</a></td>
                                            <td class="li-product-price"><span class="amount">{{ $filters.currencySymbol(item.price) }}</span></td>
                                            <td class="quantity">
                                                <label>Quantity</label>
                                                <div class="cart-plus-minus">
                                                    <input class="cart-plus-minus-box" :value="item.quantity" type="text" disabled>
                                                    <div class="dec qtybutton" @click="minusQuantity(item.id)"><i class="fa fa-angle-down"></i></div>
                                                    <div class="inc qtybutton" @click="addQuantity(item.id)"><i class="fa fa-angle-up"></i></div>
                                                </div>
                                            </td>
                                            <td class="product-subtotal"><span class="amount">{{ $filters.currencySymbol(item.quantity*item.price) }}</span></td>
                                        </tr>
                                        <tr v-if="cartItems.length<1">
                                            <td colspan="1">
                                                <img src="@/assets/images/basket.png" width="50" alt="">
                                            </td>
                                            <td colspan="5">
                                                <h3 class="text-danger">Your Cart is Empty</h3>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- <div class="row">
                                <div class="col-12">
                                    <div class="coupon-all">
                                        <div class="coupon">
                                            <input id="coupon_code" class="input-text" name="coupon_code" value="" placeholder="Coupon code" type="text">
                                            <input class="button" name="apply_coupon" value="Apply coupon" type="submit">
                                        </div>
                                        <div class="coupon2">
                                            <input class="button" name="update_cart" value="Update cart" type="submit">
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <div class="row">
                                <div class="col-md-5 ml-auto">
                                    <div class="cart-page-total">
                                        <h2>Cart totals</h2>
                                        <ul>
                                            <li>Subtotal <span>{{ $filters.currencySymbol(totalPrice) }}</span></li>
                                            <li>Total <span>{{ $filters.currencySymbol(totalPrice) }}</span></li>
                                        </ul>
                                        <router-link :to="{name:'checkout'}">Proceed to checkout</router-link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--Shopping Cart Area End-->
    </div>
</template>
<style lang="">
    
</style>