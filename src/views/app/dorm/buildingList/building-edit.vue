<template>
  <div class="building-edit">
    <van-form
      class="building-edit-form soa-custom-form"
      @submit="onSubmit">
      <van-field
        v-model="formData.buildingName"
        :rules="[{ required: true, message: '请输入楼栋名称' }]"
        :required="true"
        maxlength="50"
        label="楼栋名称"
        placeholder="请输入楼栋名称"
      />
      <van-field
        v-model="formData.buildingManagerIds"
        :readonly="true"
        label="楼管"
        right-icon="add"
        placeholder
        @click="handleExecutorClick"
      />
      <van-field
        v-model="formData.maintenanceWorkerIds"
        :readonly="true"
        label="维修人员"
        right-icon="add"
        placeholder
        @click="handleExecutorClick"
      />
      <van-field
        name="uploader"
        label="楼栋照片">
        <template #input>
          3424
          <van-uploader
            :max-count="1"
            v-model="formData.annexIds"
            multiple />
        </template>
      </van-field>
      <van-field
        v-model="formData.addr"
        :readonly="true"
        label="楼栋位置"
        right-icon="arrow"
        placeholder="请选择"
        @click="isShowAddressPopup=true"
      />
      <van-field
        :required="true"
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
      <address-select @close="isShowAddressPopup=false" />
    </van-popup>
  </div>
</template>

<script>
import addressSelect from '@/components/address-select'
import { Toast } from 'vant';
export default {
  name: 'BuildingEdit',
  components: {
    addressSelect
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isAdd: false,
      formData: {
        buildingName: null,
        desc: null,
        addr: null,
        latitude: null,
        longitude: null,
        annexIds: null, // 楼栋照片
        buildingManagerIds: null, // 楼栋管理员
        maintenanceWorkerIds: null // 楼栋维修员
      },
      isShowAddressPopup: false
    }
  },
  created() {
    if (!this.id) {
      this.isAdd = true
    } else {
      this.getDetail()
    }
  },
  methods: {
    // 保存
    onSubmit() {
      if (this.isAdd) {
        Toast.loading('新增楼栋中，请稍后...')
        this.$api.addBuilding(this.formData).then(data => {
          Toast.clear()
          Toast('新增楼栋成功')
          this.$emit('close', true)
        })
      } else {
        Toast.loading('修改楼栋中，请稍后...')
        this.$api.updateBuilding(this.formData).then(data => {
          Toast.clear()
          Toast('修改楼栋成功')
          this.$emit('close', true)
        })
      }
    },
    // 获取详情
    getDetail() {
      this.$api.getBuildingDetail(this.id).then(data => {
        this.formData = data.map(item => {
          return {
            ...item,
            annexIdsList: []
          }
        })
      })
    },
    handleExecutorClick() {
      this.$router.push('/task-add-executor');
      console.log('handleExecutorClick')
    }
  }
}
</script>

<style lang="scss">
.building-edit {
  padding: 10px;
}
</style>
