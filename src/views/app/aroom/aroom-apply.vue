<template>
  <div class="aroom-apply">
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.startTime"
        :required="true"
        :rules="formDataRules.startTime"
        center
        label="申请时间起"
      >
        <template #input>
          <date-picker
            v-model="formData.startTime"
            :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
            :editable="false"
            :not-before="minDate"
            :clearable="false"
            type="datetime"
            value-type="format"
            format="YYYY-MM-DD HH:mm"
            placeholder="请选择申请时间起"
            append-to-body
          />
        </template>
      </van-field>
      <van-field
        v-model="formData.endTime"
        :required="true"
        :rules="formDataRules.endTime"
        center
        label="申请时间结"
      >
        <template #input>
          <date-picker
            v-model="formData.endTime"
            :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
            :editable="false"
            :not-before="minDate"
            :clearable="false"
            type="datetime"
            value-type="format"
            format="YYYY-MM-DD HH:mm"
            placeholder="请选择申请时间结"
            append-to-body
          />
        </template>
      </van-field>
      <van-field
        v-model="formData.applicationReasons"
        :required="true"
        :rules="formDataRules.applicationReasons"
        name="申请原因"
        label="申请原因"
        type="textarea"
        placeholder="申请原因"
      />
      <div class="soa-btn-box">
        <van-button
          type="info"
          native-type="submit">确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { Toast } from 'vant';
export default {
  name: 'AroomEdit',
  components: {
    DatePicker
  },
  props: {
    activityRoomId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoad: false,
      isAdd: false,
      minDate: '',
      formData: {
        startTime: null,
        endTime: null,
        applicationReasons: null,
        activityRoomId: this.activityRoomId
      },
      formDataRules: {
        applicationReasons: [{ required: true, message: '请输入申请理由' }],
        startTime: [{ required: true, message: '请输入申请时间起' }],
        endTime: [{ required: true, message: '请输入申请时间结' }]
      }
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
      if (this.formData.startTime.length === 16) {
        this.formData.startTime += ':00'
      }
      if (this.formData.endTime.length === 16) {
        this.formData.endTime += ':00'
      }
      if (this.formData.endTime < this.formData.startTime) {
        Toast.fail('结束时间应大于开始时间，请重新选择')
        return
      }
      Toast.loading('申请活动室中，请稍后...')
      this.$api.applyRoom(this.formData).then(data => {
        Toast.clear()
        Toast('申请活动室成功')
        this.$emit('close', true)
      })
    },
    close() {
      this.$emit('close')
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
