<template>
  <div class="soa-message">
    <img
      src="@/assets/images/sch-logo.png"
      alt >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        :to="item.url"
        class="soa-message__cell" >
        <img
          src="@/assets/images/logo-icon.png"
          width="45px"
          height="45px"
          alt >
        <div class="soa-message__brief">
          <div class="c-fwb">{{ item.title }}</div>
          <div class="c-light">{{ item.brief }}</div>
        </div>
        <span class="c-light">{{ item.time }}</span>
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
<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@include b(message){
  &>img{width: 100%;}
  @include e(cell){
    & img{ margin-right: 10px}
    & .van-cell__value--alone{
      display: flex;
      justify-content: space-between;
    }
  }
  @include e(brief){
     width: calc(100% - 105px)
  }
}
</style>
