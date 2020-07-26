<template>
  <list-layout
    ref="listLayout"
    :more-op-list="moreOpList"
    :data-list="dataList"
    :is-show-bar="isShowBar"
    :title="isShowBar ? '':'宿舍列表'"
    op-label="管理"
    class="dorm-list"
    @search="onSearch"
    @loadData="loadData"
    @clickOperator="isShowBar = true"
  >
    <template slot="top">
      <div
        v-if="isShowBar"
        class="tool-bar">
        <van-button
          class="btn-op"
          type="info"
          @click="changeCheckAll">
          <span v-text="isCheckAll?'取消全选':'全选'" />
        </van-button>
        <van-button
          class="btn-op"
          type="info">清空宿舍</van-button>
        <van-button
          class="btn-op"
          type="info">删除</van-button>
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
          placeholder="宿舍号/宿舍楼"
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
            v-model="searchForm.dormType"
            :options="dormTypeList" />
        </van-dropdown-menu>
        <van-dropdown-menu :overlay="false">
          <van-dropdown-item
            v-model="searchForm.isFull"
            :options="isFullList" />
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
      <div class="soa-list-item-content">
        <div class="item-row">
          <span class>{{ slotProps.item.dormInfo }}</span>
          <span class="c-ml10">{{ slotProps.item.headName }}</span>
          <span class="c-info c-ml10">{{ slotProps.item.telephone }}</span>
        </div>
        <div class="item-row flex-between c-light">
          {{ slotProps.item.dormType }}
          <div>
            <span>人数：{{ slotProps.item.num }}/{{ slotProps.item.num }}</span>
            <span class="c-ml10 c-danger">部分激活:{{ slotProps.item.aNum }}/{{ slotProps.item.num }}</span>
          </div>
        </div>
      </div>
    </template>
  </list-layout>
</template>

<script>
import listLayout from '@/components/listLayout'
export default {
  name: 'DormList',
  components: {
    listLayout
  },
  data() {
    return {
      totalList: [
        { lable: '宿舍树', filed: 'total_num', value: 200 },
        { lable: '未分配满', filed: 'total_num', value: 200 },
        { lable: '学生', filed: 'total_num', value: 200 },
        { lable: '已分配满', filed: 'total_num', value: 200 },
        { lable: '老师', filed: 'total_num', value: 200 }
      ], // 统计信息
      isShowBar: false, // 是否展示checkbox框
      isShowSearch: false, // 是否展示搜索弹框
      statusList: [
        { text: '激活状态', value: null },
        { text: '全部激活', value: 1 },
        { text: '部分激活', value: 2 },
        { text: '全未激活', value: 3 }
      ],
      dormTypeList: [
        { text: '宿舍类型', value: null },
        { text: '学生宿舍', value: 1 },
        { text: '老师宿舍', value: 2 }
      ],
      isFullList: [
        { text: '是否住满', value: null },
        { text: '全住满', value: 1 },
        { text: '未住满', value: 0 }
      ],
      searchForm: {
        status: null,
        dormType: null,
        isFull: null,
        searchValue: ''
      },
      dataList: [],
      isCheckAll: false, // 列表选中全部
      showMore: false, // 更多操作
      moreOpList: [
        { value: 'ts', label: '清空宿舍' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  created() {
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
        case 'qc':
          break
      }
      this.showMore = false
    },
    onSearch() {
      this.pgeIndex = 0
      this.pageTotal = 9999
      this.dataList = []
      this.loadData()
    },
    loadData() {
      this.PageIndex++;
      console.log(this.params)
      const dataList = []
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          dataList.push({
            isCheck: false,
            isShowMore: false,
            id: this.dataList.length + 1,
            dormInfo: '福大生活一区103栋108宿舍-A床',
            headName: '李四四',
            telephone: '18823412111',
            dormType: '学生宿舍',
            num: 6,
            aNum: 5
          });
        }
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(dataList)
        // 数据全部加载完成
        if (this.dataList.length >= 20) {
          this.$refs.listLayout.finished = true
        }
        // if (this.dataList.length < this.pageSize) {
        //     this.$refs.cardList.finished = true;
        //   }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.dorm-list{
  // .soa-list-total {
  //   .total-item {
  //     width: 50%;
  //   }
  // }
}
</style>
