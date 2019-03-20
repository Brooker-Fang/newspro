<template>
  <div CLASS="container" v-if="newInfo">
    <div class="title" >
      <h1  v-model="newInfo">{{newInfo.NEWS_TITLE}}</h1>
      <div class="author">
        <span>作者：</span><span>{{newInfo.AUTHOR}}</span><span style="margin-left: 20px">时间：</span><span>{{newInfo.CREATE_TIME.substr(0,10)}} </span>
      </div>
    </div>
    <div class="content">
      <img class="newImg" :src="'../static/NewImg/'+newInfo.PIC_URL"/>
      <p>{{newInfo.NEWS_CONT}}</p>
    </div>
    <div class="review">
      <el-input
        type="textarea"
        :rows="2"
        class="reviewInput"
        placeholder="说两句吧。。。"
        style="width: 800px"
        v-model="userReviewCon">
      </el-input>
      <div style="width:900px;margin-top: 5px;height: 50px">
        <el-button type="primary" style="float: right" round @click="userReview">发布评论</el-button>
      </div>
      <ul class="reviewCon" >
        <li v-for="item in reviewCon">
          <div class="contentCenter">
            <div class="photo"></div>
            <div class="userxx">
              <div class="user">
                <span >{{item.REVIEWER_NAME}}</span>
                <span>{{item.REVIEW_TIME.substr(0,10)}}</span>
              </div>
              <div class="user">{{item.REVIEW_CONT}}</div>
            </div>

          </div>
        </li>
      </ul>


    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      data(){
        return {
          newInfo:{
            NEWS_ID:'',
            NEWS_TITLE:'',
            NEWS_CONT:'',
            PIC_URL:'',
            AUTHOR:'',
            CREATE_TIME:'',
            STATE:'',
            NEWS_SORT:'',
          },
          comment:'',
          isData:false,
          reviewCon:[],
          userReviewCon:'',
        }
      },
      beforeCreate(){
        this.newInfo =  {
          NEWS_ID:'',
          NEWS_TITLE:'',
          NEWS_CONT:'',
          PIC_URL:'',
          AUTHOR:'',
          CREATE_TIME:'',
          STATE:'',
          NEWS_SORT:'',
        }
      },
     /* filters: {
        filtertime: function (CREATE_TIME) {
          return CREATE_TIME.substr(0, 9);
        }
      },*/
      created (){
        console.log('create')
      },
      computed:{
       /* filtertime: function (CREATE_TIME) {
          return CREATE_TIME.substr(0, 9);
        }*/
      },

      methods:{
        getNewsInfo(){
          this.newInfo = this.$route.params.newInfoID;
          console.log('传入参数='+this.newInfo.NEWS_ID)
          axios.post('/review/queryReviewByNewId',{newId:this.newInfo.NEWS_ID}).then((response)=>{

            let res = response.data;

            if(res.status =="0"){
              this.reviewCon = res.result.list;
            }else {
              this.reviewCon = [];
            }
          })
        },
        userReview(){
          axios.post('/review/userReview',{
            reviewCont:this.userReviewCon,newID:this.newInfo.NEWS_ID,newsTitle:this.newInfo.NEWS_TITLE
          }).then((response)=>{
            let res = response.data;
            if(res.status =="0"){
              this.getNewsInfo();
              this.userReviewCon = "";
            }else if(res.status =="100"){
              alert(res.msg)
            }
          })

        }

      },
      mounted(){
       let that=this;

        that.getNewsInfo();
      },
      watch:{
        '$route':'getNewsInfo'

      }
    }
</script>

<style scoped>

  .content img{
    height: 300px;
    width: 500px;
  }
  .content p{
    width: 800px;
    margin: 10px 136px;
  }
  .review{
    margin: 0 auto;
  }
  .review reviewInput{
    width: 800px;

  }
  .review ul{
    width: 800px;
    margin: 0 auto;
    list-style: none;
    height: 600px;
    padding: 0;

  }
  .review ul li{
    border: solid 1px silver;
    height: 100px;
    text-align: left;
    position: relative;
    line-height: 70px;
    margin-top: 5px;
  }

  .contentCenter {
    height: 50px;
    position: relative;
    top: 50%;
    margin-top: -25px;
  }
  .contentCenter div,p{
    float: left;
  }
  .photo{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url("../assets/1.jpg") ;
    background-size: 100% 100%;
    margin-left: 25px;

  }
  .userxx{
    float: left;
    height: 50px;
    margin-left: 100px;
    position: absolute
  }
  .user{
    height: 20px;
    line-height: 20px;
    width: 600px;
  }
  .con{
    position: absolute;
    margin: 0;
    width: 600px;
    height: 30px;
  }
</style>
