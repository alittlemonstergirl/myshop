<template>
  <div class="myInfo">
    <div class="myInfo_head">
      <img class="headpic_icon fl"
        src="../assets/images/headerpic.jpg">
      <div class="myInfo_head_center">
        <p>{{userInfo.username}}</p>
        <span class="tel">余额：{{userInfo.monery}}&nbsp;元</span>
      </div>
      <div @click="addaddress" class="myInfo_head_right"
        to="addressManagement">地址管理</div>
    </div>
    <div class="perData">
      <router-link to="myCollect"
        style="display:block;">
        <div class="mylove_thing">
          <p>123</p>
          <p>收藏夹</p>
        </div>
      </router-link>

      <div class="mylove_store">
        <p>123</p>
        <p>收藏店铺</p>
      </div>
      <div class="myhistroy">
        <p>123</p>
        <p>浏览历史</p>
      </div>
    </div>
    <div class="order">
      <router-link to="myOrder"
        style="display: block;"
        class="myOrder_head">
        <p class="fl">我的订单</p>
        <p class="fr">查看全部订单 <span class="arow_right"></span>
        </p>

      </router-link>
      <div class="myOrder_body">
        <div class="needPay">
          <img src="../assets/images/needPay.png">
          待付款
        </div>
        <div class="waitSend">
          <img src="../assets/images/waitSend.png">
          待发货
        </div>
        <div class="waitRecve">
          <img src="../assets/images/waitReceve.png">
          待收货
        </div>
        <div class="comments">
          <img src="../assets/images/comments.png">
          评论
        </div>
        <div class="backMoney">
          <img src="../assets/images/backMoney.png">
          售后
        </div>
      </div>
      <div class="orderMsg">
        <swiper auto
          height="75px"
          direction="vertical"
          :interval=2000
          class="text-scroll"
          :show-dots="false">

          <swiper-item>
            <p class="orderMsg_title">订单通知</p>
            <div class="orderDetail">
              <img src="../assets/images/d3.png">
              <div>
                <p class="orderDetail_state">
                  <icon type="waiting-circle"></icon>订单派送中
                </p>
                <p class="orderDetail_detail">同城交易，一个可以在网上砍价的购物平台</p>
              </div>

            </div>

          </swiper-item>
        </swiper>
      </div>
    </div>
    <public-bottom></public-bottom>
  </div>
</template>
<script>
import { Icon, Swiper, SwiperItem } from "vux";
import publicBottom from './public_bot';
import axios from "axios";
export default {
  data(){
    return{
      userInfo:[]
    }
  },
  components: {
    Icon,
    Swiper,
    SwiperItem,
    publicBottom
  },
  created(){
    this.getUserinfo();
  },
  methods:{
    addaddress(){
      this.$router.push({
        name: "addressManagement"
      });
    },
    getUserinfo(){
      this.$vux.loading.show({
        text: "加载中..."
      });
      let _this = this;
      axios.post('api/user/info', {username: _this.$store.state.userName} )
        .then((res) => {
          console.log('user',res);
          _this.userInfo = res.data;
        })
        .catch(function (error) {
          console.log(error)
        });
        this.$vux.loading.hide();
    }
  }
};
</script>
<style>
@import "../assets/css/reset";
[class^="weui-icon-"]:before,
[class*=" weui-icon-"]:before {
  margin-left: 0 !important;
}
.weui-icon-waiting-circle {
  font-size: 0.5rem !important;
  margin-bottom: 0.1rem;
}
.myInfo_head {
  margin: 0.5rem 0.3rem;
  font-size: 0.45rem;
  /* font-weight: bold; */
  display: flex;
  height: 1.5rem;
  line-height: 0.75rem;
}
.myInfo_head img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.3rem;
}
.myInfo_head .myInfo_head_center {
  flex: 1;
  color: rgb(255, 127, 39);
}
.myInfo_head .myInfo_head_center .tel {
  background-color: #ff9595;
  border-radius: 0.3rem;
  padding: 0 0.3rem;
  font-size: 0.4rem;
  font-weight: normal;
  color: white;
}
.myInfo_head .myInfo_head_right {
  display: block;
  width: 2.1rem;
  font-size: 0.35rem;
  color: #c7b3e5;
}
.perData {
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0.1333rem;
  width: 9.2rem;
  height: 2.4rem;
  margin: 0 auto;
  font-size: 0.32rem;
  font-weight: bold;
}
.perData .mylove_thing,
.mylove_store,
.myhistroy {
  line-height: 0.9rem;
  text-align: center;
  margin-top: 0.25rem;
}
.order {
  height: 4.5rem;
  /* border: 1px solid #ff9595; */
  box-shadow: 0px 0px 11px 1px hsl(0, 87%, 78%, 0.5);
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  margin: 0.3rem;
  padding: 0.2rem;
  background-color: #ffffff;
}
.order .myOrder_head {
  color: hsl(0, 87%, 78%);
  font-weight: bold;
  height: 0.5rem;
  border-bottom: 1px dotted #ff9595;
}
.order .myOrder_body {
  margin: 0.2rem 0;
  display: flex;
  justify-content: space-around;
}
.order .myOrder_body .needPay,
.waitSend,
.waitRecve,
.comments,
.backMoney {
  background-color: #fff4f4;
  width: 1.2rem;
  height: 1.3rem;
  text-align: center;
  padding-top: 0.2rem;
}
.order .myOrder_body .needPay img,
.waitSend img,
.waitRecve img,
.comments img,
.backMoney img {
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  background-size: 100% 100%;
  margin: 0 auto;
}
.order .orderMsg {
  height: 2rem;
  margin: 0.2rem auto;
  background-color: azure;
  border-radius: 0.2rem;
}
.order .orderMsg img {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  background-size: 100% 100%;
  /* margin: 0.2rem 0.3rem; */
}
.order .orderMsg .orderMsg_title {
  margin: 0.1rem 0.3rem;
}
.arow_right {
  color: #787878;
  font-size: 0.32rem;
  /* padding-left: 0.3rem; */
}
.arow_right::after {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  border-top: 2px solid #989898;
  border-right: 2px solid #989898;
  transform: rotate(45deg);
}
.order .orderDetail {
  display: flex;
  margin: 0.1rem 0.3rem;
}
.order .orderDetail .orderDetail_state {
  color: #10aeff;
  /* margin: 0.1rem 0.1rem; */
}
.order .orderDetail .orderDetail_detail {
  flex: 1;
  /* margin-left: 0.3rem; */
  /* line-height: 1.2rem; */
}
</style>

