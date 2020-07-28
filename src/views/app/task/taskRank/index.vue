<template>
  <list-layout
    ref="listLayout"
    :data-list="list"
    class="soa-task-rank"
    @search="onSearch"
    @loadData="onLoad"
  >
    <template slot="top">
      <van-tabs
        v-model="active"
        @click="onSearch">
        <van-tab title="个人"/>
        <van-tab title="部门"/>
      </van-tabs>
      <div class="soa-task-rank__row rank-title">
        <div
          v-for="item in title"
          :key="item">{{ item }}</div>
      </div>
    </template>
    <template
      slot="item-content"
      slot-scope="slotProps">
      <div class="soa-task-rank__row rank-item">
        <div>{{ slotProps.item.index }}</div>
        <div>{{ slotProps.item.name }}</div>
        <div>{{ slotProps.item.number }}</div>
        <div>{{ slotProps.item.total }}</div>
        <div>{{ slotProps.item.average }}</div>
      </div>
    </template>
  </list-layout>
</template>

<script>
import listLayout from '@/components/listLayout'
export default {
  name: 'TaskRank',
  components: {
    listLayout
  },
  data() {
    return {
      active: 0,
      searchValue: '',
      list: [],
      title: ['排名', '姓名', '完成数量', '总质量分', '平均质量分']
    }
  },
  methods: {
    onSearch(searchValue) {
      this.list = []
      this.$refs.listLayout.loading = true
      this.$refs.listLayout.finished = false
      this.onLoad()
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({ index: this.list.length + 1, name: '林好好', number: '90', total: '9900', average: '110.3' });
        }

        // 加载状态结束
        this.$refs.listLayout.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.$refs.listLayout.finished = true
        }
      }, 1000);
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';

@include b(task-rank){
  @include e(row){
    display: flex;
    & div{
      width: 20%;
      text-align: center;
    }
    &.rank-item{
      width: 100%;
    }
    &.rank-title{
      padding: 10px 20px 10px 10px;
      border-bottom: #f5f5f5;
    }
  }
}
</style>
