<template>
  <div class="soa-task-examine-list">
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
      <van-tab title="已审核"/>
      <van-tab title="未审核"/>
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="soa-task-list-lists"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        @click="handleClick(item)">
        <van-row
          align="center"
          type="flex">
          <van-col span="18">
            <div class="soa-task-examine-list-label">{{ item.label }}</div>
            <div class="soa-task-examine-list-item">{{ item.end }}</div>
            <div class="soa-task-examine-list-item">{{ item.star }}</div>
            <div :class="[item.info.indexOf('距截止')>=0? 'success': 'error']">{{ item.info }}</div>
          </van-col>
          <van-col
            span="6"
            class="soa-task-examine-list-state">{{ item.state }}</van-col>
        </van-row>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'TaskExamineList',
  data() {
    return {
      active: 0,
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
          this.list.push({ id: this.list.length + 1, label: '20200705收集班级学生旷课情况',
            star: '2020年06月20日 15时30分 截止', end: '2020年06月20日 15时30分 发布',
            state: '审核中', info: '距截止还剩3天1小时' });
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
    },
    handleClick(item) {
      console.log(item)
      const id = item.id
      this.$router.push({
        path: '/task-examine-detail',
        query: { id }
      })
    }
  }
}
</script>

<style scoped>
.soa-task-examine-list-label{
  font-weight: 600
}
.soa-task-examine-list-state{
  color:#E69D01
}
.success{
  color:#3BB113
}
.error{
  color:#ee0a24
}
.soa-task-examine-list-item{
  color: #aaaaaa
}
</style>
