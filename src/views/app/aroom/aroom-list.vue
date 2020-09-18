<template>
  <div class="aroom-list">
    <list-layout
      ref="listLayout"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :is-show-bar="isShowBar"
      :title="isShowBar ? '':'活动室列表'"
      detail-url="/aroom/detail"
      op-label="管理"
      @search="onSearch"
      @loadData="loadData"
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
            @click="del">删除</van-button>
          <van-button
            class="btn-op"
            type="info"
            @click="getActivityRoomQRCodeImgs">导出二维码</van-button>
          <van-button
            class="btn-op"
            type="warning"
            @click="isShowBar = false">取消管理</van-button>
        </div>
        <form action="/">
          <van-search
            v-model="searchForm.activityRoomName"
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
              :src="slotProps.item.fileUrl"
              class="soa-avatar" >
            <div class="soa-list-item-content">
              <div>{{ slotProps.item.activityRoomName }}</div>
              <div
                v-for="(item,index) in slotProps.item.managers "
                v-show="slotProps.item.managers"
                :key="index"
                class="c-light"
              >
                <span>{{ item.realName }}</span>
                <span class="c-ml10 c-info">{{ item.phone }}</span>
              </div>
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
      <aroom-edit
        :id="rowId"
        @close="closePopup" />
    </van-popup>
  </div>
</template>

<script>
import aroomEdit from './aroom-edit'
import baseList from '../dorm/mixins/base-list'
import { Toast } from 'vant'
export default {
  name: 'AroomList',
  components: {
    aroomEdit
  },
  mixins: [baseList],
  data() {
    return {
      searchForm: {
        activityRoomName: null
      },
      moreOpList: [
        { value: 'qc', label: '导出二维码' },
        { value: 'edit', label: '编辑' },
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
        case 'qc':
          this.getActivityRoomQRCodeImgs(item.id)
          break
        // 编辑
        case 'edit':
          this.rowId = item.id
          this.isShowEditPopup = true
          break
        case 'del':
          this.del(null, item.id)
          break
      }
      this.showMore = false
    },
    loadData() {
      this.pageNum++;
      this.$api.getRoomList(this.searchParams).then(data => {
        const rows = data.rows
        rows.forEach(item => {
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
    // 删除活动室
    del(obj, id) {
      this.handleIdList(id, '删除', 'deleteRoom')
    },
    getActivityRoomQRCodeImgs(id) {
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
      this.$api.getActivityRoomQRCodeImgs({ ids: idList.join(','), isCheckAll: this.isCheckAll }).then(data => {
        window.open(this.tcBaseUrl + data.filePath)
        Toast(`导出成功`);
        this.onSearch()
      }).catch(error => {
        Toast(`导出失败！` + error);
      })
    }
  }
}
</script>
