<template>
  <van-form
    class="soa-task-add"
    @submit="onSubmit">
    <van-field
      v-model="username"
      :rules="[{ required: true, message: '请输入任务标题' }]"
      name="请输入任务标题"
      placeholder="请输入任务标题"
    />
    <van-field
      v-model="username"
      :rules="[{ required: true, message: '请输入任务内容' }]"
      maxlength="200"
      show-word-limit
      type="textarea"
      name="请输入任务内容"
      placeholder="请输入任务内容"
    />
    <van-field
      v-model="value1"
      :readonly="true"
      class="soa-task-add-executor"
      label="执行人"
      right-icon="add"
      placeholder=""
      @click="handleExecutorClick"
    />
    <van-cell
      center
      title="是否提醒">
      <van-switch
        v-model="checked"
        size="20" />
    </van-cell>
    <van-field
      center
      label="截止时间"
    >
      <template #input>
        <date-picker
          v-model="deadline"
          :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
          :editable="false"
          :not-before="minDate"
          :clearable="false"
          type="datetime"
          value-type="format"
          format="YYYY-MM-DD HH:mm"
          placeholder="请选择截止时间"
          append-to-body/>
      </template>
    </van-field>
    <van-field
      v-model="info"
      :readonly="true"
      label="到期提醒"
      right-icon="arrow"
      @click="showInfoAction = true"
    />
    <van-action-sheet
      v-model="showInfoAction"
      :actions="infoActions"
      @select="onInfoSelect" />

    <van-field
      v-model="critical"
      :readonly="true"
      label="紧急系数"
      right-icon="arrow"
      @click="showCriticalAction = true"
    />
    <van-action-sheet
      v-model="showCriticalAction"
      :actions="criticalActions"
      @select="onCriticalSelect" />
    <van-field
      v-model="weight"
      :readonly="true"
      label="任务权重"
      right-icon="arrow"
      @click="showWeightAction = true"
    />
    <van-action-sheet
      v-model="showWeightAction"
      :actions="weightActions"
      @select="onWeightSelect" />
    <van-field
      v-model="value1"
      :readonly="true"
      label="可公开查阅人"
      right-icon="add"
      placeholder=""
      @click="handleExecutorClick"
    />
    <van-field
      v-model="value1"
      :readonly="true"
      label="附件"
      placeholder=""
      @click="handleExecutorClick"
    >
      <template #input>
        <van-uploader
          v-model="fileList"
          upload-icon="upgrade"
          accept="*"/>
      </template>
    </van-field>
    <div class="soa-task-add-submit">
      <van-button
        block
        type="info"
        native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { Form, Field, Button, Cell, Switch, ActionSheet, Uploader } from 'vant';
import DatePicker from 'vue2-datepicker'
// import formatData from '@/utils/index.js'
export default {
  name: 'AddTask',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Switch.name]: Switch,
    [ActionSheet.name]: ActionSheet,
    [Uploader.name]: Uploader,
    DatePicker
  },
  data() {
    return {
      checked: false,
      username: '',
      value1: '',
      deadline: '',
      minDate: '',
      info: '不提醒',
      critical: '特急',
      weight: '1.0',
      showInfoAction: false,
      showCriticalAction: false,
      showWeightAction: false,
      fileList: [],
      criticalActions: [{ name: '特急' }, { name: '紧急' }, { name: '一般' }, { name: '不急' }],
      infoActions: [{ name: '不提醒' }, { name: '截止15分钟' }, { name: '截止1小时' }, { name: '截止3小时' }, { name: '截止前1天' }],
      weightActions: [{ name: '1.0' }, { name: '1.1' }, { name: '1.2' }, { name: '1.3' },
        { name: '1.4' }, { name: '1.5' }, { name: '1.6' }, { name: '1.7' }, { name: '1.8' }, { name: '1.9' }, { name: '2.0' }]
    }
  },
  methods: {
    onSubmit() {
      console.log('')
    },
    handleExecutorClick() {
      console.log('handleExecutorClick')
    },
    onInfoSelect(item) {
      this.showInfoAction = false
      this.info = item.name
    },
    onCriticalSelect(item) {
      this.showCriticalAction = false
      this.critical = item.name
    },
    onWeightSelect(item) {
      this.showWeightAction = false
      this.weight = item.name
    }
  }
}
</script>

<style scoped>
.soa-task-add-executor .van-field__right-icon{
  color:#38A4F5
}
.soa-task-add-submit{
  margin: 16px 16px 55px
}
</style>
