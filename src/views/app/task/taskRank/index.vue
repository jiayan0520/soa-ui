<template>
  <list-layout
    ref="listLayout"
    :data-list="list"
    class="soa-task-rank"
    @search="onSearch"
    @loadData="onLoad"
  >
    <template slot="top">
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
        <div>{{ slotProps.item.user_perfom_count }}</div>
        <div>{{ slotProps.item.score_sum }}</div>
        <div>{{ slotProps.item.score_avg }}</div>
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
      searchValue: '',
      list: [],
      title: ['排名', '姓名', '完成数量', '总质量分', '平均质量分'],
      limit: 20, // 每页行数
      page: 0// 当前页码 total 总条数
    }
  },
  methods: {
    onSearch(searchValue) {
      this.page = 0;
      this.list = []
      this.$refs.listLayout.loading = true
      this.$refs.listLayout.finished = false
      this.onLoad()
    },
    onLoad() {
      this.page++
      this.$api.getStatisticsList({ pageNum: this.page, pageSize: this.limit }).then((data) => {
        let listLength = this.list.length
        data.rows.forEach(item => {
          item.index = listLength + 1
          listLength = listLength + 1
        });
        this.list = this.list.concat(data.rows)
        const total = (data && data.total) || 0;

        // 加载状态结束
        this.$refs.listLayout.loading = false
        // 数据全部加载完成
        if (this.list.length >= total) {
          this.$refs.listLayout.finished = true
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/mixins/mixins.scss";

@include b(task-rank) {
  @include e(row) {
    display: flex;
    & div {
      width: 20%;
      text-align: center;
    }
    &.rank-item {
      width: 100%;
    }
    &.rank-title {
      padding: 10px 20px 10px 10px;
      border-bottom: #f5f5f5;
    }
  }
}
</style>
