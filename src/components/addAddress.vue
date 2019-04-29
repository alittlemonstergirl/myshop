<template>
  <div class="">
    <!-- 新增地址 -->
    <ul class="address_content">
      <li class="address_item">
        <label for="">
          <span>收货人</span>
          <input class="getValue"
            type="text"
            v-model="receName">
          <span class="friend"></span>
        </label>
      </li>
      <li class="address_item">
        <label for="">
          <span>手机号码</span>
          <input class="getValue"
            type="text"
            @blur="telPhoneNumVerification(telNumber,$event)"
            v-model="telNumber">
          <span class="arow_right">+86</span>
        </label>
      </li>
      <li class="address_item"
        @click="showAddress = !showAddress">
        <label for="">
          <span>所在地区</span>
          <span style="flex-grow:1;text-align:right;">{{onArea}}</span>
          <span class="arow_right"></span>
        </label>
      </li>
      <li class="address_detail">
        <input class="inp_box add_detail getValue"
          style="text-align: left;"
          v-model="addressDetail"
          type="text"
          placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等等">
      </li>
      <li>
        <span></span>
      </li>
    </ul>

    <group class="address_switch">
      <x-switch :title="'设为默认地址'"
        v-model="isDefault"></x-switch>
    </group>
    <!-- <x-switch title="设为默认地址"
      v-model="value"></x-switch> -->
    <div class="save_btn"
      @click="whetherAddAddres">
      保&nbsp;&nbsp;存
    </div>
    <x-address style="display:none;"
      title="title"
      v-model="addressValue"
      @on-hide="getAddressValue"
      :list="addressData"
      placeholder="请选择地址"
      :show.sync="showAddress"></x-address>
  </div>
</template>
<script>
import {
  XSwitch,
  Group,
  Cell,
  CellBox,
  XInput,
  XAddress,
  ChinaAddressV4Data,
  XButton,
  Value2nameFilter as value2name
} from "vux";
import axios from "axios";
export default {
  name: "addAddress",
  data() {
    return {
      receName:'',
      telNumber:'',
      onArea:'',
      addressDetail:'',
      isDefault:false,
      addressValue: [],
      addressValueString: "",
      stringValue: "0",
      addressData: ChinaAddressV4Data,
      showAddress: false,
      addressDetailItem: "",
      isModifyData: {},
      routPath:''
    };
  },
  created() {
    this.isModifyData = this.$route.params.obj ? this.$route.params.obj : {};
    if (Object.keys(this.isModifyData).length > 1) {
      // this.addressDetail["tbIntegralGoodsAddressPo.id"] = this.isModifyData.id;
      this.receName = this.isModifyData.receName;
      this.telNumber = this.isModifyData.telNumber;
      // if (this.isModifyData.address.indexOf("-") != -1) {
        this.onArea = this.isModifyData.onArea;
        this.addressDetail = this.isModifyData.addressDetail;
      // } else {
        this.addressValueString = this.isModifyData.onArea;
      // }
      
      this.isDefault = this.isModifyData.isDefault;
      console.log(this.addressValueString,this.isDefault)
    } 
  },
  mounted() {},
  methods: {
    telPhoneNumVerification(_val, event) {
      let phoneReg = /^1\d{10}/;
      let thisDom = event.target;
      let _this = this;
      if (!phoneReg.test(_val) && _val != "") {
        _this.$vux.alert.show({
          title: "提示",
          content: "请输入正确的手机号",
          onHide() {
            _this.telNumber = "";
            thisDom.focus();
          }
        });
      }
    },
    addAddres() {
      this.$vux.loading.show({
        text: "保存中..."
      });
      let _this = this;
      let params={};
      params.username=_this.$store.state.userName; 
      params.receName = this.receName;
      params.onArea=this.onArea;
      params.addressDetail=this.addressDetail;
      params.isDefault=this.isDefault;
      params.telNumber=this.telNumber;
      if(_this.isModifyData._id){
        console.log('hi1');
        params.addressId = _this.isModifyData._id;
        axios
        .post('api/address/edit' ,params)
        .then(function(res) {
          _this.$vux.loading.hide();
          if (res.status == 200) {
            _this.$vux.toast.show({
              type: 'success',
              text: '编辑成功'
              })
            _this.$router.push({
              name:'addressManagement'
            })
          }
        });
      }else{
        
        axios
        .post('api/address/add' ,params)
        .then(function(res) {
          _this.$vux.loading.hide();
          if (res.status == 200) {
             _this.$vux.toast.show({
              type: 'success',
              text: '新增成功'
              })
            _this.$router.push({
              name:'addressManagement'
            })
                }
              
            });
      }
      
    },
    getAddressValue(str) {
      this.addressValueString = value2name(
        this.addressValue,
        ChinaAddressV4Data
      );
      this.onArea=this.addressValueString;
    },
    whetherAddAddres() {
      var inpArr = document.getElementsByClassName("getValue");
      let flag = 0;
      for (let i = 0; i < inpArr.length; i++) {
        //判断如果信息无空值，则保存，否则让用户填写信息。
        if (inpArr[i].value == 0) {
          inpArr[i].focus();
          break;
        } else {
          flag = 1;
        }
      }
      if (flag && this.addressValueString) {
        this.addAddres();
      }
    }
  },
  components: {
    XSwitch,
    Group,
    Cell,
    CellBox,
    XInput,
    XAddress,
    XButton
  }
};
</script>
<style lang="">
.address_item{
  width:100%;
  box-sizing: border-box;
}
.address_detail{
  border: none !important;
    width: 100%;}
.address_switch .weui-cell {
  display: initial !important;
}
.address_switch .weui-cell__bd {
  /* flex-grow: 1 !important; */
  float: left;
  flex: 0 !important;
}
.address_switch .weui-cell__ft {
  text-align: initial !important;
  float: right !important;
}
.address_switch div.vux-no-group-title {
  margin: 0px;
  padding: 0.426667rem 0.32rem;
}
.address_switch .weui-switch {
  width: 1.066667rem;
  height: 0.613333rem;
}
.address_switch .weui-switch:before,
.address_switch .weui-switch-cp__box:before {
  width: 1.066667rem;
  height: 0.613333rem;
}
.address_switch .weui-switch:after,
.address_switch .weui-switch-cp__box:after {
  width: 0.533333rem;
  height: 0.533333rem;
}
.address_switch .weui-switch:checked,
.address_switch .weui-switch-cp__input:checked ~ .weui-switch-cp__box {
  border-color: #366cb3;
  background-color: #366cb3;
}
.address_switch .weui-label {
  font-size: 0.4rem;
  color: #343434;
}
.address_switch .vux-x-switch.weui-cell_switch {
  padding: 0.426667rem 0.32rem;
}
</style>
<style scoped>
body {
  background-color: #fff4f4;
}
.address_switch {
  border-bottom: 1px solid #dedcd7;
}
.address_detail {
  border-bottom: 1px solid #dedcd7;
}
.address_item {
  font-size: 0.4rem;
  color: #343434;
  padding: 0.426667rem 0.32rem;
  border-bottom: 1px solid #dedcd7;
}
.address_item label {
  display: flex;
  width: 100%;
}
.address_item input {
  flex-grow: 1;
  padding: 0rem 0.5rem;
  font-size: 0.4rem;
}
.friend {
  display: inline-block;
  width: 0.4rem;
  height: 0.48rem;
  background: url("../assets/images/friend@2x.png") no-repeat;
  background-size: 100% 100%;
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
  margin-left: 0.3rem;
  border-top: 2px solid #989898;
  border-right: 2px solid #989898;
  transform: rotate(45deg);
}

input {
  border: none;
  outline: none;
  background-color: transparent;
  text-align: right;
}
.inp_box {
  height: 1.3333rem;
}
.add_detail {
  direction: ltr;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.32rem !important;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(120, 120, 120, 1);
  padding: 0rem 0.32rem;
}

.save_btn {
  width: 6.6667rem;
  height: 0.9333rem;
  background: rgba(54, 108, 179, 1);
  border-radius: 0.16rem;
  font-size: 0.4933rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.9333rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 4.9067rem;
}
</style>
