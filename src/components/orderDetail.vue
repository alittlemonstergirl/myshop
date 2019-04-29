<template>
  <div class="orderBox">
    <div class="nav">
      <div clss="addressDetails"
        @click="goToAddressManagement">
        <div class="orderPerson">
          <span class="personName">收货人：{{addressList.receName?addressList.receName:'请填写'}}</span>
          <Span class="telephone">{{addressList.telNumber?addressList.telNumber:'填写手机号'}}</span>
        </div>
        <p class="goodsAddress">收货地址：{{addressList._id?addressList.onArea+addressList.addressDetail:'请填写地址'}}</p>
      </div>
      <div class="addAddress">
        <img src="../assets/images/more.png" />
      </div>
      <div class="nav_img">
        <img src="../assets/images/caption.png" />
      </div>
    </div>
    <div class="goods_details" v-for="(item,index) in commodityObj" :key=index>
      <p class="orderNum">{{storeName}}</p>
      <div class="goods_num clearfix">
        <div class="goods_picture">
          <img :src="`http://127.0.0.1:3000/static/${item.goodsPic}`" />
        </div>
        <div class="goods">
          <p class="goodsName">{{item.goodsName}}</p>
          <p class="goodsCount">x{{item.goodsCount?item.goodsCount:goodsCount}}</p>
        </div>
        <div class="goodsPrice">{{item.goodsPrice}}元/件</div>
      </div>
      <hr />
      <ul class="order_content">
        <li class="ordermessage">
          <span class="order_name">商品总价</span>
          <span class="order_wap">{{item.goodsPrice*(item.goodsCount?item.goodsCount:goodsCount)}}元</span>
        </li>
        <li class="ordermessage">
          <span class="order_name">提交时间</span>
          <span class="order_wap"> {{todate}}
            <!-- {{getFormatDate(new Date(orderDetail.createTime.time),"yyyy-MM-dd hh:mm:ss")}}  -->
            </span>
        </li>
        
      </ul>

    </div>
    <div class="exchangeRule">
      <div class="rule_line">
        <hr />
        <span class="rule">购买说明</span>
      </div>
      <p class="rule_content">同城交易为第三方交易平台及互联网信息服务提供者，同城交易（含网站、客户端等）所展示的商品/服务的标题、价格、详情等信息内容系由店铺经营者发布，其真实性、准确性和合法性均由店铺经营者负责。同城交易提醒用户购买商品/服务前注意谨慎核实。如用户对商品/服务的标题、价格、详情等任何信息有任何疑问的，请在购买前通过阿里旺旺与店铺经营者沟通确认；同城交易存在海量店铺，如用户发现店铺内有任何违法/侵权信息，请立即向同城交易举报并提供有效线索。</p>
    </div>
    <div class="btn">
      <span class="btn_count">合计：{{allCount}}元</span>
      <button class="sub_btn"
        @click="submitOrder"><span>提交订单</span></button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "orderDetails",
  data() {
    return {
      // dataBase,
      commodityObj: [],
      exchangeNum: 0,
      orderDetail: {},
      addressObj: {},
      allCount:0.00,
      goodsCount:1,
      todate:'',
      storeId:0,
      storeName:'',
      addressList:{}
    };
  },
  created() {
    this.goodsId = this.$route.params.goodsId;
    this.goodsCount = this.$store.state.goodsCount;
    // this.allCount = this.commodityObj.goodsPrice*this.goodsCount;
    this.getCommodityDetail();
    this.getTodate();
    this.getDefaultAdree();
    if(this.$route.params.addressList){
      this.addressList = this.$route.params.addressList;
    }
  },
  methods: {
    getTodate(){
      let tod = new Date();
      let a = tod.getFullYear();
      let date = tod.getDate();
      let mon = tod.getMonth()+1;
      let hour = tod.getHours();
      let min = tod.getMinutes();
      if(hour.length<2){
        hour = '0'+hour;
      }
      if(min.length<2){
        min = '0'+min;
      }
      this.todate = a+'-'+mon+'-'+date+','+hour+':'+min;
    },
    getCommodityDetail() {
      //获取商品详情
      this.$vux.loading.show({
        text: "加载中..."
      });
      let _this = this;
      if(_this.goodsId){
        axios.post('api/goods/info', {goodsId: _this.goodsId} )
        .then((res) => {
          _this.commodityObj.push({
            goodsName:res.data.goodsName,
            goodsPic:res.data.goodsPic,
            goodsPrice:res.data.goodsPrice,
          });
          console.log('commodityObj',_this.commodityObj);
          _this.storeId = res.data.storeld;
          _this.getStoreDetail();
        })
        .catch(function (error) {
          console.log(error)
        });
        this.$vux.loading.hide();
      }else{
        axios.post('api/shopcar/info', {username: _this.$store.state.userName} )
        .then((res) => {
           for(let i=0;i<res.data.length;i++){
            if(res.data[i].goodsSel==true){
          _this.commodityObj.push(res.data[i]);
          console.log('commodityObj',_this.commodityObj);
          _this.allCount = _this.allCount + (res.data[i].goodsCount)*(res.data[i].goodsPrice);
          _this.storeId = res.data.storeld;
            }
           }
        })
        .catch(function (error) {
          console.log(error)
        });
        this.$vux.loading.hide();
      }
      
    },
    goToAddressManagement() {
      // this.$store.commit("setRecordStep", this.$route.path);
      this.$router.push({
        name: "addressManagement",
        params: {
          urlPath: this.$route.path
        }
      });
    },
    getDefaultAdree(){
      this.$vux.loading.show({
        text: "加载中..."
      });
      let _this = this;
      axios.post('api/address', {username: _this.$store.state.userName} )
        .then((res) => {
          console.log('goodsdetail',res);
          _this.goodsAddress = res.data;
          for(let i=0;i<res.data.length;i++){
            if(res.data[i].isDefault && !this.$route.params.addressList){
              _this.addressList = res.data[i];
            }
          }
          
          console.log(_this.goodsAddress);
        })
        .catch(function (error) {
          console.log(error)
        });
        this.$vux.loading.hide();
    },
    submitOrder() {
       this.$vux.loading.show({
          text: "创建订单中"
        });
        let params = [];
        // params.push({goodsId:this.goodsId,goodsName:this.commodityDetail.goodsName,goodsPrice:this.commodityDetail.goodsPrice,
        // goodsPic:this.commodityDetail.goodsPic,goodsCount:this.exchangeNum,goodsDetail:this.commodityDetail.goodsDetail,goodsStatus:"待发货"});
        axios
          .post('api/goods/order', params)
          .then(function(res) {
            _this.$vux.loading.hide();
            console.log('res',res);
            if (res.data == 200) {
              if (res.data.message == "下订单订成功") {
            _this.$router.push({ name: "exchangeSuccess" });
          }
              _this.$router.push({
                name: "orderDetail"
              });
            } else {
              _this.$vux.toast.show({
                type: "text",
                text: "提交订单失败"
              });
            }
          });
    },
  }
};
</script>
<style>
@media screen and (min-width: 1024px) {
  .btn {
    width: 740px;
    margin: auto;
  }
}
.goods_num {
  padding-left: 0.293333rem;
}


.orderBox {
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
  padding-bottom: 2.6rem;
}

#app {
  height: 100%;
}

.nav {
  width: 100%;
  content: "";
  display: block;
  clear: both;
  background: rgba(255, 255, 255, 1);
}

.addressDetails {
  width: 2.7733rem;
  font-size: 0.4rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  line-height: 0.5467rem;
  color: rgba(52, 52, 52, 1);
  float: left;
}

/* 收货人详情 */

.personName_details {
  padding-left: 0.28rem;
  box-sizing: border-box;
  line-height: 1.32rem;
  font-size: 0.4rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(52, 52, 52, 1);
}

.orderPerson {
  overflow: hidden;
}

.personName {
  float: left;
  display: inline-block;
  font-size: 0.4rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(52, 52, 52, 1);
  padding: 0.4rem;
  box-sizing: border-box;
}

.telephone {
  font-size: 0.4rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(52, 52, 52, 1);
  line-height: 1.32rem;
  float: right;
  display: inline-block;
  padding-right: 1.15rem;
  box-sizing: border-box;
}

.goodsAddress {
  width: 88%;
  padding-left: 0.4rem;
  box-sizing: border-box;
  font-size: 0.3467rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(52, 52, 52, 1);
  padding-bottom: 0.4rem;
}

/* 新增地址图片 */

.addAddress {
  height: 0.4667rem;
  margin-top: -1.6rem;
  box-sizing: border-box;
  float: right;
  width: 0.367rem;
  height: 100%;
  margin-right: 0.2rem;
}

.addAddress img {
  padding-right: 0.1333rem;
  box-sizing: border-box;
  max-width: 100%;
}

/* 导航条的设置 */

.nav_img {
  width: 100%;
  text-align: center;
}

.nav_img img {
  max-width: 100%;
}

.goods_details {
  width: 100%;
  border-radius: 0.5rem;
  margin: 0.3rem 0;
  background: rgba(255, 255, 255, 1);
}

.orderNum {
  display: inline-block;
  font-size: 0.3467rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  padding: 0.3733rem 0 0.3733rem 0.4rem;
  box-sizing: border-box;
}

.goods_picture {
  width: 2.186667rem;
  height: 2.186667rem;
  float: left;
  /* padding-left: .28rem; */
  box-sizing: border-box;
}

.goods_picture img {
  width: 100%;
  height: 100%;
}

.goods {
  float: left;
}

.goodsName {
  padding-left: 0.16rem;
  width: 4.2533rem;
  font-size: 0.3733rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 0.56rem;
}

.goodsCount {
  font-size: 0.3467rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  line-height: 0.8rem;
  padding-left: 0.1333rem;
  box-sizing: border-box;
}

.goodsPrice {
  float: right;
  padding-right: 0.5067rem;
  box-sizing: border-box;
  font-size: 0.3733rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(26, 26, 26, 1);
  line-height: 0.8rem;
}

hr {
  width: 9.2rem;
  height: 1px;
  background: rgba(240, 240, 240, 1);
  border-top: none;
  border-bottom: none;
  margin: 0.3733rem 0 0.3733rem 0.4rem;
  box-sizing: border-box;
}

ul li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.order_content {
  background: rgba(255, 255, 255, 1);
  margin-bottom: 0.4rem;
}

.ordermessage {
  width: 100%;
  height: 0.8rem;
}

p {
  margin: 0rem;
  padding: 0rem;
}

.order_name {
  float: left;
  padding-left: 0.4267rem;
  box-sizing: border-box;
  /* width: 2.5333rem; */
  font-size: 0.3467rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  white-space: nowrap;
}

.order_wap {
  float: right;
  padding-right: 0.4rem;
  box-sizing: border-box;
  /* width: 3.7067rem; */
  font-size: 0.3467rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  white-space: nowrap;
}

.exchangeRule {
  background: rgba(242, 242, 242, 1);
}

.rule_line {
  padding-left: 0.4rem;
  box-sizing: border-box;
}

.rule_line hr {
  width: 0.12rem;
  height: 0.32rem;
  background: rgba(48, 81, 120, 1);
  padding: 0;
  margin: 0;
  display: inline-block;
}

.rule {
  width: 100%;
  font-size: 0.3733rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  line-height: 1.1333rem;
}

.rule_content {
  width: 100%;
  /* height: .3467rem; */
  font-size: 0.3733rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  line-height: 0.64rem;
  padding: 0 0.6rem 0.3rem 0.6rem;
  box-sizing: border-box;
}

.btn {
  width: 100%;
  height: 1.2933rem;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
}

.btn_count {
  margin: 0 auto;
  font-size: 0.3733rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(52, 52, 52, 1);
  line-height: 1.3rem;
  box-sizing: border-box;
  padding-left: 4rem;
}

.sub_btn {
  float: right;
  width: 2.5067rem;
  height: 1.3067rem;
  background: #af0707;
  border: none;
  outline: none;
  -webkit-appearance: none;
}

.sub_btn span {
  display: inline-block;
  font-size: 0.3733rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.64rem;
}
</style>
