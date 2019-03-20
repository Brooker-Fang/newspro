var express = require('express')
var router = express.Router();
var db = require('../models/db');
//表newsxx

//查所有新闻
var allprograma = "select * from newsxx where 1=1"
router.get('/',function (request,response,next) {
  db.query(allprograma,function(err,doc){
    if(err){
      response.json({
        status:'1',
        msg:err.message
      })
    }else {
      response.json({
        status:'0',
        mes:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  });

})


//通过新闻类别查询
var queryNewsByNewSort = "select * from newsxx where 1=1 and STATE='1' "
router.post('/queryNewsByNewSort',function (req,res,next) {
  var newSort = req.body.newSort;
  console.log('newSort='+newSort)
  //var newSort = '国内';
  if(newSort=='首页'||newSort==''){

  }else{
    queryNewsByNewSort += " and NEWS_SORT = '"+ newSort +"'";
  }

  console.log(queryNewsByNewSort)
  db.query(queryNewsByNewSort,function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      queryNewsByNewSort = "select * from newsxx where 1=1 and STATE='1' "
      res.json({
        status:'0',
        msg:'newSort='+newSort+'reqquery='+req.query,
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})

//模糊查询
var queryNewsblur = "select * from newsxx where 1=1 and STATE='1' "
router.post('/queryNewsblur',function (req,res,next) {
  var newTitle = req.body.newTitle;
  console.log('newTitle='+newTitle)

  queryNewsblur += " and NEWS_TITLE like '%"+ newTitle +"%'";


  console.log(queryNewsblur)
  db.query(queryNewsblur,function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      queryNewsblur = "select * from newsxx where 1=1 and STATE='1' "
      res.json({
        status:'0',
        msg:'success',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})
module.exports = router;
