<template>
  <div class="soa-task-add">
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
      <people-picker
        v-model="form.executor"
        :disabled-users="[userId]"
        :user-only="true"
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
        v-model="form.reader"
        :disabled-users="[userId]"
        :user-only="true"
        title="可公开查阅人"
        @complexPickerParent="handleReaderPicker"/>
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
        class="soa-task-add__submit"
        type="info"
        @click="onSubmit">
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
import { Toast } from 'vant';
import { uuid32 } from '@/utils/index.js'
import { criticalActions, infoActions, weightActions } from './enum'
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
    // 创建任务
    addTask() {
      this.form.createUserId = this.userId
      this.form.opType = 0
      this.$api.addTask({ ...this.form }).then((res) => {
        Toast.clear()
        Toast('任务创建成功')
        this.$router.push('/task-list');
      })
    },
    // 上传父任务附件
    async uploadParentTask() {
      this.form.annexId = ''
      const annexList = []
      const parentAnnexId = uuid32()
      for (var i = 0; i < this.form.files.length; i++) {
        await this.uploadTask(this.form.files[i], parentAnnexId).then(() => {}).catch((e) => {
          throw e
        });
      }
      annexList.length && await this.$api.annex(annexList).then((res) => {
        this.form.annexId = parentAnnexId
      }).catch((e) => { throw e })
    },
    // 子任务
    async subTask() {
      for (var i = 0; i < this.form.subTasks.length; i++) {
        await this.uploadSubTask(i).then(() => {}).catch((e) => {
          throw e
        });
      }
    },
    // 单个子任务附件上传
    async uploadSubTask(index) {
      const files = this.form.subTasks[index].files
      this.form.subTasks[index].annexId = ''
      const subAnnexList = []
      const subAnnexId = uuid32()
      for (var i = 0; i < files.length; i++) {
        await this.uploadTask(files[i], subAnnexId).then((res) => {
          subAnnexList.push(res)
        }).catch((e) => {
          throw e
        });
      }
      subAnnexList.length && await this.$api.annex(subAnnexList).then((res) => {
        this.form.subTasks[index].annexId = subAnnexId
      }).catch((e) => { throw e })
    },
    // 统一上传方法
    uploadTask(file, annexId) {
      return new Promise((resolve, reject) => {
        this.$api.upload(file).then((res) => {
          res.annexId = annexId
          res.type = 'task'
          resolve(res)
        }).catch(() => { reject() })
      })
    },
    onSubmit() {
      Toast.loading('任务创建中，请稍后...')
      this.uploadParentTask().then(() => {
        this.subTask().then(() => {
          this.addTask()
        }).catch(() => {
          Toast.clear()
          Toast('任务创建失败-上传子任务附件失败')
        })
      }).catch((e) => {
        Toast.clear()
        Toast('任务创建失败-上传父任务附件失败')
      })
    },

    handlePicker(people, departments) {
      people.forEach(item => {
        item.userId = item.emplId
        item.userName = item.name
      });
      this.form.executor = [].concat(people)
    },
    handleReaderPicker(people, departments) {
      people.forEach(item => {
        item.userId = item.emplId
        item.userName = item.name
      });
      this.form.reader = [].concat(people)
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
