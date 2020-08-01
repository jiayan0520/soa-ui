<template>
  <div class="bed-noauth">
    <van-icon
      class="c-warm"
      name="warning-o" />对不起，该床铺信息与您的信息不匹配，您的宿舍号为：[福大生活1区1号楼-601-A床，未分配]！如有疑问请联系管理员。
      如果是卫生检查委员，显示该提示，请联系管理员将您设置为卫生检查委员角色！
  </div>
</template>

<script>
export default {
  name: 'BedNoauth',
  components: {
  },
  data() {
  },
  created() {
    // 获取用户角色信息判断查看的页面
  },
  methods: {
  }
}
</script>

<style lang="scss">
.bed-noauth {
  width: 100%;
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  .van-icon-warning-o {
    font-size: 70px;
    margin-bottom: 20px;
  }
}
</style>
