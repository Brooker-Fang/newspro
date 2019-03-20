var express = require('express')
var router = express.Router();
var db = require('../models/db')


router.get('/',function (req,res,next) {

  db.query("select * from review where 1=1",function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'success',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  });
})
//通过newid查询评论
var queryReviewByNewId = "select * from review where 1=1"
router.post('/queryReviewByNewId',function (req,res,next) {
  var newid = req.body.newId;
  console.log('newid'+newid);
  //var newid = '4';
  queryReviewByNewId += " and NEW_ID= '"  +newid+"'"
  db.query(queryReviewByNewId,function (err,doc) {
    console.log(queryReviewByNewId);
    queryReviewByNewId = "select * from review where 1=1"

    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      queryReviewByNewId = "select * from review where 1=1"
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
//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
//用户评论，更新评论
var userReview = "insert into review(REVIEW_CONT,REVIEWER_NAME,REVIEW_TIME,NEW_ID,NEW_TITLE,REVIEWER_ID) values "
router.post('/userReview',function (req,res,next) {
  /*var reviewCont = 'xxxx'
  var reviewName = 'fhh'
  var reviewTime = getNowFormatDate();
  var newId = '4';
  var reviewId = '1';*/
  if(req.cookies.userId){
    var reviewCont = req.body.reviewCont
    var reviewName = req.session.userName
    var reviewTime = getNowFormatDate();
    var newId = req.body.newID;
    var reviewId = req.cookies.userId;
    var newTitle = req.body.newsTitle;
    userReview +="('"+reviewCont+"','"+reviewName+"','"+reviewTime+"','"+newId+"','"+newTitle+"','"+reviewId+"')";
    console.log(userReview);
    db.query(userReview,function (err,doc) {
      userReview = "insert into review(REVIEW_CONT,REVIEWER_NAME,REVIEW_TIME,NEW_ID,NEW_TITLE,REVIEWER_ID) values"
      if(err){
        res.json({
          status:'1',
          msg:err.message
        })
      }else{

        res.json({
          status:'0',
          msg:'review success',
        })
      }
    })
  }else{
    if(req.originalUrl=='/review/userReview'){
      res.json({
        status:'100',
        msg:'您必须先登录',
        result:''
      })
    }
  }

})
module.exports = router;
