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
        <form
          v-if="isShowSearch"
          action="/">
          <van-search
            v-model="searchForm.searchValue"
            show-action
            placeholder="宿舍号/宿舍楼"
            @search="onSearch"
            @cancel="isShowSearch=false"
          />
        </form>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <img
          class="soa-avatar"
          src="../../../../assets/images/timg.jpg" >
        <div class="soa-list-item-content">
          <div class="c-light">{{ slotProps.item.dormInfo }}</div>
          <div class="flex-between">
            <span>学生宿舍</span>
          </div>
        </div>
        <van-button
          class="soa-list-right-btn"
          type="info"
          @click="confirm">分配</van-button>
      </template>
    </list-layout>
  </div>
</template>

<script>
import listLayout from '@/components/listLayout'
export default {
  name: 'DormAllocate',
  components: {
    listLayout
  },
  data() {
    return {
      isShowSearch: false, // 是否展示搜索弹框
      searchForm: {
        status: null,
        isHead: 1,
        isDivide: null,
        dormType: null,
        searchValue: ''
      },
      dataList: [],
      pageIndex: 0, // 前端分页页码
      pageSize: 10,
      pageTotal: 9999 // 总页数
    }
  },
  computed: {
    params() {
      return {
        ...this.searchForm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
    }
  },
  created() {
  },
  methods: {
    onSearch() {
      this.pageIndex = 0
      this.pageTotal = 9999
      this.dataList = []
      this.loadData()
    },
    loadData() {
      this.pageIndex++;
      const dataList = []
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          dataList.push({
            id: this.dataList.length + 1,
            userName: '张三峰',
            telephone: '18233422111',
            banji: '石油化工学院-2019级化工一班',
            dormInfo: '福大生活一区103栋108宿舍-A床'
          });
        }
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(dataList)
        // 数据全部加载完成
        if (this.dataList.length >= 20) {
          this.$refs.listLayout.finished = true
        }
        // if (this.dataList.length < this.pageSize) {
        //     this.$refs.cardList.finished = true;
        //   }
      }, 1000)
    },
    // 确定分配
    confirm() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定分配？'
      }).then(() => {
        this.$router.push({
          path: '/dorm/unallocated'
        })
      });
    }
  }
}
</script>

<style lang="scss">
.dorm-allocate {
  height: 100%;
}
</style>
