<template>
  <el-container class="main-a">
    <el-header class="top" style="height: 120px">
      <div class="back" style="background: #e83828;">
        <div>
          <h2>美食谷</h2>
        </div>
        <div class="sousuo">
          <el-input class="input" @keyup.enter.native="search" v-model="input" placeholder="请输入菜单食谱"></el-input>
          <el-button class="btn" @click="search">搜索</el-button>
        </div>
        <div class="user" v-if="!$store.state.isLogin">
          <i class=" el-icon-user"></i>
          <el-link href="#/login" :underline="false" target="_self">登录</el-link>
          |
          <el-link href="#/reg" :underline="false" target="_self">注册</el-link>
        </div>
        <div class="user" v-else>
          <span>Hi,{{ $store.state.UserName }}</span>
          <div @click="out">
            <el-button>注销</el-button>
          </div>
        </div>
      </div>
    </el-header>
    <el-footer class="middle" style="height: 120px">
      <div class="nav">
        <div class="margin">
          <el-link href="#/home" target="_self">首页</el-link>
        </div>
        <div class="margin">
          <el-link href="#/cookbook" target="_self">菜谱大全</el-link>
        </div>
        <div class="margin">
          <el-link href="#/menu" target="_self">美食菜单</el-link>
        </div>
        <div class="margin">
          <el-link href="#/video" target="_self">菜谱视频</el-link>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "NavHeader",
  data() {
    return {
      input: '',
    }
  },
  mounted() {
    this.getIndexUserInfo();
  },
  methods: {
    search() {
      this.$get('/searchMenuList',{
          key:this.input
      }).then(res => {
        this.$router.push('/cookbook');
        this.menuList(res.menuList);
        console.log(res)
      })
    },
    menuList(list){
      this.$store.commit('menuList',list)
    },
    getIndexUserInfo() {
      this.$post('/getIndexUserInfo',{}
      ).then(response => {
            console.log(response);
            this.updateUser(response.users);
            this.updateUserName(response.users.userAccount);
            this.updateUserState(response.users.userState);
            this.updateId(response.users.id);
            if (this.$store.state.userstate == 0)
            {
              this.updateIsLogin(true);
            }
          })
    },
    out() {
      this.$get('/indexExit')
      .then(res => {
        console.log(res);
        // this.$store.state.isLogin = false;
        this.updateIsLogin(false);
        this.updateUser('');
        this.updateUserName('');
        this.updateUserState('');
        this.updateId('');
      })
    },
    updateIsLogin(bool){
      this.$store.commit('updateIsLogin',bool);
    },
    updateUserName(name){
      this.$store.commit('updateUserName',name);
    },
    updateUser(user){
      this.$store.commit('updateUser',user);
    },
    updateUserState(ustate){
      this.$store.commit('updateUserState',ustate);
    },
    updateId(id){
      this.$store.commit('updateId',id);
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  padding: 0;
}

.main-a {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  min-width: 1385px;
}

.top {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #d4392a;
}

.back {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 70%;
  height: 100%;
  min-width: 800px;
}

.middle {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #ffffff;
}

.sousuo {
  width: 50%;
}

.input {
  width: 85%;
}

.btn {
  width: 15%;
}

/deep/ .el-input__inner {
  width: 100%;
}

.user {
  display: flex;
  align-items: center;
}

.nav {
  display: flex;
  align-items: center;
  width: 70%;
  height: 100%;
}

.nav .margin {
  margin: 0px 60px;
}

.nav .margin a {
  font-size: 30px;
  color: #72000a;
}

/deep/ .margin .el-link.el-link--default:after, .el-link.el-link--primary.is-underline:hover:after, .el-link.el-link--primary:after {
  border-color: #E83828;
}

.user a {
  color: #fff;
  margin: 0px 2px;
  line-height: 35px;
  display: inline-block;
  width: 50px;
  height: 35px;
  text-align: center;
}

.user a:hover {
  color: #fff;
  /*box-shadow: 1px 10px 10px gray;*/
  border-radius: 10px;
  background: #72000a;
}

/deep/ .user .el-button {

  border-radius: 33px;
  font-size: 16px;
  margin: 10% 5% 10% 10%;
  background-color: #72000a;
  color: white;
}
</style>