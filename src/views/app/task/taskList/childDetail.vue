<template>
  <div class="soa-task-detail">
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
        <div>
          <van-row>
            <van-col span="6">
              <div class="c-danger">待审核</div>
            </van-col>
            <van-col span="6">
              <div class="c-light">吴笑笑</div>
            </van-col>
            <van-col span="12">
              <div class="c-tr">
                <van-button
                  type="info"
                  size="mini">查看</van-button>
              </div>
            </van-col>
          </van-row>
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
    <van-cell>
      <div
        v-for="(item, index) in params.child"
        :key="index"
        class="soa-task-detail__cell">
        <van-row gutter="10">
          <van-col span="12"><div class="c-ft12">{{ item.title }}</div></van-col>
          <van-col span="4">
            <div class="c-light c-ft12">{{ item.done }}/{{ item.total }}完成</div>
          </van-col>
          <van-col span="4">
            <div
              :class="{'c-success':item.total==item.done,'c-danger':item.total!=item.done}"
              class="c-ft12">{{ item.total==item.done?'已完成':'未完成' }}</div>
          </van-col>
          <van-col span="4">
            <div class="icon">
              <van-icon
                name="clear"
                color="#f00"
                @click="handleChildClear(index)"/>
            </div>
            <div class="icon c-mr10">
              <van-icon
                name="edit"
                @click="handleChildEdit(index)"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="c-tc">
        <van-button
          block
          icon="add-o"
          type="info"
          @click="handleAddChildClick">
          添加子任务
        </van-button>
      </div>
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
      }
    }
  }
}
</script>

<style scoped>

</style>
