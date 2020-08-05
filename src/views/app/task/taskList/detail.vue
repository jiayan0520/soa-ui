<template>
  <div class="soa-task-detail">
    <custom-cell
      :value="form.promoter"
      title="发起人"/>
    <custom-cell
      :value="form.task"
      title="任务名称"/>
    <custom-cell
      :value="form.remark"
      title="备注"/>
    <custom-cell
      :value="form.deadline"
      title="截止时间"/>
    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="完成情况"
        value="3/5完成"
        name="1">
        <div
          v-for="(item,index) in form.accomplish"
          :key="index"
          class="soa-task-detail__complateList">
          <div :class="[stateMap[item.state]]">{{ item.state }}</div>
          <div class="c-light">{{ item.name }}</div>
          <div class="c-tr">
            <van-button
              type="info"
              size="mini"
              @click="bindDetail">{{ item.state === '未完成'?'提醒':'查看' }}</van-button>
          </div>
        </div>
        <div class="soa-task-detail__complateList">
          <div class="c-light">任务反馈附件集合.zip</div>
          <div class="c-tr">
            <van-button
              type="info"
              size="mini">下载</van-button>
          </div>
        </div>
        <div class="c-tc">
          <van-button
            type="info"
            size="small"
            @click="handleExamine">审核</van-button>
        </div>
      </van-collapse-item>
    </van-collapse>
    <custom-cell title="附件信息">
      <template slot="value">
        <a
          v-for="(item,index) in form.file"
          :key="index"
          :href="item.url"
          download="w3logo">{{ item.fileName }}</a>
      </template>
    </custom-cell>
    <childTaskList :list="form.subTasks"/>
    <van-cell
      v-for="items in form.infos"
      :key="items.index">
      <div class="soa-task-detail__commentList">
        <div class="name">【{{ items.name }}】</div>
        <div class="content">{{ items.content }}</div>
        <div class="time">{{ items.time }}</div>
      </div>
    </van-cell>
    <div class="soa-task-detail__reback">
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
              type="info"
              @click="submitFeedBack">发送</van-button>
          </template>
        </van-field>
      </van-cell>
    </div>

  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import customCell from '@/components/customCell'
import childTaskList from '../components/childTaskList'
export default {
  name: 'Detail',
  components: {
    DatePicker,
    customCell,
    childTaskList
  },
  data() {
    return {
      id: '',
      activeNames: [],
      inputText: '',
      showModal: false,
      editObj: null,
      form: {
        promoter: '李晓明',
        task: '收集党员信息',
        detail: '请各位尽快收拾好党员信息，按照excel表格里要求的数据进行填写',
        quality: '100',
        remark: '审核不通过原因：没有附件',
        deadline: '2020年6月19日 18时00分',
        file: [{ url: '/images/myw3schoolimage.jpg', fileName: '学生列表.xls' }, { url: '/images/myw3schoolimage.jpg', fileName: '学生列表.xls' }],
        subTasks: [{ title: '搜集党员信息子任务', total: 5, done: 0 }],
        infos: [
          { name: '黄德彬', content: '这个任务很简单，大家尽快执行完后反馈该任务信息', time: '6月19日 18时00分' },
          { name: '李荣文', content: '已查看该任务', time: '6月19日 15时00分' },
          { name: '韩雯雯', content: '已反馈该任务', time: '6月19日 11时30分' }
        ],
        accomplish: [
          { name: '吴笑笑', state: '待审核' },
          { name: '林小菲', state: '未完成' }
        ]
      },
      accomplish: [
        { name: '吴笑笑', state: '待审核' },
        { name: '林小菲', state: '未完成' }
      ],
      stateMap: {
        '未完成': 'c-danger',
        '待审核': 'c-warm',
        '已完成': 'c-success'
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getData(this.$route.query.id)
  },
  methods: {
    getData(id) {
      this.$api.getTaskDetail(id).then((res) => {
        console.log(res);
      })
    },
    handleDelectClick() {
      console.log('删除子任务')
    },
    handleExamine() {
      this.$router.push({
        path: '/task-examine-detail',
        query: { id: this.id }
      })
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
    // 发送回复内容
    submitFeedBack() {
      var query = {
        content: this.inputText,
        name: '李明生',
        time: this.timeDate()
      };
      var arr = this.form.infos;
      arr.push(query);
      this.form.infos = arr;
    },
    timeDate() {
      var now = new Date();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var h = now.getHours();
      var m = now.getMinutes();
      if (h >= 0 && h <= 9) {
        h = '0' + h;
      }
      if (m >= 0 && m <= 9) {
        m = '0' + m;
      }
      return month + '月' + day + '日 ' + h + '时' + m + '分';
    }

  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@import '@/assets/style/var.scss';
@include b(task-detail){
  overflow: scroll;
  padding-bottom: 130px!important;
  @include e(complateList){
    display:flex;
    justify-content: space-between;
    margin-bottom: 10px;
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
  @include e(reback){
    position: fixed;
    bottom: 50px;
    width: 100%;
  }
}

</style>
