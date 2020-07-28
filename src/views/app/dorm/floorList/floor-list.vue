<template>
  <div class="floor-list">
    <list-layout
      ref="listLayoutFloor"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :is-show-bar="isShowBar"
      :title="isShowBar ? '':'宿舍列表'"
      detail-url="/dorm/dormDetail"
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
            type="info">清空宿舍</van-button>
          <van-button
            class="btn-op"
            type="info">删除</van-button>
          <van-button
            class="btn-op"
            type="warning"
            @click="isShowBar = false">取消管理</van-button>
        </div>
        <form
          v-if="isShowSearch"
          action="/">
          <van-search
            v-model="searchForm.searchValue"
            show-action
            placeholder="请输入宿舍楼名称"
            @search="onSearch"
            @cancel="isShowSearch=false"
          />
        </form>
        <div
          v-else
          class="search-bar">
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item
              v-model="searchForm.isFull"
              :options="isFullList" />
          </van-dropdown-menu>
          <van-icon
            name="search"
            @click="isShowSearch = true" />
        </div>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <div class="floor-item-content">
          <div class="flex-between">
            <img
              class="soa-avatar"
              src="../../../../assets/images/timg.jpg" >
            <div class="soa-list-item-content">
              <div>{{ slotProps.item.floorName }}</div>
              <div class="c-light">
                <span>{{ slotProps.item.headName }}</span>
                <span class="c-ml10 c-info">{{ slotProps.item.telephone }}</span>
              </div>
            </div>
          </div>
          <div class="list-item-total">
            <div class="total-item">
              <span class="lable">可容纳：</span>
              <span class="val">200人</span>
            </div>
            <div class="total-item">
              <span class="lable">可容纳：</span>
              <span class="val">200人</span>
            </div>
            <div class="total-item">
              <span class="lable">已容纳：</span>
              <span class="val">200人</span>
            </div>
            <div class="total-item">
              <span class="lable">宿舍数：</span>
              <span class="val">200人</span>
            </div>
            <div class="total-item">
              <span class="lable">可容纳学生：</span>
              <span class="val">200人</span>
            </div>
            <div class="total-item">
              <span class="lable">已容纳学生：</span>
              <span class="val">200人</span>
            </div>
            <div class="total-item">
              <span class="lable">学生：</span>
              <span class="val">200间</span>
            </div>
            <div class="total-item">
              <span class="lable">可容纳老师：</span>
              <span class="val">200人</span>
            </div>
            <div class="total-item">
              <span class="lable">已容纳老师：</span>
              <span class="val">200人</span>
            </div>
            <div class="total-item">
              <span class="lable">老师：</span>
              <span class="val">200间</span>
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
      <floor-edit/>
    </van-popup>
  </div>
</template>

<script>
import listLayout from '@/components/listLayout'
import floorEdit from './floor-edit'
export default {
  name: 'FloorList',
  components: {
    listLayout,
    floorEdit
  },
  data() {
    return {
      isShowBar: false, // 是否展示checkbox框
      isShowSearch: false, // 是否展示搜索弹框
      isFullList: [
        { text: '是否住满', value: null },
        { text: '全住满', value: 1 },
        { text: '未住满', value: 0 }
      ],
      searchForm: {
        isFull: null,
        searchValue: ''
      },
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
            floorName: '福大生活一区103栋',
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
.floor-list {
  // .dorm-total {
  //   .total-item {
  //     width: 50%;
  //   }
  // }
  .floor-item-content {
    flex-direction: column;
    .list-item-total {
      display: flex;
      flex-wrap: wrap;
      .total-item {
        margin: 0 10px;
      }
    }
  }
}
</style>
