<template>
  <div>
    <van-nav-bar
      title="导入任务"
      left-arrow
      left-text="返回"
      @click-left="onClickLeft"
    />
    <van-form
      class="soa-task-add"
      @submit="onSubmit">
      <van-field
        :readonly="true"
        label="示例">
        <template slot="input">
          <a
            href="/images/myw3schoolimage.jpg"
            download="w3logo"
            class="c-info">导入示例下载</a></template></van-field>
      <van-field
        v-model="files"
        :readonly="true"
        label="导入"
      >
        <template #input>
          <van-uploader
            v-model="fileList"
            upload-icon="upgrade"
            accept="*"/>
        </template>
      </van-field>
    </van-form>
    <div>
      <van-button
        block
        type="info"
        native-type="submit">
        导入
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      fileList: [],
      files: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit() {
      console.log('提交文件')
    }
  }
}
</script>

<style scoped>

</style>
