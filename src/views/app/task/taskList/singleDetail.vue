<template>
  <div>
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
          <van-col span="19"><div class="t-success">已完成</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5 tr">备注</van-col>
          <van-col span="19"><div class="t-danger">审核通过</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5 tr">质量分</van-col>
          <van-col span="19"><div class="t-light">99.2</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5 tr">任务总结</van-col>
          <van-col span="19"><div class="t-light">任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5"><div class="">附件信息</div></van-col>
          <van-col span="19">
            <div class="soa-task-file-list">
              <a>学生信息.xls</a>
              <a>学生信息.xls</a>
            </div>
          </van-col>
        </van-row>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Col, Row, Cell, CellGroup } from 'vant';
export default {
  name: 'SingleDetail',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
}
</script>

<style scoped>
    .soa-task-file-list > a{
        text-decoration: underline;
        color: #1989FA;
        margin-right: 10px;
    }
</style>
