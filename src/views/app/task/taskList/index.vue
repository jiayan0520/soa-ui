<template>
  <div>
    <list-layout
      ref="listLayout"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :detail-url="detailUrl"
      :op-label="(!active && '任务结算') || ''"
      title="任务列表"
      class="soa-task-list"
      @search="onSearch"
      @loadData="onLoad"
      @clickOperator="onSubmit"
      @clickMoreBtn="clickMoreBtn"
    >
      <template slot="top">
        <van-search
          v-model="content"
          label="任务内容"
          placeholder="任务内容"
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
          <div
            :style="infoStyle"
            class="soa-task-list__info">
            <div class="c-ft16">{{ slotProps.item.title }}</div>
            <div class="c-light">{{ slotProps.item.deadline }} 截止</div>
            <div class="c-light">{{ slotProps.item.createTime }} 发布</div>
            <span class="c-info">{{ slotProps.item.create_user_id === userId ? '我分配的': slotProps.item.createUserName }}</span> |
            <span :class="[`c-${computeTimes(slotProps.item.deadline).type}`]">{{ computeTimes(slotProps.item.deadline).value }}</span>
            <!-- <div class="c-light">{{ slotProps.item.infoNum }}条动态  {{ slotProps.item.done }}/{{ slotProps.item.taskNumber }}完成  （未结算）</div> -->
          </div>
          <div :class="[taskStatus[slotProps.item.state].type,'soa-task-list__status']">{{ taskStatus[slotProps.item.state].label }}</div>
        </div>
      </template>
    </list-layout>
  </div>

</template>

<script>
import listLayout from '@/components/listLayout'
import addTask from '../addTask/index'
import { taskStatus } from '../components/taskEnum'
import { computeDiffTime } from '@/utils/index.js'
import dayjs from 'dayjs';
import { Toast } from 'vant';
export default {
  name: 'TaskList',
  components: {
    listLayout,
    addTask
  },
  data() {
    return {
      taskStatus,
      active: 0,
      active1: 0,
      content: '',
      dataList: [],
      tab: ['我发布的', '我收到的'],
      tab1: ['未完成', '已完成', '所有'],
      limit: 20, // 每页行数
      page: 0 // 当前页码 total 总条数
    }
  },
  computed: {
    userId() {
      return this.$store.getters['core/user'].userId
    },
    detailUrl() {
      return '/task/detail'
    },
    infoStyle() {
      return { width: ((document.body.clientWidth > 1024 ? 1024 : document.body.clientWidth) * 0.7) + 'px' }
    },
    moreOpList() {
      const publishOp = [
        { value: 'edit', label: '编辑', allowStatus: { state: ['UNFINISHED'] }},
        { value: 'delete', label: '删除' },
        { value: 'fail', label: '任务失败', allowStatus: { state: ['UNFINISHED'] }}
      ]
      const reOp = [
        { value: 'submit', label: '提交', allowStatus: { state: ['UNFINISHED'] }}
      ]
      return this.active ? reOp : publishOp
    }
  },
  methods: {
    // 任务结算
    onSubmit() {
      const nowDate = dayjs(new Date()).format('YYYY-MM-DD');
      this.$dialog.confirm({
        title: '提示',
        message: '今天是' + nowDate + '，确定任务结算？'
      })
        .then(() => {
          // on confirm
        });
    },
    onSearch() {
      this.page = 0;
      this.dataList = []
      this.$refs.listLayout.loading = true
      this.$refs.listLayout.finished = false
      this.onLoad()
    },
    computeTimes(deadline) {
      const deadlineTime = deadline + ':00'
      return computeDiffTime(deadlineTime)
    },
    onLoad() {
      const stateTypeMap = {
        0: 'UNFINISHED',
        1: 'FINISHED',
        2: ''
      }
      const parms = {
        type: this.active + 1,
        content: this.content,
        page: this.page,
        limit: this.limit,
        userId: this.$store.getters['core/user'].userId
      }
      stateTypeMap[this.active1] && (parms.state = stateTypeMap[this.active1])
      // 异步更新数据
      this.$api.getTaskList(parms).then((data) => {
        this.dataList = (data && data.rows) || [];
        const total = (data && data.total) || 0;
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.page++
        // 数据全部加载完成
        if (this.dataList && (this.dataList.length >= total)) {
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
          this.$router.push({
            path: '/task/edit',
            query: { id: item.id }
          })
          break
        case 'delete':
          this.$dialog.confirm({
            title: '提示',
            message: `请确认要删除任务【${item.title}】，删除后数据将无法恢复`
          }).then(() => {
            this.$api.deleteTask(item.id).then(() => {
              Toast('任务删除成功');
              this.onSearch()
            }).catch(error => {
              Toast('任务删除失败，请稍后尝试');
            })
          })
          break
        case 'submit':
          this.$router.push({
            path: '/task/feekback',
            query: { id: item.id }
          })
          break
      }
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
  @include e(info){
    word-wrap:break-word;
  }
  @include e(status){
    width: 13%;
    text-align: center
  }
}
</style>
