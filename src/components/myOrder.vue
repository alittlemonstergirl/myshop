<template>
  <div class="myOrder">
    <div>
      <tab :line-width=2
        active-color='#fc378c'
        v-model="index">
        <tab-item class="vux-center"
          :selected="demo2 === item"
          v-for="(item, index) in list2"
          @click="demo2 = item"
          :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index"
        height="100px"
        :show-dots="false">
        <swiper-item v-for="(item, index) in list2"
          :key="index">
          <div class="tab-swiper vux-center">
            <ul>
              <li class="myOrder_list">
                <img src="../assets/images/s5.png"
                  alt="">
                <div>
                  <h3>古香古色一玩具</h3>
                  <p>商品具体描述</p>
                </div>
              </li>
            </ul>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <public-bottom></public-bottom>
  </div>
</template>

<script>
import publicBottom from './public_bot';
import {
  Tab,
  TabItem,
  Sticky,
  Divider,
  XButton,
  Swiper,
  SwiperItem
} from "vux";
const list = () => ["全部", "待付款", "待发货", "待收货", "待评论"];
export default {
  data() {
    return {
      list2: list(),
      demo2: "全部",
      index: 0,
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      }
    };
  },
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    publicBottom
  },
  methods: {
    switchTabItem(index) {
      console.log("on-before-index-change", index);
      this.$vux.loading.show({
        text: "loading"
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.index01 = index;
      }, 1000);
    },
    onItemClick(index) {
      console.log("on item click:", index);
    },
    addTab() {
      if (this.list2.length < 5) {
        this.list2 = list().slice(0, this.list2.length + 1);
      }
    },
    removeTab() {
      if (this.list2.length > 1) {
        this.list2 = list().slice(0, this.list2.length - 1);
      }
    },
    next() {
      if (this.index === this.list2.length - 1) {
        this.index = 0;
      } else {
        ++this.index;
      }
    },
    prev() {
      if (this.index === 0) {
        this.index = this.list2.length - 1;
      } else {
        --this.index;
      }
    }
  }
};
</script>
<style>
.scrollable .vux-tab-item {
  -webkit-box-flex: 0;
  flex: 1 !important;
  -ms-flex: 1 !important;
}
img {
  display: inline-block;
}
.myOrder_list {
  display: flex;
  padding: 0.3rem;
}
.myOrder_list > img {
  width: 3.5rem;
}
.myOrder_list h3{
  font-size: 0.45rem;
}
.myOrder_list p{
  color:grey;
}
</style>

