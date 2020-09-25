<template>
  <div
    v-if="!loading"
    class="aroom-audit-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <user-picker
      v-if="isEdit"
      v-model="data.ccPerson"
      :disabled-users="[userId]"
      :max-users="10"
      title="抄送人"
    />
    <div
      v-if="isEdit"
      class="soa-btn-box">
      <van-button
        type="info"
        icon="checked"
        @click="audit('PASS')">审核通过</van-button>
      <van-button
        type="warning"
        class="c-ml10"
        icon="clear"
        @click="audit('NOPASS')">审核不通过</van-button>
    </div>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import customCell from '@/components/customCell'
import { getQuery } from '@/utils'
import dayjs from 'dayjs'
import userPicker from '@/components/userPicker'
import { Toast } from 'vant';
export default {
  name: 'AroomAuditDetail',
  components: {
    customPanel,
    customCell,
    userPicker
  },
  data() {
    return {
      loading: true,
      id: null,
      activeNames: [],
      showCheckPopup: false,
      data: {
      },
      fieldList: [
        { prop: 'activityRoomName', label: '活动室名称' },
        { prop: 'userName', label: '姓名' },
        { prop: 'jobNumber', label: '学号' },
        { prop: 'mobile', label: '电话' },
        { prop: 'fullDeptNames', label: '班级信息' },
        { prop: 'useTime', label: '使用时间' },
        { prop: 'applicationReason', label: '申请原因' }
      ],
      isEdit: true,
      overFieldList: [
        { prop: 'statusName', label: '状态' },
        { prop: 'reviewTime', label: '审核时间' },
        { prop: 'reviewerUserName', label: '审核人' },
        { prop: 'ccPersonNames', label: '抄送人' }
      ]
    }
  },
  computed: {
    userId() {
      return this.$store.getters['core/user'].userId || {};
    },
    system() {
      return this.$store.getters['core/system']
    }
  },
  created() {
    this.id = getQuery('id')
    this.getDetail()
  },
  methods: {
    // 获取详情
    getDetail() {
      const statusList = [
        { value: 'LAUNCH', text: '未完成' },
        { value: 'PASS', text: '已完成' },
        { value: 'NOPASS', text: '未通过' }
      ]
      this.$api.getApplyRoomDetail(this.id).then(data => {
        data.useTime = dayjs(data.startTime).format('YYYY年MM月DD日 HH:mm') + '-' + dayjs(data.endTime).format('YYYY年MM月DD日 HH:mm')
        // if (data.ccPerson) {
        //   data.ccPerson = { emplId: data.ccPerson.userId, name: data.ccPerson.name }
        // } else {
        data.ccPerson = []

        this.data = {
          ...data,
          activityRoomName: data.activityRoom.activityRoomName,
          userName: data.user.name,
          jobNumber: data.user.jobNumber,
          mobile: data.user.mobile,
          fullDeptNames: data.user.fullDeptNames.replace('[', '').replace(']', '').split(', ').join('-'),
          statusName: statusList.find(s => s.value === data.status).text,
          ccPersonNames: data.ccPersonNames && data.ccPersonNames.join(',')
        }
        if (data.status !== 'LAUNCH') {
          this.isEdit = false
          this.data.reviewTime = dayjs(data.reviewTime).format('YYYY年MM月DD日 HH:mm')
          this.fieldList = this.fieldList.concat(this.overFieldList)
        }
        this.loading = false
      })
    },
    audit(status) {
      this.data.ccPersonIds = this.data.ccPerson.map(n => { return n.emplId }).join(',')
      this.$api.reviewRoom({
        ccPersonIds: this.data.ccPersonIds,
        id: this.id,
        resultReason: '',
        status: status }).then(data => {
        Toast.clear()
        Toast('操作成功')
        this.$router.push({
          path: '/aroom/audit'
        })
        this.$emit('close', true)
      })
    }
  }
}
</script>

<style lang="scss">
.aroom-audit-detail {
  width: 100%;
  overflow: auto;
}
</style>
