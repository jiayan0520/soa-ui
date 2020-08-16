<template>
  <div class="building-list">
    <list-layout
      ref="listLayout"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :is-show-bar="isShowBar"
      :title="isShowBar ? '':'宿舍楼列表'"
      :detail-url="detailUrl"
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
            type="info"
            @click="add">新增</van-button>
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
        <van-tabs
          v-model="actionName"
          @click="tabClick">
          <van-tab
            :name="1"
            title="床位列表" />
          <van-tab
            :name="2"
            title="宿舍列表" />
          <van-tab
            :name="3"
            title="楼栋列表" />
        </van-tabs>
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
        <div class="building-item-content">
          <div class="flex-between">
            <img
              class="soa-avatar"
              src="../../../../assets/images/timg.jpg" >
            <div class="soa-list-item-content">
              <div>{{ slotProps.item.buildingName }}</div>
              <div class="c-light">
                <span>{{ slotProps.item.headName }}</span>
                <span class="c-ml10 c-info">{{ slotProps.item.telephone }}</span>
              </div>
            </div>
          </div>
          <div class="soa-list-total">
            <div class="total-item">
              <span class="lable">可容纳：</span>
              <span class="val">{{ slotProps.item.totalData.bedTotal }}人</span>
            </div>
            <div class="total-item">
              <span class="lable">已容纳：</span>
              <span class="val">{{ slotProps.item.totalData.userTotal }}人</span>
            </div>
            <div class="total-item">
              <span class="lable">宿舍数：</span>
              <span class="val">{{ slotProps.item.totalData.dormNum }}间</span>
            </div>
            <div class="total-item">
              <span class="lable">可容纳学生：</span>
              <span class="val">{{ slotProps.item.studentTotalData.bedTotal }}人</span>
            </div>
            <div class="total-item">
              <span class="lable">已容纳学生：</span>
              <span class="val">{{ slotProps.item.studentTotalData.userTotal }}人</span>
            </div>
            <div class="total-item">
              <span class="lable">学生：</span>
              <span class="val">{{ slotProps.item.studentTotalData.dormNum }}间</span>
            </div>
            <div class="total-item">
              <span class="lable">可容纳老师：</span>
              <span class="val">{{ slotProps.item.teacherTotalData.bedTotal }}人</span>
            </div>
            <div class="total-item">
              <span class="lable">已容纳老师：</span>
              <span class="val">{{ slotProps.item.teacherTotalData.userTotal }}人</span>
            </div>
            <div class="total-item">
              <span class="lable">老师：</span>
              <span class="val">{{ slotProps.item.teacherTotalData.dormNum }}间</span>
            </div>
          </div>
        </div>
      </template>
    </list-layout>
    <van-popup
      v-if="isShowEditPopup"
      v-model="isShowEditPopup"
      :style="{ height: '100%' }"
      closeable
      class="soa-popup"
      position="bottom"
    >
      <building-edit
        :id="rowId"
        @close="closePopup" />
    </van-popup>
  </div>
</template>

<script>
import baseList from '../mixins/base-list'
import buildingEdit from './building-edit'
export default {
  name: 'BuildingList',
  components: {
    buildingEdit
  },
  mixins: [baseList],
  data() {
    return {
      detailUrl: '/dorm/building/detail',
      editUrl: '/dorm/building/edit',
      actionName: 3,
      isFullList: [
        { text: '是否住满', value: null },
        { text: '全住满', value: 1 },
        { text: '未住满', value: 0 }
      ],
      searchForm: {
        isFull: null,
        searchValue: null
      },
      moreOpList: [
        { value: 'edit', label: '编辑' },
        { value: 'ts', label: '清空宿舍' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  methods: {
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
    loadData() {
      this.pageNum++;
      this.$api.getBuildingList(this.searchParams).then(data => {
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(data.rows)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    add() {
      this.$router.push(this.editUrl)
      // this.rowId = null
      // this.isShowEditPopup = true
    }
  }
}
</script>

<style lang="scss">
.building-list {
  height: 100%;
  .building-item-content {
    flex-direction: column;
    .soa-list-total {
      background: #fff;
      .total-item {
        .lable {
          width: 60%;
        }
      }
    }
  }
}
</style>
