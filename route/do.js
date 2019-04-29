var userModel = require('../db/userschema')
var goodsModel = require('../db/goods')
var storesModel = require('../db/stores')
var addressModel = require('../db/address')
var orderModel = require('../db/order')
var shopcarModel = require('../db/shopcar')
var jwt = require('jsonwebtoken')

// 注册
exports.doRegister = function (req, res, next) {
  var username = req.body.user
  var password = req.body.pass

  userModel.findOne({username: username}, function (err, result) {
    // 检查用户名是否存在
    if (result) {
      res.status(200).send('-1') // 用户名已存在
    } else {
      // 注册新用户，写入数据库
      // password = md5(password) // 密码用md5加密
      // 将新用户写入数据库
      
      result[0].users.push({username: username, password: password})
      new userModel({username: username, password: password})
        .save(function (err, result) {})
      res.status(200).send(result) // 添加数据
    }
  })
}
// 登陆
exports.doLogin = function (req, res, next) {
  var username = req.body.user
  var password = req.body.pass
  console.log(password);
  userModel.findOne({username: username, password: password}, function (err, result) {
    if (result) {
      // 签署token
      var secretOrPrivateKey = '6-ara forever'
      var token = jwt.sign({username: username}, secretOrPrivateKey,{
        expiresIn:60*60*12
      });

      //在这里将token存入数据库
      res.json({ user: username, token: token }) // 登陆成功，返回token及用户名
      // res.send(result)
    } else {
      res.status(200).send('-1') // 用户名或密码错误
    }
  })
}

/*
*在后台写一个，中间件，在需要判断token的接口里使用
*/
//判断token的全局函
let checkUser = (req, res, next) => {
  // console.log(req.body);
  let token = req.headers.token //取到请求里附带的token
  if (token) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    //jwt.verify()这个就是token的解码函数，使用方法百度，第一个是token,第二个你的盐（不太确定）
    jwt.verify(token, '6-ara forever', function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: '无效的token.' });
      } else {
        //验证通过
        next(); //继续下一步路由
      }
    })
  } else {
    // 没有拿到token 返回错误 
    return res.status(403).send({
      success: false,
      message: '没有找到token.'
    });
}
}
//某个请求
// exports.getSometing = (req, res, next) => {
//   checkUser()
//   // console.log(req.body);
//   goodsModel.find({}).sort({'_id': -1}).exec(function (err, result) {
//     err ? res.status(201).send('error') : res.status(200).send(result)
//   })
// }

//获取商品列表
exports.getGoodListByType = (req, res, next) => {
  let goodsType = req.body.goodsType
  goodsModel.find({goodsType:goodsType}).sort({'_id': -1}).exec(function (err, result) {
    err ? res.status(201).send('error') : res.status(200).send(result)
  })
}
//根据获取商品分类
exports.getGoodList = (req, res, next) => {

  // console.log(req.body);
  goodsModel.find({}).sort({'_id': -1}).exec(function (err, result) {
    err ? res.status(201).send('error') : res.status(200).send(result)
  })
}
//添加购物车
exports.addshopcarList = (req, res, next) => {
  var params = req.body
  new shopcarModel(params)
        .save(function (err, result) {
          err ? res.status(201).send('error') : res.status(200).send(result)
        })
}
//购物车
exports.shopcarList = (req, res, next) => {
  var username = req.body.username
  shopcarModel.find({username:username}).sort({'_id': -1}).exec(function (err, result) {
    err ? res.status(201).send('error') : res.status(200).send(result)
  })
}
//修改数量
exports.changeshopcarCount = (req, res, next) => {
  var newgoodsCount = req.body.goodsCount
  var goodsId = req.body.goodsId 
  shopcarModel.findOne({goodsId:goodsId},function(err,doc){
    doc.goodsCount = newgoodsCount;
    doc.save();
    err ? res.status(201).send('error') : res.status(200).send(doc)
});
}
//修改状态
exports.changeshopcarStatus = (req, res, next) => {
  var newgoodsStatus = req.body.goodsSel
  var goodsId = req.body.goodsId 
  shopcarModel.findOne({goodsId:goodsId},function(err,doc){
    console.log(doc);
    doc.goodsSel = newgoodsStatus;
    doc.save();
    err ? res.status(201).send('error') : res.status(200).send(doc)
});
}
//删除该商品
exports.delcargoods = (req, res, next) => {
  var id = req.body.id 
  shopcarModel.findByIdAndRemove(id,function(err,doc){
    //{ _id: 5972d754e6f98ec60e3dc882, name: 'huochai', age: 27 }
    console.log(doc);
    err ? res.status(201).send('error') : res.status(200).send(doc)
})   
}
//获取店铺列表
exports.getStores = (req, res, next) => {
  // console.log(req.body);
  storesModel.find({}).sort({'_id': -1}).exec(function (err, result) {
    err ? res.status(201).send('error') : res.status(200).send(result)
  })
}
//获取地址列表
exports.getAddress = (req, res, next) => {
  var username = req.body.username
  addressModel.find({username:username}).exec(function (err, result) {
    console.log(result);
    
    err ? res.status(201).send('error') : res.status(200).send(result)
  })
}
//添加地址列表
exports.addAddress = (req, res, next) => {
  var username=req.body.username //用户id
  var onArea=req.body.onArea//省市区
  var addressDetail=req.body.addressDetail//详细地址
  var isDefault=req.body.isDefault//是否默认地址
  var telNumber=req.body.telNumber
  var receName = req.body.receName
  addressModel.find({username:username}).exec(function (err, results) {
    results.forEach(function(item,index,arr){
      if(isDefault=true){
        item.isDefault = false;
        item.save();
      }
      
  })
})
  new addressModel({username:username,onArea:onArea,addressDetail:addressDetail,isDefault:isDefault,telNumber:telNumber,receName:receName}).save(function(err,doc){
    //[ { _id: 59720bc0d2b1125cbcd60b3f, age: 10, name: 'save', __v: 0 } ]
    err ? res.status(201).send('error') : res.status(200).send(doc)        
});  
}
//编辑地址列表
exports.editAddress = (req, res, next) => {
  var username=req.body.username //用户id
  var addressId=req.body.addressId 
  var onArea=req.body.onArea//省市区
  var addressDetail=req.body.addressDetail//详细地址
  var isDefault=req.body.isDefault//是否默认地址
  var telNumber=req.body.telNumber
  var receName = req.body.receName 
  addressModel.find({username:username}).exec(function (err, results) {
    results.forEach(function(item,index,arr){
      if(isDefault = true){
        item.isDefault = false;
        item.save();
      }
  })
})
  addressModel.findOne({_id:addressId},function(err,doc){
  console.log(doc);
  doc.onArea=onArea;//省市区
  doc.addressDetail=addressDetail;//详细地址
  doc.isDefault=isDefault;//是否默认地址
  doc.telNumber=telNumber;
  doc.receName = receName;
  doc.save();
  err ? res.status(201).send('error') : res.status(200).send(doc) 
})
}
//获取店铺详情
exports.getStoreInfo = (req, res, next) => {
  var id = req.body.id
  storesModel.find({storeId: id}, function (err, result) {
    if (result) {
      err ? res.status(201).send('-1') : res.status(200).send(result)
      console.log(result);
      // res.status(200).send('-1') // 用户名已存在
    } else {
    }
  })
}
//店铺与商品详情级联
exports.getStoreandGoods = (req, res, next) => {
  // let goodsId = req.body.goodsId
  //console.log('goodsid',goodsId);
  goodsModel.find({},function(err,res){
    console.log('查询到商品：',res);
  })    //查询所有的employees表中的数据，并将结果返回给populate
  .populate({ path: 'storeDep', select: { name: 1 } })   //上述结果集合中的dep字段用departments表中的name字段填充
  .exec(function(err, obj) {
    console.log('goodsid',obj);
    err ? res.status(201).send('error') : res.status(200).send(obj);
  });
}
//获取商品详情
exports.getGoodInfo = (req, res, next) => {
   var id = req.body.goodsId
  goodsModel.findOne({_id: id}, function (err, result) {
    if (result) {
      err ? res.status(201).send('-1') : res.status(200).send(result)
      console.log(result);
      // res.status(200).send('-1') // 用户名已存在
    } else {
    }
  })
}
//搜索商品
exports.searchGoods = (req, res, next) => {
  const keyword = req.body.keyword //从URL中传来的 keyword参数
  const reg = new RegExp(keyword) //不区分大小写
 goodsModel.find({goodsDetail: {$regex:reg}}, function (err, result) {
   if (result) {
     err ? res.status(201).send('-1') : res.status(200).send(result)
     console.log(result);
     // res.status(200).send('-1') // 用户名已存在
   } else {
   }
 })
}
//添加订单
exports.sendGoodOrder = (req, res, next) => {
  const params = req.body;
   orderModel.insertMany(params, function (err, result) {
     if(err){
       console.log(err);
        res.status(200).send('-1')
     }else{
      res.status(200).send(result)
     }      
  })
}
//查看订单
exports.getGoodOrder = (req, res, next) => {
  var username = req.body.username
   orderModel.find({username:username}, function (err, result) {
     if(err){
       console.log(err);
        res.status(200).send('-1')
     }else{
      res.status(200).send(result)
     }
  })
}
//获取用户信息
exports.getuserInfo = (req, res, next) => {
  var username = req.body.username
  userModel.findOne({username: username}, function (err, result) {
     err ? res.status(201).send('-1') : res.status(200).send(result)
     console.log(result);
 })
}
/*************************
 主题阅读api
 **********************/
// 新主题阅读
// exports.newTopic = function (req, res, next) {
//   const topic = req.body.topic
//   const user = req.body.user
//   const begdate = req.body.begdate
//   const enddate = req.body.enddate

//   topicModel({topic: topic, user: user, begdate: begdate, enddate: enddate})
//     .save(function (err, result) {
//       err ? res.status(201).send('-1') : res.status(200).send(result)
//     })
// }
// // 新用户加入活动
// exports.newTopicUser = (req, res, next) => {
//   const newuser = req.body.user
//   const newbook = req.body.book
//   const film = req.body.film
//   const music = req.body.music
//   const newrebook = req.body.rebook
//   const newrebook2 = req.body.rebook2

//   topicModel.find({}).sort({'_id': -1}).limit(1).exec(function (err, result) {
//     if (err) {
//       res.status(201).send('-1')
//     } else {
//       result[0].users.push(newuser)
//       result[0].book.push(newbook)
//       result[0].book.push(newrebook)
//       result[0].book.push(newrebook2)
//       result[0].film.push(film)
//       result[0].music.push(music)
//       result[0].save(function (err, result) {
//         err ? res.status(201).send('-1') : res.status(200).send(result)
//       })
//     }
//   })
// }
// // 新用户生成书单
// exports.newTopicList = (req, res, next) => {
//   const bookList = req.body.booklist
//   const user = req.body.user
//   topicModel.find({}).sort({'_id': -1}).limit(1).exec(function (err, result) {
//     if (err) {
//       res.status(201).send('-1')
//     } else {
//       result[0].userinfo.push({user: user, booklist: bookList})
//       result[0].save(function (err, result) {
//         err ? res.status(201).send('-1') : res.status(200).send(result)
//       })
//     }
//   })
// }
// // 用户提交读后感
// exports.subTopicArticle = (req, res, next) => {
//   const body = req.body.body
//   const title = req.body.article
//   const user = req.body.user
//   topicModel.find({}).sort({'_id': -1}).limit(1).exec(function (err, result) {
//     if (err) {
//       res.status(201).send('-1')
//     } else {
//       const len = result[0].userinfo.length
//       for (let i = 0; i < len; i++) {
//         if (user === result[0].userinfo[i].user) {
//           result[0].userinfo[i].articlelist.push({title: title, body: body})
//           result[0].save(function (err, result) {
//             err ? res.status(201).send('-1') : res.status(200).send(result)
//           })
//         }
//       }
//     }
//   })
// }
// // 往期活动数据
// exports.getTopicOld = (req, res, next) => {
//   topicModel.find({}).sort({'_id': -1}).skip(1).exec(function (err, result) {
//     err ? res.status(201).send('-1') : res.status(200).send(result)
//   })
// }
  
  // const goodsId = req.body.goodsId
  // const goodsName= req.body.goodsName
  // const goodsPrice = req.body.goodsPrice
  // const goodsPic = req.body.goodsPic
  // const goodsCount = req.body.exchangeNum
  // const goodsDetail= req.body.goodsDetail//商品详情
  // const goodsStatus= req.body.goodsStatus//商品状态  待发货或已发货
