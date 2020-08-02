<template>
  <div class="change-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        :value="`最后一次检查：${data.bedCheckInfos[0].time}`"
        title="床位检查信息"
        name="1">
        <div
          v-for="(item,index) in data.bedCheckInfos"
          :key="index"
          class="check-item soa-box-item"
        >
          <div class="check-item-left">
            <div class="time">{{ item.time }}</div>
            <div class="c-info">结果：{{ item.checkResult }}</div>
          </div>
          <div class="check-item-grade">{{ item.grade }}</div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <custom-cell
      :value="data.reason"
      title="申请原因" />
    <van-field
      v-model="formData.dormId"
      :readonly="true"
      label="分配宿舍"
      right-icon="arrow"
      placeholder="请选择"
    />
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
  name: 'ChangeDetail',
  components: {
    customPanel,
    customCell
  },
  data() {
    return {
      activeNames: [],
      showCheckPopup: false,
      formData: {
        dormId: null,
        ccPerson: null // 抄送人
      },
      data: {
        dormName: '福大生活1区1号楼-601',
        userName: '李荣浩',
        bedName: '1号',
        statusName: '正常',
        sno: '12312312312',
        telephone: '15874214741',
        zzmm: '党员',
        college: '石油化工学院-2019级过控一班',
        place: '福建省福州市',
        address: '福建省福州市闽侯县科技路一号',
        instructorList: [{ userName: '杨荣发', telephone: '14777777747' }, { userName: '杨荣', telephone: '14777777747' }],
        parentList: [{ userName: '李国强', telephone: '14777777747', role: '父亲' }, { userName: '张秀哈', telephone: '14777777747', role: '母亲' }],
        cost: '900',
        bedCheckInfos: [
          { checkResult: '桌面脏乱', grade: -10, time: '2020年6月28日 20:01' },
          { checkResult: '被子没叠', grade: -20, time: '2020年6月28日 20:01' },
          { checkResult: '非常好', grade: 20, time: '2020年6月28日 20:01' }
        ],
        reason: '换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍，换专业申请换宿舍'
      },
      fieldList: [
        { prop: 'userName', label: '姓名' },
        { prop: 'sno', label: '学号' },
        { prop: 'telephone', label: '电话' },
        { prop: 'zzmm', label: '政治面貌' },
        { prop: 'college', label: '学院专业' },
        { prop: 'place', label: '籍贯' },
        { prop: 'address', label: '家庭住址' },
        {
          prop: 'instructorList',
          label: '辅导员',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        { prop: 'cost', label: '宿舍费用', unit: '元/人/年' },
        { prop: 'dormName', label: '宿舍名称' },
        { prop: 'bedName', label: '床位' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.change-detail {
  width: 100%;
  overflow: auto;
  .van-collapse-item {
    .van-cell__title {
      flex: unset;
      width: 100px;
    }
  }
}
</style>
