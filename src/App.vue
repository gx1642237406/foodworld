<template>
  <div id="app">
    <Nav-header></Nav-header>
    <router-view></router-view>
    <Nav-footer></Nav-footer>
  </div>
</template>

<script>

import Home from "@/views/Home";
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";

export default {
  name: 'app',
  components: {
    Home,
    NavHeader,
    NavFooter
  },
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1920px;
  min-height: 1080px;
  position: relative;
}

a {
  text-decoration: none;
}

.home {
  width: 100%;
  background: #fae8c8;
}

.main {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background: #fae8c8;
}

.menuDetails {
  font-size: 16px;
  color: #000000;
  background-color: #ffffff;
}
</style>
