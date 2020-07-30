<template>
  <div class="soa-dorm-count">
    <h3 class="soa-dorm-count__title">宿舍检测信息</h3>
    <van-tabs
      v-model="active"
      title-active-color="#1989fa">
      <van-tab
        title="学生"
        name="1"/>
      <van-tab
        title="宿舍"
        name="2"/>
    </van-tabs>
    <div class="soa-dorm-count__search">
      <div
        class="title"
        @click="bindSearchClick">搜索条件<span/></div>
      <div
        v-if="showSearch"
        class="content">
        <van-form @submit="onSubmit">
          <van-field
            v-model="query.name"
            name="楼栋名称"
            label="楼栋名称"
            placeholder="楼栋名称"
          />
          <van-field
            v-model="query.dormNum"
            name="宿舍号"
            label="宿舍号"
            placeholder="宿舍号"
          />
          <van-field
            center
            label="检查时间起"
          >
            <template #input>
              <date-picker
                v-model="query.deadline"
                :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
                :editable="false"
                :not-before="minDate"
                :clearable="false"
                type="datetime"
                value-type="format"
                format="YYYY-MM-DD HH:mm"
                placeholder="请选择检查时间"
                append-to-body/>
            </template>
          </van-field>
          <van-field
            center
            label="检查时间结"
          >
            <template #input>
              <date-picker
                v-model="query.deadline"
                :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
                :editable="false"
                :not-before="minDate"
                :clearable="false"
                type="datetime"
                value-type="format"
                format="YYYY-MM-DD HH:mm"
                placeholder="请选择检查时间"
                append-to-body/>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-row gutter="10">
              <van-col span="12">
                <van-button
                  block
                  type="default"
                  native-type="submit">重置</van-button>
              </van-col>
              <van-col span="12">
                <van-button
                  type="info"
                  block
                  native-type="submit">提交</van-button>
              </van-col>
            </van-row>
          </div>
        </van-form>
      </div>
    </div>
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
        <v-bar />
        <v-tooltip :show-item-marker="true" />
      </v-chart>

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
      active: 1,
      showSearch: false,
      query: {
        name: '',
        dormNum: ''
      },
      minDate: '',
      // 饼状图
      legendOptions: {
        position: 'right',
        itemFormatter (val) {
          return val + '  ' + map[val]
        }
      },
      yOptions: {
        formatter (val) {
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
      barData: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 }
      ],
      chartWidth: 0
    }
  },
  created() {
    this.chartWidth = document.body.clientWidth > 1024 ? (1024 - 40) : document.body.clientWidth - 40;
  },
  mounted() {
    var _this = this;
    window.onresize = function() { // 定义窗口大小变更通知事件
      _this.chartWidth = document.body.clientWidth > 1024 ? (1024 - 40) : document.body.clientWidth - 40; // 窗口宽度
    };
  },
  methods: {
    onSubmit() {
      console.log('提交信息')
    },
    bindSearchClick() {
      this.showSearch = !this.showSearch
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@include b(dorm-count){
    @include e(title){
        font-size: 16px;
        margin: 10px 0;
    }
    @include e(search){
        margin: 10px;
       & .title {
         text-align: center;
         padding: 10px;
         border-top: 1px solid #F5F6F8;
         border-bottom: 1px solid #F5F6F8;
         & > span{
           display: inline-block;
           width: 0;
           height: 0;
           border-width: 8px;
           border-style: solid;
           border-color: #909399 transparent transparent transparent;
           vertical-align: middle;
         }
       }
    }
    @include e(bar) {
      margin-bottom: 40px;
    }
}
</style>
