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
      <van-collapse v-model="activeNames">
        <van-collapse-item
          title="完成情况"
          value="3/5完成"
          name="1">
          <div>
            <van-row>
              <van-col span="6">
                <div class="t-danger">待审核</div>
              </van-col>
              <van-col span="6">
                <div class="t-light">吴笑笑</div>
              </van-col>
              <van-col span="12">
                <div class="tr">
                  <van-button
                    type="info"
                    size="mini">查看</van-button>
                </div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="12">
                <div class="t-light">任务反馈附件集合.zip</div>
              </van-col>
              <van-col span="12">
                <div class="tr">
                  <van-button
                    type="info"
                    size="mini">下载</van-button>
                </div>
              </van-col>
            </van-row>
            <div class="tc mt10">
              <van-button
                type="info"
                size="small">审核</van-button>
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
export default {
  name: 'ChildDetail'
}
</script>

<style scoped>

</style>
