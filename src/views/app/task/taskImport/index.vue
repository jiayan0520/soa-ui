<template>
  <div>
    <van-nav-bar
      title="导入任务"
      left-arrow
      left-text="返回"
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">示例</van-col>
          <van-col span="19"><div class="t-info">导入示例下载>></div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">导入</van-col>
          <van-col span="19">
            <van-uploader
              v-model="fileList"
              upload-icon="upgrade"
              accept="*"/>
          </van-col>
        </van-row>
      </van-cell>
    </van-cell-group>
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
import { NavBar, Button, Col, Row, Icon, Cell, CellGroup, Uploader } from 'vant';
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
    [Uploader.name]: Uploader
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
    }
  }
}
</script>

<style scoped>

</style>
