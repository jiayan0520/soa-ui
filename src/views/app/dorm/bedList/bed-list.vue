<template>
  <div class="bed-list">
    <list-layout
      ref="listLayout"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :is-show-bar="isShowBar"
      :title="isShowBar ? '':'宿舍床位列表'"
      op-label="管理"
      @search="onSearch"
      @loadData="loadData"
      @clickOperator="isShowBar = true"
      @clickMoreBtn="clickMoreBtn"
      @handleRowClick="handleRowClick"
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
          <div class="soa-gengduo">
            <van-button
              class="btn-op"
              type="info"
              @click="showMore = !showMore">更多</van-button>
            <ul
              v-if="showMore"
              class="soa-op__dropdown op-more">
              <li
                v-for="item in moreOpList"
                :key="item.index"
                @click.stop="clickMoreBtn(item.value)"
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
            v-model="searchForm.searchValue"
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
              :options="statusList" />
          </van-dropdown-menu>
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item
              v-model="searchForm.isHead"
              :options="isHeadList" />
          </van-dropdown-menu>
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item
              v-model="searchForm.isDivide"
              :options="isDivideList" />
          </van-dropdown-menu>
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item
              v-model="searchForm.dormType"
              :options="dormTypeList" />
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
        <img
          class="soa-avatar"
          src="../../../../assets/images/timg.jpg" >
        <div class="soa-list-item-content">
          <div>
            <span class="c-info">{{ slotProps.item.userName }}</span>
            <span class="c-info c-ml10">{{ slotProps.item.telephone }}</span>
            <span>{{ slotProps.item.banji }}</span>
          </div>
          <div class="c-light">
            {{ slotProps.item.dormInfo }}
            <span class="c-ml10">舍长</span>
          </div>
          <div class="flex-between">
            <span>学生宿舍</span>
            <span class="c-warm c-ml10">未激活</span>
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
export default {
  name: 'BedList',
  components: {
    bedDetail
  },
  mixins: [baseList],
  data() {
    return {
      actionName: 1,
      totalList: [
        { lable: '可容纳', filed: 'total_num', value: 200 },
        { lable: '已容纳', filed: 'total_num', value: 200 },
        { lable: '需激活', filed: 'total_num', value: 200 },
        { lable: '可容纳学生', filed: 'total_num', value: 200 },
        { lable: '已容纳学生', filed: 'total_num', value: 200 },
        { lable: '未激活', filed: 'total_num', value: 200 },
        { lable: '可容纳老师', filed: 'total_num', value: 20 },
        { lable: '已容纳老师', filed: 'total_num', value: 20 },
        { lable: '请假中', filed: 'total_num', value: 200 }
      ], // 统计信息
      statusList: [
        { text: '全部状态', value: null },
        { text: '正常', value: 1 },
        { text: '未激活', value: 2 },
        { text: '请假中', value: 3 }
      ],
      isHeadList: [
        { text: '是否舍长', value: null },
        { text: '是舍长', value: 1 },
        { text: '非舍长', value: 0 }
      ],
      isDivideList: [
        { text: '是否分配', value: null },
        { text: '已分配', value: 1 },
        { text: '否分配', value: 0 }
      ],
      dormTypeList: [
        { text: '宿舍类型', value: null },
        { text: '学生宿舍', value: 1 },
        { text: '教师宿舍', value: 2 }
      ],
      searchForm: {
        status: null,
        isHead: 1,
        isDivide: null,
        dormType: null,
        searchValue: ''
      },
      moreOpList: [
        { value: 'qc', label: '导出二维码' },
        { value: 'exp', label: '导出数据' },
        { value: 'out', label: '退舍' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters['core/user'] || {};
    },
    system() {
      return this.$store.getters['core/system']
    }
  },
  created() {
  },
  methods: {
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      switch (val) {
        case 'qc': {
          break
        }
        case 'out':
          this.outBed(null, item.id)
          break
        case 'del':
          this.del(null, item.id)
          break
      }
      this.showMore = false
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
      this.$api.getBedList(this.searchParams).then(data => {
        // 加载状态结束
        this.$refs.listLayout.loading = false
        const rows = data.rows
        rows.forEach(item => {
          // if (item.dormData.userNum === 0) {
          //   item.dormData.numLable = '未分配'
          //   item.dormData.class = 'c-light'
          // } else if (item.dormData.activationNum === 0) {
          //   item.dormData.numLable = '全未激活'
          //   item.dormData.class = 'c-danger'
          // } else if (item.dormData.activationNum < item.dormData.userNum) {
          //   item.dormData.numLable = '部分激活'
          //   item.dormData.class = 'c-danger'
          // } else if (item.dormData.activationNum === item.dormData.userNum) {
          //   item.dormData.numLable = '全部激活'
          //   item.dormData.class = 'c-info'
          // }
        })
        this.dataList = this.dataList.concat(rows)
        console.log(222, this.dataList)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    // 退宿舍
    outBed(obj, id) {
      this.handleIdList(id, '退舍', 'outBed')
    },
    // 删除
    del(obj, id) {
      this.handleIdList(id, '删除', 'deleteBed')
    }
  }
}
</script>

<style lang="scss">
.bed-list {
  height: 100%;
  .soa-gengduo {
    width: unset;
    .op-more {
      right: -15px;
      top: 45px;
    }
  }
}
</style>
