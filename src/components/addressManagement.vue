<template>
  <div class="addressManagement">
    <!-- 地址管理 -->
      <div class="myAddress" v-if="goodsAddress.length" v-for="(item,index) in goodsAddress" :key=index @click="getAddreeValue(item)">
        <!-- v-for="item in goodsAddress"
        @click="goToOrderDetial(item)"
        :key="item.id"> -->
        <div class="last_name">
          {{item.receName.substring(0,1)}}</div>
        <div class="myAddress_content">
          <p class="myAddress_content_title">
            <span class="h5 ">
              <!-- {{item.consigneeName}} -->
              {{item.receName}}
            </span>
            <span class="tel_num ">{{item.telNumber}}</span>
            <!-- v-if="item.isDefault=='1'" -->
            <span 
              class="sign" v-if="item.isDefault">默认</span>
          </p>
          <p class="address_p">{{item.onArea + item.addressDetail}}</p>
        </div>
        <div class="edit"
          @click.stop="goToAddAddress(item)">编辑</div>
      </div>
    <divider v-if="!goodsAddress.length">暂无地址数据</divider>
    <div class="btn_foot_bg">
      <span class="btn_foot"
        @click="goToAddAddress">
        添加新地址
      </span>
    </div>

  </div>
</template>
<script>
import PullTo from "vue-pull-to";
import { Divider } from "vux";
import axios from "axios";
export default {
  name: "addressManagement",
  data() {
    return {
      // dataBase,
      goodsAddress: [],
      hasMore: false, //是否还有数据
      loadBoxHeight: 0, //滚动加载区域高度
      scrollMore: false, //限制滚动
      pageIndex: 1,
      hasData: false //是否有数据
    };
  },
  components:{
    Divider
  },
  created() {
    // this.loadBoxHeight =
    //   window.screen.height -
    //   document.getElementsByClassName("btn_foot")[0].offsetHeight;
    this.getAddress();
  },
  methods: {
    // goToOrderDetial(_data) {
    //   if (this.$route.params.urlPath == "/orderDetails") {
    //     this.$store.commit("setAddressData", _data);
    //     this.$router.push({
    //       name: "orderDetails"
    //     });
    //   }
    // },
    getAddreeValue(_obj){
      if(this.$route.params.urlPath){
        this.$router.push({
          name: "orderDetail",
          params:{
            addressList:_obj
          }
        });
      }
      
    },
    getAddress() {
      this.$vux.loading.show({
        text: "加载中..."
      });
      let _this = this;
      axios.post('api/address', {username: _this.$store.state.userName} )
        .then((res) => {
          console.log('goodsdetail',res);
          _this.goodsAddress = res.data;
          console.log(_this.goodsAddress);
        })
        .catch(function (error) {
          console.log(error)
        });
        this.$vux.loading.hide();
    },
    goToAddAddress(_obj) {
      if (_obj) {
        this.$router.push({
          name: "addAddress",
          params: { obj: _obj }
        });
      } else {
        this.$router.push({
          name: "addAddress"
        });
      }
    }
  },
  components: {
    PullTo,
    Divider
  }
};
</script>
<style>
body {
  margin: 0;
}
body {
  background-color: #ffffff;
}
input {
  border: none;
  outline: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.vue-pull-to-wrapper {
  height: 100% !important;
  margin-bottom: 1.6rem;
}
.myAddress {
  display: flex;
  height: 2.3rem;
  border-bottom: 1px solid #dedcd7;
}
.last_name {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #366cb3;
  color: #ffffff;
  font-size: 0.4267rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 1.2rem;
  margin: 0.55rem 0.4rem 0.55rem 0.2667rem;
}
.myAddress_content {
  margin: 0.4rem 0.2133rem 0.4rem 0;
  flex: 4;
  /* margin-top: .4rem; */
}
.myAddress_content_title {
  height: 0.4rem;
  line-height: 0.4rem;
}
.myAddress_content .h5 {
  font-size: 0.4rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(52, 52, 52, 1);
  margin-right: 0.2rem;
}
.myAddress_content .tel_num {
  font-size: 0.32rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(150, 150, 150, 1);
  margin-right: 0.2rem;
}
.myAddress_content .address_p {
  width: 6.2rem;
  height: 1.1rem;
  margin: 0.2rem 0;
  font-size: 0.2933rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(120, 120, 120, 1);
  line-height: 0.5067rem;
  overflow: hidden;
}
.myAddress_content .sign {
  width: 1.0667rem;
  height: 0.4rem;
  background-color: #fff4f4;
  color: #ed4343;
  font-size: 0.2933rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-align: center;
  padding: 0.053333rem 0.24rem;
  /* line-height: 0.2933rem; */
}
.edit {
  flex: 1;
  height: 1.5rem;
  border-left: 1px solid #dedcd7;
  line-height: 1.5rem;
  text-align: center;
  margin: 0.4rem 0;
  font-size: 0.2933rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(120, 120, 120, 1);
}
.btn_foot_bg {
  position: fixed;
  height: 1.6rem;
  background-color: #ffffff;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  z-index: 3;
}
.btn_foot {
  display: block;
  width: 6.6667rem;
  height: 0.9333rem;
  line-height: 0.9333rem;
  font-size: 0.4933rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  background: rgba(54, 108, 179, 1);
  border-radius: 0.16rem;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
</style>
