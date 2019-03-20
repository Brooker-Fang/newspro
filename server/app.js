var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var programaRouter = require('./routes/programa');
var newsRouter = require('./routes/news');
var reviewRouter = require('./routes/review');
//存session
var session = require('express-session')
var SessionStore = require('express-mysql-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',ejs.__express);//使用html页面

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置session
app.use(session({
  secret:'123',
  cookise:{
    path:'/',
    maxAge:1000*60*60
  },
  resave:false,
  saveUninitialized:true
}))
//拦截
/*app.use(function (req,res,next) {
  if(req.cookies.userId){
      next();
  }else{
    if(req.originalUrl=='/review/userReview'){
      res.json({
        status:'100',
        meg:'您必须先登录',
        result:''
      })
    }
  }
})*/
//添加路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/programa',programaRouter);
app.use('/news',newsRouter);
app.use('/review',reviewRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
