<template>
  <div class="soa-task-examine-detail">
    <custom-cell
      :value="params.performUserName"
      label-width="5.1em"
      title="提交者"/>
    <custom-cell
      :value="params.title"
      label-width="5.1em"
      title="任务名称"/>
    <custom-cell
      :value="params.content"
      label-width="5.1em"
      title="任务详情"/>
    <custom-cell
      :value="params.deadline"
      label-width="5.1em"
      title="截止时间"/>
    <custom-cell
      label-width="5.1em"
      title="任务状态">
      <template slot="value">
        <div :class="[computeTimes(params.deadline).type]">{{ computeTimes(params.deadline).value }}</div>
      </template>
    </custom-cell>
    <!-- <custom-cell
      :value="params.type==='TASK'?'任务消息':'执行消息'"
      title="申请类别"/> -->
    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="任务总结"
        name="1">
        <div
          v-for="(item,index) in params.soaTaskNewsList"
          :key="index"
          class="soa-task-examine-detail__task-list">
          <div class="c-light">{{ item.userName }}</div>
          <div class="c-light">{{ item.content }}</div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <custom-cell
      title="附件信息"
      label-width="5.1em">
      <template slot="value">
        <a
          v-for="(item,index) in params.soaAnnexList"
          :key="index"
          :href="item.filePath"
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
      :before-close="handleConfirm"
      show-cancel-button>
      <van-form ref="examineForm">
        <template v-if="isCheck">
          <van-field
            v-model="examineQuery.score"
            :rules="[{ required: true, message: '请填写质量分' }]"
            type="digit"
            label="质量分" />
          <van-field
            v-model="examineQuery.content"
            type="textarea"
            label="评语"/>
        </template>
        <van-field
          v-else
          v-model="examineQuery.content"
          type="textarea"
          label="原因" />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import customCell from '@/components/customCell'
import { Notify } from 'vant'
import { computeDiffTime } from '@/utils/index.js'
export default {
  name: 'TaskExamineList',
  components: {
    customCell,
    Notify
  },
  data() {
    return {
      activeNames: [],
      show: false,
      isCheck: false,
      number: 0,
      params: {},
      examineQuery: {
        score: '',
        content: ''
      }
    }
  },
  computed: {
    title() {
      return this.isCheck ? '任务评价' : '不通过原因'
    }
  },
  created() {
    this.getData(this.$route.query.id)
  },
  methods: {
    computeTimes(deadline) {
      const deadlineTime = deadline + ':00'
      return computeDiffTime(deadlineTime)
    },
    getData(id) {
      this.$api.getTaskExaminDetail({ id: id }).then((res) => {
        this.params = res;
      })
    },
    handleChecked() {
      this.isCheck = true
      this.show = true
    },
    handleUnchecked() {
      this.isCheck = false
      this.show = true
    },
    handleConfirm(action, done) {
      if (action === 'confirm') {
        this.$refs.examineForm.validate().then((valid) => {
          this.examineQuery.auditUserId = this.$store.getters['core/user'].userId
          this.examineQuery.state = this.isCheck ? 'PASS' : 'FAILED'
          this.$api.saveTaskExamine(this.examineQuery).then((res) => {
            this.getNextPage(done)
          }).catch(() => { done(false) })
        }).catch(() => { done(false) })
      } else {
        done();
      }
    },
    getNextPage(done) {
      const params = {
        type: 'WAITING',
        page: 1,
        limit: 1
      }
      this.$api.getTaskExamineList({ params }).then((res) => {
        if (res.length) {
          this.$router.replace({
            query: { id: res[0].taskPerformId }
          })
          this.getData(this.$route.query.id)
          done()
        }
        this.show = false
      })
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
  .van-collapse-item .van-cell__title{
     flex: 1;
  }
</style>
