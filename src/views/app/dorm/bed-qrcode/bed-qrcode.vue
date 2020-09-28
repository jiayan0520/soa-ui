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
      id: null,
      userPopedoms: this.$store.getters['core/userPopedoms']
    }
  },
  created() {
    window.reload()
  },
  mounted() {
    this.id = getQuery('id')
    alert('进来床位二维码页面了,id:' + this.id)
    if (!this.id) {
      Toast.fail('未找到床位id')
    }
    this.routerTo()
  },
  methods: {
    // 跳转链接
    routerTo() {
      const param = {
        bedId: this.id
      }
      // alert('跳转链接验证')
      this.$api.scanBedQrcode(param).then(data => {
        let url = ''
        alert('跳转链接验证' + JSON.stringify(data))
        if (data.funcCode === 'bed-self') {
          url = '/bed-qrcode/bed-auth-self' // 自己扫描
        } else if (this.userPopedoms.findIndex(item => item.funcCode === 'bed-all') > -1) {
          url = '/bed-qrcode/dormDetail?id=' + data.dormId // 辅导员权限
        } else if (this.userPopedoms.findIndex(item => item.funcCode === 'bed-check') > -1) {
          url = '/bed-qrcode/bed-auth-checkman?id=' + data.dormId // 床位检查
        } else {
          url = '/bed-qrcode/bed-noauth' // 无权限case 'bed-no':
        }
        this.$router.push(url);
      }).catch(err => {
        console.log('获取二维码权限失败！', err)
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
