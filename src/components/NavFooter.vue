<template>
  <div class="foot">
    <div class="logo" @click="dj">
      美食谷
    </div>
    <div class="box">
    </div>
  </div>
</template>

<script>
export  default {
  name:'NavFooter',
  methods:{
    dj(){
      this.$router.replace('/');
    }
  }
}
</script>

<style>

.foot{
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background: #3f3a32;
  height: 400px;
  width: 100%;
  min-width: 1385px;
}

.box{
  width: 1080px;
  height: 400px;
  background: url("../../public/foot.png");
}

.logo{
  color: #E83828;
  font-size: 64px;
}
</style>
