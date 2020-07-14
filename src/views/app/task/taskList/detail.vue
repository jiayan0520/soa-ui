<template>
  <div class="soa-task-detail">
    <div class="divider ptb10">
      <van-row gutter="10">
        <van-col span="6">
          <div class="tr">发起人</div>
        </van-col>
        <van-col span="18">
          <div>
            李晓明
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="divider ptb10">
      <van-row gutter="10">
        <van-col span="6">
          <div class="tr">任务名称</div>
        </van-col>
        <van-col span="18">
          <div>
            李晓明
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Button, Divider, Col, Row, Icon } from 'vant';
export default {
  name: 'Detail',
  components: {
    [Button.name]: Button,
    [Divider.name]: Divider,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon
  }
}
</script>

<style scoped>

</style>
