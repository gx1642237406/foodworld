<template>
  <div class="main">
    <div class="test">
      <div>所有菜谱</div>
      <div class="recommend">
        <div class="menu" v-for="item in $store.state.menuList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <a :href="'#/detail_menu/'+item.id" class="abox">
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
  name: "cookbook",

  data() {
    return {
      currentPage: 1,   //当前页
      pageSize: 12,      //每页多少个
      currentTotal:0, //共多少条数据
    }
  },
  methods: {
    getinfo() {
      this.$get('/menuList')
          .then(response => {
            console.log(response);
            this.menuList(response.menuList);
            this.currentTotal = this.$store.state.menuList.length;
          })
    },
    menuList(list){
      this.$store.commit('menuList',list)
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  mounted() {
    this.getinfo();
  }
}
</script>

<style scoped>


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


</style>