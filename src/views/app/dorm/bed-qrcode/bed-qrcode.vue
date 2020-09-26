<template>
  <div class="bed-qrcode">正在跳转...</div>
</template>

<script>
import { getQuery } from '@/utils'
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
    window.reload()
  },
  mounted() {
    this.id = getQuery('id')
    alert('进来床位二维码页面了' + this.id)
    this.routerTo()
  },
  methods: {
    // 跳转链接
    routerTo() {
      const param = {
        bedId: this.id
      }
      alert('跳转链接验证')
      this.$api.scanBedQrcode(param).then(data => {
        let url = ''
        alert(JSON.stringify(data))
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
