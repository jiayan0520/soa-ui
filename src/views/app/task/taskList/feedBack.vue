<template>
  <div class="soa-task-detail">
    <van-cell-group>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">发起人</van-col>
          <van-col span="19"><div class="t-light">李晓明</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">任务名称</van-col>
          <van-col span="19"><div class="t-light">收集党员信息</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">任务详情</van-col>
          <van-col span="19"><div class="t-light">请各位尽快收拾好党员信息，按照excel表格里要求的数据进行填写</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">截止时间</van-col>
          <van-col span="19"><div class="t-light">2020年6月19日 18时00分</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">任务状态</van-col>
          <van-col span="19"><div class="t-warm">未完成</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">备注</van-col>
          <van-col span="19"><div class="t-warm">审核不通过原因：没有附件信息</div></van-col>
        </van-row>
      </van-cell>
      <van-field
        v-model="message"
        rows="5"
        autosize
        label=""
        type="textarea"
        placeholder="编辑任务总结"
      />
      <van-field
        v-model="files"
        :readonly="true"
        label="附件"
        placeholder=""
        @click="handleExecutorClick"
      >
        <template #input>
          <van-uploader
            v-model="fileList"
            upload-icon="upgrade"
            accept="*"/>
        </template>
      </van-field>
    </van-cell-group>
    <div class="soa-task-add-submit">
      <van-button
        block
        type="info"
        native-type="submit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import { Button, Col, Row, Icon, Cell, CellGroup, Field, Uploader } from 'vant';
export default {
  name: 'FeekBack',
  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [Field.name]: Field
  },
  data() {
    return {
      files: '',
      fileList: [],
      message: ''
    }
  },
  methods: {
    handleExecutorClick() {
      console.log('handleExecutorClick')
    }
  }
}
</script>

<style scoped>

</style>
