<template>
  <div class="bed-list">
    <list-layout
      ref="listLayout"
      :more-op-list="moreOpList"
      :data-list="dataList"
      :is-show-bar="isShowBar"
      :title="isShowBar ? '':'宿舍床位列表'"
      detail-url="/dorm/bedDetail"
      op-label="管理"
      @search="onSearch"
      @loadData="loadData"
      @clickOperator="isShowBar = true"
      @clickMoreBtn="clickMoreBtn"
    >
      <template slot="top">
        <div
          v-if="isShowBar"
          class="tool-bar">
          <van-button
            class="btn-op btn-check-all"
            type="info"
            @click="changeCheckAll">
            <span v-text="isCheckAll?'取消全选':'全选'" />
          </van-button>
          <van-button
            class="btn-op"
            type="info">新增</van-button>
          <van-button
            class="btn-op"
            type="info">提醒</van-button>
          <van-button
            class="btn-op"
            type="info"
            @click="showMore = !showMore">更多</van-button>
          <ul
            v-if="showMore"
            class="soa-op__dropdown op-more">
            <li
              v-for="item in moreOpList"
              :key="item.index"
              @click.stop="clickMoreBtn(item.value)"
            >{{ item.label }}</li>
          </ul>
          <van-button
            class="btn-op"
            type="warning"
            @click="isShowBar = false">取消管理</van-button>
        </div>
        <form
          v-if="isShowSearch"
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
      </template>
      <template slot="refresh-top">
        <div class="soa-list-total">
          <div
            v-for="(item,index) in totalList"
            :key="index"
            class="total-item">
            <span class="lable">{{ item.lable }}：</span>
            <span class="val">{{ item.value }}人</span>
          </div>
        </div>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <img
          class="soa-avatar"
          src="../../../../assets/images/timg.jpg" >
        <div class="soa-list-item-content">
          <div>
            <span class="c-info">{{ slotProps.item.userName }}</span>
            <span class="c-info c-ml10">{{ slotProps.item.telephone }}</span>
            <span>{{ slotProps.item.banji }}</span>
          </div>
          <div class="c-light">
            {{ slotProps.item.dormInfo }}
            <span class="c-ml10">舍长</span>
          </div>
          <div class="flex-between">
            <span>学生宿舍</span>
            <span class="c-warm c-ml10">未激活</span>
          </div>
        </div>
      </template>
    </list-layout>
  </div>
</template>

<script>
import listLayout from '@/components/listLayout'
export default {
  name: 'BedList',
  components: {
    listLayout
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
      dataList: [],
      page: 0, // 前端分页页码
      limit: 10,
      pageTotal: 9999, // 总页数
      isCheckAll: false, // 列表选中全部
      showMore: false, // 更多操作
      moreOpList: [
        { value: 'qc', label: '导出二维码' },
        { value: 'exp', label: '导出数据' },
        { value: 'ts', label: '退舍' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters['core/user'] || {};
    },
    params() {
      return {
        ...this.searchForm,
        page: this.page,
        limit: this.limit
      }
    }
  },
  created() {
    console.log(this.user)
  },
  methods: {
    // 复选框选择所有
    changeCheckAll() {
      this.isCheckAll = !this.isCheckAll
      this.dataList.forEach((item, index) => {
        item.isCheck = this.isCheckAll
      });
    },
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      switch (val) {
        case 'qc': {
          break
        }
        case '1':
          break
        default:
          break
      }
      this.showMore = false
    },
    onSearch() {
      this.page = 0
      this.pageTotal = 9999
      this.dataList = []
      this.loadData()
    },
    loadData() {
      this.page++;
      const dataList = []
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          dataList.push({
            isCheck: this.isCheckAll,
            isShowMore: false,
            id: this.dataList.length + 1,
            userName: '张三峰',
            telephone: '18233422111',
            banji: '石油化工学院-2019级化工一班',
            dormInfo: '福大生活一区103栋108宿舍-A床'
          });
        }
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(dataList)
        // 数据全部加载完成
        if (this.dataList.length >= 20) {
          this.$refs.listLayout.finished = true
        }
        // if (this.dataList.length < this.limit) {
        //     this.$refs.cardList.finished = true;
        //   }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.bed-list {
  height: 100%;
}
</style>
