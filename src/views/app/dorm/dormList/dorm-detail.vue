<template>
  <div class="dorm-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        :value="`2/3人`"
        title="人员信息"
        name="1">
        <div
          v-for="(item,index) in data.peopleInfos"
          :key="index"
          class="soa-box-item people-item">
          <div>
            <div class="flex-between">
              <img
                class="soa-avatar"
                src="../../../../assets/images/timg.jpg" >
              <span>{{ item.userName }}</span>
              <span class="c-ml10">({{ item.className }})</span>
            </div>
            <div>
              {{ item.bedName }}
              <span class="c-ml10">{{ item.statusName }}</span>
              <span class="c-ml10 c-info">{{ item.telephone }}</span>
            </div>
          </div>
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
      </van-collapse-item>
      <van-collapse-item
        :value="`最后一次检查：${data.checkInfos[0].time}`"
        title="宿舍检查信息"
        name="2">
        <div
          v-for="(item,index) in data.checkInfos"
          :key="index"
          class="check-item soa-box-item">
          <div class="check-item-left">
            <div class="time">{{ item.time }}</div>
            <div class="c-info">结果：{{ item.checkResult }}</div>
          </div>
          <div class="check-item-grade">{{ item.grade }}</div>
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
    <!--新建检查项-->
    <van-popup
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <dorm-check
        :data="data"
        type="dorm" />
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import dormCheck from '../components/check-common'
import { dormTypeEnum } from '../utils/dorm-enum'
export default {
  name: 'DormDetail',
  components: {
    customPanel,
    dormCheck
  },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      activeNames: [],
      showMoreIndex: -1, // 显示更多的行index
      showCheckPopup: false,
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
        dormType: '学生宿舍',
        singleFee: '900',
        peopleInfos: [
          { headUrl: null, userName: '张三峰', className: '石油化工学院-2019级过控一班', bedName: '1床位', statusName: '正常', telephone: '182311211111' },
          { headUrl: null, userName: '张三峰', className: '石油化工学院-2019级过控一班', bedName: '1床位', statusName: '正常', telephone: '182311211111' },
          { headUrl: null, userName: '张三峰', className: '石油化工学院-2019级过控一班', bedName: '1床位', statusName: '正常', telephone: '182311211111' }
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
          prop: 'dormManager',
          label: '舍长',
          type: 'array',
          childrenFields: [
            { prop: 'name' },
            { prop: 'mobile', class: 'c-info' }]
        },
        {
          prop: 'containList',
          label: '容纳情况',
          type: 'array',
          childrenFields: [
            { prop: 'name' },
            { prop: 'num', class: 'c-info', unit: '人' }]
        },
        { prop: 'dormType', label: '宿舍类型' },
        { prop: 'singleFee', label: '宿舍费用', unit: '元/人/年' }
      ],
      moreOpList: [
        { value: '1', label: '设为舍长' },
        { value: '2', label: '退舍' },
        { value: '3', label: '提醒' },
        { value: '4', label: '分配' },
        { value: '5', label: '生成二维码' },
        { value: 'del', label: '删除' }
      ],
      moreOpCheckList: [
        { value: 'edit', label: '编辑' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    // 获取详情
    getDetail() {
      this.$api.getDormDetail(this.id).then(data => {
        this.data = {
          dormName: data.buildingName + '-' + data.dormName,
          dormManager: [data.dormManager],
          containList: [
            { name: '可容纳人数：', num: data.dormData.totalNum },
            { name: '已容纳人数：', num: data.dormData.userNum },
            { name: '需激活人数：', num: data.dormData.userNum - data.dormData.activationNum },
            { name: '已激活人数：', num: data.dormData.activationNum, class: 'c-info' },
            { name: '请假人数：', num: data.dormData.leaveNum, class: 'c-danger' }
          ],
          dormType: dormTypeEnum[data.dormType].label,
          singleFee: data.singleFee,
          peopleInfos: [
            { headUrl: null, userName: '张三峰', className: '石油化工学院-2019级过控一班', bedName: '1床位', statusName: '正常', telephone: '182311211111' },
            { headUrl: null, userName: '张三峰', className: '石油化工学院-2019级过控一班', bedName: '1床位', statusName: '正常', telephone: '182311211111' },
            { headUrl: null, userName: '张三峰', className: '石油化工学院-2019级过控一班', bedName: '1床位', statusName: '正常', telephone: '182311211111' }
          ],
          checkInfos: [
            { checkResult: '阳台混乱', grade: -10, time: '2020年6月28日 20:01' },
            { checkResult: '宿舍脏乱', grade: -20, time: '2020年6月28日 20:01' },
            { checkResult: '非常好', grade: 20, time: '2020年6月28日 20:01' }
          ]
        }
      })
    },
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
.dorm-detail {
  width: 100%;
  overflow: auto;
  .van-collapse-item {
    .van-cell__title {
      flex: unset;
      width: 100px;
    }
  }
  .people-item {
    .soa-avatar {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
