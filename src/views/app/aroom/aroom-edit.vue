<template>
  <div class="aroom-edit">
    <van-form
      class="aroom-edit-form soa-custom-form"
      @submit="onSubmit">
      <van-field
        v-model="formData.floorName"
        :rules="[{ required: true, message: '请输入活动室名称' }]"
        :required="true"
        maxlength="50"
        label="活动室名称"
        placeholder="请输入活动室名称"
      />
      <van-field
        v-model="formData.management"
        :readonly="true"
        label="管理员"
        right-icon="add"
        placeholder
        @click="handleExecutorClick"
      />
      <van-field
        name="uploader"
        label="活动室照片">
        <template #input>
          <van-uploader v-model="formData.annexIds" />
        </template>
      </van-field>
      <van-field
        :required="true"
        v-model="formData.remark"
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
  </div>
</template>

<script>
export default {
  name: 'AroomEdit',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        roomName: null,
        management: null,
        annexIds: [],
        remark: null
      },
      isShowAddressPopup: false
    }
  },
  methods: {
    onSubmit() {
      console.log('')
    },
    handleExecutorClick() {
      this.$router.push('/task-add-executor');
      console.log('handleExecutorClick')
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
}
</style>
