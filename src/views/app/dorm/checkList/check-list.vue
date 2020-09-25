<template>
  <div class="dorm-check-list">
    <list-layout
      ref="listLayout"
      :data-list="dataList"
      :title="'检查信息统计'"
      :more-op-list="moreOpCheckList"
      op-label="导出数据"
      @search="onSearch"
      @loadData="loadData"
      @clickOperator="expontData"
      @clickMoreBtn="clickCheckMoreBtn"
      @handleRowClick="showCheckDetail"
    >
      <template slot="top">
        <div class="soa-list__search">
          <div
            class="title"
            @click="isShowSearch=!isShowSearch">
            搜索条件
            <span class="arrow-down" />
          </div>
          <div
            v-if="isShowSearch"
            class="content">
            <van-form
              class="soa-custom-form soa-search-form"
              @submit="onSearch">
              <van-field
                v-model="searchForm.buildingName"
                name="楼栋名称"
                label="楼栋名称"
                placeholder="楼栋名称"
              />
              <van-field
                v-model="searchForm.dormName"
                name="宿舍号"
                label="宿舍号"
                placeholder="宿舍号" />
              <van-field
                v-if="active==='BED'"
                v-model="searchForm.userName"
                name="姓名"
                label="姓名"
                placeholder="姓名"
              />
              <van-field
                center
                label="检查时间起">
                <template #input>
                  <date-picker
                    v-model="searchForm.startTime"
                    :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
                    :editable="false"
                    :not-before="minDate"
                    :clearable="false"
                    type="datetime"
                    value-type="format"
                    format="YYYY-MM-DD HH:mm"
                    placeholder="请选择检查时间"
                    append-to-body
                  />
                </template>
              </van-field>
              <van-field
                center
                label="检查时间结">
                <template #input>
                  <date-picker
                    v-model="searchForm.endTime"
                    :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
                    :editable="false"
                    :not-before="minDate"
                    :clearable="false"
                    type="datetime"
                    value-type="format"
                    format="YYYY-MM-DD HH:mm"
                    placeholder="请选择检查时间"
                    append-to-body
                  />
                </template>
              </van-field>
              <van-field
                v-if="active==='BED'"
                v-model="searchForm.college"
                name="学院名称"
                label="学院名称"
                placeholder="学院名称"
              />
              <van-field
                v-if="active==='BED'"
                v-model="searchForm.sClass"
                name="专业班级"
                label="专业班级"
                placeholder="专业班级"
              />
              <div class="soa-btn-box">
                <van-button
                  type="default"
                  native-type="submit">重置</van-button>
                <van-button
                  type="info"
                  native-type="submit">提交</van-button>
              </div>
            </van-form>
          </div>
        </div>
        <van-tabs
          v-model="active"
          @click="onSearch">
          <van-tab
            name="BED"
            title="学生" />
          <van-tab
            name="DORM"
            title="宿舍" />
        </van-tabs>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <img
          v-if="active==='BED'"
          class="soa-avatar"
          src="../../../../assets/images/timg.jpg" >
        <div
          v-if="active==='BED'"
          class="soa-list-item-content">
          <div>
            <span>{{ slotProps.item.user.name }}</span>
            <span>（{{ slotProps.item.user.fullDeptNames.replace('[', '').replace(']', '').split(', ').join('-') }}）</span>
          </div>
          <div
            class="c-light"
          >{{ slotProps.item.buildingName }}-{{ slotProps.item.dormName }}-{{ slotProps.item.bedName }}床</div>
          <div class="text-nowrap c-light">结果： {{ slotProps.item.inspectionResultsInfo }}</div>
          <div class="c-light">{{ slotProps.item.checkTime }}</div>
        </div>
        <div
          v-if="active==='DORM'"
          class="soa-list-item-content">
          <div>{{ slotProps.item.buildingName }}-{{ slotProps.item.dormName }}</div>
          <div class="text-nowrap">结果： {{ slotProps.item.inspectionResultsInfo }}</div>
          <div class="c-light">{{ slotProps.item.checkTime }}</div>
        </div>
        <div>{{ slotProps.item.score }}</div>
      </template>
    </list-layout>
    <!--检查修改弹框-->
    <van-popup
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <check-common
        :type="active"
        :data="currentCheck"
        :id="currentCheckId"
        :is-detail="isCheckDetail"
        :has-parent="hasParent"
        @close="closeCheckPopop"
      />
    </van-popup>
  </div>
</template>

<script>
import baseList from '../mixins/base-list'
import DatePicker from 'vue2-datepicker'
import checkCommon from '../components/check-common'
import baseCheckList from '../mixins/base-check-list'
import dayjs from 'dayjs';
export default {
  name: 'DormCheckList',
  components: {
    DatePicker,
    checkCommon
  },
  mixins: [baseList, baseCheckList],
  data() {
    return {
      active: 'BED',
      minDate: '',
      searchForm: {
        buildingName: '',
        dormName: '',
        userName: null,
        startTime: null, // dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD HH:mm'),
        endTime: null, // dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
        college: null,
        sClass: null
      },
      pageSize: 20
    }
  },
  methods: {
    againResultList() {
      this.onSearch()
    },
    loadData() {
      this.pageNum++;
      const params = this.searchParams
      if (params.startTime && params.startTime.length === 16) {
        params.startTime += ':00'
      }
      if (params.endTime && params.endTime.length === 16) {
        params.endTime += ':00'
      }
      this.$api.getResultList({ ...params, type: this.active }).then(data => {
        // 加载状态结束
        this.$refs.listLayout.loading = false
        const rows = data.rows.map(row => {
          row.checkTime = dayjs(row.checkTime).format('YYYY年MM月DD日 HH:mm')
          return row
        })
        this.dataList = this.dataList.concat(rows)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    // 导出数据
    expontData() {
    }
  }
}
</script>

<style lang="scss">
.dorm-check-list {
}
</style>
