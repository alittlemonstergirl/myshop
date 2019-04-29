<template>
  <div class="bottomNav_area">
      <!-- <div class="bottomNav"> -->
      <div @click="goHome">
        <img src="../assets/images/homePage.png"
          alt="">
        首页
      </div>
      <div @click='goshopCar'>
        <img src="../assets/images/shopcar.jpg"
          alt="">
        购物车
      </div>
      <div @click='goOrder'>
        <img src="../assets/images/order.png"
          alt="">
        订单
      </div>
      <div>
        <router-link to="myInfo"
          style="display:block;"><img src="../assets/images/mine.png"
            alt="">
          我的</router-link>
      </div>
      <!-- </div> -->
    </div>
</template>
<script >
import Vue from 'vue'
export default {
  methods:{
    goOrder(){
      this.$router.push({
        name:"myOrder"
      })
    },
    goHome(){
      this.$router.push({
        name:"homePage"
      })
    },goshopCar(){
      this.$router.push({
        name:"shopCar"
      })
    }
  }
}
</script>
<style>
.bottomNav_area {
  position: fixed;
  display: flex;
  justify-content: space-around;
  width: 100%;
  bottom: 0;
  text-align: center;
  background-color: #ffffff;
}
.bottomNav_area img {
  display: block;
  width: 1rem;
  height: 1rem;
  background-size: 100% 100%;
}
</style>

