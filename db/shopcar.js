var mongoose = require('mongoose')

var shopcarSchema = new mongoose.Schema({
  username:String,
  goodsId:String,//商品id
  goodsName:String,//商品名称
  goodsDetail:String,//商品详情
  goodsCount:Number,//商品数量
  goodsPrice:String,//商品单价
  goodsPic:String,//商品图大图
  goodsSel:Boolean,
}, {versionKey: false}
)

var shopcar = mongoose.model('shopcar', shopcarSchema)

module.exports = shopcar