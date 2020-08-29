<template>
  <div
    v-if="!loading"
    class="dorm-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        :value="`${data.dormData.userNum}/${data.dormData.totalNum}人`"
        title="人员信息"
        class="soa-collapse-item"
        name="1"
      >
        <div
          v-for="(item,index) in data.soaDormBeds"
          :key="index"
          class="soa-box-item people-item">
          <div>
            <div
              v-if="item.users"
              class="flex-between user-info">
              <img
                v-if="item.users.avatar"
                :src="item.users.avatar"
                class="soa-avatar" >
              <div
                v-else
                class="soa-avatar">{{ item.users.name.substr(-2,2) }}</div>
              <span>{{ item.users.name }}</span>
              <span class="c-ml10">({{ item.users.className||'未找到班级信息' }})</span>
            </div>
            <div
              v-else
              class="no-user-info">未分配</div>
            <div>
              {{ item.bedName }}
              <span class="c-light">床位</span>
              <span class="c-ml10 c-light">
                状态：
                <span :class="item.statusClass">{{ item.statusName }}</span>
              </span>
              <span
                v-if="item.users"
                class="c-ml10 c-info">{{ item.users.mobile }}</span>
            </div>
          </div>
          <div
            class="soa-gengduo"
            @click.stop="bindMoreClick(index)">
            <i class="soa-icon soa-icon-gengduo" />
            <ul
              v-if="showMoreIndex === index"
              class="soa-op__dropdown">
              <div
                v-for="btn in moreOpList"
                :key="btn.index">
                <li
                  v-if="showMoreOpItem(item,btn)"
                  @click.stop="clickMoreBtn(btn.value,item)"
                >{{ btn.label }}</li>
              </div>
            </ul>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item
        :value="`最后一次检查：${data.checkInfos[0].time}`"
        title="宿舍检查信息"
        class="soa-collapse-item"
        name="2"
      >
        <div
          v-for="(item,index) in data.checkInfos"
          :key="index"
          class="check-item soa-box-item">
          <div class="check-item-left">
            <div class="time">{{ item.time }}</div>
            <div class="c-info">结果：{{ item.checkResult }}</div>
          </div>
          <div class="check-item-grade">{{ item.grade }}</div>
          <div
            class="soa-gengduo"
            @click.stop="bindCheckMoreClick(index)">
            <i class="soa-icon soa-icon-gengduo" />
            <ul
              v-if="showCheckMoreIndex === index"
              class="soa-op__dropdown">
              <div
                v-for="btn in moreOpCheckList"
                :key="btn.index">
                <li @click.stop="clickCheckMoreBtn(btn.value,item)">{{ btn.label }}</li>
              </div>
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
        :dorm-id="id"
        type="DORM" />
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import dormCheck from '../components/check-common'
import { dormTypeEnum, statusList } from '../utils/dorm-enum'
// import { Dialog, Toast } from 'vant'
import { getQuery } from '@/utils'
import bedMoreOp from '../mixins/bed-more-op'
export default {
  name: 'DormDetail',
  components: {
    customPanel,
    dormCheck
  },
  mixins: [bedMoreOp],
  // props: {
  //   id: {
  //     type: String,
  //     default: null
  //   }
  // },
  data() {
    return {
      id: null,
      loading: true,
      activeNames: [],
      showMoreIndex: -1, // 显示更多的行index
      showCheckMoreIndex: -1, // 显示更多的行index
      showCheckPopup: false,
      data: {},
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
      moreOpCheckList: [
        { value: 'edit', label: '编辑' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  computed: {
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
      this.$api.getDormDetail(this.id).then(data => {
        this.data = {
          dormData: data.dormData,
          dormName: data.buildingName + '-' + data.dormName,
          dormManager: data.dormManager ? [data.dormManager] : [],
          containList: [
            { name: '可容纳人数：', num: data.dormData.totalNum },
            { name: '已容纳人数：', num: data.dormData.userNum },
            { name: '需激活人数：', num: (data.dormData.userNum - data.dormData.activationNum) },
            { name: '已激活人数：', num: data.dormData.activationNum, class: 'c-info' },
            { name: '请假人数：', num: data.dormData.leaveNum, class: 'c-danger' }
          ],
          dormType: dormTypeEnum[data.dormType].label,
          singleFee: data.singleFee,
          soaDormBeds: data.soaDormBeds.map(bed => {
            const statusObj = statusList.find(status => status.value === bed.status) || {}
            bed.statusName = statusObj.text
            bed.statusClass = statusObj.class
            return bed
          }),
          checkInfos: [
            { checkResult: '阳台混乱', grade: -10, time: '2020年6月28日 20:01' },
            { checkResult: '宿舍脏乱', grade: -20, time: '2020年6月28日 20:01' },
            { checkResult: '非常好', grade: 20, time: '2020年6月28日 20:01' }
          ]
        }
        this.loading = false
      })
    },
    // 检查项更多操作
    bindCheckMoreClick(index) {
      this.showMoreIndex = -1
      this.showCheckMoreIndex = this.showCheckMoreIndex === index ? -1 : index
    },
    // 检查项点击更多操作按钮了
    clickCheckMoreBtn(val, item) {
      switch (val) {
        case 'qc':
          break
      }
      this.showMoreIndex = -1
    },
    // 新增宿舍检查
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
      font-size: 12px;
    }
    .user-info {
      font-size: 16px;
    }
    .no-user-info {
      font-size: 16px;
      color: #909399;
    }
  }
}
</style>
