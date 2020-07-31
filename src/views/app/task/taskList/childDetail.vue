<template>
  <div class="soa-task-chidDetail">
    <custom-cell
      :value="params.promoter"
      title="发起人"/>
    <custom-cell
      :value="params.task"
      title="任务名称"/>
    <custom-cell
      :value="params.detail"
      title="任务详情"/>
    <custom-cell
      :value="params.deadline"
      title="截止时间"/>
    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="完成情况"
        value="3/5完成"
        name="1">
        <div class="soa-task-chidDetail__complateList">
          <div class="c-danger">待审核</div>
          <div class="c-light">吴笑笑</div>
          <div class="c-tr">
            <van-button
              type="info"
              size="mini">查看</van-button>
          </div>
        </div>
        <van-row>
          <van-col span="12">
            <div class="c-light">任务反馈附件集合.zip</div>
          </van-col>
          <van-col span="12">
            <div class="c-tr">
              <van-button
                type="info"
                size="mini">下载</van-button>
            </div>
          </van-col>
        </van-row>
        <div class="c-tc c-mt10">
          <van-button
            type="info"
            size="small">审核</van-button>
        </div>
      </van-collapse-item>
    </van-collapse>
    <custom-cell title="附件信息">
      <template slot="value">
        <a
          v-for="(item,index) in params.file"
          :key="index"
          :href="item.url"
          download="w3logo">{{ item.fileName }}</a>
      </template>
    </custom-cell>
    <van-cell
      v-for="items in params.infos"
      :key="items.index">
      <van-row gutter="10">
        <van-col span="6">【{{ items.name }}】</van-col>
        <van-col span="10">
          <div class="c-light">{{ items.content }}</div>
        </van-col>
        <van-col span="8">
          <div class="c-light c-tr c-ft12">{{ items.time }}</div>
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
  </div>
</template>

<script>
import customCell from '@/components/customCell'
export default {
  name: 'ChildDetail',
  components: {
    customCell
  },
  data() {
    return {
      activeNames: [],
      params: {
        promoter: '李晓明',
        task: '收集党员信息',
        detail: '请各位尽快收拾好党员信息，按照excel表格里要求的数据进行填写',
        quality: '100',
        remark: '审核不通过原因：没有附件',
        deadline: '2020年6月19日 18时00分',
        file: [{ url: '/images/myw3schoolimage.jpg', fileName: '学生列表.xls' }, { url: '/images/myw3schoolimage.jpg', fileName: '学生列表.xls' }],
        child: [{ title: '搜集党员信息子任务', total: 5, done: 0 }],
        infos: [
          { name: '黄德彬', content: '这个任务很简单，大家尽快执行完后反馈该任务信息', time: '6月19日 18时00分' },
          { name: '李荣文', content: '已查看该任务', time: '6月19日 15时00分' },
          { name: '韩雯雯', content: '已反馈该任务', time: '6月19日 11时30分' }
        ]
      },
      inputText: ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@include b(task-chidDetail){
  @include e(complateList){
    display:flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>
