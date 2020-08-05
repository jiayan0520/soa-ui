<template>
  <div class="soa-task-examine-detail">
    <custom-cell
      :value="params.performUserName"
      title="提交者"/>
    <custom-cell
      :value="params.title"
      title="任务名称"/>
    <custom-cell
      :value="params.content"
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
      :value="params.type==='TASK'?'任务消息':'执行消息'"
      title="申请类别"/>
    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="任务总结"
        name="1">
        <div
          v-for="(item,index) in params.soaTaskNewsList"
          :key="index"
          class="soa-task-examine-detail__task-list">
          <div class="c-light">{{ item.createBy }}</div>
          <div class="c-light">{{ item.content }}</div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <custom-cell title="附件信息">
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
      :before-close="DialogBeforeClose"
      show-cancel-button>
      <van-form>
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
      taskStateMap: {
        '审核通过': 'c-success',
        '未完成': 'c-danger',
        '审核未通过': 'c-danger',
        '等待审核': 'c-warm'
      },
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
    getData(id) {
      this.$api.getTaskExaminDetail({ id: id }).then((res) => {
        console.log(res);
        this.params = res.data.content;
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
    DialogBeforeClose(action, done) {
      console.log(action);
      if (action === 'confirm') {
        // 审核通过的情况
        if (this.isCheck) {
          if (this.examineQuery.score === '') {
            Notify({ type: 'danger', message: '质量分不能为空' });
            done();
          } else {
            this.submitToDataset(done)
          }
        } else { // 审核未通过的情况
          if (this.examineQuery.content === '') {
            Notify({ type: 'danger', message: '不通过原因不能为空' });
            done();
          } else {
            this.submitToDataset(done)
          }
        }
      } else {
        done();
      }
    },
    submitToDataset(done) {
      this.$api.saveTaskExamine(this.examineQuery).then((res) => {
        if (res.data.status === 200) {
          Notify({ type: 'success', message: '提交成功' });
          done();
          this.getNextPage()
        }
      })
    },
    getNextPage() {
      this.$api.getTaskExamineList({ page: 1, limit: 6558 }).then((res) => {
        var arr = res.data.content.rows;
        for (let i = 0, l = arr.length; i < l; i++) {
          if (arr[i].state === '未审核') {
            const taskId = arr[i].taskId;
            this.$router.replace({
              query: { id: taskId }
            })
          }
        }
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
