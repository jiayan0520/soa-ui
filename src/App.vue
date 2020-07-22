<template>
  <div id="app">
    <router-view class="app-router"/>
    <van-tabbar route>
      <van-tabbar-item
        replace
        to="/message"
        icon="chat-o">
        消息
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/home"
        icon="apps-o">
        我的应用
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 10px
}
.app-router{
  margin-bottom: 55px
}
</style>
