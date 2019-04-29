import axios from 'axios'

//这里是全局的响应拦截器，每一个axios响应都会经过这里


axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //假设401为token失效
  if(response.data.code == 401){
    //跳转到登录页
    localStorage.removeItem('Authorization');
    this.$router.push('/login');
  }else{
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});