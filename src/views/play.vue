<template>
  <div class="main" style="background-color: rgba(0,0,0,0.75)">
    <div class="player">
      <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
      ></video-player>
    </div>
    <div class="main">
      <div style="background-color: white;width: 35%;margin: 1rem">
        <h1 class="v-margin">视频内容</h1>
        <p class="v-margin" v-for="item in list">  {{item.text}}  </p>
      </div>
      <div class="pinglun">
        <div style="font-size: 28px" v-if="$store.state.isLogin">{{$store.state.UserName}}:</div>
        <div style="font-size: 28px" v-else>请登录后评论:</div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "play",

  data() {
    return {
      comment:'',//评论内容
      commenter:[
        // {commenter:'康瑜',comment:'太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把太好吃了把',time:'2020-12-21'},
        // {commenter:'罗豪',comment:'这是什么东西',time:'2020-12-20'},
        // {commenter:'李健昆',comment:'吃哭了',time:'2020-11-27'},
        // {commenter:'朱敬着',comment:'就这',time:'2020-6-9'},
      ],//
      list:[
        {text:'1、鸡腿肉280g切丁，姜片5g，蒜末5g，小米椒适量切段，甜椒20g切块'},
        {text:'2、倒入鸡腿肉，蛋黄一个，盐2g，玉米淀粉25g，搅拌均匀'},
        {text:'3、放入白砂糖15g，白醋15g，生抽8g，淀粉5g，辣椒油10g搅拌均匀'},
        {text:'4、起锅倒入食用油200ml，大火烧至七成熟，放入鸡肉，大火炸至表面金黄'},
        {text:'5、另起锅倒入食用油5ml，倒入姜片，蒜末，小米椒，大火爆香'},
        {text:'6、倒入鸡肉，翻炒均匀，倒入调料 翻炒均匀，倒入甜椒'}
      ],
      playerOptions: {
        height: 400,
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" // url地址
          }
        ],
        poster: "", // 你的封面地址
        width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
    }
  },
  computed:{
    //获取传过来的播放视频Id
    id(){
      return this.$route.params.id
    },
    player(){
      return this.$refs.videoPlayer.player
    }
  },
  mounted() {
    this.getinfo();
    this.queryVideoComment();
  },
  methods:{
    getinfo(){
      this.$get('/getOneVideoInfo',{
        id:this.id
      }).then(response => {
        console.log(response.video);
        this.playerOptions.poster = response.video.url;
        this.playerOptions.sources[0].src = response.video.video;
      })
    },
    queryVideoComment(){ //视频评论
      this.$get('/queryVideoComment',{
        id:this.id
      })
      .then(res => {
        console.log(res);
        this.commenter = res.commentList;
      })
    },
    submit(){  //添加评论
        this.$post('/addComment',{
          context:this.comment,
          flag:3,
          parentId:this.id,
        })
      .then(response => {
        console.log(response);
        this.queryVideoComment();
      })
    }
  }
}
</script>

<style scoped>

.player{
  margin: 1rem 0rem;
  width: 700px;
}
/deep/.vjs-big-play-button{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.v-margin{
  margin: 20px;
}
.pinglun{
  width: 35%;margin: 1rem
}
.pinglunqu{
  border: #cf9236 1px solid;
  width: 35%;
  margin-bottom: 30px;
}
</style>