<template>
  <list-layout
    ref="listLayout"
    :data-list="dataList"
    :detail-url="detailUrl"
    :more-op-list="moreOpList"
    class="soa-task-list"
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
          <div class="c-ft16">{{ slotProps.item.label }}</div>
          <div class="c-light">{{ slotProps.item.end }}</div>
          <div class="c-light">{{ slotProps.item.start }}</div>
          <span class="c-info">{{ slotProps.item.charge }}</span> <span class="c-success">{{ slotProps.item.info }}</span>
        </div>
        <div :class="[stateMap[slotProps.item.state]]">{{ slotProps.item.state }}</div>
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
      dataList: [],
      tab: ['待审核', '已审核'],
      moreOpList: [],
      stateMap: {
        '审核中': 'c-warm',
        '审核失败': 'c-danger'
      }
    }
  },
  computed: {
    detailUrl() {
      return '/task-examine-detail'
    }
  },
  methods: {
    onSearch(searchValue) {
      this.dataList = []
      this.$refs.listLayout.loading = true
      this.$refs.listLayout.finished = false
      this.onLoad()
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.dataList.push({
            id: this.dataList.length + 1,
            label: '20200705收集班级学生旷课情况',
            star: '2020年06月20日 15时30分 截止',
            end: '2020年06月20日 15时30分 发布',
            state: (i % 2 === 0) ? '审核中' : '审核失败',
            info: '距截止还剩3天1小时' });
        }

        // 加载状态结束
        this.$refs.listLayout.loading = false
        // 数据全部加载完成
        if (this.dataList.length >= 20) {
          this.$refs.listLayout.finished = true
        }
      }, 1000);
    }
  }
}
</script>

<style lang="scss">

</style>
