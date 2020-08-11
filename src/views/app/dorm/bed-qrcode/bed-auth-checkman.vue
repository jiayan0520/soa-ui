<template>
  <div class="bed-auth-checkman">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        :value="`2/3人`"
        title="人员信息"
        name="1">
        <div
          v-for="(item,index) in data.bedList"
          :key="index"
          class="soa-box-item">
          <div>
            <div style="color: #323233;">{{ item.bedName }}</div>
            <div>
              <span>状态：{{ item.statusName }}</span>
              <span class="c-light">最后一次检查：{{ item.endTime }}</span>
            </div>
          </div>
          <van-button
            v-if="item.statusName!=='未分配'"
            class="soa-list-right-btn"
            type="info"
            @click="clickCheckDed(item)"
          >检查</van-button>
        </div>
      </van-collapse-item>
      <van-collapse-item
        :value="`最后一次检查：${data.checkInfos[0].time}`"
        title="宿舍检查信息"
        name="2">
        <div
          v-for="(item,index) in data.checkInfos"
          :key="index"
          class="check-item soa-box-item">
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
                v-for="btn in moreOpCheckList"
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
        class="btn-op"
        @click="clickCheckBtn">新增检查</van-button>
    </div>
    <!--新建宿舍检查项-->
    <van-popup
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <check-common
        :type="'dorm'"
        :data="data" />
    </van-popup>
    <!--新建床位检查项-->
    <van-popup
      v-model="showCheckBedPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <check-common :data="currentBed" />
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import checkCommon from '../components/check-common'
export default {
  name: 'BeaAuthSelf',
  components: {
    customPanel,
    checkCommon
  },
  data() {
    return {
      activeNames: [],
      showMoreIndex: -1, // 显示更多的行index
      showCheckPopup: false, // 宿舍检查
      showCheckBedPopup: false, // 床位检查
      currentBed: {}, // 选中床位
      data: {
        dormName: '福大生活1区1号楼-601',
        headList: [{ userName: '杨荣发', telephone: '14777777747' }, { userName: '杨荣', telephone: '14777777747' }],
        containList: [
          { name: '可容纳人数：', num: 1 },
          { name: '已容纳人数：', num: 1 },
          { name: '需激活人数：', num: 1 },
          { name: '已激活人数：', num: 1, class: 'c-info' },
          { name: '请假人数：', num: 1, class: 'c-danger' }
        ],
        cost: '900',
        bedList: [
          { dormName: '福大生活1区1号楼-601', bedName: 'A床', statusName: '正常', endTime: '2020年6月28日 20:01' },
          { dormName: '福大生活1区1号楼-601', bedName: 'B床', statusName: '正常', endTime: '2020年6月28日 20:01' },
          { dormName: '福大生活1区1号楼-601', bedName: 'C床', statusName: '未分配', endTime: '2020年6月28日 20:01' }
        ],
        checkInfos: [
          { checkResult: '阳台混乱', grade: -10, time: '2020年6月28日 20:01' },
          { checkResult: '宿舍脏乱', grade: -20, time: '2020年6月28日 20:01' },
          { checkResult: '非常好', grade: 20, time: '2020年6月28日 20:01' }
        ]
      },
      fieldList: [
        { prop: 'dormName', label: '宿舍名称' },
        {
          prop: 'headList',
          label: '舍长',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        {
          prop: 'containList',
          label: '容纳情况',
          type: 'array',
          childrenFields: [
            { prop: 'name' },
            { prop: 'num', class: 'c-info', unit: '人' }]
        },
        { prop: 'cost', label: '宿舍费用', unit: '元/人/年' }
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
    },
    // 新增宿舍检查
    clickCheckDed(item) {
      this.currentBed = item
      this.showCheckBedPopup = true
    }
  }
}
</script>

<style lang="scss">
.bed-auth-checkman {
  width: 100%;
  overflow: auto;
}
</style>
