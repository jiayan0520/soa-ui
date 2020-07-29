<template>
  <div class="dorm-check">
    <van-form
      class="soa-custom-form"
      @submit="onSubmit">
      <custom-panel
        :data="formData"
        :field-list="fieldList" />
      <van-field
        center
        label="结果类型">
        <template #input>
          <van-radio-group
            v-model="formData.checkResultType"
            direction="horizontal"
            @change="changeCheckResultType"
          >
            <van-radio
              v-for="(item,index) in checkResultTypeList"
              :key="index"
              :name="item.value"
            >{{ item.label }}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        center
        label="检查结果">
        <template #input>
          <van-checkbox-group
            v-model="formData.checkResult"
            direction="horizontal">
            <van-checkbox
              v-for="(item,index) in checkItemList.filter(c=>c.type===formData.checkResultType)"
              :key="index"
              :name="item.value"
              shape="square"
            >{{ item.label }}</van-checkbox>
          </van-checkbox-group>
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
import DatePicker from 'vue2-datepicker'
import dayjs from 'dayjs';
export default {
  name: 'DormEdit',
  components: {
    DatePicker,
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
        dormName: '福州生活1区1号楼-601',
        checkUserList: [{ userName: '杨荣发', telephone: '14777777747' }],
        checkResultType: '1',
        checkResult: [], // 检查结果
        annexIds: [], // 附件
        remark: null,
        checkTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
      },
      fieldList: [
        { prop: 'dormName', label: '宿舍名称' },
        {
          prop: 'checkUserList',
          label: '检查人员',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }
          ]
        }
      ],
      checkResultTypeList: [
        { value: '1', label: '良好' },
        { value: '2', label: '脏乱' }
      ],
      checkItemList: [
        { value: -10, label: '被子没叠(-10)', type: '2' },
        { value: -5, label: '桌面混乱(-5)', type: '2' },
        { value: -20, label: '衣柜混乱(-20)', type: '2' },
        { value: 20, label: '地板干净(20)', type: '1' },
        { value: 10, label: '物品有序(10)', type: '1' },
        { value: 5, label: '阳台整洁(5)', type: '1' }
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
    },
    changeCheckResultType() {
      this.formData.checkResult = []
    }
  }
}
</script>

<style lang="scss">
</style>
