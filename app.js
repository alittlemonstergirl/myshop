var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mydo = require('./route/do')
var formidable = require('formidable')



var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 访问静态资源
// app.use(express.static(path.resolve(__dirname, './assets')));
app.use('/static', express.static('./assets'))
app.use(express.static(path.resolve(__dirname, './dist')));

// 访问单页
// app.get('*', function (req, res,next) {
//   var html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8');
//   res.send(html);
// });

/***********
 * api
 * *********/
app.post('/register',mydo.doRegister) //注册
app.post('/login',mydo.doLogin) //登录

app.post('/goods',mydo.getGoodList) //获取商品列表
app.post('/stores',mydo.getStores) //获取店铺列表
app.post('/address',mydo.getAddress) //获取地址列表
app.post('/address/add',mydo.addAddress) //获取地址列表
app.post('/address/edit',mydo.editAddress) //获取地址列表

app.post('/goods/info',mydo.getGoodInfo) //获取商品详情
app.post('/store/info',mydo.getStoreInfo) //获取店铺详情
app.post('/store/goods',mydo.getStoreandGoods) //获取店铺详情下的商品

app.post('/goods/order',mydo.sendGoodOrder) //添加订单
app.post('/goods/order/info',mydo.getGoodOrder) //查看订单

app.post('/goods/search',mydo.searchGoods) //查看订单
app.post('/goods/type',mydo.getGoodListByType) //查看订单


app.post('/shopcar',mydo.addshopcarList) //添加购物车
app.post('/shopcar/info',mydo.shopcarList) //查看购物车
app.post('/shopcar/changecount',mydo.changeshopcarCount) //查看购物车
app.post('/shopcar/del',mydo.delcargoods) //查看购物车
app.post('/shopcar/changeStatus',mydo.changeshopcarStatus) //修改商品状态

app.post('/user/info',mydo.getuserInfo) //获取用户信息

mydo.getGoodInfo
mydo.getAddress


// 监听
app.listen(3000, function () {
  console.log('success listen...3000');
});
