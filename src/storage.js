import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

 

const store = new Vuex.Store({
  state: {
    goodsCount: 1,
    userName:'',
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    changeCount (state,newCount) {
      state.goodsCount = newCount;
    },
    changeUser (state,userName) {
      state.userName = userName;
    },
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  }
});
export default store;