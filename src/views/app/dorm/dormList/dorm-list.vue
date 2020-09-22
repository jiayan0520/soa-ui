<template>
  <div class="dorm-list">
    <list-layout
      ref="listLayout"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :is-show-bar="isShowBar"
      :detail-url="detailUrl"
      :title="isShowBar ? '':'宿舍列表'"
      op-label="管理"
      @search="onSearch"
      @loadData="loadData"
      @clickOperator="isShowBar = true"
      @clickMoreBtn="clickMoreBtn"
      @changeRowCheckbox="changeRowCheckbox"
      @showMoreOpItem="showMoreOpItem"
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
            v-model="searchForm.dormNameOrBuildingName"
            show-action
            placeholder="宿舍号/宿舍楼"
            @search="onSearch"
            @cancel="cancelSearch"
          />
        </form>
        <div
          v-else
          class="search-bar">
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item
              v-model="searchForm.status"
              :options="statusList"
              @change="onSearch"
            />
          </van-dropdown-menu>
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item
              v-model="searchForm.dormType"
              :options="dormTypeList"
              @change="onSearch"
            />
          </van-dropdown-menu>
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item
              v-model="searchForm.fullType"
              :options="isFullList"
              @change="onSearch"
            />
          </van-dropdown-menu>
          <van-icon
            name="search"
            @click="switchSearch(true)" />
        </div>
      </template>
      <template slot="refresh-top">
        <div class="soa-list-total">
          <div
            v-for="(item,index) in totalList"
            :key="index"
            class="total-item">
            <span class="lable">{{ item.lable }}：</span>
            <span class="val">{{ item.value }}间</span>
          </div>
        </div>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <div class="soa-list-item-content">
          <div class="item-row">
            <span class>{{ slotProps.item.buildingName }}-{{ slotProps.item.dormName }}</span>
            <span class="c-ml10">{{ slotProps.item.dormManager&&slotProps.item.dormManager.name }}</span>
            <span
              class="c-info c-ml10"
            >{{ slotProps.item.dormManager&&slotProps.item.dormManager.mobile }}</span>
          </div>
          <div class="item-row flex-between c-light">
            <div>{{ dormTypeEnum[slotProps.item.dormType]?dormTypeEnum[slotProps.item.dormType].label:slotProps.item.dormType }}</div>
            <div>
              <span>人数：{{ slotProps.item.dormData.userNum }}/{{ slotProps.item.dormData.totalNum }}</span>
              <span
                :class="slotProps.item.dormData.numLable"
                class="c-ml10">
                {{ slotProps.item.dormData.numLable }}
                <span
                  v-if="slotProps.item.dormData.numLable!=='未分配'"
                >:{{ slotProps.item.dormData.activationNum }}/{{ slotProps.item.dormData.userNum }}</span>
              </span>
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
      <dorm-edit
        :id="rowId"
        @close="closePopup" />
    </van-popup>
  </div>
</template>

<script>
import baseList from '../mixins/base-list'
import dormEdit from './dorm-edit'
import { dormTypeEnum } from '../utils/dorm-enum'
import { Toast } from 'vant'
export default {
  name: 'DormList',
  components: {
    dormEdit
  },
  mixins: [baseList],
  data() {
    return {
      dormTypeEnum,
      detailUrl: '/dorm/dormDetail',
      actionName: 2,
      totalList: [
        { lable: '宿舍数', filed: 'total', value: 0 },
        { lable: '未分配满', filed: 'noBeFullNum', value: 0 },
        { lable: '学生', filed: 'studentDormNum', value: 0 },
        { lable: '已分配满', filed: 'fullNum', value: 0 },
        { lable: '老师', filed: 'teacherDormNum', value: 0 }
      ], // 统计信息
      statusList: [
        { text: '激活状态', value: 'ALL' },
        { text: '全部激活', value: 'ALL_ACTIVTED' },
        { text: '部分激活', value: 'PART_ACTIVTED' },
        { text: '全未激活', value: 'NO_ACTIVTED' },
        { text: '全未分配', value: 'NO_ALLOTED' }
      ],
      dormTypeList: [
        { text: '宿舍类型', value: 'ALL' },
        { text: '学生宿舍', value: 'ALLSTUDENT' },
        { text: '教师宿舍', value: 'ALLTEACHER' }
      ],
      isFullList: [
        { text: '是否住满', value: 'ALL' },
        { text: '全住满', value: 'BE_FULL' },
        { text: '未住满', value: 'NO_BE_FULL' }
      ],
      searchForm: {
        status: 'ALL',
        dormType: 'ALL',
        fullType: 'ALL',
        dormNameOrBuildingName: ''
      },
      moreOpList: [
        { value: 'edit', label: '编辑' },
        { value: 'clear', label: '清空宿舍' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  created() {
    this.getDormTotalInfos()
  },
  methods: {
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      switch (val) {
        // 编辑
        case 'edit':
          if (item.dormData.userNum > 0) {
            Toast('已有床位绑定用户，不可修改！')
            return
          }
          this.rowId = item.id
          this.isShowEditPopup = true
          break
        case 'clear':
          this.clearDorm(null, item.id)
          break
        case 'del':
          if (item.dormData.userNum > 0) {
            Toast('已有床位绑定用户，不可删除！')
            return
          }
          this.del(null, item.id)
          break
      }
      this.showMore = false
    },
    // 列表中操作按钮根据每条数据来判断
    showMoreOpItem(item, btn, callback) {
      let isShow = true
      switch (btn.value) {
        case 'edit':
        case 'del':
          if (item.dormData.userNum > 0) {
            isShow = false
          }
          break
        case 'clear':
          if (item.dormData.userNum === 0) {
            isShow = false
          }
          break
      }
      callback && callback(isShow)
      return isShow
    },
    // 切换到搜索框
    switchSearch(flag) {
      if (flag) {
        // this.searchForm = {
        //   dormActivationStatusEnum: 'ALL',
        //   dormTypeEnum: 'ALL',
        //   fullTypeEnum: 'ALL',
        //   dormNameOrBuildingName: ''
        // }
        this.isShowSearch = flag
      }
    },
    onSearch() {
      this.pageNum = 0
      this.dataList = []
      this.getDormTotalInfos()
      this.loadData()
    },
    getDormTotalInfos() {
      this.$api.getDormTotalInfos(this.searchParams).then(data => {
        const keys = Object.keys(data)
        keys.forEach(key => {
          const item = this.totalList.find(item => item.filed === key)
          if (item) {
            item.value = data[key]
          }
        })
      })
    },
    loadData() {
      this.pageNum++;
      this.$api.getDormList(this.searchParams).then(data => {
        // 加载状态结束
        this.$refs.listLayout.loading = false
        const rows = data.rows
        rows.forEach(item => {
          item.isCheck = this.isCheckAll
          if (item.dormData.userNum === 0) {
            item.dormData.numLable = '未分配'
            item.dormData.class = 'c-light'
          } else if (item.dormData.activationNum === 0) {
            item.dormData.numLable = '全未激活'
            item.dormData.class = 'c-danger'
          } else if (item.dormData.activationNum < item.dormData.userNum) {
            item.dormData.numLable = '部分激活'
            item.dormData.class = 'c-danger'
          } else if (item.dormData.activationNum === item.dormData.userNum) {
            item.dormData.numLable = '全部激活'
            item.dormData.class = 'c-info'
          }
        })
        this.dataList = this.dataList.concat(rows)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    // 新增
    add() {
      this.rowId = null
      this.isShowEditPopup = true
    },
    // 清空宿舍
    clearDorm(obj, id) {
      this.handleIdList(id, '清空宿舍', 'clearDorm')
    },
    // 删除
    del(obj, id) {
      this.handleIdList(id, '删除', 'deleteDorm')
    }
  }
}
</script>
