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
      :style="{ height: '50%' }"
      closeable
      position="bottom">
      <aroom-apply
        :activity-room-id="id"
        @close="showApplyPopup=false"/>
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import { getQuery } from '@/utils'
import aroomApply from './aroom-apply'
export default {
  name: 'AroomDetail',
  components: {
    customPanel,
    aroomApply
  },
  data() {
    return {
      id: null,
      data: {},
      fieldList: [
        { prop: 'activityRoomName', label: '活动室名称' },
        {
          prop: 'managers',
          label: '管理员',
          type: 'array',
          childrenFields: [
            { prop: 'realName' },
            { prop: 'phone', class: 'c-info' }]
        },
        {
          prop: 'annexList',
          label: '活动室照片',
          type: 'uploader'
        },
        { prop: 'desc', label: '活动室简介' }
      ],
      showApplyPopup: false
    }
  },
  computed: {
    tcBaseUrl() {
      return this.$store.getters['core/system'].tcBaseUrl
    }
  },
  created() {
    this.id = getQuery('id')
    this.getDetail()
  },
  methods: {
    // 获取详情
    getDetail() {
      this.$api.getRoomDetail(this.id).then(data => {
        data.annexList.forEach(item => {
          item.url = this.tcBaseUrl + item.fileName
        });
        this.data = data
      })
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
