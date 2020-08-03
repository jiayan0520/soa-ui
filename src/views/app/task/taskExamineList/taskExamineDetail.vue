<template>
  <div class="soa-task-examine-detail">
    <custom-cell
      :value="params.submitted"
      title="提交者"/>
    <custom-cell
      :value="params.task"
      title="任务名称"/>
    <custom-cell
      :value="params.detail"
      title="任务详情"/>
    <custom-cell
      :value="params.deadline"
      title="截止时间"/>
    <custom-cell
      title="任务状态">
      <template slot="value">
        <div :class="[taskStateMap[params.state]]">{{ params.state }}</div>
      </template>
    </custom-cell>
    <custom-cell
      :value="params.applyType"
      title="申请类别"/>
    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="任务总结"
        name="1">
        <div
          v-for="(item,index) in params.taskSummary"
          :key="index"
          class="soa-task-examine-detail__task-list">
          <div class="c-light">{{ item.name }}</div>
          <div class="c-light">{{ item.content }}</div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-cell
      title="附件信息"
      value="李晓明" >
      <template #default>
        <a
          href="/images/myw3schoolimage.jpg"
          download="w3logo">w3logo</a>
      </template>
    </van-cell>
    <custom-cell title="附件信息">
      <template slot="value">
        <a
          v-for="(item,index) in params.file"
          :key="index"
          :href="item.url"
          download="w3logo">{{ item.fileName }}</a>
      </template>
    </custom-cell>
    <div class="soa-task-examine-detail__btn">
      <van-button
        type="info"
        icon="checked"
        @click="handleChecked">
        审核通过
      </van-button>
      <van-button
        type="danger"
        icon="clear"
        @click="handleUnchecked">
        审核不通过
      </van-button>
    </div>
    <van-dialog
      v-model="show"
      :title= "title"
      show-cancel-button
      @confirm="handleConfirm"
      @cancle="handlecCancle">
      <van-form>
        <template v-if="isCheck">
          <van-field
            v-model="number"
            type="digit"
            label="质量分" />
          <van-field
            v-model="number"
            type="textarea"
            label="总结" />
        </template>
        <van-field
          v-else
          v-model="number"
          type="textarea"
          label="原因" />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import customCell from '@/components/customCell'
export default {
  name: 'TaskExamineList',
  components: {
    customCell
  },
  data() {
    return {
      activeNames: [],
      show: false,
      isCheck: false,
      number: 0,
      params: {
        submitted: '李晓明',
        task: '收集党员信息',
        detail: '请各位尽快收拾好党员信息，按照excel表格里要求的数据进行填写',
        deadline: '2020年6月19日 18时00分',
        state: '提前19天完成',
        applyType: '任务完成申请',
        taskSummary: [
          {
            name: '吴小小',
            content: '任务总结信息，已完成了，请审核'
          },
          {
            name: '罗永浩',
            content: '任务总结信息，已完成了，请审核'
          }],
        file: [{ url: '/images/myw3schoolimage.jpg', fileName: '任务反馈附件集合.zip' }]
      },
      taskStateMap: {
        '提前19天完成': 'c-success',
        '逾期19天完成': 'c-danger'
      }
    }
  },
  computed: {
    title() {
      return this.isCheck ? '任务评价' : '不通过原因'
    }
  },
  methods: {
    handleChecked() {
      this.isCheck = true
      this.show = true
    },
    handleUnchecked() {
      this.isCheck = false
      this.show = true
    },
    handleConfirm() {

    },
    handlecCancle() {

    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/mixins/mixins.scss';
  @include b(task-examine-detail){
    @include e(btn){
      margin-top: 60px;
      text-align: center
    }
    @include e(task-list){
      display: flex;
      justify-content: space-between;
    }
  }
</style>
