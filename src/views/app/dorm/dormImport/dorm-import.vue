<template>
  <div class="dorm-import">
    <van-nav-bar
      title="宿舍数据"/>
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
            class="c-info">导入示例下载</a>
        </template>
      </van-field>
      <van-field
        v-model="files"
        :readonly="true"
        label="导入">
        <template #input>
          <van-uploader
            v-model="fileList"
            upload-icon="upgrade"
            accept="*" />
        </template>
      </van-field>
    </van-form>
    <div class="soa-btn-box">
      <van-button
        block
        type="info"
        native-type="submit">导入</van-button>
    </div>
    <van-divider />
    <van-nav-bar
      title="入住数据"
      @click-left="onClickLeft" />
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
            class="c-info">导入示例下载</a>
        </template>
      </van-field>
      <van-field
        v-model="files"
        :readonly="true"
        label="导入">
        <template #input>
          <van-uploader
            v-model="fileList"
            upload-icon="upgrade"
            accept="*" />
        </template>
      </van-field>
    </van-form>
    <div class="soa-btn-box">
      <van-button
        block
        type="info"
        native-type="submit">导入</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DormImport',
  data() {
    return {
      fileList: [],
      files: ''
    }
  },
  methods: {
    onSubmit() {
      console.log('提交文件')
    }
  }
}
</script>

<style scoped>
</style>
