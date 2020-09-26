<template>
  <list-layout
    ref="listLayout"
    :data-list="dataList"
    title="评分榜"
    class="soa-list-rank check-rank"
    @search="onSearch"
    @loadData="loadData"
  >
    <template slot="tool-bar-left">
      <div
        :style="`${rankType?'color:#ff976a':''}`"
        class="rank-sort"
        @click="changeRankType">
        分数
        <div class="sort-arrow">
          <div
            :style="`${rankType==='up'?'border-bottom-color:#ff976a':''}`"
            class="arrow-up" />
          <div
            :style="`${rankType==='down'?'border-top-color:#ff976a':''}`"
            class="arrow-down" />
        </div>
      </div>
    </template>
    <template slot="top">
      <div class="soa-list__search">
        <div
          class="title"
          @click="bindSearchClick">
          搜索条件
          <span class="arrow-down" />
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
              placeholder="学院班级" />
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
      <van-tabs
        v-model="active"
        @click="onSearch">
        <van-tab title="学生" />
        <van-tab title="宿舍" />
      </van-tabs>
      <div class="soa-list-rank__row rank-title">
        <div class="index-column">排名</div>
        <div>{{ `${active===0?'姓名':'宿舍名'}` }}</div>
        <div class="score-column">扣分</div>
      </div>
    </template>
    <template
      slot="item-content"
      slot-scope="slotProps">
      <div class="soa-list-rank__row rank-item">
        <div class="index-column">{{ slotProps.item.rowNum }}</div>
        <div>
          <span v-if="active===1">{{ slotProps.item.buildingName }}-{{ slotProps.item.dormName }}</span>
          <span v-else>{{ slotProps.item.stuName }}</span>
        </div>
        <div class="score-column">{{ slotProps.item.totalScore }}</div>
      </div>
    </template>
  </list-layout>
</template>

<script>
import baseList from '../mixins/base-list'
import DatePicker from 'vue2-datepicker'
export default {
  name: 'CheckRank',
  components: {
    DatePicker
  },
  mixins: [baseList],
  data() {
    return {
      active: 0,
      showSearch: false,
      minDate: '',
      searchForm: {
        buildingName: '',
        dormName: '',
        stuName: null,
        startTime: null,
        endTime: null,
        fulldeptName: null
      },
      rankType: 'up' // 排序类型 'up','down'
    }
  },
  methods: {
    loadData() {
      this.pageNum++;
      let apiMethod = 'getStuDemeritList'
      if (this.active === 1) {
        apiMethod = 'getDormDemeritList'
      }
      const params = this.searchParams
      if (params.startTime && params.startTime.length === 16) {
        params.startTime += ':00'
      }
      if (params.endTime && params.endTime.length === 16) {
        params.endTime += ':00'
      }
      this.$api[apiMethod]({ ...params, rankType: this.rankType }).then(data => {
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(data.rows)
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    // 重置
    reset() {
      this.searchForm = {
        buildingName: '',
        dormName: '',
        userName: null,
        startTime: null,
        endTime: null,
        xy: null
      }
      this.$forceUpdate();
    },
    bindSearchClick() {
      this.showSearch = !this.showSearch
    },
    // 改变 排序类型
    changeRankType() {
      if (this.rankType === 'up') {
        this.rankType = 'down'
      } else if (this.rankType === 'down') {
        this.rankType = 'up'
      }
      this.onSearch()
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/var.scss";

.soa-list-rank {
  .soa-custom-form .van-field {
    .van-field__label {
      width: 7.2em;
    }
  }
  .soa-list-rank__row {
    display: flex;
    & div {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
      &.index-column {
        width: 40px;
        flex: unset;
      }
      &.score-column {
        width: 15%;
        flex: unset;
      }
    }
    &.rank-item {
      width: 100%;
    }
    &.rank-title {
      padding: 10px 20px 10px 10px;
      border-bottom: #f5f5f5;
    }
  }
  .rank-sort {
    font-size: 1.17em;
    .sort-arrow {
      display: inline-block;
      .arrow-up {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid black;
        overflow: hidden;
      }
      .arrow-down {
        margin-top: 3px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid black;
        overflow: hidden;
      }
    }
  }
}
</style>
