<template>
  <div class="aroom-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <div class="soa-btn-box">
      <van-button
        type="info"
        @click="showApplyPopup=true">申请活动室</van-button>
    </div>
    <!--申请活动室弹框-->
    <van-popup
      v-model="showApplyPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <div class="aroom-apply">
        <van-form @submit="onSearch">
          <van-field
            center
            label="申请时间起">
            <template #input>
              <date-picker
                v-model="applyForm.startTime"
                :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
                :editable="false"
                :not-before="minDate"
                :clearable="false"
                type="datetime"
                value-type="format"
                format="YYYY-MM-DD HH:mm"
                placeholder="请选择申请时间"
                append-to-body
              />
            </template>
          </van-field>
          <van-field
            center
            label="申请时间结">
            <template #input>
              <date-picker
                v-model="applyForm.endTime"
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
          <van-field
            v-model="applyForm.reason"
            name="申请原因"
            label="申请原因"
            type="textarea"
            placeholder="申请原因"
          />
          <div class="soa-btn-box">
            <van-button
              type="default"
              @click="showApplyPopup=false">取消</van-button>
            <van-button
              type="info"
              native-type="submit">确定</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import DatePicker from 'vue2-datepicker'
export default {
  name: 'AroomDetail',
  components: {
    customPanel,
    DatePicker
  },
  data() {
    return {
      data: {
        aroomName: '福大生活1区1号楼-活动室',
        managementList: [{ userName: '杨荣发', telephone: '14777777747' }, { userName: '杨荣', telephone: '14777777747' }],
        annexList: [
          { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          { url: 'https://cloud-image', isImage: true }
        ],
        remark: '本宿舍属于福大生活区1区，里面入住的大部分是石化学院的学生。宿舍建于2008年，最近一次宿舍翻新是2019年。'
      },
      fieldList: [
        { prop: 'aroomName', label: '活动室名称' },
        {
          prop: 'managementList',
          label: '楼管',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        {
          prop: 'annexList',
          label: '活动室照片',
          type: 'uploader'
        },
        { prop: 'remark', label: '活动室简介' }
      ],
      minDate: '',
      showApplyPopup: false,
      applyForm: {
        startTime: null,
        endTime: null,
        reason: null
      }
    }
  },
  methods: {
    onSearch() {

    }
  }
}
</script>

<style lang="scss">
.aroom-detail {
  width: 100%;
  overflow: auto;
  .soa-custom-cell__title {
    width: 7.2em;
  }
}
</style>
