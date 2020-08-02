<template>
  <div class="aroom-audit-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <van-field
      v-model="formData.ccPerson"
      :readonly="true"
      label="抄送人"
      right-icon="add"
      placeholder
    />
    <div class="soa-btn-box">
      <van-button
        type="info"
        icon="checked">审核通过</van-button>
      <van-button
        type="warning"
        class="c-ml10"
        icon="clear">审核不通过</van-button>
    </div>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import customCell from '@/components/customCell'
export default {
  name: 'AroomAuditDetail',
  components: {
    customPanel,
    customCell
  },
  data() {
    return {
      activeNames: [],
      showCheckPopup: false,
      formData: {
        ccPerson: null // 抄送人
      },
      data: {
        aroomName: '福大生活1区1号楼-601',
        userName: '李荣浩',
        sno: '12312312312',
        telephone: '15874214741',
        college: '石油化工学院-2019级过控一班',
        startTime: '2020年7月15日 12:00',
        endTime: '2020年7月20日 12:00',
        reason: '换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍'
      },
      fieldList: [
        { prop: 'aroomName', label: '活动室名称' },
        { prop: 'userName', label: '姓名' },
        { prop: 'sno', label: '学号' },
        { prop: 'telephone', label: '电话' },
        { prop: 'college', label: '班级信息' },
        { prop: 'reason', label: '申请原因' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.aroom-audit-detail {
  width: 100%;
  overflow: auto;
}
</style>
