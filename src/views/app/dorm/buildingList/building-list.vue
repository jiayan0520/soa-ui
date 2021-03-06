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
      @search="onSearch"
      @loadData="loadData"
      @changeRowCheckbox="changeRowCheckbox"
      @clickOperator="isShowBar = true"
      @clickMoreBtn="clickMoreBtn"
    >
      <template slot="top">
        <div
          v-if="isShowBar"
          class="tool-bar more-tool-bar">
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
            type="info"
            @click="clearDorm">清空宿舍</van-button>
          <van-button
            class="btn-op"
            type="info"
            @click="del">删除</van-button>
          <van-button
            class="btn-op"
            type="warning"
            @click="cancalManage">取消管理</van-button>
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
            v-model="searchForm.buildingName"
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
              v-model="searchForm.fullTypeEnum"
              :options="isFullList"
              @change="onSearch"
            />
          </van-dropdown-menu>
          <van-icon
            name="search"
            @click="switchSearch(true)" />
        </div>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <div class="building-item-content">
          <div class="flex-between">
            <img
              :src="slotProps.item.fileUrl"
              class="soa-avatar" >
            <div class="soa-list-item-content">
              <div>{{ slotProps.item.buildingName }}</div>
              <div
                v-for="(item,index) in slotProps.item.buildingManagers "
                v-show="slotProps.item.buildingManagers"
                :key="index"
                class="c-light"
              >
                <span>{{ item.realName }}</span>
                <span class="c-ml10 c-info">{{ item.phone }}</span>
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
        { text: '是否住满', value: 'ALL' },
        { text: '全住满', value: 'BE_FULL' },
        { text: '未住满', value: 'NO_BE_FULL' }
      ],
      searchForm: {
        fullTypeEnum: 'ALL',
        buildingName: null
      },
      moreOpList: [
        { value: 'edit', label: '编辑' },
        { value: 'clear', label: '清空宿舍' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  computed: {
    tcBaseUrl() {
      return this.$store.getters['core/system'].tcBaseUrl
    }
  },
  methods: {
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      switch (val) {
        case 'edit':
          this.rowId = item.id
          this.isShowEditPopup = true
          break
        case 'clear':
          this.clearDorm(null, item.id)
          break
        case 'del':
          this.del(null, item.id)
          break
      }
      this.showMore = false
    },
    // 切换到搜索框
    switchSearch(flag) {
      if (flag) {
        // this.searchForm = {
        //   fullTypeEnum: 'ALL',
        //   buildingName: null
        // }
        this.isShowSearch = flag
      }
    },
    loadData() {
      this.pageNum++;
      this.$api.getBuildingList(this.searchParams).then(data => {
        const rows = data.rows
        rows.forEach(item => {
          item.isCheck = this.isCheckAll
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
    add() {
      // this.$router.push(this.editUrl)
      this.rowId = null
      this.isShowEditPopup = true
    },
    // 清空宿舍
    clearDorm(obj, id) {
      this.handleIdList(id, '清空宿舍', 'clearBuilding')
    },
    // 删除楼栋
    del(obj, id) {
      this.handleIdList(id, '删除', 'deleteBuilding')
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
      padding: 0;
      margin-top: 5px;
      .total-item {
        .lable {
          width: 60%;
        }
      }
    }
  }
}
</style>
