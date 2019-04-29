import Vue from 'vue'
import Router from 'vue-router'
//首页
const homePage = r => require.ensure([], () => r(require('./components/homePage')), 'homePage')
//个人信息
const myInfo = r => require.ensure([], () => r(require('./components/myInfo')), 'myInfo')
// 添加地址
const addAddress = r => require.ensure([], () => r(require('./components/addAddress')), 'addAddress')
//我的订单
const myOrder = r => require.ensure([], () => r(require('./components/myOrder')), 'myOrder')
// const myEchart = r => require.ensure([], () => r(require('./components/myEchart')), 'myEchart')
const login = r => require.ensure([], () => r(require('./components/login')), 'login')
//我的收藏
const myCollect = r => require.ensure([], () => r(require('./components/myCollect')), 'myCollect')
//地址管理
const addressManagement = r => require.ensure([], () => r(require('./components/addressManagement')), 'addressManagement')
//订单详情
const orderDetail = r => require.ensure([], () => r(require('./components/orderDetail')), 'orderDetail')
//购物车
const shopCar = r => require.ensure([], () => r(require('./components/shopCar')), 'shopCar')
//商品详情
const commodityDetails = r => require.ensure([], () => r(require('./components/commodityDetails')), 'commodityDetails')
//商品分类
const goodsType = r => require.ensure([], () => r(require('./components/goodsType')), 'goodsType')
Vue.use(Router)

function newRouterFun() {
    const newRouter = new Router({
        routes: [{
            path: '/homePage',
            name: 'homePage',
            component: homePage,
            meta: {
                title: '首页'
            },
        }, {
            path: '/myInfo',
            name: 'myInfo',
            component: myInfo,
            meta: {
                title: '个人中心'
            }
        }, {
            path: '/addressManagement',
            name: 'addressManagement',
            component: addressManagement,
            meta: {
                title: '地址管理'
            }
        }, {
            path: '/shopCar',
            name: 'shopCar',
            component: shopCar,
            meta: {
                title: '购物车'
            }
        }, 
        {
            path: '/orderDetail',
            name: 'orderDetail',
            component: orderDetail,
            meta: {
                title: '订单详情'
            }
        },
        {
            path: '/commodityDetails',
            name: 'commodityDetails',
            component: commodityDetails,
            meta: {
                title: '商品详情'
            }
        },
        {
            path: '/addAddress',
            name: 'addAddress',
            component: addAddress,
            meta: {
                title: '添加地址'
            }
        }, {
            path: '/myOrder',
            name: 'myOrder',
            component: myOrder,
            meta: {
                title: '我的订单'
            }
        },
        {
            path: '/myCollect',
            name: 'myCollect',
            component: myCollect,
            meta: {
                title: '我的订单'
            }
        },
        {
            path: '/goodsType',
            name: 'goodsType',
            component: goodsType,
            meta: {
                title: '商品分类'
            }
        },
        //  {
        //     path: '/myEchart',
        //     name: 'myEchart',
        //     component: myEchart,
        //     meta: {
        //         title: '我的图表'
        //     }
        // },
        {
            path: '/',
            name: 'login',
            component: login,
            meta: {
                title: '登录'
            }
        }]
    });
    

    newRouter.beforeEach((to, from, next) => {
        if (to.path === '/login') {
          next();
        } else {
          let token = localStorage.getItem('Authorization');
       
          if (token === 'null' || token === '') {
            next('/login');
          } else {
            next();
          }
        }
      });

      return newRouter;
}



export default newRouterFun

/*必配 start*/
// newRouter.afterEach(function (route, redirect, next) {
//   try {
//     _.initializedData(); //初始化配置数据
//   } catch (e) {

//   }
// });
// export default newRouter;