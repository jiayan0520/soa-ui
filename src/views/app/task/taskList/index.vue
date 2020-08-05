<template>
  <div>
    <list-layout
      ref="listLayout"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :detail-url="detailUrl"
      :op-label="!active && '任务结算'"
      title="任务列表"
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
            <div class="c-ft16">{{ slotProps.item.title }}</div>
            <div class="c-light">{{ slotProps.item.deadline }} 截止</div>
            <div class="c-light">{{ slotProps.item.createTime }} 发布</div>
            <span class="c-info">{{ slotProps.item.createUserId }}</span> | <span class="c-success">{{ slotProps.item.info }}</span>
            <div class="c-light">{{ slotProps.item.infoNum }}条动态  {{ slotProps.item.done }}/{{ slotProps.item.taskNumber }}完成  （未结算）</div>
          </div>
          <div :class="[stateMap[slotProps.item.state]]">{{ slotProps.item.state }}</div>
        </div>
      </template>
    </list-layout>
    <van-popup
      v-model="isShowEditPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <add-task/>
    </van-popup>
  </div>

</template>

<script>
import listLayout from '@/components/listLayout'
import addTask from '../addTask/index'
export default {
  name: 'TaskList',
  components: {
    listLayout,
    addTask
  },
  data() {
    return {
      active: 0,
      active1: 0,
      isShowEditPopup: false,
      searchValue: '',
      dataList: [],
      tab: ['我发布的', '我收到的'],
      tab1: ['未完成', '已完成', '所有'],
      stateMap: {
        '未完成': 'c-warm',
        '已完成': 'c-success',
        '任务失败': 'c-danger'
      },
      limit: 20, // 每页行数
      page: 1 // 当前页码 total 总条数
    }
  },
  computed: {
    detailUrl() {
      return '/task-detail'
    },
    moreOpList() {
      const publishOp = [
        { value: 'edit', label: '编辑' },
        { value: 'delete', label: '删除' },
        { value: 'fail', label: '任务失败' }
      ]
      const reOp = [
        { value: 'submit', label: '提交' }
      ]
      return this.active ? reOp : publishOp
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
      this.$api.getTaskList({ page: this.page, limit: this.limit }).then((data) => {
        console.log(data)
        this.dataList = data.data.rows;
        // 加载状态结束
        this.$refs.listLayout.loading = false
        // 数据全部加载完成
        if (this.dataList.length >= data.data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    // 下拉点击事件
    clickMoreBtn(value, item) {
      console.log('clickMoreBtn', value)
      switch (value) {
        // 编辑
        case 'edit':
          this.rowId = item.id
          this.isShowEditPopup = true
          break
        case 'delete':
          this.deleteTask()
          break
        case 'fail':
          break
        case 'submit':
          this.$router.push('/task-list-feekback')
          break
      }
    },
    // 删除任务
    deleteTask() {},
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
