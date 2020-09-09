<template>
  <list-layout
    ref="listLayout"
    :data-list="dataList"
    :detail-url="detailUrl"
    title="活动室审核"
    class="aroom-audit-list"
    @search="onSearch"
    @loadData="loadData"
  >
    <template slot="top">
      <van-tabs
        v-model="active"
        @click="changeTab">
        <van-tab
          v-for="item in tabList"
          :key="item.value"
          :title="item.text" />
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
        <div class="c-light">{{ slotProps.item.createTime }} 申请</div>
      </div>
    </template>
  </list-layout>
</template>

<script>
import baseList from '../../dorm/mixins/base-list'
import dayjs from 'dayjs'
export default {
  name: 'AroomAuditList',
  mixins: [baseList],
  data() {
    return {
      active: 0,
      searchForm: {
        status: 'LAUNCH'
      },
      detailUrl: '/aroom/audit/detail',
      tabList: [
        { value: 'LAUNCH', text: '未完成' },
        { value: 'PASS', text: '已完成' },
        { value: 'NOPASS', text: '未通过' }
      ]
    }
  },
  computed: {
  },
  methods: {
    changeTab() {
      this.searchForm.status = this.tabList[this.active].value
      this.onSearch()
    },
    loadData() {
      this.pageNum++;
      this.$api.getApplyRoomList(this.searchParams).then(data => {
        const rows = data.rows.map(row => {
          row.createTime = dayjs(row.createTime).format('YYYY年MM月DD日 HH:mm')
          return row
        })
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(rows)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
