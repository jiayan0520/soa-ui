<template>
  <div class="building-edit">
    <van-form
      v-if="isLoad"
      class="building-edit-form soa-custom-form"
      @submit="onSubmit">
      <van-field
        v-model="formData.buildingName"
        :rules="formDataRules.buildingName"
        :required="true"
        :maxlength="50"
        label="楼栋名称"
        placeholder="请输入楼栋名称"
      />
      <van-field
        :readonly="true"
        label="楼管"
        right-icon="add"
        placeholder
        @click="choiceUser('DORM_MANAGER')"
      >
        <template #input>
          <div
            v-for="(item,index) in formData.buildingManagers"
            :key="index">
            {{ item.realName }}
            <span class="c-info">{{ item.phone }}</span>
          </div>
        </template>
      </van-field>
      <van-field
        :readonly="true"
        label="维修人员"
        right-icon="add"
        placeholder
        @click="choiceUser('MAINTENANCE_WORKER')"
      >
        <template #input>
          <div
            v-for="(item,index) in formData.maintenanceWorkers"
            :key="index">
            {{ item.realName }}
            <span class="c-info">{{ item.phone }}</span>
          </div>
        </template>
      </van-field>
      <van-field
        :required="true"
        :rules="formDataRules.annexId"
        name="uploader"
        label="楼栋照片">
        <template #input>
          <custom-uploader
            v-model="formData.annexId"
            :max-count="1"
            :annex-list="formData.annexList"
            type="dorm"
          />
        </template>
      </van-field>
      <van-field
        :required="true"
        :rules="formDataRules.address"
        v-model="formData.address"
        :readonly="true"
        label="楼栋位置"
        right-icon="location"
        placeholder="请选择"
        @click="isShowAddressPopup=true"
      />
      <van-field
        :required="true"
        :rules="formDataRules.desc"
        :maxlength="500"
        v-model="formData.desc"
        type="textarea"
        placeholder="楼栋简介"
        label="简介"
      />
      <van-divider />
      <div class="soa-btn-box">
        <van-button
          block
          type="info"
          native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-popup
      v-model="isShowAddressPopup"
      position="bottom"
      style="min-height: 20% ">
      <address-select
        @close="isShowAddressPopup=false"
        @confirm="addressConfirm" />
    </van-popup>
    <van-popup
      v-if="isShowUserOutPopup"
      v-model="isShowUserOutPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom"
    >
      <user-out
        :type="outUserType"
        :ids="currentOutUserIds"
        @close="isShowUserOutPopup=false"
        @sure="sureChoiceUser"
      />
    </van-popup>
  </div>
</template>

<script>
import addressSelect from '@/components/address-select'
import customUploader from '@/components/custom-uploader'
import userOut from '../components/user-out'
import { Toast } from 'vant';
export default {
  name: 'BuildingEdit',
  components: {
    addressSelect,
    customUploader,
    userOut
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoad: false,
      isAdd: false,
      formData: {
        buildingName: null,
        desc: null,
        address: null,
        latitude: null,
        longitude: null,
        annexId: null, // 楼栋照片
        annexList: [],
        buildingManagerIds: null, // 楼栋管理员
        maintenanceWorkerIds: null // 楼栋维修员
      },
      formDataRules: {
        buildingName: [{ required: true, message: '请输入楼栋名称' }],
        desc: [{ required: true, message: '请输入楼栋简介' }],
        annexId: [{ required: true, message: '请上传楼栋照片' }],
        address: [{ required: true, message: '请输入楼栋位置' }]
      },
      isShowAddressPopup: false,
      isShowUserOutPopup: false,
      outUserType: null,
      currentOutUserIds: null
    }
  },
  created() {
    if (!this.id) {
      this.isAdd = true
      this.isLoad = true
    } else {
      this.getDetail()
    }
  },
  methods: {
    // 保存
    onSubmit() {
      if (this.isAdd) {
        Toast.loading('新楼栋中，请稍后...')
        this.$api.addBuilding(this.formData).then(data => {
          Toast.clear()
          Toast('新增楼栋成功')
          this.$emit('close', true)
          this.$router.push('/dorm/buildingList')
        }).catch(err => {
          Toast('新增楼栋失败' + err)
        })
      } else {
        Toast.loading('修改楼栋中，请稍后...')
        this.$api.updateBuilding(this.formData).then(data => {
          Toast.clear()
          Toast('修改楼栋成功')
          this.$router.push('/dorm/buildingList')
          this.$emit('close', true)
        }).catch(err => {
          Toast('修改楼栋失败' + err)
        })
      }
    },
    // 获取详情
    getDetail() {
      this.$api.getBuildingDetail(this.id).then(data => {
        this.formData = {
          id: data.id,
          buildingName: data.buildingName,
          desc: data.desc,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          annexId: data.annexId || null, // 楼栋照片
          annexList: data.annexList || [],
          buildingManagerIds: data.buildingManagerIds, // 楼栋管理员
          buildingManagers: data.buildingManagers,
          maintenanceWorkerIds: data.maintenanceWorkerIds, // 楼栋维修员
          maintenanceWorkers: data.maintenanceWorkers
        }
        this.isLoad = true
        console.log(this.formData)
      })
    },
    // 选择管理员，维修人员
    choiceUser(type) {
      this.isShowUserOutPopup = true
      this.outUserType = type
    },
    // 选中管理员，维修人员
    sureChoiceUser(list) {
      this.currentOutUserIds = null
      if (this.outUserType === 'DORM_MANAGER') {
        this.formData.buildingManagers = list
        this.formData.buildingManagerIds = list.map(item => { return item.id }).join(',')
        this.currentOutUserIds = this.formData.buildingManagerIds
        this.isShowUserOutPopup = false
      } else {
        this.formData.maintenanceWorkers = list
        this.formData.maintenanceWorkerIds = list.map(item => { return item.id }).join(',')
        this.currentOutUserIds = this.formData.maintenanceWorkerIds
        this.isShowUserOutPopup = false
      }
      this.$forceUpdate()
    },
    ddlocation() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '定位中'
      })
      const self = this
      this.$dd.device.geolocation.get({
        targetAccuracy: 2, // 期望定位精度半径(单位米)
        coordinate: 1, // 1：获取高德坐标；
        withReGeocode: false, // 是否需要带有逆地理编码信息；该功能需要网络请求，请根据自己的业务场景使用
        useCache: true, // 默认是true，如果需要频繁获取地理位置，请设置false
        onSuccess: function (result) {
          alert('获取定位信息:' + JSON.stringify(result.address))
          self.formData.address = result.address
          self.formData.longitude = result.longitude
          self.formData.latitude = result.latitude
          Toast.clear()
        },
        onFail: function (err) {
          console.log('定位失败:')
          alert(JSON.stringify(err))
          Toast.clear()
        }
      });
    },
    // 经纬度确认
    addressConfirm(latlng, address) {
      this.formData.latitude = latlng.lat
      this.formData.longitude = latlng.lng
      this.formData.address = address
      this.isShowAddressPopup = false
    }
  }
}
</script>

<style lang="scss">
.building-edit {
  padding: 10px;
  .van-field__control--custom {
    display: block;
  }
}
</style>
