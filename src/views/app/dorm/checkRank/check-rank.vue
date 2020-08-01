<template>
  <list-layout
    ref="listLayout"
    :data-list="list"
    class="soa-list-rank"
    @search="onSearch"
    @loadData="onLoad"
  >
    <template slot="top">
      <div class="soa-list__search">
        <div
          class="title"
          @click="bindSearchClick">
          搜索条件
          <span />
        </div>
        <div
          v-if="showSearch"
          class="content">
          <van-form @submit="onSearch">
            <van-field
              v-model="searchForm.floorName"
              name="楼栋名称"
              label="楼栋名称"
              placeholder="楼栋名称" />
            <van-field
              v-model="searchForm.dormName"
              name="宿舍号"
              label="宿舍号"
              placeholder="宿舍号" />
            <van-field
              v-model="searchForm.userName"
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
              v-model="searchForm.xy"
              name="学院名称"
              label="学院名称"
              placeholder="学院名称" />
            <van-field
              v-model="searchForm.zybj"
              name="专业班级"
              label="专业班级"
              placeholder="专业班级" />
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
        <van-tab title="学生" />
        <van-tab title="宿舍" />
      </van-tabs>
      <div class="soa-list-rank__row rank-title">
        <div class="index-column">排名</div>
        <div>姓名</div>
        <div>扣分</div>
      </div>
    </template>
    <template
      slot="item-content"
      slot-scope="slotProps">
      <div class="soa-list-rank__row rank-item">
        <div class="index-column">{{ slotProps.item.index }}</div>
        <div>{{ slotProps.item.name }}</div>
        <div>{{ slotProps.item.grade }}</div>
      </div>
    </template>
  </list-layout>
</template>

<script>
import listLayout from '@/components/listLayout'
import DatePicker from 'vue2-datepicker'
export default {
  name: 'CheckRank',
  components: {
    listLayout,
    DatePicker
  },
  data() {
    return {
      active: 0,
      searchValue: '',
      list: [],
      showSearch: false,
      minDate: '',
      searchForm: {
        floorName: '',
        dormName: '',
        userName: null,
        startTime: null,
        endTime: null,
        xy: null,
        zybj: null
      }
    }
  },
  methods: {
    onSearch(searchValue) {
      this.list = []
      this.$refs.listLayout.loading = true
      this.$refs.listLayout.finished = false
      this.onLoad()
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({ index: this.list.length + 1, name: '林好好', grade: -90 });
        }

        // 加载状态结束
        this.$refs.listLayout.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.$refs.listLayout.finished = true
        }
      }, 1000);
    },
    bindSearchClick() {
      this.showSearch = !this.showSearch
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/var.scss';

.soa-list-rank {
  .soa-list-rank__row {
    display: flex;
    & div {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
      // &.index-column {
      //   width: 0px;
      //   flex: unset;
      // }
    }
    &.rank-item {
      width: 100%;
    }
    &.rank-title {
      padding: 10px 20px 10px 10px;
      border-bottom: #f5f5f5;
    }
  }
 .soa-list__search {
    margin-top: 10px;
    & .title {
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #f5f6f8;
      box-shadow: 0 8px 6px rgba(0, 0, 0, 0.08);
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
}
</style>
