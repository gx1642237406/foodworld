<template>
  <div class="main">
    <div class="shang">
      <div style="margin: 20px">
        <el-link href="#/home" target="_self">
          <span>美食谷首页</span>
        </el-link>
        >
        <span>菜谱视频</span>
      </div>
      <div class="bj">
        <div class="play" v-for="item in option.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <a :href="'#/video/play/'+item.id">
            <div style="height: 90%;position: relative">
              <img :src="item.url" alt="">
<!--              <div class="v-number">播放量：{{ item.bofangliang }}</div>-->
<!--              <div class="v-time">{{ item.time }}</div>-->
              <div class="playIcon"></div>
            </div>
            <div class="menuDetails" style="height: 10%;width: 100%;line-height: 30px;text-indent: 16px">
              <strong>{{ item.name }}</strong>
            </div>
          </a>
        </div>
      </div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :pager-count="11"
          background
          layout="prev, pager, next, jumper"
          :total="currentTotal"
          align="center"
          class="paging">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: "video-1",

  data() {
    return {
      option: [
        // {name: '左宗棠鸡', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:1},
        // {name: '呛土豆丝', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:2},
        // {name: '宫保鸡丁', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:3},
        // {name: '左宗棠鸡', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:1},
        // {name: '呛土豆丝', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:2},
        // {name: '宫保鸡丁', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:3},
        // {name: '左宗棠鸡', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:1},
        // {name: '呛土豆丝', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:2},
        // {name: '宫保鸡丁', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:3},
        // {name: '左宗棠鸡', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:1},
        // {name: '呛土豆丝', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:2},
        // {name: '宫保鸡丁', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:3},
        // {name: '左宗棠鸡', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:1},
        // {name: '呛土豆丝', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:2},
        // {name: '宫保鸡', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:3},
        // {name: '鸡', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:1},
        // {name: '呛土豆丝', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:2},
        // {name: '呛土豆丝', src: '../assets/shipinfengmian.jpg', bofangliang: 1687, time: '01:23', playId:2},
      ],
      //分页数据
      currentPage: 1,   //当前页
      pageSize: 9,      //每页多少个
      currentTotal:0, //共多少条数据
    }
  },
  mounted() {
    this.getinfo();
  },
  computed: {},
  methods: {
    getinfo(){
      this.$get('/videoList')
      .then(response => {
        console.log(response.videoList);
        this.option = response.videoList;
        this.currentTotal = response.videoList.length;
      })
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  }
}
</script>

<style scoped>

.play {
  width: 30%;
  height: 400px;
  margin-bottom: 30px;
}
.play img{
  width: 100%;
  position: absolute;
  left: 0;
  top: 0px;
  height: 100%;
  display: block;
  z-index: 10;
}

.shang {
  width: 70%;
  height: 100%;
}

.bj {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.playIcon {
  position: absolute;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.2) url(https://st-cn.meishij.net/p2/20180918/20180918141145_205.png) center no-repeat;
  background-size: 30px 30px;
  z-index: 15;
  height: 100%;
  width: 100%;
}

.v-number {
  position: absolute;
  left: 6px;
  bottom: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  height: 22px;
  padding: 0px 8px;
  z-index: 20;
  line-height: 22px;
}

.v-time {
  position: absolute;
  right: 6px;
  bottom: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  height: 22px;
  padding: 0px 8px;
  z-index: 20;
  line-height: 22px;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #cf9236;
}
</style>