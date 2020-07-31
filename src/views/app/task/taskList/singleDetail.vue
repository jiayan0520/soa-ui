<template>
  <div class="soa-task-single">
    <custom-cell
      :value="params.promoter"
      title="发起人"/>
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
      :value="params.state"
      title="任务状态">
      <template slot="value">
        <div :class="[stateMap[params.state]]">{{ params.state }}</div>
      </template>
    </custom-cell>
    <custom-cell
      :value="params.remark"
      title="备注"/>
    <custom-cell
      :value="params.quality"
      title="质量分"/>
    <custom-cell
      :value="params.summary"
      title="任务总结"/>
    <custom-cell title="附件信息">
      <template slot="value">
        <a
          v-for="(item,index) in params.file"
          :key="index"
          :href="item.url"
          download="w3logo">{{ item.fileName }}</a>
      </template>
    </custom-cell>
  </div>
</template>

<script>
import customCell from '@/components/customCell'
export default {
  name: 'SingleDetail',
  components: {
    customCell
  },
  data () {
    return {
      params: {
        promoter: '李晓明',
        task: '收集党员信息',
        detail: '请各位尽快收拾好党员信息，按照excel表格里要求的数据进行填写',
        quality: '100',
        remark: '审核不通过原因：没有附件',
        deadline: '2020年6月19日 18时00分',
        state: '已完成',
        summary: '任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核'
      },
      stateMap: {
        '未完成': 'c-danger',
        '审核不通过': 'c-warn',
        '已完成': 'c-success'
      }
    }
  }
}
</script>

<style lang="scss">
</style>
