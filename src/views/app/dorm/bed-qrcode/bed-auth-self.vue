<template>
  <div class="bed-auth-self">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <div class="soa-btn-box">
      <van-button
        type="info"
        @click="clickCheckBtn">申请调换宿舍</van-button>
      <van-button
        type="info"
        class="c-ml10">申请成为舍长</van-button>
    </div>
    <!--调换宿舍-->
    <van-popup
      v-model="showCheckPopup"
      :style="{ height: '50%' }"
      closeable
      position="bottom">
      <van-form
        class="soa-custom-form"
        @submit="changeDorm">
        <van-field
          v-model="changeReason"
          maxlength="200"
          type="textarea"
          show-word-limit
          name="调换理由"
          placeholder="点击编辑调换理由"
        />
        <van-divider />
        <div class="soa-btn-box">
          <van-button
            type="info"
            native-type="submit">保存</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
export default {
  name: 'BeaAuthSelf',
  components: {
    customPanel
  },
  data() {
    return {
      activeNames: [],
      showMoreIndex: -1, // 显示更多的行index
      showCheckPopup: false,
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
        managementList: [{ userName: '杨荣发', telephone: '14777777747' }, { userName: '杨荣', telephone: '14777777747' }],
        repairList: [{ userName: '杨荣发', telephone: '14777777747' }, { userName: '杨荣', telephone: '14777777747' }],
        parentList: [{ userName: '李国强', telephone: '14777777747', role: '父亲' }, { userName: '张秀哈', telephone: '14777777747', role: '母亲' }],
        cost: '900',
        bedCheckInfos: [
          { checkResult: '桌面脏乱', grade: -10, time: '2020年6月28日 20:01' },
          { checkResult: '被子没叠', grade: -20, time: '2020年6月28日 20:01' },
          { checkResult: '非常好', grade: 20, time: '2020年6月28日 20:01' }
        ],
        checkInfos: [
          { checkResult: '阳台混乱', grade: -10, time: '2020年6月28日 20:01' },
          { checkResult: '宿舍脏乱', grade: -20, time: '2020年6月28日 20:01' },
          { checkResult: '非常好', grade: 20, time: '2020年6月28日 20:01' }
        ]
      },
      fieldList: [
        { prop: 'dormName', label: '宿舍名称' },
        { prop: 'userName', label: '姓名' },
        { prop: 'bedName', label: '床位' },
        { prop: 'statusName', label: '状态' },
        { prop: 'sno', label: '学号' },
        { prop: 'telephone', label: '电话' },
        { prop: 'zzmm', label: '政治面貌' },
        { prop: 'college', label: '学院专业' },
        {
          prop: 'instructorList',
          label: '辅导员',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        {
          prop: 'managementList',
          label: '楼管',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        {
          prop: 'repairList',
          label: '维修人员',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        { prop: 'cost', label: '宿舍费用', unit: '元/人/年' },
        {
          activeNames: [],
          prop: 'bedCheckInfos',
          label: '床位检查信息',
          leftValue: `最后一次检查：2020年6月28日 20:01`,
          type: 'collapse',
          childrenFields: [
            [
              { prop: 'time', class: 'time' },
              { prop: 'checkResult', class: 'c-info', isbreak: true, prefix: '结果：' }
            ],
            [
              { prop: 'grade', class: 'c-light' }
            ]
          ]
        },
        {
          activeNames: [],
          prop: 'checkInfos',
          label: '宿舍检查信息',
          leftValue: `最后一次检查：2020年6月28日 20:01`,
          type: 'collapse',
          childrenFields: [
            [
              { prop: 'time', class: 'time' },
              { prop: 'checkResult', class: 'c-info', isbreak: true, prefix: '结果：' }
            ],
            [
              { prop: 'grade', class: 'c-light' }
            ]
          ]
        }],
      moreOpList: [
        { value: 'edit', label: '编辑' },
        { value: 'del', label: '删除' }
      ],
      changeReason: null // 调换宿舍原因
    }
  },
  methods: {

    // 更多操作
    bindMoreClick(index) {
      this.showMoreIndex = this.showMoreIndex === index ? -1 : index
      console.log(this.showMoreIndex)
    },
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      switch (val) {
        case 'qc':
          break
      }
      this.showMoreIndex = -1
    },
    // 新增床位检查
    clickCheckBtn() {
      this.showCheckPopup = true
    },
    // 调换宿舍
    changeDorm() {

    }
  }
}
</script>

<style lang="scss">
.bed-auth-self {
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
