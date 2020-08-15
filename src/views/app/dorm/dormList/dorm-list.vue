<template>
  <div class="dorm-list">
    <list-layout
      ref="listLayout"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :is-show-bar="isShowBar"
      :title="isShowBar ? '':'宿舍列表'"
      op-label="管理"
      @search="onSearch"
      @loadData="loadData"
      @clickOperator="isShowBar = true"
      @clickMoreBtn="clickMoreBtn"
      @changeRowCheckbox="changeRowCheckbox"
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
            type="info"
            @click="add">新增</van-button>
          <van-button
            class="btn-op"
            type="info">清空宿舍</van-button>
          <van-button
            class="btn-op"
            type="info"
            @click="del">删除</van-button>
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
            placeholder="宿舍号/宿舍楼"
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
              v-model="searchForm.dormType"
              :options="dormTypeList" />
          </van-dropdown-menu>
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
        <div class="soa-list-item-content">
          <div class="item-row">
            <span class>{{ slotProps.item.buildingName }}-{{ slotProps.item.dormName }}</span>
            <span class="c-ml10">{{ slotProps.item.headName }}</span>
            <span class="c-info c-ml10">{{ slotProps.item.telephone }}</span>
          </div>
          <div class="item-row flex-between c-light">
            {{ slotProps.item.dormType }}
            <div>
              <span>人数：{{ slotProps.item.dormData.userNum }}/{{ slotProps.item.dormData.totalNum }}</span>
              <span
                class="c-ml10 c-danger"
              >部分激活:{{ slotProps.item.dormData.activationNum }}/{{ slotProps.item.dormData.leaveNum }}</span>
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
    <van-popup
      v-if="isShowDetailPopup"
      v-model="isShowDetailPopup"
      :style="{ height: '100%' }"
      closeable
      class="soa-popup"
      position="bottom"
    >
      <dorm-detail
        :id="rowId"
        @close="closePopup" />
    </van-popup>
  </div>
</template>

<script>
import baseList from '../mixins/base-list'
import dormEdit from './dorm-edit'
import dormDetail from './dorm-detail'
import { Dialog, Toast } from 'vant'
export default {
  name: 'DormList',
  components: {
    dormEdit,
    dormDetail
  },
  mixins: [baseList],
  data() {
    return {
      actionName: 2,
      totalList: [
        { lable: '宿舍树', filed: 'total_num', value: 200 },
        { lable: '未分配满', filed: 'total_num', value: 200 },
        { lable: '学生', filed: 'total_num', value: 200 },
        { lable: '已分配满', filed: 'total_num', value: 200 },
        { lable: '老师', filed: 'total_num', value: 200 }
      ], // 统计信息
      statusList: [
        { text: '激活状态', value: null },
        { text: '全部激活', value: 1 },
        { text: '部分激活', value: 2 },
        { text: '全未激活', value: 3 }
      ],
      dormTypeList: [
        { text: '宿舍类型', value: null },
        { text: '学生宿舍', value: 1 },
        { text: '老师宿舍', value: 2 }
      ],
      isFullList: [
        { text: '是否住满', value: null },
        { text: '全住满', value: 1 },
        { text: '未住满', value: 0 }
      ],
      searchForm: {
        status: null,
        dormType: null,
        isFull: null,
        searchValue: ''
      },
      moreOpList: [
        { value: 'edit', label: '编辑' },
        { value: 'ts', label: '清空宿舍' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  created() {
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
        case 'del': {
          this.del(item.id)
        }
      }
      this.showMore = false
    },
    loadData() {
      this.page++;
      this.$api.getDormList({
        ...this.searchForm,
        page: this.page,
        limit: this.limit
      }).then(data => {
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(data.rows)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    // 新增
    add() {
      this.isShowEditPopup = true
      this.rowId = null
    },
    del(id) {
      let idList = id ? [id] : []
      // 选中删除
      if (!id) {
        if (this.isCheckAll) {
          console.log(1)
        } else {
          idList = this.dataList.filter(item => item.isCheck).map(item => { return item.id })
        }
      }
      if (idList.length <= 0) {
        Toast('请选中一条要删除的记录！');
        return;
      }
      Dialog.confirm({
        title: '确认删除？',
        message: `此次选中${idList.length}条记录，删除的数据无法恢复`
      }).then(() => {
        // 单行删除
        this.$api.deleteDorm(idList.join(',')).then(res => {
          Toast(`删除成功，此次共删除${idList.length}条记录！`);
          this.onSearch()
        }).catch(error => {
          Toast('删除失败！' + error);
        })
      })
    }
  }
}
</script>
