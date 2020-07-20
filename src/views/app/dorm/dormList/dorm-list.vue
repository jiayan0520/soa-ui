<template>
  <div class="dorm-list">
    <div class="tool-bar">
      <div class="mt10 fwb ft20">宿舍楼列表</div>
      <div class="tr fwb">
        <van-button
          class="soa-task-list-accounts"
          size="normal"
          type="warning"
          native-type="submit"
        >管理</van-button>
      </div>
    </div>
    <form
      v-if="isShowSearch === true"
      action="/">
      <van-search
        v-model="searchForm.searchValue"
        show-action
        placeholder="姓名/班级/宿舍号/宿舍楼"
        @search="onSearch"
        @cancel="isShowSearch=false"
      />
    </form>
    <div
      v-else
      class="search-bar">
      <van-dropdown-menu :overlay="false">
        <van-dropdown-item
          v-model="searchForm.status"
          :options="statusList" />
      </van-dropdown-menu>
      <van-dropdown-menu :overlay="false">
        <van-dropdown-item
          v-model="searchForm.isHead"
          :options="isHeadList" />
      </van-dropdown-menu>
      <van-dropdown-menu :overlay="false">
        <van-dropdown-item
          v-model="searchForm.isDivide"
          :options="isDivideList" />
      </van-dropdown-menu>
      <van-dropdown-menu :overlay="false">
        <van-dropdown-item
          v-model="searchForm.dormType"
          :options="dormTypeList" />
      </van-dropdown-menu>
      <van-icon
        name="search"
        @click="isShowSearch = true" />
    </div>
    <div class="dorm-main">
      <van-pull-refresh
        v-model="refreshing"
        :class="{'refresh-loading':refreshing}"
        :disabled="disableRefresh"
        @refresh="onRefresh"
      >
        <div class="dorm-total">
          <div
            v-for="(item,index) in totalList"
            :key="index"
            class="total-item">
            <span class="lable">{{ item.lable }}：</span>
            <span class="val">{{ item.value }}人</span>
          </div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          class="dorm-card-list"
          @load="onLoad"
        >
          <van-row
            v-for="(item,index) in list"
            :key="index"
            class="card-item"
            @click="handleClick(item)"
          >
            <div class="item-aside">
              <div
                v-show="isShowBar"
                class="card-item-checkbox">
                <van-checkbox
                  v-model="item.isCheck"
                  shape="square"
                  @click="changeItemCheck(item)" />
              </div>
              <div class="card-list-item">
                <img
                  src="../../../../assets/images/timg.jpg"
                  alt >
                <div class="item-content">
                  <div>
                    <span class="t-info">张三</span>
                    <span class="t-info ml10">18046032421</span>
                    <span>石油化工学院-2019级化工一班</span>
                  </div>
                  <div class="t-light">
                    福大生活一区103栋108宿舍-A床
                    <span class="ml10">舍长</span>
                  </div>
                  <div class="flex-between">
                    <span>学生宿舍</span>
                    <span class="t-warm ml10">未激活</span>
                  </div>
                </div>
                <i
                  class="soa-icon soa-icon-gengduo"
                  @click="bindMoreClick" />
              </div>
            </div>
          </van-row>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskExamineList',
  components: {
  },
  data() {
    return {
      totalList: [
        { lable: '可容纳', filed: 'total_num', value: 200 },
        { lable: '已容纳', filed: 'total_num', value: 200 },
        { lable: '需激活', filed: 'total_num', value: 200 },
        { lable: '可容纳学生', filed: 'total_num', value: 200 },
        { lable: '已容纳学生', filed: 'total_num', value: 200 },
        { lable: '未激活', filed: 'total_num', value: 200 },
        { lable: '可容纳老师', filed: 'total_num', value: 20 },
        { lable: '已容纳老师', filed: 'total_num', value: 20 },
        { lable: '请假中', filed: 'total_num', value: 200 }
      ], // 统计信息
      isShowBar: false, // 是否展示checkbox框
      isShowSearch: false, // 是否展示搜索弹框
      statusList: [
        { text: '全部状态', value: null },
        { text: '正常', value: 1 },
        { text: '未激活', value: 2 },
        { text: '请假中', value: 3 }
      ],
      isHeadList: [
        { text: '是否舍长', value: null },
        { text: '是舍长', value: 1 },
        { text: '非舍长', value: 0 }
      ],
      isDivideList: [
        { text: '是否分配', value: null },
        { text: '已分配', value: 1 },
        { text: '否分配', value: 0 }
      ],
      dormTypeList: [
        { text: '宿舍类型', value: null },
        { text: '学生宿舍', value: 1 },
        { text: '教师宿舍', value: 2 }
      ],
      searchForm: {
        status: null,
        isHead: 1,
        isDivide: null,
        dormType: null,
        searchValue: ''
      },
      list: [],
      refreshing: false, // 下拉刷新状态
      disableRefresh: false, // 禁用刷新
      loading: false,
      finished: false
    }
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.refreshing = false
        this.onLoad()
      }, 500);
    },
    // 行复选框点击
    changeItemCheck(item) {
      item.isCheck = !item.isCheck;
      this.$forceUpdate();
    },
    bindMoreClick() {

    },
    onSearch(searchValue) {
      console.log(searchValue)
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({
            isCheck: false,
            id: this.list.length + 1,
            label: '20200705收集班级学生旷课情况',
            star: '2020年06月20日 15时30分 截止',
            end: '2020年06月20日 15时30分 发布',
            state: '审核中', info: '距截止还剩3天1小时'
          });
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
      this.loading = true
      this.list = []
      this.onLoad()
      console.log('onClick')
    },
    handleClick(item) {
      console.log(item)
      const id = item.id
      this.$router.push({
        path: '/task-examine-detail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="scss">
body {
  overflow: hidden;
}
.dorm-list {
  .tool-bar {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
  }
  .search-bar {
    z-index: 10;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    .van-dropdown-menu {
      flex: 1;
    }
    .van-icon {
      display: flex;
      align-items: center;
      margin: 0 6px;
    }
  }
  .dorm-main {
    height: 100%;
    position: relative;
    display: flex;
    .van-pull-refresh {
      flex: 1;
      overflow: auto;
    }
  }
  .dorm-total {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: #f2f2f2;
    padding: 10px 5px;
    margin: 8px 0 12px 0;
    .total-item {
      display: flex;
      justify-content: center;
      width: 33%;
    }
  }
  .dorm-card-list {
    .card-item {
      border-bottom: 1px solid #f5f5f5;
      .item-aside {
        display: flex;
        justify-content: space-between;
        margin: 10px;
        .card-item-checkbox {
          display: flex;
          justify-content: center;
          margin-right: 10px;
          width: 20px;
        }
        .card-list-item {
          flex: 1;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .item-content {
            flex: 1;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
