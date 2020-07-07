<template>
  <div class="soa-task-rank">
    <van-tabs
      v-model="active"
      @click="onClick">
      <van-tab title="个人"/>
      <van-tab title="部门"/>
    </van-tabs>
    <van-grid :column-num="5">
      <van-grid-item
        v-for="item in title"
        :key="item"
        :text="item"/>
    </van-grid>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="soa-task-rank-lists"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item" >
        <!-- <van-grid-item
          v-for="value in item"
          :key="value"
          :text="value"/> -->
        {{ item }}
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Tab, Tabs, List, Cell, Grid, GridItem } from 'vant';
export default {
  name: 'TaskRank',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data() {
    return {
      active: 0,
      active1: 0,
      searchValue: '',
      list: [],
      loading: false,
      finished: false,
      title: ['排名', '姓名', '完成数量', '总质量分', '平均质量分']
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
</style>
