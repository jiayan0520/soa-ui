<template>
  <div class="aroom-audit-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <user-picker
      v-model="data.ccPerson"
      :disabled-users="[userId]"
      :max-users="10"
      title="抄送人" />
    <div class="soa-btn-box">
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
      id: null,
      activeNames: [],
      showCheckPopup: false,
      data: {
        activityRoomName: '福大生活1区1号楼-601',
        userName: '李荣浩',
        sno: '12312312312',
        telephone: '15874214741',
        college: '石油化工学院-2019级过控一班',
        applicationReason: '换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍',
        ccPersonIds: null,
        ccPerson: []
      },
      fieldList: [
        { prop: 'activityRoomName', label: '活动室名称' },
        { prop: 'userName', label: '姓名' },
        { prop: 'sno', label: '学号' },
        { prop: 'telephone', label: '电话' },
        { prop: 'college', label: '班级信息' },
        { prop: 'useTime', label: '使用时间' },
        { prop: 'applicationReason', label: '申请原因' }
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
      this.$api.getApplyRoomDetail(this.id).then(data => {
        data.useTime = dayjs(data.startTime).format('YYYY年MM月DD日 HH:mm') + '-' + dayjs(data.endTime).format('YYYY年MM月DD日 HH:mm')
        // if (data.ccPerson) {
        //   data.ccPerson = { emplId: data.ccPerson.userId, name: data.ccPerson.name }
        // } else {
        data.ccPerson = []

        this.data = data
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
