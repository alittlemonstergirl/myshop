var mongoose = require('mongoose')

var storeSchema = new mongoose.Schema({
  address:String,
  coverImg: String,
  disCount: Number,
  grade: Number,
  name: String,
  storeId: String,
}, {versionKey: false}
)

var store = mongoose.model('store', storeSchema)

module.exports = store