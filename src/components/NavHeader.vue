<template>
  <div>
    <ul >

      <li  v-for="item in newsort" @click="queryNewsByNewSort(item.SORT_NAME)">{{item.SORT_NAME}}</li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import bus from '../assets/eventBus'
    export default {
      data(){
        return {
          newsort:[],
          isActive:false,
        }
      },
      mounted(){
        axios.get("/programa").then((response)=>{
          let res = response.data;
          if(res.status =="0"){
            this.newsort = res.result.list;
          }else {
            this.newsort = [] ;
          }
        })
      },
      methods:{
        queryNewsByNewSort(newSort){
          console.log(newSort )
          bus.$emit("userDefinedEvent",newSort);
          this.isActive = true;

        }
      }
    }
</script>

<style scoped>
  ul {
    list-style: none;
    width:100%;
    height: 50px;
    line-height: 50px;
    text-align: center;

  }
  ul li {
    float:left;
    height: 50px;
    width: 170px;
    background-color: #00B7FF;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  ul li:hover {
    background-color:#fff;
    color: #00B7FF;
  }
  /*.active {
    background-color: #fff;
    color: deepskyblue;
  }*/
</style>
