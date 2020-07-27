<template>
  <div class="dorm-edit">
    <van-form
      class="dorm-edit-form"
      @submit="onSubmit">
      <van-cell
        title="楼栋名称"
        value="福州生活1区1号楼" />
      <van-field
        v-model="formData.dormName"
        :rules="[{ required: true, message: '请输入宿舍名称' }]"
        :required="true"
        maxlength="50"
        label="宿舍名称"
        placeholder="请输入宿舍名称"
      />
      <van-field
        v-model="formData.HeadName"
        :readonly="true"
        label="舍长"
        right-icon="add"
        placeholder
        @click="handleExecutorClick"
      />
      <van-field
        center
        label="宿舍类型">
        <template #input>
          <van-radio-group
            v-model="formData.dormType"
            direction="horizontal">
            <van-radio name="1">学生宿舍</van-radio>
            <van-radio name="2">单教师宿舍</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="formData.peopleNum"
        :rules="[{ required: true, message: '请输入人数' }]"
        :required="true"
        type="number"
        label="人数"
      />
      <van-field
        :rules="[{ required: true, message: '请输入床位编号格式' }]"
        :required="true"
        center
        label="床位编号格式"
      >
        <template #input>
          <van-radio-group
            v-model="formData.formatType"
            direction="horizontal">
            <van-radio name="1">字母</van-radio>
            <van-radio name="2">数字</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="formData.bedNames"
        :rules="[{ required: true, message: '请输入床位号用、隔开' }]"
        :required="true"
        label="床位号"
        placeholder="请输入床位号用、隔开"
      />
      <van-field
        :required="true"
        label="单人费用">
        <template #input>
          <van-field
            v-model="formData.cost"
            :rules="[{ required: true, message: '请输入每人每年费用' }]"
            style="padding:0" />
          <span class="unit">(元)</span>
        </template>
      </van-field>
      <van-divider />
      <div class="soa-task-add__submit">
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
  name: 'DormEdit',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        dormName: null,
        HeadName: null,
        dormType: '1',
        peopleNum: null,
        formatType: '1',
        bedNames: null,
        cost: 600
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
.dorm-edit{
  padding: 10px;
}
</style>
