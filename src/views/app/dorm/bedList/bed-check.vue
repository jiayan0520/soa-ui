<template>
  <div class="bed-check">
    <van-form
      class="soa-custom-form"
      @submit="onSubmit">
      <custom-cell
        value="福州生活1区1号楼-601"
        title="楼栋名称" />
      <custom-cell
        title="姓名"
        value="朱丽华" />
      <custom-cell
        title="床号"
        value="1号" />
      <custom-cell
        title="学号"
        value="1232424121" />
      <custom-cell
        title="电话"
        value="18046057322" />
      <custom-cell
        title="政治面貌"
        value="正式党员" />
      <custom-cell
        title="班级信息"
        value="2019过控一班" />
      <custom-cell
        title="检查人员"
        value="杨三峰 1804298179" />
      <van-field
        center
        label="检查结果">
        <template #input>
          <van-radio-group
            v-model="formData.checkResult"
            direction="horizontal">
            <van-radio
              v-for="(item,index) in checkItemList"
              :key="index"
              :name="item.value"
            >{{ item.label }}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        name="uploader"
        label="现场照片">
        <template #input>
          <van-uploader v-model="formData.annexIds" />
        </template>
      </van-field>
      <van-field
        v-model="formData.remark"
        maxlength="200"
        show-word-limit
        type="textarea"
        name="检查结果"
        placeholder="检查结果良好，床铺干净，非必填"
      />
      <van-field
        center
        label="检查时间">
        <template #input>
          <date-picker
            v-model="formData.checkTime"
            :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
            :editable="false"
            :not-before="minDate"
            :clearable="false"
            type="datetime"
            value-type="format"
            format="YYYY-MM-DD HH:mm"
            placeholder="请选择检查时间"
            append-to-body
          />
        </template>
      </van-field>
      <van-divider />
      <div class="soa-btn-box ">
        <van-button
          block
          type="info"
          native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import customCell from '@/components/customCell'
import DatePicker from 'vue2-datepicker'
import dayjs from 'dayjs';
export default {
  name: 'DormEdit',
  components: {
    DatePicker,
    customCell
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        checkResult: null, // 检查结果
        annexIds: [], // 附件
        remark: null,
        checkTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
      },
      checkItemList: [
        { value: -10, label: '被子没叠(-10)' },
        { value: -5, label: '桌面混乱(-10)' },
        { value: -20, label: '衣柜混乱(-20)' }
      ],
      minDate: ''
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
</style>
