<template>
  <div class="soa-task-feedback">
    <custom-cell
      :value="feedInfo.createTaskUserName"
      title="发起人"/>
    <custom-cell
      :value="feedInfo.title"
      title="任务名称"/>
    <custom-cell
      :value="feedInfo.content"
      title="任务详情"/>
    <custom-cell
      :value="feedInfo.deadline"
      title="截止时间"/>
    <custom-cell
      title="任务状态">
      <template slot="value">
        <div :class="[taskStatus[feedInfo.state].type]">{{ taskStatus[feedInfo.state].label }}</div>
      </template>
    </custom-cell>
    <custom-cell
      :value="feedInfo.remark"
      title="备注"/>
    <van-field
      v-model="form.content"
      rows="5"
      autosize
      label=""
      type="textarea"
      placeholder="编辑任务总结"
    />
    <custom-cell title="附件信息">
      <template slot="value">
        <van-uploader
          v-model="form.annexList"
          upload-icon="upgrade"
          accept="*"/>
      </template>
    </custom-cell>
    <div>
      <van-button
        block
        type="info"
        native-type="submit"
        @click="feedSubmit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import customCell from '@/components/customCell'
import { taskStatus } from '../components/taskEnum'
import { uuid32, uploadFile } from '@/utils/index.js'
import { Toast } from 'vant'
export default {
  name: 'FeekBack',
  components: {
    customCell
  },
  data() {
    return {
      id: '',
      taskStatus,
      message: '',
      feedInfo: {
        createUserName: '',
        title: '',
        content: '',
        remark: '',
        deadline: '',
        state: 'UNFINISHED'
      },
      form: {
        content: '',
        annexList: []
      }
    }
  },
  created() {
    // this.form.taskPerformId = '1c0a3a5184074527973dfe6106085feb'
    this.id = this.$route.query.id
    this.init()
  },
  methods: {
    init() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
      this.$api.getTaskFeedbackInfo({ id: this.id }).then((res) => {
        this.feedInfo = res;
        Toast.clear()
      }).catch((err) => {
        Toast.clear()
        Toast.fail(err)
        this.$router.push('/task');
      })
    },
    async handleData() {
      const annexList = []
      const annexId = uuid32()
      for (var i = 0; i < this.form.annexList.length; i++) {
        await uploadFile(this.form.annexList[i], annexId).then((res) => {
          annexList.push(res)
        }).catch((e) => {
          throw e
        });
      }
      annexList.length && await this.$api.annex(annexList).then((res) => {
        this.form.annexId = annexId
      }).catch((e) => { throw e })
    },
    feedSubmit() {
      Toast.loading({ message: '提交中，请稍后...', duration: 0 })
      this.handleData().then(() => {
        this.form.taskPerformId = this.feedInfo.taskPerformId
        this.$api.saveTaskFeedbackInfo(this.form).then(() => {
          Toast.clear()
          this.$router.push('/task');
        }).catch(() => {
          Toast.clear()
        })
      }).catch((e) => { Toast.clear(); throw e })
    }
  }
}
</script>
