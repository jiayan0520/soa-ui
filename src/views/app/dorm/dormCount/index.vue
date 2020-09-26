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
              v-model="searchForm.fulldeptName"
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
    <div class="soa-dorm-count__chart">
      <div class="soa-dorm-count__circle">
        <div class="c-tc">占比统计</div>
        <v-chart
          :data="data"
          :width="chartWidth">
          <v-scale
            :options="yOptions"
            y />
          <v-tooltip disabled />
          <v-pie
            :radius="0.85"
            series-field="name" />
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
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VScale } from 'vux'
import DatePicker from 'vue2-datepicker'
const map = {
  '完美': '25%',
  '良好': '35%',
  '脏乱': '30%',
  '很差': '10%'
}
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
        fulldeptName: null
      },
      minDate: '',
      // 饼状图
      legendOptions: {
        position: 'right',
        itemFormatter(val) {
          return val + '  ' + map[val]
        }
      },
      yOptions: {
        formatter(val) {
          return val * 100 + '%'
        }
      },
      map,
      data: [
        { name: '完美', percent: 0.25, a: '1' },
        { name: '良好', percent: 0.35, a: '1' },
        { name: '脏乱', percent: 0.30, a: '1' },
        { name: '很差', percent: 0.10, a: '1' }
      ],
      barData: null,
      chartWidth: 0
    }
  },
  created() {
    this.chartWidth = document.body.clientWidth > 1024 ? (1024 - 40) : document.body.clientWidth - 40;
  },
  mounted() {
    var _this = this;
    window.onresize = function () { // 定义窗口大小变更通知事件
      _this.chartWidth = document.body.clientWidth > 1024 ? (1024 - 40) : document.body.clientWidth - 40; // 窗口宽度
    };
    this.onSearch()
  },
  methods: {
    // 获取用户信息统计信息
    onSearch() {
      let apiMethod = 'getStuStatisticsInfos'
      if (this.active === 1) {
        apiMethod = 'getDormStatisticsInfos'
      }
      this.$api[apiMethod](this.searchForm).then(data => {
        console.log(data)
        this.barData = data
        this.loading = false
      })
    },
    bindSearchClick() {
      this.showSearch = !this.showSearch
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/mixins/mixins.scss";
@import "@/assets/style/var.scss";
@include b(dorm-count) {
  @include e(title) {
    margin: 10px 0;
    padding: 0 10px;
  }
  @include e(search) {
    margin-top: 10px;
    & .title {
      text-align: center;
      padding: 10px;
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
}
</style>
