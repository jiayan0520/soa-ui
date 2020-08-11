<template>
  <div class="bed-detail">
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
          <div class="flex-between">
            <div>
              <div class="time">{{ item.time }}</div>
              <div class="c-info">结果：{{ item.checkResult }}</div>
            </div>
            <div>{{ item.grade }}</div>
          </div>
          <div class="soa-gengduo">
            <i
              class="soa-icon soa-icon-gengduo"
              @click.stop="bindMoreClick(index)" />
            <ul
              v-if="showMoreIndex === index"
              class="soa-op__dropdown">
              <li
                v-for="btn in moreOpList"
                :key="btn.index"
                @click.stop="clickMoreBtn(btn.value)"
              >{{ btn.label }}</li>
            </ul>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div class="soa-btn-box">
      <van-button
        type="info"
        @click="clickCheckBtn">新增检查</van-button>
    </div>
    <!--新建检查项-->
    <van-popup
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <bed-check :data="data" />
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import bedCheck from '../components/check-common'
export default {
  name: 'BedDetail',
  components: {
    bedCheck,
    customPanel
  },
  data() {
    return {
      activeNames: [],
      showMoreIndex: -1, // 显示更多的行index
      showCheckPopup: false,
      showCheckDetailPopup: false, // 检查项详情，可编辑保存
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
        { prop: 'place', label: '籍贯' },
        { prop: 'address', label: '家庭住址' },
        { prop: 'place', label: '学院专业' },
        {
          prop: 'instructorList',
          label: '辅导员',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        {
          prop: 'parentList',
          label: '家长信息',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'grade' },
            { prop: 'telephone', class: 'c-info' }]
        },
        { prop: 'cost', label: '宿舍费用', unit: '元/人/年' }
      ],
      moreOpList: [
        { value: 'edit', label: '编辑' },
        { value: 'del', label: '删除' }
      ]
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
    }
  }
}
</script>

<style lang="scss">
.bed-detail {
  width: 100%;
  overflow: auto;
}
</style>
