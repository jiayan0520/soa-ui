<template>
  <div class="soa-task-list">
    <div>
      <h3 class="soa-task-list-title">任务列表
        <van-button
          class="soa-task-list-accounts"
          size="normal"
          type="warning"
          native-type="submit"
          @click="onSubmit">
          任务结算
      </van-button></h3>
    </div>
    <van-search
      v-model="searchValue"
      show-action
      label="任务内容"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <van-tabs
      v-model="active"
      title-active-color="#38A4F5"
      @click="onClick">
      <van-tab
        title="我发布的"
        name="1"/>
      <van-tab
        title="我收到的"
        name="2"/>
    </van-tabs>
    <van-tabs
      v-model="active1"
      @click="onClick">
      <van-tab title="未完成"/>
      <van-tab title="已完成"/>
      <van-tab title="所有"/>
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="soa-task-list-lists"
      @load="onLoad"
    >
      <van-row
        v-for="(item,index) in list"
        :key="item.id">
        <van-col span="22">
          <div
            class="soa-task-list-list"
            @click="bindDetailClick">
            <div class="title ft18 fwb">{{ item.label }}</div>
            <div class="content">
              <div class="t-light">{{ item.end }}</div>
              <van-row>
                <van-col span="18">
                  <div class="t-light">{{ item.start }}</div>
                </van-col>
                <van-col span="6">
                  <span class="t-danger">{{ item.state }}</span>
                </van-col>
              </van-row>
              <div>
                <span class="t-info">{{ item.charge }}</span> | <span class="t-success">{{ item.info }}</span>
              </div>
              <div class="t-light">{{ item.infoNum }}条动态  {{ item.done }}/{{ item.infoNum }}完成  （未结算）</div>
            </div>
          </div>
        </van-col>
        <van-col span="2">
          <div class="soa-task-more">
            <span
              class="soa-icon soa-icon-gengduo"
              @click="bindMoreClick(index)"/>
            <ul
              v-if="showMore===index"
              class="soa-task-dropdown">
              <li
                v-for="items in item.btn"
                :key="items.index"
                class="pd10"
                @click="bindTaskDrownClick(items)">{{ items }}</li>
            </ul>
          </div>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
import { Search, Tab, Tabs, Button, List, Cell, Col, Row, Icon, Dialog } from 'vant';
export default {
  name: 'AddTask',
  components: {
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    Dialog
  },
  data() {
    return {
      value1: '',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      active: 0,
      active1: 0,
      searchValue: '',
      list: [

      ],
      loading: false,
      finished: false,
      showMore: ''
    }
  },
  methods: {
    // 任务结算
    onSubmit() {
      const nowDate = this.format();
      Dialog.confirm({
        title: '提示',
        message: '今天是' + nowDate + '，确定任务结算？'
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    onSearch(searchValue) {
      console.log(searchValue)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({ id: this.list.length + 1, label: '20200705收集班级学生旷课情况',
            end: '2020年06月20日 15时30分 截止', start: '2020年06月20日 15时30分 发布',
            state: '审核中', info: '距截止还剩3天1小时', charge: '林小明', infoNum: '3', done: '2',
            btn: ['编辑', '失败', '删除'] });
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onClick() {
      this.list = []
      this.onLoad()
      console.log('onClick')
    },
    bindMoreClick(index) {
      this.showMore = this.showMore === index ? '' : index
    },
    // 下拉点击事件
    bindTaskDrownClick(item) {
      if (item === '已提交') {
        this.$router.push('/task-list-feekback')
      } else {
        this.$router.push('/task-receive-detail')
      }
    },
    // 我发布的任务详情
    bindDetailClick() {
      this.$router.push('/task-detail');
    },
    // 我接收的任务详情
    bindReceiveDetailClick() {
      this.$router.push('/task-receive-detail');
    },
    // 日期转换
    format() {
      var days = new Date();
      var month = (days.getMonth() + 1) < 10 ? '0' + (days.getMonth() + 1) : (days.getMonth() + 1);
      var strDate = (days.getDate() < 10 ? '0' + days.getDate() : days.getDate());
      return days.getFullYear() + '年' + month + '月' + strDate + '日';
    }
  }
}
</script>
<style>
.van-tabs__line{
 background-color: #1989FA!important;
}
</style>
<style scoped>
.soa-task-list-accounts{
  position: absolute;
  right: 0;
}
.soa-task-list-title{
  position: relative;
}
  .soa-task-list-list{
    margin-top: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f5f5f5;
  }
  .soa-task-list-list .content>div{
    margin-top: 2px;
  }
.soa-task-more {margin-top: 65px;position: relative;}
.soa-task-dropdown {
    position: absolute;
    right: 10px;
    top: 25px;
    width: 80px;
    border: 1px solid #F5F6F8;
    border-radius: 5px;
    background: #ffffff;
}
.soa-task-dropdown > li:not(:last-child){
  border-bottom: 1px solid #F5F6F8;
}

</style>
