<template>
  <div class="soa-task-edit">
    <van-form
      label-width="120px"
      class="soa-custom-form">
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
      <user-picker
        v-model="form.executor"
        :disabled-users="[userId]"
        :user-only="true"
        title="执行人"/>
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
      <user-picker
        v-model="form.reader"
        :disabled-users="[userId]"
        :user-only="true"
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
      <childTaskList
        :list="form.subTasks"
        :deadline="form.deadline"/>
      <van-button
        block
        class="soa-task-edit__submit"
        type="info"
        @click="onSubmit">
        提交
      </van-button>
    </van-form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import userPicker from '@/components/userPicker'
import customSheet from '@/components/customSheet'
import childTaskList from '../components/childTaskList'
import dayjs from 'dayjs';
import { Toast } from 'vant';
import { criticalActions, infoActions, weightActions } from '../components/taskEnum'
export default {
  name: 'EditTask',
  components: {
    DatePicker,
    userPicker,
    customSheet,
    childTaskList
  },
  data() {
    return {
      form: {
        annexId: '',
        title: '任务1',
        content: '任务1',
        executor: [], // 执行人
        isRemind: 'Y',
        deadline: '',
        dueReminder: 'NOT_NOTICE',
        emergencyCoefficient: 'GENERAL',
        difficulty: 'DICFFICULTY1',
        reader: [], // 可查阅人
        files: [], // 附件
        subTasks: [],
        state: 'NUFINISHED'
      },
      showModal: false,
      minDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
      criticalActions,
      infoActions,
      weightActions,
      editObj: null
    }
  },
  computed: {
    userId() {
      return this.$store.getters['core/user'].userId
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getData(this.$route.query.id)
  },
  methods: {
    getData(id) {
      this.$api.getTaskEdit(id).then((res) => {
        console.log(res);
        this.form = res
      })
    },
    onSubmit() {
      Toast.loading({ message: '任务编辑中，请稍后...', duration: 0 })
      this.form.createUserId = this.userId
      this.form.opType = 1
      this.$api.addTask({ ...this.form }).then((res) => {
        Toast.clear()
        Toast('任务修改成功')
        this.$router.push('/task');
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@import '@/assets/style/var.scss';
@include b(task-edit){
  @include e(submit){
    margin: 16px 0 55px
  }
}
</style>
