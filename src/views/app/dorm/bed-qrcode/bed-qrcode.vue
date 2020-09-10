<template>
  <div class="bed-qrcode">正在跳转...</div>
</template>

<script>
import { getQuery } from '@/utils'
import { Toast } from 'vant'
export default {
  name: 'BedQrcode',
  components: {
  },
  data() {
    return {
      id: null
    }
  },
  created() {
    this.id = getQuery('id')
  },
  methods: {
    getlocation() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '定位中'
      })
      if (this.$dd.env.platform !== 'notInDingTalk' && (this.$dd.ios || this.$dd.android)) {
        const self = this
        this.$dd.device.geolocation.get({
          targetAccuracy: 2, // 期望定位精度半径(单位米)
          coordinate: 1, // 1：获取高德坐标；
          withReGeocode: false, // 是否需要带有逆地理编码信息；该功能需要网络请求，请根据自己的业务场景使用
          useCache: true, // 默认是true，如果需要频繁获取地理位置，请设置false
          onSuccess: function (result) {
            // alert('获取定位信息:' + result.longitude + ',' + result.latitude + ',' + result.address)
            Toast.clear()
            const longitude = result.longitude
            const latitude = result.latitude
            self.routerTo(longitude, latitude)
          },
          onFail: function (err) {
            alert('钉钉定位失败:' + err)
          }
        });
      } else {
        Toast('请用钉钉扫描')
      }
    },
    // 跳转链接
    routerTo(longitude, latitude) {
      const param = {
        bedId: this.id,
        latitude: latitude,
        longitude: longitude
      }
      this.$api.scanBedQrcode(param).then(data => {
        let url = ''
        switch (data.funcCode) {
          // 辅导员权限
          case 'bed-all':
            url = '/bed-qrcode/dormDetail?id=' + data.dormId
            break;
          // 床位检查
          case 'bed-check':
            url = '/bed-qrcode/bed-auth-checkman?id=' + data.dormId
            break;
          // 自己扫描
          case 'bed-self':
            url = '/bed-qrcode/bed-auth-self'
            break;
          // 无权限
          case 'bed-no':
            url = '/bed-qrcode/bed-noauth'
            break;
        }
        this.$router.push(url);
      })
    }
  }
}
</script>

<style lang="scss">
.bed-qrcode {
  width: 100%;
  text-align: center;
  padding-top: 30px;
  font-size: 24px;
}
</style>
