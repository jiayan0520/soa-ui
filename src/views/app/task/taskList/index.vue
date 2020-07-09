<template>
  <div class="soa-task-list">
    <div>
      <h3 class="soa-task-list-title">任务列表
        <van-button
          class="soa-task-list-accounts"
          size="normal"
          type="warning"
          native-type="submit">
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
      <van-tab title="我发布的"/>
      <van-tab title="我收到的"/>
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
      <div
        class="soa-task-list-list"
        @click="bindDetailClick">
        <div class="title ft18 fwb">202006071 收集班级学生旷课情况</div>
        <div class="content">
          <div class="t-light">2020年06月20 15时00分 截止</div>
          <div>
            <van-row>
              <van-col span="16">
                <div class="t-light">2020年06月07 15时00分 发布</div>
              </van-col>
              <van-col span="8">
                <van-row>
                  <van-col span="12">
                    <span class="mr20 t-danger">未完成</span>
                  </van-col>
                  <van-col span="12">
                    <div class="more">
                      <van-icon
                        name="more-o"
                        @click="bindMoreClick"/>
                      <ul
                        v-if="showMore"
                        class="show-more">
                        <li>提交</li>
                        <li>任务失败申请</li>
                      </ul>
                    </div>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </div>
          <div>
            <span class="t-info">林小明</span> | <span class="t-success">距截止还剩下30天</span>
          </div>
          <div class="t-light">3条动态  2/3完成  （未结算）</div>
        </div>
      </div>
      <div class="soa-task-list-list">
        <div class="title ft18 fwb">202006071 收集班级学生旷课情况</div>
        <div class="content">
          <div class="t-light">2020年06月20 15时00分 截止</div>
          <div>
            <van-row>
              <van-col span="16">
                <div class="t-light">2020年06月07 15时00分 发布</div>
              </van-col>
              <van-col span="8">
                <span class="mr20 t-warm">待审核</span>
                <van-icon name="more-o" />
              </van-col>
            </van-row>
          </div>
          <div>
            <span class="t-info">林小明</span> | <span class="t-danger">已逾期12天3时</span>
          </div>
          <div class="t-light">3条动态  2/3完成  （未结算）</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Search, Tab, Tabs, Button, List, Cell, Col, Row, Icon} from 'vant';
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
    [Icon.name]: Icon
  },
  data() {
    return {
      active: 0,
      active1: 0,
      searchValue: '',
      list: [

      ],
      loading: false,
      finished: true,
      showMore: false
    }
  },
  methods: {
    onSearch(searchValue) {
      console.log(searchValue)
    },
    onLoad() {
      // 异步更新数据
    },
    onClick() {
      this.list = []
      this.onLoad()
      console.log('onClick')
    },
    bindMoreClick() {
      this.showMore = !this.showMore;
    },
    bindDetailClick() {
      this.$router.push('/task-detail');
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
.soa-task-list-list .content .more{
  position: relative;
}
.soa-task-list-list .content .more>.show-more{
  position: absolute;
  top: 20px;
  left: 0;
  border: 1px solid #909399;
  border-radius: 6px;
  background: #ffffff;
}
.soa-task-list-list .content .more>.show-more>li{  padding: 6px 8px;cursor: pointer}
.soa-task-list-list .content .more>.show-more>li:not(:last-child){
  border-bottom: 1px solid #909399;
}
</style>
