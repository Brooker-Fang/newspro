var express = require('express')
var router = express.Router();
var db = require('../models/db');

/**
 * 查询
 */
var allprograma = "select * from newsort where 1=1 limit 6"
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
module.exports = router ;
