<template>
  <div class="commodityBox">
    <div class="Boxcontent">
      <div class="commodity_display">
        <img :src="`http://127.0.0.1:3000/static/${commodityDetail.goodsPic}`"/>
      </div>
      <div class="commodity_detail">
        <div class="commodity_content">{{commodityDetail.goodsName}}</div>
        <p class="commodity_nums">
          <!-- <span class="stillNums">余额:&nbsp;元</span> -->
          <span class="commodityPrice">￥{{commodityDetail.goodsPrice}} <span>元</span> </span>
        </p>
        <div class="clear_float">
          <hr />
        </div>
        <div class="commodity_exchange">
          <span class="exchangeNums_name">选择购买数量</span>
          <span class="exchangeNums">（库存：30件）</span>
          <span class="plus"
            @click="summaitionExchangeNum"> <img src="../assets/images/plus.png" /> </span>
          <div class="total">{{exchangeNum}}</div>
          <span class="minus"
            @click="subtractExchangesNum"> <img src="../assets/images/minus.png" /> </span>
        </div>
      </div>
      <div class="commodity_introduce">
        <p class="introduceName">商品详情</p>
        <p class="introduce_content"
          v-if="commodityDetail.goodsDetail">
          {{commodityDetail.goodsDetail}}
        </p>
      </div>
      <div class="exchangeRule">
        <div class="rule_line">
          <hr />
          <span class="rule">购买规则</span>
        </div>
        <p class="rule_content">
同城交易为第三方交易平台及互联网信息服务提供者，同城交易（含网站、客户端等）所展示的商品/服务的标题、价格、详情等信息内容系由店铺经营者发布，其真实性、准确性和合法性均由店铺经营者负责。同城交易提醒用户购买商品/服务前注意谨慎核实。如用户对商品/服务的标题、价格、详情等任何信息有任何疑问的，请在购买前通过阿里旺旺与店铺经营者沟通确认；同城交易存在海量店铺，如用户发现店铺内有任何违法/侵权信息，请立即向同城交易举报并提供有效线索。
</p>
      </div>
    </div>
    <div class="exchangeNow">
      <button class="submit_btn"
        @click="putCar"><span>加入购物车</span></button>
      <button class="submit_btn"
        @click="creatOrder"><span>立即购买</span></button>
    </div>
  </div>

</template>
<script>
import axios from "axios";

export default {
  name: "commodityDetails",
  data() {
    return {
      commodityDetail: {
        goodsPic:''
      },
      exchangeNum: 1,
      goodsId:''
    };
  },
  created(){
    this.goodsId = this.$route.params.goodsId;
    this.getCommodityDetail();
  },
   methods: {   
    summaitionExchangeNum() {
      //兑换商品数相加      
        this.exchangeNum++;
             
    },
    subtractExchangesNum() {
      //兑换商品数相减
      if (this.exchangeNum > 1) {
        this.exchangeNum--;
      }
    },
    creatOrder() {
      let _this = this;
      this.$store.commit('changeCount',this.exchangeNum);        
      _this.$router.push({
        name: "orderDetail",
        params:{
          goodsId:_this.goodsId
        }
      });
           
    },
    putCar(){
      let _this = this;
      let params = {};
      params.username= _this.$store.state.userName;
      params.goodsId= _this.commodityDetail._id;
      params.goodsName= _this.commodityDetail.goodsName;
      params.goodsDetail= _this.commodityDetail.goodsDetail;
      params.goodsCount= _this.exchangeNum;
      params.goodsPrice= _this.commodityDetail.goodsPrice;
      params.goodsPic= _this.commodityDetail.goodsPic;
      params.goodsSel= false;
      axios.post('api/shopcar', params )
        .then((res) => {
          if(res.status=200){
            _this.$vux.toast.show({
              type: 'success',
              text: '添加成功'
              })
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    getCommodityDetail() {
      //获取商品详情
      this.$vux.loading.show({
        text: "加载中..."
      });
      let _this = this;
      axios.post('api/goods/info', {goodsId: _this.goodsId} )
        .then((res) => {
          console.log('goodsdetail',res);
          _this.commodityDetail = res.data;
          console.log(_this.commodityDetail.goodsPic);
        })
        .catch(function (error) {
          console.log(error)
        });
        this.$vux.loading.hide();
    }
  }
};
</script>
<style scoped>
.commodityBox {
  width: 100%;
  height: 100%;
  background-color: RGBA(242, 242, 242, 1);
}

/* .commodity_display{
    width: 10rem;
    height: 10rem;
} */



.commodity_display img {
  max-width: 100%;
}

.commodity_detail {
  width: 100%;
  /* height:4.6267rem; */
  /* height: 5.167rem; */
  background: #ffffff;
}


.commodity_content {
  /* width:682px;
    height:85px; */
  font-size: .5333rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(26, 26, 26, 1);
  padding: .5067rem .4133rem .5067rem .3332rem;
  box-sizing: border-box;
}

.stillNums {
  float: left;
  height: .3733rem;
  font-size: .3733rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  padding-left: .4rem;
  box-sizing: border-box;
}

.commodityPrice {
  float: right;
  height: .3733rem;
  font-size: .4267rem;
  font-family: ArialMT;
  font-weight: 400;
  color: #f60403;
  padding-right: .4rem;
  box-sizing: border-box;
}

.commodityPrice span {
  font-size: .3733rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: #f60403;
}

.clear_float {
  overflow: hidden;
  width: 100%;

}


.clear_float hr {
  float: right;
  border-top: none;
  border-bottom: none;
  width: 9.6rem;
  height: 1px;
  background: rgba(240, 240, 240, 1);
  margin-top: .4rem;
}

.commodity_exchange {
  /* width: 100%;
  background: #ffffff; */
  /* width: 100%;
  background: #ffffff;     
  height: 1.0733rem; */
  width: 100%;
  background: #ffffff;
  height: 1.1733rem;
  /* padding: 0.8rem 0; */
  /* margin-bottom: .4rem; */
  padding-top: .4rem;
  box-sizing: border-box;
}

.exchangeNums_name {
  float: left;
  /* height:28px; */
  font-size: .4rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  padding-left: .4rem;
  box-sizing: border-box;
  margin-top: -0.05rem;
}

.exchangeNums {
  float: left;
  font-size: .32rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  padding-left: .13rem;
  box-sizing: border-box;
}

.minus {
  float: right;
  width: .5333rem;
  height: .5333rem;
  padding: 0 0 .3067rem 0;

}

.minus img {
  max-width: 100%;
}


.total {
  float: right;
  width: 1.1733rem;
  height: .7733rem;
  background: rgba(247, 247, 247, 1);
  margin: -0.12rem .4133rem 0 .4133rem;
  text-align: center;
  font-size: .4rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: .7733rem;
}

.plus {
  float: right;
  width: .5333rem;
  height: .5333rem;
  padding: 0 .4133rem .3067rem 0;

}

.plus img {
  max-width: 100%;
}

.commodity_introduce {
  margin-top: .2667rem;
  background: #ffffff;
}

.introduceName {
  /* width:125px;
    height:31px; */
  font-size: .4267rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  padding: .4rem 0 0.4rem .4rem;
  box-sizing: border-box;
}

.introduce_content {
  /* width:671px;
    height:268px; */
  padding: 0rem 0.2933rem 0.38rem 0.38rem;
  box-sizing: border-box;
  font-size: .3733rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: .64rem;
  text-align: center;
  text-align: justify;
}

.exchangeRule {
  background: rgba(242, 242, 242, 1);
}

.rule_line {
  padding-left: .4rem;
  box-sizing: border-box;
}

.rule_line hr {
  width: .08rem;
  height: .32rem;
  background: rgba(48, 81, 120, 1);
  padding: 0;
  margin: 0;
  display: inline-block;
}

.rule {
  width: 100%;
  font-size: .3733rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  line-height: 1.1333rem;
}

.rule_content {
  width: 100%;
  /* height: .3467rem; */
  font-size: .3733rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  line-height: .64rem;
  padding: 0 0.6rem;
  box-sizing: border-box;
  padding-bottom: 0.3rem;
}

.exchangeNow {
  width: 100%;
  height: 1.44rem;
  background: rgba(255, 255, 255, 1);
}

.submit_btn {
  float: right;
  width: 3.2667rem;
  line-height: 1rem;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
  border: none;
  outline: none;
  -webkit-appearance: none;
  background: #f60403;
}

.submit_btn span {
  font-size: .4533rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: .64rem;

}

</style>
<style>
/* .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {
  height: 0 !important;
  padding: 0 !important;
} */
@media screen and (min-width: 1024px) {
  .exchangeNow {
    width: 740px;
    margin: auto;
  }
}
.exchangeNow {
  width: 100%;
  height: 1.44rem;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  z-index: 3;
}
.Boxcontent {
  width: 100%;
  margin-bottom: 1.44rem;
}
.commodity_display .vux-swiper-item img {
  width: 100%;
  height: 100%;
}
</style>
