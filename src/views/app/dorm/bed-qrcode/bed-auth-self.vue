<template>
  <div class="bed-auth-self">
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
    <div class="soa-btn-box">
      <van-button
        v-if="hasExchange"
        type="info"
        @click="clickChangeBtn">申请调换宿舍</van-button>
      <van-button
        v-if="!data.isDormManager"
        type="info"
        class="c-ml10"
        @click="setManager">申请成为舍长</van-button>
    </div>
    <!--调换宿舍-->
    <van-popup
      v-model="showChangePopup"
      class="soa-popup__center"
      closeable>
      <van-form
        class="soa-custom-form"
        @submit="changeDorm">
        <van-field
          v-model="changeReason"
          :required="true"
          :rules=" [{ required: true, message: '请输入调换理由！' }]"
          maxlength="200"
          type="textarea"
          show-word-limit
          name="调换理由"
          placeholder="点击编辑调换理由"
        />
        <div class="soa-btn-box">
          <van-button
            type="info"
            style="width:100px"
            native-type="submit">申请</van-button>
        </div>
      </van-form>
    </van-popup>
    <!--检查详情-->
    <van-popup
      v-if="showCheckPopup"
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom"
    >
      <bed-check
        :data="data"
        :dorm-id="data.dormId"
        :user-id="data.userId"
        :bed-id="data.id"
        :id="currentCheckId"
        :is-detail="isCheckDetail"
        :has-parent="hasParent"
        type="BED"
        @close="closeCheckPopop"
      />
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import { statusList } from '../utils/dorm-enum'
import baseCheckList from '../mixins/base-check-list'
import bedCheck from '../components/check-common'
import { Toast } from 'vant';
export default {
  name: 'BeaAuthSelf',
  components: {
    customPanel,
    bedCheck
  },
  mixins: [baseCheckList],
  data() {
    return {
      activeNames: [],
      showChangePopup: false,
      data: {},
      fieldList: [
        { prop: 'buildingName', label: '楼栋' },
        { prop: 'dormName', label: '宿舍名称' },
        { prop: 'bedName', label: '床位' },
        { prop: 'singleFee', label: '宿舍费用', unit: '元/人/年' },
        { prop: 'name', label: '姓名' },
        { prop: 'isDormManagerText', label: '是否舍长' },
        { prop: 'statusName', label: '状态' },
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
        {
          prop: 'buildingManagers',
          label: '楼管',
          type: 'array',
          childrenFields: [
            { prop: 'realName' },
            { prop: 'phone', class: 'c-info' }]
        },
        {
          prop: 'maintenanceWorkers',
          label: '维修人员',
          type: 'array',
          childrenFields: [
            { prop: 'realName' },
            { prop: 'phone', class: 'c-info' }]
        },
        { prop: 'singleFee', label: '宿舍费用', unit: '元/人/年' }
      ],
      changeReason: null, // 调换宿舍原因
      apiMethod: 'myInspectionResultlist',
      checkParams: {},
      hasExchange: true,
      id: null
    }
  },
  computed: {
    userId() {
      return this.$store.getters['core/user'].userId
    }
  },
  created() {
    this.getlocation()
    this.getDetail()
  },
  methods: {
    getlocation() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '定位中'
      })
      if (this.$dd.env.platform !== 'notInDingTalk' && (this.$dd.ios || this.$dd.android)) {
        // alert('钉钉环境定位中')
        const self = this
        this.$dd.device.geolocation.get({
          targetAccuracy: 2, // 期望定位精度半径(单位米)
          coordinate: 1, // 1：获取高德坐标；
          withReGeocode: false, // 是否需要带有逆地理编码信息；该功能需要网络请求，请根据自己的业务场景使用
          useCache: false, // 默认是true，如果需要频繁获取地理位置，请设置false
          onSuccess: function (result) {
            // alert('获取定位信息:' + result.longitude + ',' + result.latitude + ',' + result.address)
            Toast.clear()
            const longitude = result.longitude
            const latitude = result.latitude
            self.activeBed(longitude, latitude)
          },
          onFail: function (err) {
            alert('钉钉定位失败:' + JSON.stringify(err))
          }
        });
      } else {
        Toast.fail('请用钉钉扫描')
      }
    },
    // 激活床位
    activeBed(longitude, latitude) {
      this.$api.activeBed({
        longitude: longitude,
        latitude: latitude
      }).then(data => {
        Toast('激活成功')
        this.data.users.statusName = '正常'
      })
    },
    // 获取详情
    getDetail() {
      this.$api.getMyBedInfo().then(data => {
        if (data.users) {
          const statusObj = statusList.find(status => status.value === data.status)
          data.users.statusName = statusObj ? statusObj.text : data.status
        }
        this.data = {
          ...data,
          ...data.users,
          isDormManagerText: data.isDormManager ? '是' : '否',
          fullDeptNames: data.users.fullDeptNames.replace('[', '').replace(']', '').split(', ').join('-')
        }
        this.againResultList()
        this.loading = false
      })
    },
    // 申请调换宿舍
    clickChangeBtn() {
      this.showChangePopup = true
    },
    // 调换宿舍
    changeDorm() {
      this.$api.dormExchange({ reason: this.changeReason }).then(dara => {
        Toast('申请成功')
        this.hasExchange = false
        this.showChangePopup = false
      })
    },
    // 申请成为舍长
    setManager() {
      this.$api.setDromManager({ dormId: this.data.dormId, userId: this.userId }).then(res => {
        this.getDetail()
      })
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
