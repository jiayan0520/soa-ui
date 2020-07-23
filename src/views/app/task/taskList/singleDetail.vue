<template>
  <div>
    <van-cell-group>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">发起人</van-col>
          <van-col span="19"><div class="t-light">{{ params.promoter }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">任务名称</van-col>
          <van-col span="19"><div class="t-light">{{ params.task }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">任务详情</van-col>
          <van-col span="19"><div class="t-light">{{ params.detail }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">截止时间</van-col>
          <van-col span="19"><div class="t-light">{{ params.deadline }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">任务状态</van-col>
          <van-col span="19"><div class="t-success">{{ params.state }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5 tr">备注</van-col>
          <van-col span="19"><div class="t-danger">{{ params.remark }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5 tr">质量分</van-col>
          <van-col span="19"><div class="t-light">{{ params.quality }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5 tr">任务总结</van-col>
          <van-col span="19"><div class="t-light">{{ params.summary }}</div></van-col>
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
  },
  data() {
    return {
      params: {
        promoter: '李晓明',
        task: '收集党员信息',
        detail: '请各位尽快收拾好党员信息，按照excel表格里要求的数据进行填写',
        quality: '100',
        remark: '审核不通过原因：没有附件',
        deadline: '2020年6月19日 18时00分',
        state: '已完成',
        summary: '任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核任务已完成，请审核'
      }
    }
  }
}
</script>

<style scoped lang="scss">
 @import '../../../../assets/index.scss';
.soa-task-file-list > a{
    text-decoration: underline;
    color: $primary;
    margin-right: 10px;
}
</style>
