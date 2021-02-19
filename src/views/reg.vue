<template>
  <div class="body">
    <div class="login">
<!--      <div class="nav">-->
<!--        <div style="font-size: 48px">-->
<!--          美食谷-->
<!--        </div>-->
<!--        <div class="box1">-->
<!--          <div class="link">-->
<!--            <el-link href="/home" target="_blank">首页</el-link>-->
<!--          </div>-->
<!--          <div class="link">-->
<!--            <el-link href="/" target="_self">菜谱大全</el-link>-->
<!--          </div>-->
<!--          <div class="link">-->
<!--            <el-link href="/" target="_self">美食菜单</el-link>-->
<!--          </div>-->
<!--          <div class="link">-->
<!--            <el-link href="/video" target="_self">菜谱视频</el-link>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <el-divider></el-divider>-->
      <div style="font-size: 1.5rem;display: flex;justify-content: center;color: white;margin-top: 50px">
        <span>欢迎来到美食谷</span>
      </div>
      <div class="login_box">
        <span class="title">欢迎注册</span>
        <div>
          <div class="fromInput">
            <el-input v-model="userNumber" placeholder="请输入账号"></el-input>
          </div>
          <div class="fromInput">
            <el-input v-model="userPassword" type="password" placeholder="请输入密码" show-password></el-input>
          </div>
          <div class="fromInput">
            <el-input v-model="rePassword" type="password" placeholder="请确认密码" show-password></el-input>
          </div>
        </div>
        <div>
          <el-button type="button" @click="getInfo">注册</el-button>
          <div class="text">
            <a href="#/login">已有账号？去登陆！</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  components: {},
  data() {
    return {
      userNumber: '',
      userPassword: '',
      rePassword:'',
    }
  },
  methods: {
    getInfo() {//注册接口
      if (this.userNumber == '') {
        this.$message({
          showClose: true,
          message: '请输入账号',
          type: 'errpr'
        });
      } else if (this.userPassword == '') {
        this.$message({
          chowClose: true,
          message: '请输入密码',
          type: 'error'
        });
      }
      else if (this.rePassword != this.userPassword) {
        this.$message({
          chowClose: true,
          message: '请与上面保持一致',
          type: 'error'
        });
      } else {
        this.$post("/regUser",//接口路径
            {
              userAccount: this.userNumber,
              userPassword: this.userPassword,
            }
        ).then((response) => {
          console.log(response);
          // window.localStorage.setItem("token", response.token);//接收保存token
          // window.localStorage.setItem("rank", response.rank);//接收保存登陆信息
          // window.localStorage.setItem("password", response.password);//接收保存登陆密码
          if (response.msg == 1) {
            this.$message({
              showClose: true,
              message: '注册失败',
              type: 'error'
            });
          }
          if (response.msg == 3) {
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            });
            setTimeout(()=>{
              this.$router.push({path: '/home'});
            },2000)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

.body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  height: 100%;
}

.login {
  position: relative;
  height: 100%;
  width: 75%;
  background: url("../../public/loginback.jpg") no-repeat;
  background-size: 100% 100%;
}

.login_box {
  min-height: 10rem;
  min-width: 10rem;
  background-color: white;
  width: 10rem;
  height: 10rem;
  border-radius: 5%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000000;
}
.hou{
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  margin-top: 5px;
  margin-right: 15px;
  color: red;
  height: 16px;
}

.title {
  font-size: 0.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 10%;
}


.fromInput {
  width: 80%;
  height: 20%;
  margin: 8% auto 0;
  border-bottom: 1px solid lightsteelblue;
  position: relative;

}

/deep/ .el-input__inner {
  width: 400px;
  height: 40px;
  border-radius: 0;
  border: 0;
  margin-left: 5%;
}

/deep/ .el-select {
  width: 100%;
}

/deep/ .el-input {
  width: 100%;
}

/deep/ .el-button {
  width: 80%;
  height: 8%;
  border-radius: 33px;
  font-size: 16px;
  margin: 10% 5% 10% 10%;
  background-color: #ea5d4e;
  color: white;
}

.text {
  color: #ea5d4e;
  display: flex;
  justify-content: center;
}

.nav{
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box1{
  width: 40%;
  display: flex;
  justify-content: space-around;
  margin-right: 20%;
}

.link{
  margin: 0px 40px;
}

.nav .link a{
  font-size: 30px;
  color: #cdcdcd;
}
/deep/.link .el-link.el-link--default:after, .el-link.el-link--primary.is-underline:hover:after, .el-link.el-link--primary:after{
  border-color: #ffffff;
}
</style>