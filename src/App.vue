<template>
  <div id="app">
    <router-view class="app-router" />
    <van-tabbar
      class="soa-bottom-bar"
      route
      border>
      <van-tabbar-item
        replace
        to="/message"
        icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item
        replace
        to="/home"
        icon="apps-o">我的应用</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'App',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

<style lang="scss">
body {
  box-sizing: border-box;
}
#app {
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  .app-router {
    padding: 10px 10px 55px 10px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    overflow: hidden;
  }
  .soa-bottom-bar {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
