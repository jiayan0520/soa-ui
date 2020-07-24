<template>
  <div class="soa-task-receive">
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
          <van-col span="5">备注</van-col>
          <van-col span="19">{{ params.remark }}<div class="t-danger"/></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">质量分</van-col>
          <van-col span="19"><div class="t-light"><span class="t-danger">未评定</span>/{{ params.quality }}分</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">截止时间</van-col>
          <van-col span="19"><div class="t-light">{{ params.deadline }}</div></van-col>
        </van-row>
      </van-cell>
      <van-collapse v-model="activeNames">
        <van-collapse-item
          title="完成情况"
          value="3/5完成"
          name="1">
          <div class="soa-task-receive__complateList">
            <van-row>
              <van-col span="6">
                <div class="t-danger">待审核</div>
              </van-col>
              <van-col span="6">
                <div class="t-light">吴笑笑</div>
              </van-col>
            </van-row>
          </div>
        </van-collapse-item>
      </van-collapse>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5"><div class="">附件信息</div></van-col>
          <van-col span="19">
            <div class="soa-task-receive__file">
              <a
                href="/images/myw3schoolimage.jpg"
                download="w3logo" >学生信息.xls</a>
              <a
                href="/images/myw3schoolimage.jpg"
                download="w3logo">学生信息.xls</a>
            </div>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <div
          v-for="(item, index) in params.child"
          :key="index"
          class="soa-task-receive__cell">
          <van-row gutter="10">
            <van-col span="12"><div class="ft12">{{ item.title }}</div></van-col>
            <van-col span="4">
              <div class="t-light ft12">{{ item.done }}/{{ item.total }}完成</div>
            </van-col>
            <van-col span="4">
              <div
                :class="{'t-success':item.total==item.done,'t-danger':item.total!=item.done}"
                class="ft12">{{ item.total==item.done?'已完成':'未完成' }}</div>
            </van-col>
            <van-col span="4">
              <div class="icon">
                <van-icon
                  name="clear"
                  color="#f00"
                  @click="handleChildClear(index)"/>
              </div>
              <div class="icon mr10">
                <van-icon
                  name="edit"
                  @click="handleChildEdit(index)"/>
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="tc">
          <van-button
            block
            icon="add-o"
            type="info"
            @click="handleAddChildClick">
            添加子任务
          </van-button>
        </div>
      </van-cell>
      <van-cell
        v-for="items in params.infos"
        :key="items.index">
        <van-row gutter="10">
          <van-col span="6">【{{ items.name }}】</van-col>
          <van-col span="10">
            <div class="t-light">{{ items.content }}</div>
          </van-col>
          <van-col span="8">
            <div class="t-light tr ft12">{{ items.time }}</div>
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
      <!--新建子任务-->
      <AddChild
        :show="showModal"
        :deadline="params.deadline"
        :params="editObj"
        @childData="getChildData"
        @closeModal="closeChildModal"/>
    </van-cell-group>
  </div>
</template>

<script>
import AddChild from '../taskChild'
export default {
  name: 'ReceiveDetail',
  components: {
    AddChild
  },
  data() {
    return {
      activeNames: [],
      inputText: '',
      showModal: false,
      editObj: null,
      params: {
        promoter: '李晓明',
        task: '收集党员信息',
        detail: '请各位尽快收拾好党员信息，按照excel表格里要求的数据进行填写',
        quality: '100',
        remark: '审核不通过原因：没有附件',
        deadline: '2020年6月19日 18时00分',
        child: [{ title: '搜集党员信息子任务', total: 5, done: 0 }],
        infos: [
          { name: '黄德彬', content: '这个任务很简单，大家尽快执行完后反馈该任务信息', time: '6月19日 18时00分' },
          { name: '李荣文', content: '已查看该任务', time: '6月19日 15时00分' },
          { name: '韩雯雯', content: '已反馈该任务', time: '6月19日 11时30分' }
        ]
      }
    }
  },
  methods: {
    handleDelectClick() {
      console.log('删除子任务')
    },
    //* *** 查看单个执行人详情***//
    bindDetail() {
      this.$router.push('/task-single-detail')
    },
    handleExecutorClick() {
      console.log('handleExecutorClick')
    },
    handleAddChildClick() {
      this.showModal = true;
    },
    handleChildEdit(index) {
      this.editObj = this.params.child[index];
      this.showModal = true;
    },
    handleChildClear(index) {
      const arr = this.params.child;
      arr.splice(index, 1);
      this.params.child = arr;
    },
    // 获取子任务数据
    getChildData(data) {
      const arr = this.params.child;
      arr.push(data);
      this.params.child = arr;
      this.showModal = false;
    },
    // 关闭modal
    closeChildModal(val) {
      this.showModal = !val
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@include b(task-receive){
  @include e(complateList){
    padding: 0 20px;
    & > div {
      margin-top: 8px;
    }
  }
  @include e(file){
    & > a{
      text-decoration: underline;
      color: #1989fa;
      margin-right: 10px;
    }
  }
  @include e(cell){
    background: #F8F8F8;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 16px;
    &  .icon {
      float: right;
     cursor: pointer;
    }
  }
}
</style>
