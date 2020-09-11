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
    <van-field
      v-model="formData.dormId"
      :readonly="true"
      label="分配宿舍"
      right-icon="arrow"
      placeholder="请选择"
    />
    <user-picker
      v-model="formData.ccPerson"
      :disabled-users="[userId]"
      :max-users="10"
      title="抄送人" />
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
import baseCheckList from '../mixins/base-check-list'
import { statusList } from '../utils/dorm-enum'
import { getQuery } from '@/utils'
import userPicker from '@/components/userPicker'
export default {
  name: 'ChangeDetail',
  components: {
    customPanel,
    customCell,
    userPicker
  },
  mixins: [baseCheckList],
  data() {
    return {
      id: null,
      data: {},
      loading: true,
      apiMethod: 'getResultListByUserId',
      checkParams: { userId: null },
      activeNames: [],
      showCheckPopup: false,
      formData: {
        dormId: null,
        ccPerson: null // 抄送人
      },
      fieldList: [
        { prop: 'name', label: '姓名' },
        { prop: 'sno', label: '学号' },
        { prop: 'mobile', label: '电话' },
        // { prop: 'zzmm', label: '政治面貌' },
        { prop: 'college', label: '学院专业' },
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
        { prop: 'dormName', label: '宿舍名称' },
        { prop: 'bedName', label: '床位' }
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
        if (data.soaUsers) {
          const statusObj = statusList.find(status => status.value === data.status)
          data.statusName = statusObj ? statusObj.text : data.status
        }
        this.data = {
          ...data,
          ...data.soaUsers,
          // dormName: data.soaDormDorm.buildingName + '-' + data.soaDormDorm.dormName,
          bedName: data.bedName,
          instructorList: [{ userName: '杨荣发', telephone: '14777777747' }, { userName: '杨荣', telephone: '14777777747' }],
          parentList: [{ userName: '李国强', telephone: '14777777747', role: '父亲' }, { userName: '张秀哈', telephone: '14777777747', role: '母亲' }]
          // singleFee: data.soaDormDorm.singleFee
        }
        console.log(1111111, this.data)
        if (this.data.soaUsers) {
          this.checkParams.userId = this.data.soaUsers.userId
          this.againResultList()
        }
        this.loading = false
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
