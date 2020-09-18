<template>
  <div class="dorm-unallocated">
    <list-layout
      ref="listLayout"
      :data-list="dataList"
      :title="'未分配人员'"
      @search="onSearch"
      @loadData="loadData"
    >
      <template slot="top">
        <van-search
          v-model="searchForm.searchValue"
          placeholder="姓名/学院名称/专业班级"
          @search="onSearch" />
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <div>
          <img
            v-if="slotProps.item.avatar"
            :src="slotProps.item.avatar"
            class="soa-avatar" >
          <div
            v-else
            class="soa-avatar">{{ slotProps.item.stuName.substr(-2,2) }}</div>
        </div>
        <div class="soa-list-item-content">
          <span>{{ slotProps.item.stuName }}</span>
          <span>（{{ slotProps.item.collegeName }}-{{ slotProps.item.sclassName }}）</span>
          <span class="c-info c-ml10">{{ slotProps.item.mobile }}</span>
        </div>
        <van-button
          class="soa-list-right-btn"
          type="info"
          @click="setBed(slotProps.item.userId)"
        >选床位</van-button>
      </template>
    </list-layout>
  </div>
</template>

<script>
import baseList from '../mixins/base-list'
export default {
  name: 'DormUnallocated',
  mixins: [baseList],
  data() {
    return {
      searchForm: {
        searchValue: ''
      }
    }
  },
  methods: {
    loadData() {
      this.pageNum++;
      this.$api.getUnAllottedList(this.searchParams).then(data => {
        const rows = data.rows
        rows.forEach(item => {
          if (item.annexList && item.annexList.length > 0) {
            item.fileUrl = this.tcBaseUrl + item.annexList[0].fileName
          }
        });
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(rows)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    setBed(userId) {
      console.log(userId)
      this.$router.push({
        path: '/dorm/allocate',
        query: { userId: userId }
      })
    }
  }
}
</script>

<style lang="scss">
.dorm-unallocated {
  .dorm-allocat-btn {
    height: 30px;
  }
  .soa-avatar{
    width: 40px;
    height: 40px;
  }
}
</style>
