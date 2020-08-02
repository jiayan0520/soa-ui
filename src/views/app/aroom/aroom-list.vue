<template>
  <div class="aroom-list">
    <list-layout
      ref="listLayoutFloor"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :is-show-bar="isShowBar"
      :title="isShowBar ? '':'活动室列表'"
      detail-url="/aroom/detail"
      op-label="管理"
      class="dorm-list"
      @search="onSearch"
      @loadData="loadData"
      @clickOperator="isShowBar = true"
      @clickMoreBtn="clickMoreBtn"
    >
      <template slot="top">
        <div
          v-if="isShowBar"
          class="tool-bar">
          <van-button
            class="btn-op"
            type="info"
            @click="changeCheckAll">
            <span v-text="isCheckAll?'取消全选':'全选'" />
          </van-button>
          <van-button
            class="btn-op"
            type="info">新增</van-button>
          <van-button
            class="btn-op"
            type="info">删除</van-button>
          <van-button
            class="btn-op"
            type="info">导出二维码</van-button>
          <van-button
            class="btn-op"
            type="warning"
            @click="isShowBar = false">取消管理</van-button>
        </div>
        <form
          action="/">
          <van-search
            v-model="searchValue"
            placeholder="请输入活动室名称"
            @search="onSearch"
          />
        </form>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <div class="floor-item-content">
          <div class="flex-between">
            <img
              class="soa-avatar"
              src="../../../assets/images/timg.jpg" >
            <div class="soa-list-item-content">
              <div>{{ slotProps.item.roomName }}</div>
              <div class="c-light">
                <span>{{ slotProps.item.headName }}</span>
                <span class="c-ml10 c-info">{{ slotProps.item.telephone }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </list-layout>
    <van-popup
      v-model="isShowEditPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <aroom-edit/>
    </van-popup>
  </div>
</template>

<script>
import listLayout from '@/components/listLayout'
import aroomEdit from './aroom-edit'
export default {
  name: 'AroomList',
  components: {
    listLayout,
    aroomEdit
  },
  data() {
    return {
      isShowBar: false, // 是否展示checkbox框
      isShowSearch: false, // 是否展示搜索弹框
      searchValue: '',
      dataList: [],
      pageIndex: 0, // 前端分页页码
      pageSize: 10,
      pageTotal: 9999, // 总页数
      isCheckAll: false, // 列表选中全部
      showMore: false, // 更多操作
      moreOpList: [
        { value: 'edit', label: '编辑' },
        { value: 'ts', label: '清空宿舍' },
        { value: 'del', label: '删除' }
      ],
      isShowEditPopup: false, // 是否展示宿舍编辑弹框
      rowId: null // 当前编辑的id
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
    this.loadData()
  },
  methods: {
    // 复选框选择所有
    changeCheckAll() {
      this.isCheckAll = !this.isCheckAll
      this.dataList.forEach((item, index) => {
        item.isCheck = this.isCheckAll
      });
    },
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      switch (val) {
        // 编辑
        case 'edit':
          this.rowId = item.id
          this.isShowEditPopup = true
          break
        case 'qc':
          break
      }
      this.showMore = false
    },
    onSearch() {
      this.pgeIndex = 0
      this.pageTotal = 9999
      this.dataList = []
      this.loadData()
    },
    loadData() {
      this.PageIndex++;
      console.log(this.params)
      const dataList = []
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          dataList.push({
            isCheck: false,
            isShowMore: false,
            id: dataList.length + 1,
            roomName: '福大生活区1号楼1层活动室',
            headName: '李幸福',
            telephone: '18233422111'
          });
        }
        // 加载状态结束
        this.$refs.listLayoutFloor.loading = false
        this.dataList = this.dataList.concat(dataList)
        // 数据全部加载完成
        if (this.dataList.length >= 20) {
          this.$refs.listLayoutFloor.finished = true
        }
        // if (this.dataList.length < this.pageSize) {
        //     this.$refs.cardList.finished = true;
        //   }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.aroom-list {
}
</style>
