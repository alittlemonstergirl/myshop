<template>
  <div class="login">
    <i class="plum_flower"></i>
    <i class="loginIcon"></i>
    <div class="loginMain">
      <h3>同城交易欢迎您</h3>
      <div>
        <i class="userIcon"></i>
        <input type="text" v-model="userName"
          placeholder="请输入您的手机号或用户名登录">
      </div>
      <div>
        <i class="pwdIcon"></i>
        <input type="password" v-model="pwd"
          placeholder="请输入您的密码">
      </div>

      <div 
        class="loginBtn" @click="toHome">{{typeofin}}
      </div>
      <div class="loginQues"><span class="fl "
          style="padding-left: 0.5rem;"
          @click="rememName"> <i class="unchecked"></i> 记住用户名</span><span class="fr" @click="newUser"> <span v-if="typeofin=='注册'">登录</span><span v-else>注册</span> 账号</span></div>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      typeofin:'登录',
      userName:'',
      pwd:'',
    };
  },
  methods: {
    rememName() {
      if ($(".loginQues>span>i").hasClass("unchecked")) {
        $(".loginQues>span>i").addClass("checked");
        $(".loginQues>span>i").removeClass("unchecked");
      } else if ($(".loginQues>span>i").hasClass("checked")) {
        $(".loginQues>span>i").removeClass("checked");
        $(".loginQues>span>i").addClass("unchecked");
      }
    },
    toHome() {
      let _this = this;
      let params = {};
      params.user = _this.userName;
      params.pass =_this.pwd;
      if(this.typeofin=='登录'){
        axios.post('api/login',params)
        .then((res) => {
          console.log(res.data);
          _this.userName = res.data.user
          _this.userToken = 'Bearer ' + res.data.token;
          // 将用户token保存到vuex中   
          _this.$store.commit('changeLogin', _this.userToken);
          if(res.data==-1){
            _this.$vux.confirm.show({
              // 组件除show外的属性
              content:'账户名或密码错误',
              onCancel : () => {
               
              },
              onConfirm : () => {}
            })
          }
          else{
            this.$router.push({
              name:'homePage',
            });
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }else{
        axios.post('api/register',params)
        .then((res) => {
          console.log(res);
          _this.userName = res.data.user
          if(res.status==200){
            _this.$router.push({
              name:'homePage',
            });
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
       _this.$store.commit('changeUser',_this.userName);  
       console.log("username",_this.userName);
    },
    newUser(){
      if(this.typeofin=='注册'){
        this.$router.push({
        name:'login',
      });
      this.typeofin = '登录';

      }
      else{this.$router.push({
        name:'login',
      });
      this.typeofin = '注册';
    }}
  }
};
</script>
<style>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  padding-top: 5rem;
  background: -webkit-linear-gradient(#f60403, #f5b985); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#f60403, #f5b985); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#f60403, #f5b985); /* Firefox 3.6 - 15 */
  background: linear-gradient(#f60403, #f5b985); /* 标准的语法 */
}
.login .plum_flower {
  position: absolute;
  display: inline-block;
  background: url("../assets/images/plum_flower.png") no-repeat;
  background-size: 100% 100%;
  width: 5rem;
  height: 3rem;
  top: 0.1rem;
  left: 0.1rem;
}
.login .loginIcon {
  position: absolute;
  display: inline-block;
  background: url("../assets/images/logo.png") no-repeat;
  background-size: 100% 100%;
  width: 3.5rem;
  height: 2.5rem;
  top: 4.2rem;
  left: 5.5rem;
}

.loginMain {
  width: 7rem;
  margin: 0 auto;
}
.loginMain div {
  position: relative;
}
.loginMain .userIcon {
  display: inline-block;
  width: 0.5rem;
  height: 0.6rem;
  background: url("../assets/images/friend@2x.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 0.3rem;
  top: 0.15rem;
}
.loginMain .pwdIcon {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  background: url("../assets/images/key@2x.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 0.3rem;
  top: 0.2rem;
}
.loginMain h3 {
  color: #ffffff;
  /* margin: 0 auto; */
  font-size: 0.47rem;
  text-align: left;
  padding-left: 0.5rem;
}
div > input {
  width: 7rem;
  height: 1rem;
  border: 1px solid #eeeee0;
  border-radius: 0.5rem;
  padding-left: 1rem;
  box-sizing: border-box;
}
.login div {
  margin-top: 0.5rem;
}
.login .loginBtn {
  margin-top: 0.5rem;
  display: block;
  width: 7rem;
  height: 1rem;
  border: 1px solid #eeeee0;
  border-radius: 0.5rem;
  /* background-color: dodgerblue; */
  line-height: 1rem;
  color: #ffffff;
  font-weight: bold;
  /* padding-left: 1rem; */
}
.loginQues > span {
  display: block;
  color: #c5c1aa;
}
.loginQues .unchecked {
  display: inline-block;
  width: 0.35rem;
  height: 0.35rem;
  background: url("../assets/images/false.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0.15px;
}
.loginQues .checked {
  display: inline-block;
  width: 0.35rem;
  height: 0.35rem;
  background: url("../assets/images/true.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0.15px;
}
</style>
