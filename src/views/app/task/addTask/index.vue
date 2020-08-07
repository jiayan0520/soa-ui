<template>
  <div class="soa-task-add">
    <van-form
      label-width="110px"
      class="soa-custom-form"
      @submit="onSubmit">
      <van-field
        v-model="form.title"
        :rules="[{ required: true, message: '请输入任务标题' }]"
        name="请输入任务标题"
        placeholder="请输入任务标题"
      />
      <van-field
        v-model="form.content"
        :rules="[{ required: true, message: '请输入任务内容' }]"
        maxlength="200"
        show-word-limit
        type="textarea"
        name="请输入任务内容"
        placeholder="请输入任务内容"
      />
      <!-- :disabledUsers="[userid]" -->
      <people-picker
        v-model="form.executor"
        title="执行人"
        @complexPickerParent="handlePicker"/>
      <van-field
        :readonly="true"
        label="是否提醒"
        placeholder=""
      >
        <template #input>
          <van-switch
            v-model="form.isRemind"
            active-value="Y"
            inactive-value="N"
            size="20" />
        </template>
      </van-field>
      <van-field
        center
        label="截止时间"
      >
        <template #input>
          <date-picker
            v-model="form.deadline"
            :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
            :editable="false"
            :not-before="minDate"
            :clearable="false"
            type="datetime"
            value-type="format"
            format="YYYY-MM-DD HH:mm"
            placeholder="请选择时间"
            append-to-body/>
        </template>
      </van-field>
      <custom-sheet
        v-model="form.dueReminder"
        :actions="infoActions"
        label="到期提醒"/>
      <custom-sheet
        v-model="form.emergencyCoefficient"
        :actions="criticalActions"
        label="紧急系数"/>
      <custom-sheet
        v-model="form.difficulty"
        :actions="weightActions"
        label="任务权重"/>
      <people-picker
        v-model="form.soaTaskReader"
        title="可公开查阅人"/>
      <van-field
        :readonly="true"
        label="附件"
        placeholder=""
      >
        <template #input>
          <van-uploader
            v-model="form.files"
            upload-icon="upgrade"
            accept="*"/>
        </template>
      </van-field>
      <van-divider />
      <childTaskList :list="form.subTasks"/>
      <van-button
        block
        class="soa-task-add__submit"
        type="info"
        native-type="submit">
        提交
      </van-button>
    </van-form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import peoplePicker from '@/components/peoplePicker'
import customSheet from '@/components/customSheet'
import childTaskList from '../components/childTaskList'
import dayjs from 'dayjs';
import { criticalActions, infoActions, weightActions } from './enum'
// import formatData from '@/utils/index.js'
export default {
  name: 'AddTask',
  components: {
    DatePicker,
    peoplePicker,
    customSheet,
    childTaskList
  },
  data() {
    return {
      form: {
        annexId: '',
        title: '任务1',
        content: '任务1',
        executor: '', // 执行人
        isRemind: 'Y',
        deadline: '',
        dueReminder: 'NOT_NOTICE',
        emergencyCoefficient: 'GENERAL',
        difficulty: 'DICFFICULTY1',
        reader: '', // 可查阅人
        files: [], // 附件
        subTasks: []
      },
      showModal: false,
      minDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
      criticalActions,
      infoActions,
      weightActions,
      editObj: null
    }
  },
  mounted() {
    console.log('minDate', this.minDate)
    // 截止时间默认为今日或次日18点
    var date = new Date();
    if (new Date().getHours() < 18) {
      this.form.deadline = dayjs(date.setHours(18)).format('YYYY-MM-DD HH:mm') + ':00';
    } else {
      date.setDate(date.getDate() + 1);
      this.form.deadline = dayjs(date.setHours(18)).format('YYYY-MM-DD HH:mm') + ':00';
    }
  },
  methods: {
    onSubmit() {
      console.log('任务form', this.form)
      // this.form.annex = []
      // console.log('上传文件', this.form.files)
      // if (this.form.files.length) {
      //   this.form.files.forEach((item) => {
      //     this.$api.upload(item).then((res) => {
      //       console.log('上传组件', res)
      //       res.data.annexId = '59dd9cfedf93495397d6b34ed0d86b3e'
      //       res.data.type = 'task'
      //       this.form.annex.push(res.data)
      //       this.$api.annex(this.form.annex).then((res) => { console.log(res) })
      //     })
      //   })
      // }
    },

    handlePicker(people, departments) {
      console.log('handlePicker', people, departments)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@import '@/assets/style/var.scss';
@include b(task-add){
  @include e(submit){
    margin: 16px 0 55px
  }
}
</style>
