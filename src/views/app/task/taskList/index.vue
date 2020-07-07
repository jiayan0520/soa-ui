<template>
  <div class="soa-task-list">
    <div>
      <h3 class="soa-task-list-title">任务列表
        <van-button
          class="soa-task-list-accounts"
          size="normal"
          type="warning"
          native-type="submit">
          任务结算
      </van-button></h3>
    </div>
    <van-search
      v-model="searchValue"
      show-action
      label="任务内容"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <van-tabs
      v-model="active"
      @click="onClick">
      <van-tab title="我发布的"/>
      <van-tab title="我收到的"/>
    </van-tabs>
    <van-tabs
      v-model="active1"
      @click="onClick">
      <van-tab title="未完成"/>
      <van-tab title="已完成"/>
      <van-tab title="所有"/>
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="soa-task-list-lists"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item"
        :title="item" />
    </van-list>
  </div>
</template>

<script>
import { Search, Tab, Tabs, Button, List, Cell } from 'vant';
export default {
  name: 'AddTask',
  components: {
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell
  },
  data() {
    return {
      active: 0,
      active1: 0,
      searchValue: '',
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onSearch(searchValue) {
      console.log(searchValue)
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onClick() {
      this.loading = true
      this.list = []
      this.onLoad()
      console.log('onClick')
    }
  }
}
</script>

<style scoped>
.soa-task-list-accounts{
  position: absolute;
  right: 0;
}
.soa-task-list-title{
  position: relative;
}
</style>
