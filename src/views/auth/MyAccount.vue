<script setup>
import { useOrder } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { TableSkalaton} from '@/components'

const order    = useOrder();
const {orders, tableLoader} = storeToRefs(order);

onMounted(() => {
  order.getOrders();
})

</script>
<template>
    <div>
      <div class="row">
        <div class="col-md-2 my-account-sidebar">
          <div class="profile-image">
            <img src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=" alt="">
            <span class="edit-btn">
              <i class="fa fa-edit"></i>
            </span>
            <h4 class="mt-2">Shakibul Islam</h4>
          </div>
          <div class="sidebar-nav">
            <ul>
              <li><a href="">My Account</a></li>
              <li><a href="">Orders</a></li>
              <li><a href="">Orders</a></li>
              <li><a href="">Orders</a></li>
              <li><a href="">Orders</a></li>
              <li><a href="">Orders</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-10" style="padding: 50px;">
          <div class="mt-4">
            <h4>My Orders</h4>
          </div>
          <div>
            <table class="table table-bordered order-list">
              <thead>
                <tr class="bg-info text-center">
                  <th class="text-light" style="width: 5%;" scope="col">Serial</th>
                  <th class="text-light" style="width: 8%;" scope="col">OrderId</th>
                  <th class="text-light" style="width: ;" scope="col">Address</th>
                  <th class="text-light" style="width: ;" scope="col">Delivery Type</th>
                  <th class="text-light" style="width: 8%;" scope="col">Order Status</th>
                  <th class="text-light" style="width: 8%;" scope="col">Subtotal</th>
                  <th class="text-light" style="width: 8%;" scope="col">Discount</th>
                  <th class="text-light" style="width: 8%;" scope="col">Total</th>
                  <th class="text-light" style="width: 10%;" scope="col">Action</th>
                </tr>
              </thead>
              <tbody v-if="!tableLoader">
                <tr v-for="(order, index) in orders" :key="index" class="text-center">
                  <th scope="row">{{ index+1 }}</th>
                  <td>#{{order.order_number }}</td>
                  <td>{{ order.shipping_address }}, {{ order.district_name }}, {{ order.division_name }}</td>
                  <td>{{ order.payment_type=='Cash'?'Cash On Delivery':'Online' }}</td>
                  <td>{{ order.status }}</td>
                  <td>{{ $filters.currencySymbol(order.subtotal)}}</td>
                  <td>{{ $filters.currencySymbol(order.offer_discount)}}</td>
                  <td>{{ $filters.currencySymbol(order.total) }}</td>
                  <td><a href="" class="btn btn-info" style="font-size: 14px;">View Details</a></td>
                </tr>
              </tbody>
              <tbody v-else>
                <TableSkalaton :dataAmount="10"/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
  .my-account-sidebar{
    box-shadow: 0px 0px 26px -19px;
    height: 100vh;
  }
  .my-account-sidebar .profile-image{
    width: 200px;
    text-align: center;
    margin: auto;
    margin-top: 40px;
    position: relative;
    border-bottom: 1px solid #b6b6b6;
  }
  .profile-image img{
    max-width: 100%;
    border-radius: 50%;
  }
  .edit-btn{
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: rgb(190, 190, 190);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    bottom: 40px;
    right: 26px;
    cursor: pointer;
  }
  .edit-btn .fa-edit{
    color: green;
    font-size: 16px;
  }
  .sidebar-nav{
    margin-top: 50px;
    margin-left: 50px;
  }
  .sidebar-nav ul li a{
    padding: 5px 20px;
    margin-bottom: 10px;
    width: 200px;
    display: block;
    border-radius: 5px;
    color: #000;
  }
  .sidebar-nav ul li a:hover{
    background-color: #17A2B8;
    color: #fff;
  }
</style>