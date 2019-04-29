var mongoose = require('mongoose')

var orderSchema = new mongoose.Schema({
  goodsId:String,//商品id
  goodsName:String,//商品名称
  goodsDetail:String,//商品详情
  goodsStatus:String,//商品状态  待发货或已发货
  goodsCount:Number,//商品数量
  goodsPrice:String,//商品单价
  goodsPic:String,//商品图大图
  username:String, //用户id
  onArea:String,//省市区
  addressDetail:String,//详细地址
}, {versionKey: false}
)

var order = mongoose.model('order', orderSchema)

module.exports = order
