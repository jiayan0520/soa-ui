<template>
  <div
    v-if="!loading"
    class="change-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        :value="`${checkList.length>0?'最后一次检查：'+checkList[0].checkTime:'无检查信息'}`"
        title="床位检查信息"
        class="soa-collapse-item soa-collapse-overflow"
        name="1"
      >
        <van-list
          v-model="checkLoading"
          :finished="checkFinished"
          finished-text="没有更多了"
          @load="getResultList"
        >
          <div
            v-for="(item,index) in checkList"
            :key="index"
            class="check-item soa-box-item">
            <div
              class="flex-between"
              @click="showCheckDetail(item)">
              <div>
                <div class="time">
                  {{ item.checkTime }}
                  <span v-if="item.parentId">(宿舍检查)</span>
                </div>
                <div class="c-info text-nowrap">结果：{{ item.inspectionResultsInfo }}</div>
              </div>
              <div>{{ item.score }}</div>
            </div>
          </div>
        </van-list>
      </van-collapse-item>
    </van-collapse>
    <custom-cell
      :value="data.reason"
      title="申请原因" />
    <div v-if="isEdit">
      <van-field
        v-model="formData.newBedText"
        :rules="formDataRules.newBedId"
        :readonly="true"
        :required="true"
        label="分配宿舍"
        right-icon="arrow"
        placeholder="请选择"
        @click="isShowSelectBedPopup=true"
      />
      <user-picker
        v-model="formData.ccPerson"
        :disabled-users="[userId]"
        :max-users="10"
        title="抄送人"
      />
      <van-field
        :maxlength="500"
        v-model="formData.resultReason"
        type="textarea"
        placeholder="审核理由"
        label="审核理由"
      />
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
    <custom-panel
      v-else
      :data="data"
      :field-list="overFieldList" />
    <van-popup
      v-if="isShowSelectBedPopup"
      v-model="isShowSelectBedPopup"
      :style="{ height: '100%' }"
      closeable
      class="soa-popup"
      position="bottom"
    >
      <dorm-allocate
        :op-type="'change'"
        @confirmBed="confirmBed"
        @close="isShowSelectBedPopup=false"
      />
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import customCell from '@/components/customCell'
import baseCheckList from '../mixins/base-check-list'
import { getQuery } from '@/utils'
import userPicker from '@/components/userPicker'
import dormAllocate from '../unallocated/dorm-allocate'
import { Toast } from 'vant'
import dayjs from 'dayjs'
export default {
  name: 'ChangeDetail',
  components: {
    customPanel,
    customCell,
    userPicker,
    dormAllocate
  },
  mixins: [baseCheckList],
  data() {
    return {
      id: null,
      isEdit: true,
      data: {},
      loading: true,
      apiMethod: 'getResultListByUserId',
      checkParams: { userId: null },
      activeNames: [],
      isShowSelectBedPopup: false,
      formData: {
        newBedId: null,
        newBedText: null,
        resultReason: null,
        ccPerson: [] // 抄送人
      },
      formDataRules: {
        newBedId: [{ required: true, message: '请选择床位' }]
      },
      fieldList: [
        { prop: 'name', label: '姓名' },
        { prop: 'jobNumber', label: '学号' },
        { prop: 'mobile', label: '电话' },
        // { prop: 'zzmm', label: '政治面貌' },
        { prop: 'fullDeptNames', label: '学院专业' },
        // { prop: 'place', label: '籍贯' },
        // { prop: 'address', label: '家庭住址' },
        {
          prop: 'instructorList',
          label: '辅导员',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        { prop: 'singleFee', label: '宿舍费用', unit: '元/人/年' },
        { prop: 'buildingName', label: '楼栋' },
        { prop: 'dormName', label: '宿舍名称' },
        { prop: 'bedName', label: '床位' }
      ],
      overFieldList: [
        { prop: 'statusName', label: '状态' },
        { prop: 'reviewTime', label: '审核时间' },
        { prop: 'resultReason', label: '审核意见' },
        { prop: 'reviewerName', label: '审核人' },
        { prop: 'ccPersonNames', label: '抄送人' }
      ],
      tabList: [
        { value: 'LAUNCH', text: '未完成' },
        { value: 'PASS', text: '审核通过' },
        { value: 'NOPASS', text: '未通过' }
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
      this.$api.getExchangeDetail(this.id).then(data => {
        const statusObj = this.tabList.find(status => status.value === data.status)
        data.statusName = statusObj ? statusObj.text : data.status
        this.data = {
          ...data,
          ...data.users,
          fullDeptNames: data.users.fullDeptNames.replace('[', '').replace(']', '').split(', ').join('-'),
          instructorList: [],
          ccPersonNames: data.ccPersonNames && data.ccPersonNames.join(',')
          // singleFee: data.soaDormDorm.singleFee
        }
        console.log(1111111, this.data)
        if (this.data.users) {
          this.checkParams.userId = this.data.users.userId
          this.againResultList()
        }
        if (data.status !== 'LAUNCH') {
          this.isEdit = false
          this.data.reviewTime = dayjs(data.reviewTime).format('YYYY年MM月DD日 HH:mm')
        }
        this.loading = false
      })
    },
    // 分配床位
    confirmBed(bedId, newBedText) {
      this.formData.newBedId = bedId
      this.formData.newBedText = newBedText
      this.isShowSelectBedPopup = false
    },
    // 审核
    audit(status) {
      const params = {
        ccPersonIds: this.formData.ccPerson.map(n => { return n.emplId }).join(','),
        'id': this.id,
        'newBedId': this.formData.newBedId,
        'resultReason': this.formData.resultReason,
        'status': status
      }
      this.$api.auditExchange(params).then(data => {
        Toast.clear()
        Toast('操作成功')
        this.$router.push({
          path: '/dorm/exchange'
        })
        this.$emit('close', true)
      })
    }

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
