<template>
  <div>
    <ul>
      <li v-for="item in news" @click="viewNewInfo(item.NEWS_ID)">
        <img :src="'../static/NewImg/'+item.PIC_URL" alt="图片不存在"/>
        {{item.NEWS_TITLE}}
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  import bus from '../assets/eventBus'
    export default {
      data(){
          return {
            news:[],
            newSort:'',
            newInfo:{},
          }
      },
      mounted(){
          var that = this;

          that.queryNewsByNewSort(that.newSort);
          bus.$on("userDefinedEvent",function (newSort) {

           that.queryNewsByNewSort(newSort);
          })
        bus.$on("newQuery",function (newTitle) {

          that.queryNewsBlur(newTitle);
        })
      },
      methods:{
        //通过栏目名查找新闻
        queryNewsByNewSort(newSort){
          console.log(newSort)

          axios.post("/news/queryNewsByNewSort",{ newSort : newSort }).then((response)=>{
            let res = response.data;
            var that = this;

            if(res.status =="0"){
              that.news = res.result.list;
              this.$router.push({path:'/'})
            }else {
              that.news = [] ;
            }
        })
      },
        queryNewsBlur(newTitle){
          console.log('2'+newTitle)

          axios.post("/news/queryNewsblur",{ newTitle : newTitle }).then((response)=>{
            let res = response.data;
            var that = this;

            if(res.status =="0"){
              that.news = res.result.list;
              this.$router.push({path:'/'})
            }else {
              that.news = [] ;
            }
          })
        },
        //查看新闻
        viewNewInfo(newId){

          //this.$router.push({path:'/NewInfo'});
          axios.post('/users/viewNewInfo',{newId:newId}).then((response)=>{
            let res = response.data;
            var that = this;
            if(res.status =="0"){
              that.newInfo = res.result.newInfo;
              console.log("newId"+that.newInfo[0].NEWS_ID)
              that.$router.push({name:'NewInfo',params:{newInfoID:that.newInfo[0]}});
            }else {
              that.newInfo = {};
            }
          })
        }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  html,body {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
    width:100%;
    text-align: center;
  }
  ul img {
    width: 100%;
    height: 300px;
  }
  ul li {
    float:left;
    height: 350px;
    width: 320px;
    margin-left: 10px;
    color: black;
    text-align: center;

  }
  ul li:hover{

    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-box-shadow: 0 0 10px #999;
    box-shadow: 0 0 10px #999;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
  }
</style>
