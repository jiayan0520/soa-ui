<template>
  <list-layout
    ref="listLayout"
    :data-list="dataList"
    :detail-url="detailUrl"
    title="活动室审核"
    class="aroom-audit-list"
    @search="onSearch"
    @loadData="onLoad"
  >
    <template slot="top">
      <van-tabs
        v-model="active"
        @click="onSearch">
        <van-tab
          v-for="item in tab"
          :key="item"
          :title="item" />
      </van-tabs>
    </template>
    <template
      slot="item-content"
      slot-scope="slotProps">
      <div class="soa-list-item-content">
        <div>
          <span>{{ slotProps.item.userName }}</span>
          <span>（{{ slotProps.item.banji }}）</span>
        </div>
        <div>{{ slotProps.item.aroomName }}</div>
        <div class="c-light">{{ slotProps.item.applyTm }} 申请</div>
      </div>
      <van-button
        v-if="active!==1"
        class="soa-list-right-btn"
        type="info">审核</van-button>
    </template>
  </list-layout>
</template>

<script>
import listLayout from '@/components/listLayout'
export default {
  name: 'AroomAuditList',
  components: {
    listLayout
  },
  data() {
    return {
      active: 0,
      searchValue: '',
      dataList: [],
      detailUrl: '/aroom/audit/detail',
      tab: ['未完成', '已完成', '未通过']
    }
  },
  computed: {
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
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.dataList.push({
            id: this.dataList.length + 1,
            userName: '张三峰',
            banji: '石油化工学院-2019级化工一班',
            aroomName: '福大生活区1号楼1层活动室',
            applyTm: '2020年06月20日 15时30分'
          });
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
