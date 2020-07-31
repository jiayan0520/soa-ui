<template>
  <div class="dorm-unallocated">
    <list-layout
      ref="listLayout"
      :data-list="dataList"
      :title="'未分配人员'"
      @search="onSearch"
      @loadData="loadData"
    >
      <template slot="top" >
        <van-search
          v-model="searchValue"
          placeholder="姓名/学院名称/专业班级"
          @search="onSearch"
        />
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <img
          class="soa-avatar"
          src="../../../../assets/images/timg.jpg" >
        <div class="soa-list-item-content">
          <div>
            <span>{{ slotProps.item.userName }}</span>
            <span>（{{ slotProps.item.banji }}）</span>
          </div>
          <div class="c-light">
            {{ slotProps.item.jg }}
            <span class="c-info c-ml10">{{ slotProps.item.telephone }}</span>
          </div>
        </div>
        <van-button
          class="dorm-allocat-btn"
          type="info">分配</van-button>
      </template>
    </list-layout>
  </div>
</template>

<script>
import listLayout from '@/components/listLayout'
export default {
  name: 'DormUnallocated',
  components: {
    listLayout
  },
  data() {
    return {
      searchValue: null,
      dataList: []
    }
  },
  methods: {
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
            id: this.dataList.length + 1,
            userName: '张三峰',
            telephone: '18233422111',
            banji: '石油化工学院-2019级化工一班',
            jg: '福州市高兴区'
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
.dorm-unallocated {
  .dorm-allocat-btn {
    height: 30px;
  }
}
</style>
