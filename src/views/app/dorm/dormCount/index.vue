<template>
  <div
    v-if="!loading"
    class="soa-dorm-count">
    <div class="soa-dorm-count__head">
      <h3 class="soa-dorm-count__title">宿舍检测信息</h3>
      <van-tabs
        v-model="active"
        title-active-color="#1989fa"
        @click="onSearch">
        <van-tab title="学生" />
        <van-tab title="宿舍" />
      </van-tabs>
      <div class="soa-dorm-count__search">
        <div
          class="title"
          @click="bindSearchClick">
          搜索条件
          <span />
        </div>
        <div
          v-if="showSearch"
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
              v-model="searchForm.stuName"
              name="姓名"
              label="姓名"
              placeholder="姓名" />
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
              v-if="active===0"
              v-model="searchForm.fullDeptNames"
              name="学院班级"
              label="学院班级"
              placeholder="学院班级"
            />
            <div class="soa-btn-box">
              <van-button
                type="default"
                @click="reset">重置</van-button>
              <van-button
                type="info"
                native-type="submit">提交</van-button>
            </div>
          </van-form>
        </div>
      </div>
    </div>
    <div
      v-if="barData.length>0"
      class="soa-dorm-count__chart">
      <div class="soa-dorm-count__circle">
        <div class="c-tc">占比统计</div>
        <v-chart
          :data="pieData"
          :width="chartWidth">
          <v-scale
            :options="yOptions"
            y />
          <v-tooltip disabled />
          <v-pie
            :radius="0.85"
            series-field="typeName" />
          <v-legend :options="legendOptions" />
        </v-chart>
      </div>
      <div class="soa-dorm-count__bar">
        <div class="c-tc">次数统计</div>
        <v-chart
          ref="demo"
          :data="barData"
          :width="chartWidth">
          <v-scale
            x
            field="typeName" />
          <v-scale
            y
            field="count" />
          <v-bar />
        </v-chart>
      </div>
    </div>
    <div
      v-else
      class="no-data">未查到数据</div>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VScale } from 'vux'
import DatePicker from 'vue2-datepicker'
export default {
  name: 'Index',
  components: {
    DatePicker,
    VChart,
    VLine,
    VArea,
    VBar,
    VPie,
    VScale,
    VTooltip,
    VLegend
  },
  data() {
    return {
      active: 0,
      loading: true,
      showSearch: false,
      searchForm: {
        buildingName: '',
        dormName: '',
        stuName: null,
        startTime: null,
        endTime: null,
        fullDeptNames: ''
      },
      minDate: '',
      // 饼状图
      yOptions: {
        formatter(val) {
          return val * 100 + '%'
        }
      },
      pieMap: null,
      barData: [],
      pieData: [],
      chartWidth: 0
    }
  },
  computed: {
    legendOptions() {
      const self = this
      return {
        position: 'right',
        itemFormatter(val) {
          const item = self.pieData.find(item => item.typeName === val)
          if (item) {
            return val + (item.percent * 100).toFixed(1) + '%'
          } else {
            return val
          }
        }
      }
    }
  },
  created() {
    this.chartWidth = document.body.clientWidth > 1024 ? (1024 - 40) : document.body.clientWidth - 40;
  },
  mounted() {
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.resize() // 窗口宽度
    };
    this.onSearch()
  },
  methods: {
    reset() {
      this.searchForm = {
        buildingName: '',
        dormName: '',
        stuName: null,
        startTime: null,
        endTime: null,
        fullDeptNames: ''
      }
      this.$forceUpdate();
    },
    // 获取用户信息统计信息
    onSearch() {
      this.loading = true
      let apiMethod = 'getStuStatisticsInfos'
      if (this.active === 1) {
        apiMethod = 'getDormStatisticsInfos'
      }
      const params = this.searchForm
      if (params.startTime && params.startTime.length === 16) {
        params.startTime += ':00'
      }
      if (params.endTime && params.endTime.length === 16) {
        params.endTime += ':00'
      }
      params.fullDeptNames = params.fullDeptNames.replace('-', ', ')
      this.$api[apiMethod](params).then(data => {
        this.barData = data
        let sumCount = 0
        data.map(item => {
          sumCount += item.count
        })
        this.pieData = data.map(item => {
          item.percent = (item.count / sumCount)
          return item
        })
        this.resize()
        this.loading = false
      })
    },
    bindSearchClick() {
      this.showSearch = !this.showSearch
    },
    resize() {
      this.chartWidth = document.body.clientWidth > 1024 ? (1024 - 40) : document.body.clientWidth - 40; // 窗口宽度
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/mixins/mixins.scss";
@import "@/assets/style/var.scss";
@include b(dorm-count) {
  @include e(title) {
    padding: 0 10px;
  }
  @include e(search) {
    margin-top: 10px;
    & .title {
      text-align: center;
      border-bottom: 1px solid #f5f6f8;
      //  box-shadow:0 8px 6px rgba(0, 0, 0, 0.08);
      & > span {
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 8px;
        border-style: solid;
        border-color: $--color-light transparent transparent transparent;
        vertical-align: middle;
      }
    }
  }
  @include e(chart) {
    padding-top: 10px;
    height: calc(100% - 125px);
    box-sizing: border-box;
    overflow: auto;
    margin-bottom: 40px;
  }
  .no-data {
    font-size: 24px;
    display: flex;
    align-items: center;
    height: 200px;
    justify-content: center;
  }
}
</style>
