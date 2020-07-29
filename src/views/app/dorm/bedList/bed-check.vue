<template>
  <div class="bed-check">
    <van-form
      class="soa-custom-form"
      @submit="onSubmit">
      <custom-panel
        :data="formData"
        :field-list="fieldList" />
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
import customPanel from '@/components/customPanel'
import customCell from '@/components/customCell'
import DatePicker from 'vue2-datepicker'
import dayjs from 'dayjs';
export default {
  name: 'DormEdit',
  components: {
    DatePicker,
    customCell,
    customPanel
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
        floorName: '福州生活1区1号楼-601',
        userName: '朱丽华',
        bedName: '1号',
        sno: '12312312312',
        telephone: '15874214741',
        zzmm: '党员',
        className: '2019过控一班',
        checkUserName: '杨三峰 1804298179',
        checkResult: null, // 检查结果
        annexIds: [], // 附件
        remark: null,
        checkTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
      },
      fieldList: [
        { prop: 'floorName', label: '楼栋名称' },
        { prop: 'userName', label: '姓名' },
        { prop: 'bedName', label: '床位' },
        { prop: 'sno', label: '学号' },
        { prop: 'telephone', label: '电话' },
        { prop: 'zzmm', label: '政治面貌' },
        { prop: 'className', label: '班级信息' },
        { prop: 'checkUserName', label: '检查人员' }
      ],
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
