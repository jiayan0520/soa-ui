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
        center
        label="检查结果">
        <template #input>
          <van-checkbox-group v-model="formData.checkResultList">
            <van-checkbox
              v-for="(item,index) in checkItemList"
              :key="index"
              :name="item.id"
              shape="square"
            >{{ item.text }}</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <van-field
        name="uploader"
        label="现场照片">
        <template #input>
          <custom-uploader
            v-model="formData.annexId"
            :max-count="5"
            :annex-list="formData.annexList"
            type="dorm"
          />
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
            :disabled="true"
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
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import DatePicker from 'vue2-datepicker'
import dayjs from 'dayjs';
import { Toast } from 'vant';
import customUploader from '@/components/custom-uploader'
export default {
  name: 'CheckCommon',
  components: {
    DatePicker,
    customPanel,
    customUploader
  },
  props: {
    id: {
      type: String,
      default: null
    },
    dormId: {
      type: String,
      default: null
    },
    bedId: {
      type: String,
      default: null
    },
    // 检查类型
    type: {
      type: String,
      default: 'BED'
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
      isAdd: true,
      formData: {
        dormId: this.dormId,
        bedId: this.bedId,
        inspectionType: this.type,
        checkUserId: this.$store.getters['core/user'].userId,
        checkResultList: [], // 检查结果
        annexId: null, // 附件
        annexList: [],
        remark: null,
        checkTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
      },
      checkItemList: [],
      minDate: ''
    }
  },
  computed: {
    fieldList2() {
      let fieldList2 = [
        { prop: 'dormName', label: '宿舍名称' },
        { prop: 'bedName', label: '床位' }
      ]
      if (this.type === 'DORM') {
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
  created() {
    if (this.id) {
      this.isAdd = false
      this.getDetail()
    }
    this.getDimension()
  },
  methods: {
    getDimension() {
      this.$api.getInspectionTypes({ type: this.type }).then(data => {
        this.checkItemList = data.map(item => {
          return {
            id: item.id,
            value: item.score,
            text: item.name + '(' + item.score + ')'
          }
        })
      })
    },
    // 获取详情
    getDetail() {
      this.$api.getResultDetail(this.id).then(data => {
        data.checkResultIds = data.checkResult
        data.checkResultList = data.checkResultIds.split(',')
        data.checkTime = dayjs(data.checkTime + ' 00:00:00').format('YYYY-MM-DD HH:mm')
        console.log(22222222, data)
        this.formData = data
      })
    },
    onSubmit() {
      this.formData.checkResultIds = this.formData.checkResultList.join(',')
      this.formData.checkResult = this.formData.checkResultList.join(',')
      if (this.formData.checkTime.length === 16) {
        this.formData.checkTime += ':00'
      }
      console.log(this.formData)
      if (this.isAdd) {
        Toast.loading('新增检查中，请稍后...')
        this.$api.addResult(this.formData).then(data => {
          Toast.clear()
          Toast('新增检查成功')
          this.$emit('close', true)
        })
      } else {
        Toast.loading('修改检查中，请稍后...')
        this.$api.updateResult(this.formData).then(data => {
          Toast.clear()
          Toast('修改检查成功')
          this.$emit('close', true)
        })
      }
    },
    handleExecutorClick() {
      this.$router.push('/task-add-executor');
    }
  }
}
</script>
<style lang="scss">
.check-common {
  .van-checkbox-group {
    .van-checkbox {
      margin: 0 0 8px 10px;
    }
  }
}
</style>

