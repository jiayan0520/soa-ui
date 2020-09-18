<template>
  <div class="bed-list">
    <list-layout
      ref="listLayout"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :is-show-bar="isShowBar"
      :title="isShowBar ? '':'宿舍床位列表'"
      :detail-url="'/dorm/bedDetail'"
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
          class="tool-bar">
          <van-button
            class="btn-op"
            type="info"
            @click="changeCheckAll">
            <span v-text="isCheckAll?'取消全选':'全选'" />
          </van-button>
          <van-button
            class="btn-op"
            type="info">提醒</van-button>
          <div class="soa-gengduo soa-gengduo__btn">
            <van-button
              class="btn-op"
              type="info"
              @click="showMore = !showMore">更多</van-button>
            <ul
              v-if="showMore"
              class="soa-op__dropdown op-more">
              <li
                v-for="item in mainMoreOpList"
                :key="item.index"
                @click.stop="clickMainMoreBtn(item.value)"
              >{{ item.label }}</li>
            </ul>
          </div>
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
            v-model="searchForm.searchData"
            show-action
            placeholder="姓名/班级/宿舍号/宿舍楼"
            @search="onSearch"
            @cancel="isShowSearch=false"
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
              v-model="searchForm.isDormManager"
              :options="isDormManagerList"
              @change="onSearch"
            />
          </van-dropdown-menu>
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item
              v-model="searchForm.isAlloted"
              :options="isAllotedList"
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
          <van-icon
            name="search"
            @click="isShowSearch = true" />
        </div>
      </template>
      <template slot="refresh-top">
        <div class="soa-list-total">
          <div
            v-for="(item,index) in totalList"
            :key="index"
            class="total-item">
            <span class="lable">{{ item.lable }}：</span>
            <span class="val">{{ item.value }}人</span>
          </div>
        </div>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <div v-if="slotProps.item.users">
          <img
            v-if="slotProps.item.users.avatar"
            :src="slotProps.item.users.avatar"
            class="soa-avatar"
          >
          <div
            v-else
            class="soa-avatar">{{ slotProps.item.users.name.substr(-2,2) }}</div>
        </div>
        <div class="soa-list-item-content">
          <div>
            <div v-if="slotProps.item.users">
              <span class="c-info">{{ slotProps.item.users.name }}</span>
              <span class="c-info c-ml10">{{ slotProps.item.users.mobile }}</span>
              <span class="c-ml10">{{ slotProps.item.banji||'未找到班级信息' }}</span>
            </div>
            <div v-else>未分配</div>
          </div>
          <div
            v-if="slotProps.item.soaDormDorm"
            class="c-light">
            {{ slotProps.item.soaDormDorm.buildingName }}-{{ slotProps.item.soaDormDorm.dormName }}-{{ slotProps.item.bedName }}床
            <span
              v-if="slotProps.item.isDormManager"
              class="c-ml10"
            >舍长</span>
          </div>
          <div class="flex-between">
            <span class="c-light">{{ dormTypeEnum[slotProps.item.soaDormDorm.dormType].label }}</span>
            <span
              v-if="slotProps.item.statusText"
              :class="slotProps.item.statusClass"
              class="c-ml10"
            >状态：{{ slotProps.item.statusText }}</span>
          </div>
        </div>
      </template>
    </list-layout>
    <van-popup
      v-if="isShowDetailPopup"
      v-model="isShowDetailPopup"
      :style="{ height: '100%' }"
      closeable
      class="soa-popup"
      position="bottom"
    >
      <bed-detail
        :id="rowId"
        @close="closePopup" />
    </van-popup>
  </div>
</template>

<script>
import baseList from '../mixins/base-list'
import bedDetail from './bed-detail'
import { statusList, dormTypeEnum } from '../utils/dorm-enum'
import bedMoreOp from '../mixins/bed-more-op'
import { Toast } from 'vant'
export default {
  name: 'BedList',
  components: {
    bedDetail
  },
  mixins: [baseList, bedMoreOp],
  data() {
    return {
      statusList,
      dormTypeEnum,
      actionName: 1,
      totalList: [
        { lable: '可容纳', filed: 'total', value: 0 },
        { lable: '已容纳', filed: 'allotedNum', value: 0 },
        { lable: '需激活', filed: 'needActiveNum', value: 0 },
        { lable: '可容纳学生', filed: 'studentTotalnum', value: 0 },
        { lable: '已容纳学生', filed: 'studentAllotedNum', value: 0 },
        { lable: '未激活', filed: 'noActiveNum', value: 0 },
        { lable: '可容纳老师', filed: 'teacherTotalNum', value: 0 },
        { lable: '已容纳老师', filed: 'teacherAllotedNum', value: 0 },
        { lable: '请假中', filed: 'leaveNum', value: 0 }
      ], // 统计信息
      isDormManagerList: [
        { text: '是否舍长', value: null },
        { text: '是舍长', value: true },
        { text: '非舍长', value: false }
      ],
      isAllotedList: [
        { text: '是否分配', value: null },
        { text: '已分配', value: true },
        { text: '未分配', value: false }
      ],
      dormTypeList: [
        { text: '宿舍类型', value: 'ALL' },
        { text: '学生宿舍', value: 'ALLSTUDENT' },
        { text: '教师宿舍', value: 'ALLTEACHER' }
      ],
      searchForm: {
        status: 'ALL',
        isDormManager: null,
        isAlloted: null,
        dormType: 'ALL',
        searchData: ''
      },
      mainMoreOpList: [
        { value: 'qc', label: '导出二维码' },
        { value: 'exp', label: '导出数据' },
        { value: 'out', label: '退舍' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  created() {
    this.isDetail = false
    this.getBedTotal()
  },
  methods: {
    onSearch() {
      this.pageNum = 0
      this.dataList = []
      this.getBedTotal()
      this.loadData()
    },
    getBedTotal() {
      this.$api.getBedTotal(this.searchParams).then(data => {
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
      this.$api.getBedList(this.searchParams).then(data => {
        // 加载状态结束
        this.$refs.listLayout.loading = false
        const rows = data.rows
        rows.forEach(item => {
          if (item.userId) {
            const status = this.statusList.find(status => status.value === item.status)
            if (status) {
              item.statusText = status.text
              item.statusClass = status.class
            }
          }
        })
        this.dataList = this.dataList.concat(rows)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    clickMainMoreBtn(val) {
      switch (val) {
        case 'qc':
          this.getBedQRCodeImgs()
          break
        case 'exp':
          break
        case 'out':
          this.handleIdList(null, '退舍', 'outBed')
          break
        case 'del':
          this.handleIdList(null, '删除', 'deleteBed')
          break
      }
    },
    getBedQRCodeImgs(id) {
      let idList = []
      if (id) {
        idList = [id]
      } else {
        if (!this.isCheckAll) {
          idList = this.dataList.filter(item => item.isCheck).map(item => { return item.id })
          if (idList.length <= 0) {
            Toast(`请选中一条要导出二维码的记录！`);
            return;
          }
        }
      }
      this.$api.getBedQRCodeImgs({ ids: idList.join(','), isCheckAll: this.isCheckAll }).then(data => {
        window.open(this.system.tcBaseUrl + data.filePath)
        Toast(`导出成功`);
        this.onSearch()
      }).catch(error => {
        Toast(`导出失败！` + error);
      })
    }
  }
}
</script>

<style lang="scss">
.bed-list {
  height: 100%;
  .soa-gengduo__btn {
    width: 80px;
    .op-more {
      top: 45px;
    }
  }
}
</style>
