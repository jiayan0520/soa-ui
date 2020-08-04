<template>
  <list-layout
    ref="listLayout"
    :data-list="list"
    :detail-url="detailUrl"
    :more-op-list="moreOpList"
    class="soa-task-examine-list"
    @search="onSearch"
    @loadData="onLoad">
    <template slot="top">
      <van-search
        v-model="searchValue"
        show-action
        label="任务内容"
        placeholder="搜索"
        @search="onSearch"
      />
      <van-tabs
        v-model="active"
        @click="onSearch">
        <van-tab
          v-for="item in tab"
          :key="item"
          :title="item"/>
      </van-tabs>
    </template>
    <template
      slot="item-content"
      slot-scope="slotProps">
      <div class="soa-list-item-content content">
        <div>
          <div class="c-ft16">{{ slotProps.item.title }}</div>
          <div class="c-light">{{ slotProps.item.endTime }} 截止</div>
          <div class="c-light">{{ slotProps.item.beginTime }} 发布</div>
          <span class="c-info">{{ slotProps.item.deadline }}</span> <span class="c-success">{{ slotProps.item.info }}</span>
        </div>
        <div :class="[stateMap[slotProps.item.state],'soa-task-examine-list__status']">{{ slotProps.item.state }}</div>
      </div>
    </template>
  </list-layout>
</template>>

<script>
import listLayout from '@/components/listLayout'
export default {
  name: 'TaskExamineList',
  components: {
    listLayout
  },
  data() {
    return {
      active: 0,
      searchValue: '',
      list: [],
      tab: ['待审核', '已审核'],
      moreOpList: [],
      stateMap: {
        '审核中': 'c-warm',
        '审核失败': 'c-danger'
      },
      page: 1, // 当前页码
      limit: 20 // 每页请求数量
    }
  },
  computed: {
    detailUrl() {
      return '/task-examine-detail'
    }
  },
  methods: {
    onSearch(searchValue) {
      this.page = 1;
      this.list = []
      this.$refs.listLayout.loading = true
      this.$refs.listLayout.finished = false
      this.onLoad()
    },
    onLoad() {
      this.$api.getTaskExamineList({ page: this.page, limit: this.limit }).then((res) => {
        console.log('任务审核列表数据' + res);
        this.list = res.data.content.rows;
        // 加载状态结束
        this.$refs.listLayout.loading = false;
        // 数据全部加载完成
        if (this.list.length >= res.data.content.total) {
          this.$refs.listLayout.finished = true
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@include b(task-examine-list){
  & .content{
     @include base-between
  }
  @include e(status){
    padding-right: 30px
  }
}
</style>
