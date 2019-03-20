var express = require('express');
var router = express.Router();
var db = require('../models/db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登录
var loginsql = "select * from reader where 1=1"
router.post('/login',function (req,res,next) {
  var userName = req.body.userName;
  var password = req.body.password;
  loginsql += " and USER_NAME = '"+userName+"'"+" and PASSWORD ='"+password+"'";

  db.query(loginsql,function (err,doc) {
    if(err){

      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      loginsql = "select * from reader where 1=1";
      if(doc.length==1){
        console.log(doc)
        console.log(doc[0].READER_ID)
        res.cookie("userId",doc[0].READER_ID,{
          //放到服务器根目录
          path:'/',
          maxAge:1000*60*60
        });
        req.session.userId = doc[0].READER_ID;
        req.session.userName = doc[0].USER_NAME;
        res.json({
          status:'0',
          msg:'用户名='+userName,
          result:{

            user:doc
          }
        })
      }else{

        res.json({
          status:'1',
          msg:'用户不存在'
        })
      }

    }
  })
})
//登出
router.post('/logout',function (req,res,next) {
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  });
  res.json({
    status:'0',
    msg:'',
    result:''
  })
})
//新闻查看
var viewNewInfosql = "select * from newsxx where 1=1"
router.post('/viewNewInfo',function (req,res,next) {
  var newId = req.body.newId;
  viewNewInfosql +=" and NEWS_ID = '"+newId+"'";
  console.log(viewNewInfosql)
  db.query(viewNewInfosql,function (err,doc) {
    viewNewInfosql = "select * from newsxx where 1=1"
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{


      if(doc.length==1){
        res.json({
          status:'0',
          msg:'success',
          result:{
            newInfo:doc
          }
        })
      }else{
        res.json({
          status:'1',
          msg:err.message
        })
      }
    }
  })

})
module.exports = router;
