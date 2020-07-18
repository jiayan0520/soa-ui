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
      <van-cell-group>
        <van-cell>
          <van-row gutter="10">
            <van-col span="5">示例</van-col>
            <van-col span="19"><a
              href="/images/myw3schoolimage.jpg"
              download="w3logo"
              class="t-info">导入示例下载>></a></van-col>
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
    <div class="soa-task-add-submit">
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
import { NavBar, Button, Col, Row, Icon, Cell, CellGroup, Uploader, Field, Form } from 'vant';
export default {
  name: 'Index',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [Field.name]: Field,
    [Form.name]: Form
  },
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
