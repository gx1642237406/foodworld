<template>
  <div class="home">
    <div class="content">
      <div class="line">
        <span style="font-size: 48px;">菜单是你的一桌饭</span>
      </div>
      <div class="list">
        <div class="li" v-for="item in List">
          <div class="display">
            <div style="display: flex;align-items: center;justify-content: space-between">
              <h2>{{ item.name }}</h2>
              <div><span style="color: red">{{ item.length }}</span>篇菜谱</div>
            </div>
            <div style="display: flex;flex-flow: nowrap row;justify-content: space-around;width: 100%">
              <div v-for="cai in List" class="img">
                <div>
                  <a :href="'#/menu_detail/'+cai.id">
                    <img :src="cai.url" alt="">
                    <div class="none" id="none">
                      {{ cai.name }}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "menup",

  data() {
    return {
      List: [
        // {
        //   num: 6,
        //   menuName: '养生菜单',
        // },
        // {
        //   num: 8,
        //   menuName: '美容菜单',
        // },
        // {
        //   num: 10,
        //   menuName: '强身菜单',
        // },
      ],
      List1: [
        // {url: 'https://st-cn.meishij.net/r/155/60/5140155/a5140155_155196606509547.jpg', name: '茄子', id: 1},
        // {url: 'https://st-cn.meishij.net/r/155/60/5140155/a5140155_155196606509547.jpg', name: '豆角', id: 2},
        // {url: 'https://st-cn.meishij.net/r/155/60/5140155/a5140155_155196606509547.jpg', name: '狮子头'},
        // {url: 'https://st-cn.meishij.net/r/155/60/5140155/a5140155_155196606509547.jpg', name: ''},
        // {url: 'https://st-cn.meishij.net/r/155/60/5140155/a5140155_155196606509547.jpg', name: ''},
        // {url: 'https://st-cn.meishij.net/r/155/60/5140155/a5140155_155196606509547.jpg', name: ''},

      ],
    }
  },
  methods:{
    getinfo(){
      this.$get('/foodList')
          .then(res => {
            console.log(res);
            this.List = res.foodList;
          })
    }
  },
  mounted() {
    this.getinfo();
  },
}
</script>

<style scoped>
.home {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.content {
  height: 100%;
  width: 70%;

}

.content .line {
  text-align: center;
  line-height: 96px;
}


.list {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
}

.li {
  background-color: white;
  width: 80%;
  margin: 50px;
}

.display {
  display: flex;
  flex-flow: column nowrap;
}

img {
  width: 100%;
}

.img {
  position: relative;
  overflow: hidden;
}

.none {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translate(-50%);
  background-color: #ffffff;
  width: 100%;
  height: 20px;
  text-align: center;
  display: none;

}

.img a:hover .none {
  display: block;
}
</style>