var mongoose = require('mongoose')

var addereeMenSchema = new mongoose.Schema({
  username:String, //用户id
  onArea:String,//省市区
  addressDetail:String,//详细地址
  telNumber:String,
  isDefault:Boolean,//是否默认地址
  receName:String
}, {versionKey: false}
)

var address = mongoose.model('addressMengment', addereeMenSchema)

module.exports = address