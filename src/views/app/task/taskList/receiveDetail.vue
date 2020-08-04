<template>
  <div class="soa-task-receiveDetail">
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
        <div
          v-for="(item,index) in params.accomplish"
          :key="index"
          class="soa-task-receiveDetail__complateList">
          <div :class="[stateMap[item.state]]">{{ item.state }}</div>
          <div class="c-light c-ml20">{{ item.name }}</div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <custom-cell
      :value="params.remark"
      title="备注"/>
    <custom-cell
      title="质量分">
      <template slot="value">
        <span class="c-danger">未评定</span>/{{ params.quality }}分
      </template>
    </custom-cell>
    <custom-cell title="附件信息">
      <template slot="value">
        <a
          v-for="(item,index) in params.file"
          :key="index"
          :href="item.url"
          download="w3logo">{{ item.fileName }}</a>
      </template>
    </custom-cell>
    <van-cell-group>
      <van-cell>
        <div
          v-for="(item, index) in params.child"
          :key="index"
          class="soa-task-receiveDetail__child">
          <div
            class="content"
            @click="bindChildDetailClick">
            <div class="title">{{ item.title }}</div>
            <div class="c-mr20">{{ item.done }}/{{ item.total }}完成</div>
            <div
              :class="{'c-success':item.total==item.done,'c-danger':item.total!=item.done}"
              class="c-ft12">{{ item.total==item.done?'已完成':'未完成' }}</div>
          </div>
          <div class="icon">
            <div class="c-mr10">
              <van-icon
                name="clear"
                color="#f00"
                @click="handleChildClear(index)"/>
            </div>
            <div>
              <van-icon
                name="edit"
                @click="handleChildEdit(index)"/>
            </div>
          </div>
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
      <van-cell
        v-for="items in params.infos"
        :key="items.index">
        <div class="soa-task-receiveDetail__commentList">
          <div class="name">【{{ items.name }}】</div>
          <div class="content">{{ items.content }}</div>
          <div class="time">{{ items.time }}</div>
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
import AddChild from '../components/taskChildForm'
import customCell from '@/components/customCell'
export default {
  name: 'ReceiveDetail',
  components: {
    AddChild,
    customCell
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
        ],
        file: [{ url: '/images/myw3schoolimage.jpg', fileName: '学生列表.xls' }, { url: '/images/myw3schoolimage.jpg', fileName: '学生列表.xls' }],
        accomplish: [
          { name: '吴笑笑', state: '待审核' },
          { name: '林小菲', state: '未完成' }
        ]
      },
      stateMap: {
        '未完成': 'c-danger',
        '待审核': 'c-warm',
        '已完成': 'c-success'
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
    },
    bindChildDetailClick() {
      this.$router.push('/task-child-detail')
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@import '@/assets/style/var.scss';
@include b(task-receiveDetail){
   @include e(complateList){
    display:flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  @include e(commentList){
     display:flex;
     justify-content: space-between;
      align-items:center;
     & > .name{color: $--color-light;}
     & > .time{
       font-size: $--font-size-extra-small;
       color: $--color-light;
     }
     & > .content{width: 45%;}
  }
  @include e(child){
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #ddd;
    border-radius: 6px;
    margin-bottom: 10px;
    & .content{
      display: flex;
      width: 92%;
      & > .title{
        font-size: $--font-size-extra-small;
        width: 50%;
      }
    }
    & > .icon {
      display: flex;
    }
  }
}
</style>
