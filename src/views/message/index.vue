<template>
  <div class="soa-message">
    <img
      src="@/assets/images/sch-logo.png"
      alt >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="soa-task-rank-lists"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        :to="item.url"
        class="soa-message-cell" >
        <img
          src="@/assets/images/logo-icon.png"
          width="45px"
          height="45px"
          alt >
        <div class="soa-message-brief">
          <div class="title">{{ item.title }}</div>
          <div class="brief">{{ item.brief }}</div>
        </div>
        <span class="soa-message-time">{{ item.time }}</span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const data = {
            id: this.list.length + 1,
            title: '你有一条新的任务信息',
            brief: '20200705 至 20200705',
            time: '04-04',
            url: `/task-message?id=${this.list.length + 1}&type=1`
          }
          this.list.push(data);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
}
</script>
<style scoped>
.soa-message-brief{
  width: calc(100% - 105px)
}
.soa-message-brief .title{
  font-weight: 600
}
.soa-message-brief .brief,.soa-message-time{
  color:#aaa
}
.soa-message-cell .van-cell__value--alone{
  display: flex;
  justify-content: space-between;
}
.soa-message-cell img{
  margin-right: 10px
}
</style>
