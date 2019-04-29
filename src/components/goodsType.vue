<template>
  <div class="myCollect">
    <ul class="cshop_list">
      <li v-for="(item,index) in goodsList" :key=index>
        <div class="shopImg"><img :src="`http://127.0.0.1:3000/static/${item.goodsPic}`"
            alt=""></div>
        <div class="shopDetail">
          <h4>{{item.goodsName}}</h4>
          <p class="goosdetail">{{item.goodsDetail}}</p>
          <p><span style="color:#f60403">￥{{item.goodsPrice}} 元</span> &nbsp;<span style="color:#888">剩余{{item.payCounts}}件</span> </p>
        </div>
      </li>
    </ul>
    <divider>暂无更多数据</divider>
    <public-bottom></public-bottom>
  </div>
</template>
<script>
import axios from "axios";
import { Divider } from "vux";
import publicBottom from './public_bot';
export default {
  data(){
    return{
      goodsList:[]
    }
  },
  components: {
    publicBottom,
    Divider
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    getGoodsList(){
      this.$vux.loading.show({
        text: "加载中..."
      });
      let _this = this;
      axios.post('api/goods/type', {goodsType: _this.$route.params.goodstype} )
        .then((res) => {
          console.log('user',res);
          _this.goodsList = res.data;
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
.myCollect{
  padding-bottom:1.3rem; 
}
.myCollect > ul > li {
  display: flex;
  margin: 0.2rem;
}
.shopImg {
  width: 2.5rem;
  margin-right: 0.3rem;
}
.shopDetail {
  line-height: 0.75rem;
}
.goosdetail{
  line-height: 0.4rem;
  color: #999;
}
</style>
