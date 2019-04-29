<template>
  <div class="homePage">
    <div class="header_area">
      <div class="header_area_left fl" @click="choose" >
        <span>{{cityValue}}</span> 
        <div v-if="show" class="divwrap">
          
      <v-distpicker type="mobile" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>

        </div>
      
      </div>
      <div class=" header_area_right">
        <input class="head_inp"
          type="text"
          v-model="keyValue"
          placeholder="请输入搜索内容">
          <span class="subBtn" @click="submitSearch">确定</span>
      </div>

    </div>
    <div class="banner_area">
      <swiper class="integral_banner_swiper"
        loop
        auto
        :aspect-ratio="24/69"
        :dots-position="'center'"
        :dots-class="'integral_dots'">
        <swiper-item v-for="item in bannerList"
          :key="item.imgSrc">
          <div class="banner_img_box">
            <img :src="item.imgSrc">
          </div>
        </swiper-item>
      </swiper>

    </div>
    <div class="nav_area">
      <div class="banner_arc">
      </div>
      <div style="    margin-top: -4.3rem;">
        <ul>
          <li @click="showintype('1')">
              <div>
                <img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt="">
              </div>女装
            </li>
          <li @click="showintype('2')">
              <div>
                <img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""></div>男装
            </li>
          <li @click="showintype('3')">
              <div><img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""></div>包包
            </li>
          <li @click="showintype('4')">
              <div><img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""></div>手表配饰
            </li>
          <li @click="showintype('5')"> 
              <div><img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""></div>家居内衣
            </li>
        </ul>
        <ul>
          <li @click="showintype('6')">
              <div><img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""></div>面部护肤
            </li>
          <li @click="showintype('7')">
              <div><img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""></div>彩妆专场
            </li>
          <li @click="showintype('8')">
              <div><img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""></div>家具电器
            </li>
          <li @click="showintype('9')">
              <div><img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""></div>手机数码
            </li>
          <li @click="showintype('10')">
              <div><img src="../assets/images/fu_icon.png"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""></div>鞋子
            </li>
        </ul>
      </div>

    </div>
    <div class="ad_area">
      <div class="ad_area_msg">
        <swiper auto
          height="30px"
          direction="vertical"
          :interval=2000
          class="text-scroll"
          :show-dots="false">
          <span style="float:left;">同城交易</span>
          <swiper-item>
            <p>同城交易，看上了就有人给你送回家</p>
          </swiper-item>
          <swiper-item>
            <p>同城交易，一个走在路上就可以下单的软件</p>
          </swiper-item>
          <swiper-item>
            <p>同城交易，一个走在路上就可以下单的软件</p>
          </swiper-item>
          <swiper-item>
            <p>同城交易，一个走在路上就可以下单的软件</p>
          </swiper-item>
          <swiper-item>
            <p>同城交易，一个走在路上就可以下单的软件</p>
          </swiper-item>
          <swiper-item>
            <p>同城交易，一个走在路上就可以下单的软件</p>
          </swiper-item>
        </swiper>
      </div>
    </div>
    <h4 class="recommendTitle">今日推荐</h4>
    <div class="todayRecomm">
      <div class="recommendGoods" v-for="(item,index) in goodsList" :key=index @click="goDetail(item._id)">  
        <img :src="`http://127.0.0.1:3000/static/${item.goodsPic}`" alt="">
        <p>{{item.goodsDetail}}</p>
        <span class="goodsPri">￥{{item.goodsPrice}}</span>  <span class="payC">{{item.payCounts}}人付款</span>
      </div>
    </div>
    <public-bottom></public-bottom>
    <div class="mask" v-if="show"></div>
  </div>

</template>

<script>
import VDistpicker from 'v-distpicker'
import { Icon, Swiper, SwiperItem} from "vux";
import publicBottom from './public_bot';
import axios from 'axios'
// const demoList = imgList.map((one, index) => ({
//   url: "javascript:",
//   img: one
// }));
export default {
  name: "homePage",
  data() {
    return {
      bannerList: [
        //广告图片
        { imgSrc: require("../assets/images/banner1.jpg") },
        { imgSrc: require("../assets/images/banner2.jpg") },
        { imgSrc: require("../assets/images/banner3.jpg") },
        { imgSrc: require("../assets/images/banner4.jpg") },
        { imgSrc: require("../assets/images/banner5.jpg") }
      ],
      goodsList:[],
      show:false,
      cityValue:'永州市',
      keyValue:''
    };
  },
  components: {
    Icon,
    Swiper,
    SwiperItem,
    publicBottom,
    VDistpicker
  },
  created: function (){
    this.getGoods()
    this.getStores()
  },
  methods: {
    getGoods(){
      let _this = this;
      axios.post('api/goods', {
        id:1
      })
        .then((res) => {
          console.log(res);
          _this.goodsList = res.data;
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitSearch(){
      console.log('this.keyValue',this.keyValue);
      axios.post('api/goods/search', {keyword: this.keyValue})
        .then((res) => {
         this.goodsList = res.data;
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getStores(){
      axios.post('api/stores', { })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    showintype(type){
      this.$router.push({
          name: "goodsType",
          params: { goodstype: type }
        });
    },
   choose(){
        this.show=true;
    },
    onChangeProvince(a){
        console.log(a)                
    },
    onChangeCity(a){
        console.log(a);
        this.cityValue =  a.value;              
    },
    onChangeArea(a){
        console.log(a)    
        this.show=false
    },
    goDetail(_id){
      this.$router.push({
        name:'commodityDetails',
        params:{
          goodsId:_id
        }
      })
    } 
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.weui-icon-search {
  color: #999999 !important;
}
.vux-slider > .vux-indicator,
.vux-slider .vux-indicator-right {
  bottom: 0.8rem !important;
}
.vux-icon-dot.active {
  background-color: blue !important;
}

    .divwrap{
        height: 400px;
        overflow-y: auto;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
        width: 100%;
    }
    .divwrap .distpicker-address-wrapper{
        color: #999;
    }
    .divwrap .address-header{
        position: fixed;
        bottom: 400px;
        width: 100%;
        background: #000;
        color:#fff;
    }
    .divwrap .address-header ul li{
        flex-grow: 1;
        text-align: center;
    }
    .divwrap .address-header .active{
        color: #fff;
        border-bottom:#f60403 solid 8px
    }
    .divwrap .address-container .active{
        color: #000;
    }

</style>

<style>
@import "../assets/css/reset";
.homePage{
  padding-bottom: 1.5rem;
}
.header_area {
  position: relative;
  height: 1rem;
  padding: 0.2rem 0;
  background-color: #f60403;
  line-height: 1rem;
  
}
.header_area .headpic_icon {
  width: 0.7467rem;
  height: 0.7467rem;
  display: inline-block;
  vertical-align: bottom;
  border-radius: 50%;
  margin: 0.15rem 0.2rem;
}
.header_area .header_area_left {
  /* display: none; */
  width: 1rem;
  height: 1rem;
  color: #fff;
  margin-left: 0.3rem;
  font-weight: bold;
  font-size: 0.35rem;
  text-align: center;
  border-top-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  border: 1px solid #f2f2f2;
}
.header_area .header_area_right {
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 0.3rem;
  box-sizing: border-box;
}
.subBtn{
  color: #fff;
  font-size: 0.35rem;
}
.header_area .head_inp {
  width: 90%;
  height: 0.75rem;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: #f2f2f2;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  padding-left: 0.3rem;
  color: #999999;
}
.banner_area {
}
.banner_img_box {
  padding-bottom: 2rem;
}
.banner_img_box img {
  width: 100%;
  /* height: 3.2rem; */
  background-size: 100% 100%;
}
.nav_area {
  position: relative;
  margin-top: -0.64rem;
}
.banner_arc {
  height: 5rem;
  background: url("../assets/images/arc.png") no-repeat;
  background-size: 100% 100%;
}
.nav_area ul {
  display: flex;
  justify-content: space-around;
}
.nav_area ul li {
  width: 1.3333rem;
  height: 2rem;
  text-align: center;
}
.nav_area ul li a {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
}
.nav_area ul li a div {
  display: bolck;
  width: 1.3333rem;
  height: 1.3333rem;
  border-radius: 50%;
  background: url("../assets/images/watch.png") no-repeat;
  background-size: 100% 100%;
  /* background-color: #ff8a71; */
}
.ad_area {
  margin: 0.5rem 0.3rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 0 0.2rem;
  border: 1px solid #f60403;
  /* box-shadow: 0px 0px 11px 1px rgba(151, 209, 254, 0.8); */
}
.ad_area_msg {
  text-align: right;
  line-height: 30px;
}
/* 今日推荐部分 */
.todayRecomm{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.recommendTitle{
  padding: 0.2rem 0.3rem;
  font-size: 0.4rem;
  color: #f60403;
}
.recommendGoods{
  width: 45%;
  margin-bottom: 0.5rem;
}
.recommendGoods p{
  padding: 0.2rem;
  color: #333;
}
.recommendGoods .goodsPri{
  color: #f60403;
  font-size: 0.35rem;
  padding: 0.3rem 0.2rem;
  margin-top: 0.1rem;
}
.recommendGoods .payC{
  color: #6e6a6a;
}
.mask{
  position: fixed;
  top: 0;
  right: 0;
  z-index: 888;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.7;
}
</style>
