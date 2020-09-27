<template>
  <div class="aroom-edit">
    <van-form
      v-if="isLoad"
      class="aroom-edit-form soa-custom-form"
      @submit="onSubmit">
      <van-field
        v-model="formData.activityRoomName"
        :rules="formDataRules.activityRoomName"
        :required="true"
        maxlength="50"
        label="活动室名称"
        placeholder="请输入活动室名称"
      />
      <van-field
        :readonly="true"
        label="管理员"
        right-icon="add"
        placeholder
        @click-right-icon="choiceUser()"
      >
        <template #input>
          <div
            v-for="(item,index) in formData.managers"
            :key="index">
            {{ item.realName }}
            <span class="c-info">{{ item.phone }}</span>
            <van-icon
              name="close"
              @click="delManager(index)" />
          </div>
        </template>
      </van-field>
      <van-field
        :required="true"
        :rules="formDataRules.annexId"
        name="uploader"
        label="活动室照片">
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
        v-model="formData.desc"
        type="textarea"
        placeholder="活动室简介"
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
      v-if="isShowUserOutPopup"
      v-model="isShowUserOutPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom"
    >
      <user-out
        :type="outUserType"
        @close="isShowUserOutPopup=false"
        @sure="sureChoiceUser" />
    </van-popup>
  </div>
</template>

<script>
import customUploader from '@/components/custom-uploader'
import userOut from '../dorm/components/user-out'
import { Toast } from 'vant';
export default {
  name: 'AroomEdit',
  components: {
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
        activityRoomName: null,
        managerIds: null,
        managers: [],
        annexId: '',
        annexList: [],
        desc: null
      },
      formDataRules: {
        activityRoomName: [{ required: true, message: '请输入活动室名称' }],
        annexId: [{ required: true, message: '请上传楼栋照片' }]
      },
      isShowAddressPopup: false,
      isShowUserOutPopup: false,
      outUserType: 'DORM_MANAGER'
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
        Toast.loading('新增活动室中，请稍后...')
        this.$api.addRoom(this.formData).then(data => {
          Toast.clear()
          Toast('新增活动室成功')
          this.$emit('close', true)
        }).catch(err => {
          Toast.fail('新增活动室失败' + err)
        })
      } else {
        Toast.loading('修改活动室中，请稍后...')
        this.$api.updateRoom(this.formData).then(data => {
          Toast.clear()
          Toast('修改活动室成功')
          this.$emit('close', true)
        }).catch(err => {
          Toast.fail('修改活动室失败' + err)
        })
      }
    },
    // 获取详情
    getDetail() {
      this.$api.getRoomDetail(this.id).then(data => {
        this.formData = {
          id: data.id,
          activityRoomName: data.activityRoomName,
          desc: data.desc,
          annexId: data.annexId || null, // 楼栋照片
          annexList: data.annexList || [],
          managerIds: data.managerIds, // 管理员
          managers: data.managers || []
        }
        this.isLoad = true
      })
    },
    // 选择管理员
    choiceUser() {
      this.isShowUserOutPopup = true
    },
    // 选中管理员
    sureChoiceUser(list) {
      list.forEach(item => {
        if (this.formData.managers.findIndex(u => u.id === item.id) === -1) {
          this.formData.managers.push(item)
        }
      })
      this.formData.managerIds = this.formData.managers.map(item => { return item.id }).join(',')
      this.isShowUserOutPopup = false
      this.$forceUpdate()
    },
    // 删除管理员
    delManager(index) {
      this.formData.managers.splice(index, 1)
      this.formData.managerIds = this.formData.managers.map(item => { return item.id }).join(',')
    }
  }
}
</script>

<style lang="scss">
.aroom-edit {
  padding: 10px;
  .soa-custom-form .van-field {
    .van-field__label {
      width: 7.2em;
    }
  }
  .van-field__control--custom {
    display: block;
  }
}
</style>
