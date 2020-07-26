<template>
  <list-layout
    ref="listLayout"
    :more-op-list="moreOpList"
    :data-list="dataList"
    :detail-url="detailUrl"
    title="任务列表"
    op-label="任务结算"
    class="soa-task-list"
    @search="onSearch"
    @loadData="onLoad"
    @clickOperator="onSubmit"
    @clickMoreBtn="clickMoreBtn"
  >
    <template slot="top">
      <van-search
        v-model="searchValue"
        show-action
        label="任务内容"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
      <van-tabs
        v-model="active"
        @click="onSearch">
        <van-tab
          v-for="item in tab"
          :key="item"
          :title="item"/>
      </van-tabs>
      <van-tabs
        v-model="active1"
        @click="onSearch">
        <van-tab
          v-for="item in tab1"
          :key="item"
          :title="item"/>
      </van-tabs>
    </template>
    <template
      slot="item-content"
      slot-scope="slotProps">
      <div class="soa-list-item-content content">
        <div>
          <div class="title ft18 fwb">{{ slotProps.item.label }}</div>
          <div class="t-light">{{ slotProps.item.end }}</div>
          <div class="t-light">{{ slotProps.item.start }}</div>
          <span class="t-info">{{ slotProps.item.charge }}</span> | <span class="t-success">{{ slotProps.item.info }}</span>
          <div class="t-light">{{ slotProps.item.infoNum }}条动态  {{ slotProps.item.done }}/{{ slotProps.item.infoNum }}完成  （未结算）</div>
        </div>
        <div :class="[stateMap[slotProps.item.state]]">{{ slotProps.item.state }}</div>
      </div>
    </template>
  </list-layout>
</template>

<script>
import { addTask } from '@/api/task'
import listLayout from '@/components/listLayout'
export default {
  name: 'AddTask',
  components: {
    listLayout
  },
  data() {
    return {
      active: 0,
      active1: 0,
      searchValue: '',
      dataList: [],
      tab: ['我发布的', '我收到的'],
      tab1: ['未完成', '已完成', '所有'],
      moreOpList: [
        { value: 'submit', label: '提交' },
        { value: 'apply', label: '任务失败申请' }
      ],
      stateMap: {
        '审核中': 't-warm'
      }
    }
  },
  computed: {
    detailUrl() {
      return this.active === 0 ? '/task-detail' : '/task-receive-detail'
    }
  },
  methods: {
    // 任务结算
    onSubmit() {
      const nowDate = this.format();
      this.$dialog.confirm({
        title: '提示',
        message: '今天是' + nowDate + '，确定任务结算？'
      })
        .then(() => {
          // on confirm
        });
    },
    onSearch(searchValue) {
      this.dataList = []
      this.$refs.listLayout.loading = true
      this.$refs.listLayout.finished = false
      this.onLoad()
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        addTask({ id: '1111' }).then(response => {
          console.log(response)
        })
        for (let i = 0; i < 10; i++) {
          this.dataList.push({
            id: this.dataList.length + 1,
            label: '20200705收集班级学生旷课情况',
            end: '2020年06月20日 15时30分 截止',
            start: '2020年06月20日 15时30分 发布',
            state: '审核中',
            info: '距截止还剩3天1小时',
            charge: '林小明',
            infoNum: '3',
            done: '2',
            btn: ['编辑', '失败', '删除'] });
        }

        // 加载状态结束
        this.$refs.listLayout.loading = false
        // 数据全部加载完成
        if (this.dataList.length >= 20) {
          this.$refs.listLayout.finished = true
        }
      }, 1000);
    },
    // 下拉点击事件
    clickMoreBtn(item) {
      console.log('clickMoreBtn', item)

      if (item === '已提交') {
        this.$router.push('/task-list-feekback')
      } else {
        this.$router.push('/task-receive-detail')
      }
    },
    // 日期转换
    format() {
      var days = new Date();
      var month = (days.getMonth() + 1) < 10 ? '0' + (days.getMonth() + 1) : (days.getMonth() + 1);
      var strDate = (days.getDate() < 10 ? '0' + days.getDate() : days.getDate());
      return days.getFullYear() + '年' + month + '月' + strDate + '日';
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/mixins/mixins.scss';

@include b(task-list){
  @include e(list){
    margin-top: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f5f5f5;
    & .content>div{
      margin-top: 2px;
    }
  }
  & .content{
     @include base-between
  }
}
</style>
