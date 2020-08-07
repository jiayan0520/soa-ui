<template>
  <van-popup
    v-model="showModal"
    :style="{ height: '100%' }"
    closeable
    position="bottom"
    @close="closeModal">
    <div class="soa-task-addChild__title">添加子任务</div>
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
      <people-picker
        v-model="form.soaTaskPerform"
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
            placeholder="请选择截止时间"
            append-to-body
            @change="bindChildDeadlineChange"/>
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
      <!-- <people-picker
        v-model="form.soaTaskReader"
        title="可公开查阅人"/> -->
      <van-field
        v-model="form.files"
        :readonly="true"
        label="附件"
        placeholder=""
      >
        <template #input>
          <van-uploader
            v-model="fileList"
            upload-icon="upgrade"
            accept="*"/>
        </template>
      </van-field>
      <div class="soa-task-add__submit">
        <van-button
          block
          type="info"
          native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </van-popup>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import peoplePicker from '@/components/peoplePicker'
import customSheet from '@/components/customSheet'
import { criticalActions, infoActions, weightActions } from '../addTask/enum'
import dayjs from 'dayjs'
export default {
  name: 'TaskChild',
  components: {
    DatePicker,
    peoplePicker,
    customSheet
  },
  props: {
    show: {
      type: Boolean(),
      defalut: false,
      required: true
    },
    deadline: {
      type: String,
      default: null,
      required: true
    },
    params: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        soaTaskPerform: '', // 执行人
        isRemind: true,
        deadline: '',
        dueReminder: '不提醒',
        emergencyCoefficient: '特急',
        difficulty: '1.0',
        state: '',
        searcher: '', // 可查阅人
        files: '' // 附件
      },
      minDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
      showModal: false,
      criticalActions,
      infoActions,
      weightActions,
      fileList: []
    }
  },
  watch: {
    show(val) {
      this.showModal = val
      this.form = this.params;
    }
  },
  methods: {
    // 子任务事件
    onSubmit() {
      if (this.deadline && this.form.deadline > this.deadline) {
        this.$notify({ type: 'danger', message: '子任务截止时间不得超过主任务时间' });
      } else {
        // 虚拟数据
        this.form.total = 5;
        this.form.done = 0;
        this.$emit('input', this.form);
      }
    },
    handlePicker(people, departments) {
      console.log('handlePicker', people, departments)
    },
    // 子任务截止时间不能超过主任务的截止时间
    bindChildDeadlineChange(e) {
      if (e > this.deadline) {
        this.$notify({ type: 'danger', message: '子任务截止时间不得超过主任务时间' });
      }
    },
    // 关闭弹出框
    closeModal() {
      this.showModal = false;
      this.$emit('closeModal', true)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@include b(task-addChild){
   @include e(title){
        margin:15px 0;
        text-align: center;
        font-size: 20px;
   }
}
.mx-datepicker-main.mx-datepicker-popup{z-index: 9999!important;}
</style>
