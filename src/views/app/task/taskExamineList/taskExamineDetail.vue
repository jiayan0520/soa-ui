<template>
  <div class="soa-task-examine-detail">
    <van-cell
      title="提交者"
      value="李晓明" />
    <van-cell
      title="任务名称"
      value="李晓明" />
    <van-cell
      title="任务详情"
      value="李晓明" />
    <van-cell
      title="截止时间"
      value="李晓明" />
    <van-cell
      title="任务状态"
      value="李晓明" />
    <van-cell
      title="申请类别"
      value="李晓明" />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="任务总结"
        name="1">内容</van-collapse-item>
    </van-collapse>
    <van-cell
      title="附件信息"
      value="李晓明" >
      <template #default>
        <a
          href="/images/myw3schoolimage.jpg"
          download="w3logo">w3logo</a>
      </template>
    </van-cell>
    <div class="soa-task-examine-detail-btn">
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
      show-cancel-button
      @confirm="handleConfirm"
      @cancle="handlecCancle">
      <van-form
        class="soa-task-add">
        <template v-if="isCheck">
          <van-field
            v-model="number"
            type="digit"
            label="质量分" />
          <van-field
            v-model="number"
            type="textarea"
            label="总结" />
        </template>
        <van-field
          v-else
          v-model="number"
          type="textarea"
          label="原因" />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'TaskExamineList',
  data() {
    return {
      activeNames: [],
      show: false,
      isCheck: false,
      number: 0
    }
  },
  computed: {
    title() {
      return this.isCheck ? '任务评价' : '不通过原因'
    }
  },
  methods: {
    handleChecked() {
      this.isCheck = true
      this.show = true
    },
    handleUnchecked() {
      this.isCheck = false
      this.show = true
    },
    handleConfirm() {

    },
    handlecCancle() {

    }
  }
}
</script>

<style scoped>
.soa-task-examine-detail-btn{
  margin-top: 60px;
  text-align: center
}
</style>
