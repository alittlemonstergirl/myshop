// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import newRouterFun from './router'
import 'lib-flexible/flexible'
import VDistpicker from 'v-distpicker'
import  { ConfirmPlugin } from 'vux'
import $ from 'jquery'
import Vue from 'vue'
import store from './storage'//引入store
import axiosInter from '../route/request'

Vue.component('v-distpicker', VDistpicker)

import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

Vue.use(ConfirmPlugin)

Vue.config.productionTip = false




var router = newRouterFun();
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,//使用store
    components: {
        App
    },
    template: '<App/>'
})