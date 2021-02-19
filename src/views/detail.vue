<template>
  <div class="main">
    <div class="content" style="min-height: 600px;">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '#/home' }">美食谷首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '#/menu' }">美食菜单</el-breadcrumb-item>
          <el-breadcrumb-item>{{tableData.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <h1>{{tableData.name}}</h1>
      </div>
      <div v-html="tableData.introduce">

      </div>
      <div class="pinglun">
        <div style="font-size: 28px" v-if="$store.state.isLogin">{{$store.state.UserName}}:</div>
        <div style="font-size: 28px" v-else>请登陆后评论:</div>
        <div style="display: flex;">
          <div style="width: 90%;">
            <el-input type="textarea" placeholder="发条友善的评论" v-model="comment"></el-input>
          </div>
          <el-button style="width: 10%;" :disabled="!$store.state.isLogin" @click="submit">提交</el-button>
        </div>
      </div>
      <div class="pinglunqu" v-for="item in commenter">
        <div style="font-size: 28px">{{item.userAccount}}:</div>
        <div>
          <div style="">
            <span>{{item.context}}</span>
          </div>
<!--          <div style="color: red">-->
<!--            <span>发布日期：{{item.time}}</span>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "detail",

  // props:{
  //   user:{
  //     type:Array
  //   }
  // },
  data(){
    return{
        tableData: [],
      comment:'',
      commenter:[],
      // pinglunbutton:true,
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getinfo();
    // this.getIndexUserInfo();
    this.queryFoodComment();
  },
  methods:{
    getinfo(){
        this.$get('/getOneFoodInfo',{
          id:this.id
        }).then(response => {
          console.log(response.food);
          this.tableData = response.food;
        })
    },
    queryFoodComment(){//美食评论
      this.$get('/queryFoodComment',{
        id:this.id
      }).then(response =>{
        console.log(response);
        this.commenter = response.commentList;
      })
    },
    submit(){  //添加评论
      this.$post('/addComment',{
        context:this.comment,
        flag:1,
        parentId:this.id,
      })
          .then(response => {
            console.log(response);
            this.queryFoodComment();
          })
    }
  }
}
</script>

<style scoped>

.content{
  width: 60%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.pinglun{
  width: 90%;margin: 1rem
}
.pinglunqu{
  border: #cf9236 1px solid;
  width: 90%;
  margin-bottom: 30px;
}

</style>