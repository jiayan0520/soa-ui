<template>
  <div>
    <van-form
      class="soa-task-add"
      @submit="onSubmit">
      <van-cell-group>
        <van-cell>
          <van-row gutter="10">
            <van-col span="5">示例</van-col>
            <van-col span="19"><a
              href="http://www.huazhongyi.top/moboximage/template/tasktemplate/template.xlsx"
              class="c-info">导入示例下载</a></van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
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
    onSubmit() {
      console.log('提交文件')
    }
  }
}
</script>

<style scoped>

</style>
