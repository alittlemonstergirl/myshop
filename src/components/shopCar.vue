<template>
  <div class="shopCar">
  
    <ul class="cshop_list" v-if="shopCarinfo.length>0">
      <li style="position: relative;" v-for="(item,index) in shopCarinfo" :key=index>
        <div class='seleIcon'>
          <img src="../assets/images/xuanze.png" v-if="item.goodsSel" alt="" @click="changeSel(item.goodsSel,item.goodsId)">
          <img src="../assets/images/choose.png" v-else alt="" @click="changeSel(item.goodsSel,item.goodsId)">
        </div>
        <div class="shopImg"><img :src="`http://127.0.0.1:3000/static/${item.goodsPic}`"
            alt=""></div>
        <div class="shopDetail">
          <h4>{{item.goodsName}}</h4>
          
          <p>￥{{item.goodsPrice}} <span><i class="redC" @click="subtractExchangesNum(item.goodsCount,item.goodsId)"></i> <i class="count">{{item.goodsCount}}</i>  <i class="addC" @click="summaitionExchangeNum(item.goodsCount,item.goodsId)"></i></span> </p>
          <i class="delIcon" @click="delgoods(item._id)"></i>
        </div>
      </li>
    </ul>
    <div class="heji" v-if="shopCarinfo.length>0">总计：￥{{allCount}}  <span class="orderBtn" @click="goOrder">去结算</span></div>
    <divider v-else>购物车里空空如也哦~</divider>
    <public-bottom></public-bottom>
  </div>
</template>
<script>
import axios from "axios";
import { Divider } from 'vux'
import publicBottom from './public_bot';
export default {
  data(){
    return{
      allCount:0,
      shopCarinfo:[]
    }
  },
  components:{
  publicBottom,
   Divider
  },
  created(){
    this.getcarInfo();
  },
  methods:{
    goOrder(){
      this.$router.push({
        name:'orderDetail'
      })
    },
    getcarInfo(){
      this.$vux.loading.show({
        text: "加载中..."
      });
      let _this = this;
      _this.allCount=0;
      axios.post('api/shopcar/info', {username: _this.$store.state.userName} )
        .then((res) => {
          console.log('shopcar/info',res);
          _this.shopCarinfo = res.data;
          for(let i=0;i<res.data.length;i++){
            if(res.data[i].goodsSel==true){
              _this.allCount = _this.allCount + (res.data[i].goodsCount)*(res.data[i].goodsPrice);
              // console.log((res.data[i].price))
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        });
        this.$vux.loading.hide();
    },
    subtractExchangesNum(exchangeNum,goodsId){
      if (exchangeNum > 1) {
        exchangeNum--;
      }
      console.log(exchangeNum);
      let _this = this;
      axios.post('api/shopcar/changecount', {goodsId:goodsId,goodsCount:exchangeNum} )
        .then((res) => {
         console.log(exchangeNum);
         if(res.status=200){
             _this.getcarInfo();
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    summaitionExchangeNum(exchangeNum,goodsId){
      exchangeNum++;
      console.log(exchangeNum);
      let _this = this;
      axios.post('api/shopcar/changecount', {goodsId: goodsId,goodsCount:exchangeNum} )
        .then((res) => {
          if(res.status=200){
             _this.getcarInfo();
          }
          console.log(exchangeNum);
          
        })
        .catch(function (error) {
          console.log(error)
        });
       
    },
    delgoods(id){
      let _this = this;
      axios.post('api/shopcar/del', {id:id} )
        .then((res) => {
          if(res.status=200){
            _this.$vux.toast.show({
              type: 'success',
              text: '删除成功'
              })
             _this.getcarInfo();
          }  
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    changeSel(goodsSel,goodsId){//修改选中状态
      let _this = this;
      if(goodsSel==false){
        goodsSel=true;
      }else{
        goodsSel=false;
      }
      axios.post('api/shopcar/changeStatus', {goodsSel:goodsSel,goodsId:goodsId} )
        .then((res) => {
         if(res.status=200){
             _this.getcarInfo();
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    
  }
}
</script>

<style>
.shopCar > ul > li {
  display: flex;
  margin: 0.2rem;
  border-bottom: 1px solid #e5e5e5;

}
.shopImg {
  width: 2.5rem;
  margin-right: 0.3rem;
}
.shopDetail {
  line-height: 0.75rem;
  font-size: 0.4rem;
  
}
.delIcon{
  position: absolute;
  display: inline-block;
  width: 0.6rem;
  height: 0.7rem;
  top: 0.8rem;
  right:0.5rem;
  background: url("../assets/images/shanchu.png") no-repeat;
  background-size: 100%;
}
.shopDetail span{
  /* margin-left: 0.1rem; */
  color: #333;
  vertical-align: text-top;
    margin-left: 1.1rem;
}
.shopDetail p{
  color:#af0707;
  margin-top: 0.2rem;
  font-size: 0.35rem;
}
.shopDetail .addC{
  display: inline-block;
  background: url('../assets/images/jia.png');
  background-size: 100% 100%;
  width: 0.5rem;
  height: 0.5rem;
}
.shopDetail .count{
    line-height: 0.5rem;
    display: inline-block;
    /* width: 0.5rem; */
    margin: 0 0.1rem;
    vertical-align: super;
    text-align: center;
}
.shopDetail .redC{
  display: inline-block;
  background: url('../assets/images/jian.png');
  background-size: 100% 100%;
  width: 0.5rem;
  height: 0.5rem;
}
.seleIcon{
  width: 0.7rem;
  margin-top: 1rem;
}
.heji{
  /* position: fixed; */
  /* bottom: 1px; */
  margin-right: 0.5rem;
  float: right;
  font-size: 0.4rem;
  color: #af0707;
}
 .orderBtn{
    display: inline-block;
    width: 1.9rem;
    border-radius: 0.2rem;
    text-align: center;
    line-height: 0.8rem;
    
    background-color: #af0707;
    color: #fff;
 }   
</style>

