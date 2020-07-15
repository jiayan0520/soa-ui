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
          <van-col span="5">备注</van-col>
          <van-col span="19"><div class="t-danger">审核不通过原因：没有附件</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">质量分</van-col>
          <van-col span="19"><div class="t-light"><span class="t-danger">未评定</span>/100分</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">截止时间</van-col>
          <van-col span="19"><div class="t-light">2020年6月19日 18时00分</div></van-col>
        </van-row>
      </van-cell>
      <van-collapse v-model="activeNames">
        <van-collapse-item
          title="完成情况"
          value="3/5完成"
          name="1">
          <div class="soa-task-complateList plr20">
            <div>
              <van-row>
                <van-col span="6">
                  <div class="t-danger">待审核</div>
                </van-col>
                <van-col span="6">
                  <div class="t-light">吴笑笑</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
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
      <van-cell>
        <div class="soa-task-list-cell">
          <van-row gutter="10">
            <van-col span="12"><div class="ft12">搜集党员子任务信息1</div></van-col>
            <van-col span="4">
              <div class="t-light ft12">3/5完成</div>
            </van-col>
            <van-col span="4">
              <div class="t-danger ft12">未完成</div>
            </van-col>
            <van-col span="4">
              <div class="cursor right">
                <van-icon
                  name="clear"
                  color="#f00"/>
              </div>
              <div class="right mr10 cursor">
                <van-icon
                  name="edit"
                  @click="handleAddChildClick"/>
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="tc">
          <van-button
            icon="add"
            type="info">增加子任务</van-button>
        </div>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="6">【黄德彬】</van-col>
          <van-col span="10">
            <div class="t-light">这个任务很简单，大家尽快执行完后反馈该任务信息</div>
          </van-col>
          <van-col span="8">
            <div class="t-light tr">6月19日 18时</div>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-field
          v-model="inputText"
          center
          clearable
          label=""
          placeholder="输入回复内容"
        >
          <template #button>
            <van-button
              size="small"
              type="info">发送</van-button>
          </template>
        </van-field>
      </van-cell>

    </van-cell-group>
  </div>
</template>

<script>
import { Button, Col, Row, Icon, Cell, CellGroup, Collapse, CollapseItem, Field } from 'vant';
export default {
  name: 'ReceiveDetail',
  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Field.name]: Field
  },
  data() {
    return {
      activeNames: [],
      inputText: ''
    }
  },
  methods: {
    handleDelectClick() {
      console.log('删除子任务')
    },
    //* *** 查看单个执行人详情***//
    bindDetail() {
      this.$router.push('/task-single-detail')
    }
  }
}
</script>

<style scoped>
    .soa-task-file-list > a{
        text-decoration: underline;
        color: #1989FA;
        margin-right: 10px;
    }
    .soa-task-list-cell {
        background: #F8F8F8;
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 16px;
    }
    .soa-task-complateList>div{
        margin-top: 8px;
    }
</style>
