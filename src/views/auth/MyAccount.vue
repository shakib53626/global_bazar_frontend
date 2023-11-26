<script setup>
import { useOrder } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { TableSkalaton} from '@/components'
import InfiniteLoading from "v3-infinite-loading";
import moment from 'moment';

const mainPart = ref('ad');
const order    = useOrder();
const {orders, tableLoader, orderInfo, noDataFound} = storeToRefs(order);

const myOrders = () =>{
  loadData();
}
const myAccount = () =>{
  mainPart.value = 'ad';
}

const orderDetails = (orderId) =>{
  mainPart.value = 'od';
  order.getDetails(orderId);
}

const loadData = () =>{
  mainPart.value = 'ol';
  order.getOrders();
}

onMounted(() => {
  
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
              <li><button class="myAccountSidebarButton" :class="{'active' : mainPart=='ad'}" @click="myAccount">My Account</button></li>
              <li><button class="myAccountSidebarButton" :class="{'active' : mainPart=='ol' || mainPart=='od'}" @click="myOrders">Orders</button></li>
            </ul>
          </div>
        </div>

        <!-- For User Information Code -->
        <div class="col-md-10" style="padding: 50px; height:80vh; overflow-y:scroll;" v-show="mainPart=='ad'">
          <h1 class="text-center">Coming Soon</h1>
        </div>

        <!-- For Order List Code -->
        <div class="col-md-10" style="padding: 50px; height:80vh; overflow-y:scroll;" v-show="mainPart=='ol'">
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
              <tbody >
                <tr v-for="(order, index) in orders" :key="index" class="text-center">
                  <th scope="row">{{ index+1 }}</th>
                  <td>#{{order.order_number }}</td>
                  <td>{{ order.shipping_address }}, {{ order.district_name }}, {{ order.division_name }}</td>
                  <td>{{ order.payment_type=='Cash'?'Cash On Delivery':'Online' }}</td>
                  <td>{{ order.status }}</td>
                  <td>{{ $filters.currencySymbol(order.subtotal)}}</td>
                  <td>{{ $filters.currencySymbol(order.offer_discount)}}</td>
                  <td>{{ $filters.currencySymbol(order.total) }}</td>
                  <td><button class="btn btn-info border-none" style="font-size: 14px;" @click="orderDetails(order.id)">View Details</button></td>
                </tr>
              </tbody>
            </table>
            <InfiniteLoading @infinite="loadData" >
              <template #spinner>
                <table class="table table-bordered order-list" v-if="tableLoader">
                  <thead>
                    <tr class="text-center">
                      <th class="text-light" style="width: 5%;" scope="col"></th>
                      <th class="text-light" style="width: 8%;" scope="col"></th>
                      <th class="text-light" style="width: ;" scope="col"></th>
                      <th class="text-light" style="width: ;" scope="col"></th>
                      <th class="text-light" style="width: 8%;" scope="col"></th>
                      <th class="text-light" style="width: 8%;" scope="col"></th>
                      <th class="text-light" style="width: 8%;" scope="col"></th>
                      <th class="text-light" style="width: 8%;" scope="col"></th>
                      <th class="text-light" style="width: 10%;" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableSkalaton :dataAmount="12"/>
                  </tbody>
                </table>
                <h1 class="text-center"><span v-if="noDataFound" class="text-danger" style="font-size:20px">No More Data Found</span></h1>
                <!-- <span>Loading...</span> -->
              </template>
            </InfiniteLoading>
          </div>
        </div>

        <!-- For Order Details Code -->
        <div class="col-md-10" style="padding: 50px;height:80vh; overflow-y:scroll;" v-show="mainPart=='od'" v-if="mainPart=='od'">
          <div class="mt-4 btn d-flex justify-content-between">
            <h4>Order Details</h4>
            <button class="btn btn-info" @click="myOrders"><i class="fa fa-arrow-left me-2"></i> Back</button>
          </div>
          <div>
            <div class="d-flex mt-4">

              <div style="width: 20%;">
                <span class="order-status-line active"><i class="fa fa-check"></i></span>
                <h6 class="text-center mt-4">Submitted</h6>
                <p class="text-center">complete</p>
              </div>
              <div style="width: 20%;">
                <span class="order-status-line"><i class="fa fa-check"></i></span>
                <h6 class="text-center mt-4">Pending</h6>
                <p class="text-center">complete</p>
              </div>
              <div style="width: 20%;">
                <span class="order-status-line"><i class="fa fa-check"></i></span>
                <h6 class="text-center mt-4">Processing</h6>
                <p class="text-center">complete</p>
              </div>
              <div style="width: 20%;">
                <span class="order-status-line"><i class="fa fa-check"></i></span>
                <h6 class="text-center mt-4">On Way</h6>
                <p class="text-center">complete</p>
              </div>
              <div style="width: 20%;">
                <span class="order-status-line"><i class="fa fa-check"></i></span>
                <h6 class="text-center mt-4">Delivered</h6>
                <p class="text-center">complete</p>
              </div>
              <div style="width: 20%;">
                <span class="order-status-line"><i class="fa fa-check"></i></span>
                <h6 class="text-center mt-4">Complete</h6>
                <p class="text-center">complete</p>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-8">
                <table class="table table-bordered order-list">
                  <thead>
                    <tr class="bg-info text-center">
                      <th class="text-light" style="width: 5%;" scope="col">Serial</th>
                      <th class="text-light" style="width: 10%;" scope="col">Image</th>
                      <th class="text-light" style="width: 25%;" scope="col">Name</th>
                      <th class="text-light" style="width: 5%;" scope="col">Quantity</th>
                      <th class="text-light" style="width: 10%;" scope="col">Regular Price</th>
                      <th class="text-light" style="width: 10%;" scope="col">Offer Price</th>
                      <th class="text-light" style="width: 10%;" scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-center" v-for="(item, index) in orderInfo.items" :key="index">
                      <th scope="row">{{ index+1 }}</th>
                      <td><img :src="$filters.makeImgPath(item.thumbnail)" width="30" alt=""></td>
                      <td>{{ item.name }}</td>
                      <td> {{ item.quantity }}</td>
                      <td>{{ $filters.currencySymbol(item.price)}}</td>
                      <td>{{ $filters.currencySymbol(item.offer_price)}}</td>
                      <td>{{ $filters.currencySymbol(item.quantity*item.price)}}</td>
                    </tr>
                    <tr class="text-center">
                      <td colspan="6" style="font-weight: 500; font-size: 16px;">SubTotal</td>
                      <td style="font-weight: 500; font-size: 16px;">{{ $filters.currencySymbol(orderInfo.subtotal)}}</td>
                    </tr>
                    <tr class="text-center">
                      <td colspan="6">Offer Discount</td>
                      <td>- {{ $filters.currencySymbol(orderInfo.offer_discount)}}</td>
                    </tr>
                    <tr class="text-center">
                      <td colspan="6">Coupon Discount</td>
                      <td>- {{ $filters.currencySymbol(orderInfo.coupon_discount)}}</td>
                    </tr>
                    <tr class="text-center">
                      <td colspan="6">Delivery Charge</td>
                      <td>- {{ $filters.currencySymbol(orderInfo.delivery_fee)}}</td>
                    </tr>
                    <tr class="text-center">
                      <td colspan="6" style="font-weight: 700; font-size:18px;">Total Payable Amount</td>
                      <td style="font-weight: 700; font-size:18px;">{{ $filters.currencySymbol(orderInfo.total)}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-4 p-4" style="background-color:rgba(175, 209, 238, 0.466); border-radius:20px;">
                <h5 class="text-info"><u>Order Information</u></h5>
                <ul class="ms-3">
                  <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Order Number </span>: #{{ orderInfo.order_number }}</li>
                  <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Order Name </span>: {{ orderInfo.customer_name }}</li>
                  <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Phone Number </span>: {{ orderInfo.customer_phone }}</li>
                  <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Order Date </span>: {{ moment(orderInfo.created_at).format('LLLL') }}</li>
                  <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Payable Amount </span>: {{ $filters.currencySymbol(orderInfo.total) }}</li>
                  <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Payment Status </span>: Paid</li>
                </ul>

                <h5 class="text-info mt-4"><u>Order Address</u></h5>
                <span>{{ orderInfo.shipping_address }}, {{ orderInfo.district_name }}, {{ orderInfo.division_name }}</span>

                <h5 class="text-info mt-4"><u>Payment Method</u></h5>
                <span style="font-weight:500;">{{ orderInfo.payment_type=='Cash'? 'Cash On Delivery' : 'Online' }}</span>

                <h5 class="text-info mt-4"><u>Expected date of delivery</u></h5>
                <span style="font-weight:500;">05 Nov 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
  .my-account-sidebar{
    box-shadow: 0px 0px 26px -19px;
    height: 80vh;
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
  .myAccountSidebarButton{
    padding: 5px 20px;
    margin-bottom: 10px;
    width: 200px;
    display: block;
    border-radius: 5px;
    color: #000;
    border: none;
    text-align: left;
  }
  .myAccountSidebarButton:hover,
  .myAccountSidebarButton.active{
    background-color: #17A2B8;
    color: #fff;
  }

  .order-status-line{
    width: 100%;
    height: 6px;
    display: inline-block;
    position: relative;
    background-color: #d6d6d6;
  }
  .order-status-line i{
    height: 40px;
    width: 40px;
    background-color: #ffffff;
    border-radius: 50%;
    border: 2px solid #d6d6d6;
    text-align: center;
    line-height: 36px;
    position: absolute;
    top: -18px;
    left: 40%;
    color: #fff;
    font-size: 22px;
  }

  .order-status-line.active{
    background-color: #17A2B8;
  }
  .order-status-line.active i{
    background-color: #17A2B8;
    border: 2px solid #17A2B8;
  }
</style>