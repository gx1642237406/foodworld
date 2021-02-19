<template>
  <div class="home">
    <div class="fixed" v-if="Top" @click="goTop">
    </div>
    <div class="main">
      <div class="shang">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in option" :key="item.id" style="text-align: center;">
            <el-image
                style="width: 100%;height: 400px"
                :src="item.url"
                fit="fill">
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="test">
        <div>今日菜品</div>
        <div class="recommend">
          <div class="menu" v-for="item in option1">
            <a :href="'#/detail/'+item.id" class="abox">
              <el-image
                  style="width:100%;height: 100%"
                  :src="item.url">
              </el-image>
              <div class="menuDetails">
                <div>{{ item.name }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      option: [
        // {
        //   imageid: 1,
        //   url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        // },
        // {
        //   imageid: 2,
        //   url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        // },
        // {
        //   imageid: 3,
        //   url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        // },
      ],
      option1: [
        // {
        //   id: 1,
        //   url: 'https://st-cn.meishij.net/r/105/80/5270105/a5270105_161086552140943.jpg',
        //   name: '面条', comment: 258, popularity: 6029, index: 0, username: '朱进博'
        // },
        // {
        //   id: 2,
        //   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   name: '烧饼', comment: 258, popularity: 6029, index: 1, username: '康瑜'
        // }, {
        //   id: 1,
        //   url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        //   name: '红烧狮子头', comment: 258, popularity: 6029, index: 2, username: '罗豪'
        // },
        // {
        //   id: 2,
        //   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   name: '水煮肉片', comment: 258, popularity: 6029, index: 3, username: '秦聪明'
        // }, {
        //   id: 1,
        //   url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        //   name: '宫保鸡丁', comment: 258, popularity: 6029, index: 4, username: '朱敬着'
        // },
        // {
        //   id: 2,
        //   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   name: '铁锅炖大鹅', comment: 258, popularity: 6029, index: 5, username: '徐凯凯'
        // }, {
        //   id: 1,
        //   url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        //   name: '红烧肉', comment: 258, popularity: 6029, index: 6, username: 'pcy'
        // },
        // {
        //   id: 2,
        //   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   name: '驴肉火烧', comment: 258, popularity: 6029, index: 7, username: '王蠢新'
        // },
      ],
      Top: false,
    }
  },
  watch: {
    scrollTop(val) {
      if (this.scrollTop > 100) {
        this.Top = true;
      } else {
        this.Top = false;
      }
    }
  },

  methods: {
    getfood(){
      this.$get('/todayFoodList')
      .then(response =>{
        console.log(response.foodList);

        this.option1 = response.foodList;
        this.option = response.foodList;
      })
    }
    ,
    handleScroll() {
      this.scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.Top = true;
      }
    },
    goTop() {
      let timer = null,
          _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 250;
          document.body.scrollTop = document.documentElement.scrollTop =
              _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.Top = false;
        }
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.getfood();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
</script>

<style scoped>

.home {
  width: 100%;
  background: #fae8c8;
}



.shang {
  width: 70%;
  min-width: 1322px;
}



.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.test {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 25px;
  width: 50%;
  font-size: 32px;
}

.recommend {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 25px 0px;
}

.menu {
  width: 21%;
  /*border: 1px solid gray;*/
  margin: 25px 0px;
  height: 400px;
  background: #ffffff;
}

.abox {
  display: block;
  width: 100%;
  height: 80%;
}

.menuDetails div {
  margin: 10px;
  font-weight: bold;
}

.fixed {
  position: fixed;
  bottom: 30px;
  right: 22%;
  width:48px;
  height: 48px;
  background: url("../../public/backtotop_icon.png");
}
.fixed:hover{
  background-position-y: 48px;
}
</style>
