var mongoose = require('mongoose')

var goodsSchema = new mongoose.Schema({
  goodsId:Number,
  goodsName:String,
  goodsDetail:String,//商品详情
  goodsCount:Number,//商品数量
  goodsPrice:Number,//商品价格
  goodsType:String,//商品类别
  goodsPic:	String,		//商品图大图
  payCounts:String,//已付款人数
  storeld:String,//商品所属店铺id
  storeDep:{type:mongoose.Schema.Types.ObjectId,ref : 'stores'}
}, {versionKey: false}
)

var goods = mongoose.model('goods', goodsSchema)

module.exports = goods
