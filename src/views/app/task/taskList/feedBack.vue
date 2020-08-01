<template>
  <div class="soa-task-feedback">
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
      title="任务状态">
      <template slot="value">
        <div class="c-warm">未完成</div>
      </template>
    </custom-cell>
    <custom-cell
      :value="params.remark"
      title="备注"/>
    <van-field
      v-model="message"
      rows="5"
      autosize
      label=""
      type="textarea"
      placeholder="编辑任务总结"
    />
    <custom-cell title="附件信息">
      <template slot="value">
        <a
          v-for="(item,index) in params.file"
          :key="index"
          :href="item.url"
          download="w3logo">{{ item.fileName }}</a>
      </template>
    </custom-cell>
    <div>
      <van-button
        block
        type="info"
        native-type="submit"
        @click="bindSubmit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import customCell from '@/components/customCell'
export default {
  name: 'FeekBack',
  components: {
    customCell
  },
  data() {
    return {
      message: '',
      params: {
        promoter: '李晓明',
        task: '收集党员信息',
        detail: '请各位尽快收拾好党员信息，按照excel表格里要求的数据进行填写',
        remark: '审核不通过原因：没有附件',
        deadline: '2020年6月19日 18时00分',
        file: [{ url: '/images/myw3schoolimage.jpg', fileName: '学生列表.xls' }, { url: '/images/myw3schoolimage.jpg', fileName: '学生列表.xls' }]
      },
      stateMap: {
        '未完成': 'c-danger',
        '待审核': 'c-warm',
        '已完成': 'c-success'
      }
    }
  },
  methods: {
    bindSubmit() {
      console.log('提交')
    }
  }
}
</script>

<style scoped>

</style>
