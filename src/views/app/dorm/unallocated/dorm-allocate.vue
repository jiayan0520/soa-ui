<template>
  <div class="dorm-allocate">
    <list-layout
      ref="listLayout"
      :data-list="dataList"
      :title="'宿舍床位列表'"
      @search="onSearch"
      @loadData="loadData"
    >
      <template slot="top">
        <form action="/">
          <van-search
            v-model="searchForm.searchData"
            placeholder="宿舍号/宿舍楼"
            @search="onSearch" />
        </form>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <div class="soa-list-item-content">
          <div>{{ slotProps.item.buildingName }}-{{ slotProps.item.dormName }}-{{ slotProps.item.bedName }}床</div>
          <div class="flex-between c-light">{{ dormTypeEnum[slotProps.item.dormType].label }}</div>
        </div>
        <van-button
          class="soa-list-right-btn"
          type="info"
          @click="confirm(slotProps.item)">分配</van-button>
      </template>
    </list-layout>
  </div>
</template>

<script>
import baseList from '../mixins/base-list'
import { dormTypeEnum } from '../utils/dorm-enum'
import { getQuery } from '@/utils'
import { Toast } from 'vant'
export default {
  name: 'DormAllocate',
  mixins: [baseList],
  props: {
    opType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userId: null,
      dormTypeEnum,
      searchForm: {
        status: 'ALL',
        isDormManager: null,
        isAlloted: false,
        dormType: 'ALL',
        searchData: ''
      }
    }
  },
  created() {
    this.userId = getQuery('userId')
  },
  methods: {
    loadData() {
      this.pageNum++;
      this.$api.getBedList(this.searchParams).then(data => {
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(data.rows)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    // 确定分配
    confirm(item) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定分配？'
      }).then(() => {
        if (!this.opType) {
          this.$api.allotBed({ bedId: item.bedId, userId: this.userId }).then(res => {
            Toast(`分配成功！`);
            this.$router.push({
              path: '/dorm/unallocated'
            })
          })
        } else {
          this.$emit('confirmBed', item.bedId, item.buildingName + '-' + item.dormName + '-' + item.bedName + '床')
        }
      });
    }
  }
}
</script>

<style lang="scss">
.dorm-allocate {
  height: 100%;
  padding: 0 10px;
}
</style>
