<template>
  <div class="floor-edit">
    <van-form
      class="floor-edit-form"
      @submit="onSubmit">
      <van-field
        v-model="formData.floorName"
        :rules="[{ required: true, message: '请输入楼栋名称' }]"
        :required="true"
        maxlength="50"
        label="楼栋名称"
        placeholder="请输入楼栋名称"
      />
      <van-field
        v-model="formData.management"
        :readonly="true"
        label="楼管"
        right-icon="add"
        placeholder
        @click="handleExecutorClick"
      />
      <van-field
        v-model="formData.repair"
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
          <van-uploader v-model="formData.annexIds" />
        </template>
      </van-field>
      <van-field
        v-model="formData.address"
        label="楼栋位置"
      />
      <van-field
        :required="true"
        v-model="formData.remark"
        type="textarea"
        placeholder="楼栋简介"
        label="简介"/>
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
  name: 'FloorEdit',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        floorName: null,
        management: null,
        repair: null,
        address: null,
        remark: null
      }
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
.floor-edit {
  padding: 10px;
}
</style>
