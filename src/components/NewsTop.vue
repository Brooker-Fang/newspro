<template>
    <div class="top">
          <input v-model="newTitle" class="query"></input>

          <button  @click="queryNewBlur(newTitle)" class="querybt" >搜索</button>


      <a class="loginspan" v-show="!isLoad" @click="isModal=true" ata-toggle="modal" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">请登录</a>
      <span class="loginspan" v-show="isLoad" v-model="userName" @click="sureLogout">欢迎用户：{{username}}</span>
      <!--<button @click="isModal=true" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" >登录</button>-->
      <!--登录 modal-->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" v-show="isModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header modalhead">
              <button @click="isModal=false" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="exampleModalLabel">登录</h4>
            </div>
            <div class="modal-body">
              <form>
                <span v-show="errorTip">用户名或密码错误</span>
                <div class="form-group">
                  <label for="recipient-name" class="control-label">用户名:</label>
                  <input v-model="userName" type="text" class="form-control" id="recipient-name">
                </div>
                <div class="form-group">
                  <label for="message-text" class="control-label">密码:</label>
                  <input v-model="password" type="text" class="form-control" id="message-text">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-info" @click="login">登录</button>
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="isModal=false" >取消</button>

            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>

  import '../assets/js/jquery-3.2.1'
  import '../assets/js/bootstrap'
  import bus from '../assets/eventBus'
  import axios from 'axios'
  import element from 'element-ui';
    export default {
        data(){
          return {
            userName:'',
            password:'',
            errorTip:false,
            isModal:false,
            isLoad:false,
            isLoadSuccess:false,
            newTitle:""
          }
        },
      computed:{
        username(){
          return this.$store.state.username;
        }
      },
      methods: {
        login() {
          axios.post('/users/login', {
            userName: this.userName,
            password: this.password
          }).then((response) => {
            let res = response.data;
            var that = this;

            if (res.status == "0") {
              console.log(res.result.user[0].USER_NAME)
              that.errorTip = false;
              that.isModal = false;
              that.isLoad = true;
              that.isLoadSuccess = true;
              //that.username = res.result.user[0].USER_NAME;
              that.$store.commit('userInfo', res.result.user[0].USER_NAME);
              that.sendMessage();

            } else {
              that.errorTip = true;

            }
          })
        },
        queryNewBlur(newTitle) {

          console.log('1' + newTitle)
          bus.$emit("newQuery", newTitle);


        }
        ,
        sendMessage() {
          this.$notify({
            title: '成功',
            message: '登录成功',
            type: 'success'
          });
        },
        sureLogout() {
          this.$confirm('您确定退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post('/users/logout').then((response) => {
              let res = response.data;
              var that = this;
              if (res.status == "0") {
                that.isLoad = false;
                this.$message({
                  type: 'success',
                  message: '您已退出!'
                });
              }

            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },

        logout() {
          axios.post('/users/logout').then((response) => {
            let res = response.data;
            var that = this;
            if (res.status == "0") {
              that.isLoad = false;
            }

          })
        }
      }
    }
</script>

<style scoped>
  @import  '../assets/css/bootstrap.min.css';

  a{
    text-decoration:none;
    display: inline-block;
    height: 40px;
    width: 100px;
    text-align: center;
    cursor: pointer;
  }
  a:hover{
    text-decoration:none;
    cursor:pointer
  }
  .top {
    height:40px;
    line-height: 40px;
    width: 80%;
    margin: 0 auto;
    text-align: inherit;
  }
  .loginspan{
    display: inline-block;
    height: 50px;
    float:right;
    color:#00B7FF;
    position: absolute;
    left: 80%;
  }
  label {
    float: left;

  }
  .modalhead {
    height: 50px;
    color: #00B7FF;
  }
  .query {
    width: 300px;
    height: 40px;
  }
  .querybt {
    background-color: #00B7FF;
    color: #fff;
    border: 0;
    padding: 0;
    border-radius: 3px;
    width: 70px;
    height: 40px;
  }
</style>
