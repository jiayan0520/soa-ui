<template>
  <div class="check-common">
    <van-form
      class="soa-custom-form"
      @submit="onSubmit">
      <custom-panel
        :data="data"
        :field-list="fieldList2" />
      <van-field
        :readonly="true"
        v-model="formData.checkResultText"
        center
        label="检查结果"
        right-icon="arrow"
        placeholder="请选择"
        @click="isShowSelect=true"/>
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
        placeholder="点击编辑检查"
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
          type="info"
          native-type="submit">保存</van-button>
      </div>
    </van-form>
    <van-popup
      v-model="isShowSelect"
      position="bottom"
      style="min-height: 20% ">
      <van-picker
        :columns="checkItemList"
        show-toolbar
        @confirm="onConfirm"
        @cancel="isShowSelect = false"
      />
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import DatePicker from 'vue2-datepicker'
import dayjs from 'dayjs';
export default {
  name: 'CheckCommon',
  components: {
    DatePicker,
    customPanel
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    // 检查类型
    type: {
      type: String,
      default: 'bed'
    },
    // 上面一些详情信息介绍字段
    fieldList: {
      type: Array,
      default: null
    },
    // 基础数据
    data: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      formData: {
        checkResult: null, // 检查结果
        checkResultText: null,
        annexIds: [], // 附件
        remark: null,
        checkTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
      },
      checkItemList: [
        { value: -10, text: '被子没叠(-10)' },
        { value: -5, text: '桌面混乱(-10)' },
        { value: -20, text: '衣柜混乱(-20)' }
      ],
      minDate: '',
      isShowSelect: false
    }
  },
  computed: {
    fieldList2() {
      let fieldList2 = [
        { prop: 'dormName', label: '宿舍名称' },
        { prop: 'bedName', label: '床位' }
      ]
      if (this.type === 'dorm') {
        fieldList2 = [
          { prop: 'dormName', label: '宿舍名称' }
        ]
      }
      if (this.fieldList) {
        fieldList2 = this.fieldList
      }
      return fieldList2
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
    // 选择检查内容
    onConfirm(obj) {
      this.formData.checkResult = obj.value
      this.formData.checkResultText = obj.text
      this.isShowSelect = false;
    }
  }
}
</script>

