<template>
  <list-layout
    ref="listLayout"
    :data-list="dataList"
    :detail-url="detailUrl"
    title="调换审核"
    class="exchange-list"
    @search="onSearch"
    @loadData="loadData"
  >
    <template slot="top">
      <van-search
        v-model="searchForm.searchKey"
        placeholder="姓名/学院名称/专业班级"
        @search="onSearch" />
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
        <div class="c-light">{{ slotProps.item.applyTm }} 申请</div>
      </div>
      <van-button
        v-if="active!==1"
        class="soa-list-right-btn"
        type="info">分配</van-button>
    </template>
  </list-layout>
</template>

<script>
import listLayout from '@/components/listLayout'
import baseList from '../mixins/base-list'
export default {
  name: 'ExchangeList',
  components: {
    listLayout
  },
  mixins: [baseList],
  data() {
    return {
      active: 0,
      searchForm: {
        searchKey: '',
        status: 'LAUNCH'
      },
      detailUrl: '/dorm/exchange/detail',
      tabList: [
        { value: 'LAUNCH', text: '未完成' },
        { value: 'PASS', text: '审核通过' },
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
      this.$api.getExchangeList(this.searchParams).then(data => {
        // 加载状态结束
        this.$refs.listLayout.loading = false
        const rows = data.rows
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
