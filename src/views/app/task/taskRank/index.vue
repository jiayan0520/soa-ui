<template>
  <div class="soa-task-rank">
    <van-tabs
      v-model="active"
      @click="onClick">
      <van-tab title="个人"/>
      <van-tab title="部门"/>
    </van-tabs>
    <van-grid
      :column-num="5"
      :border="false">
      <van-grid-item
        v-for="item in title"
        :key="item"
        :text="item"/>
    </van-grid>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="soa-task-rank-lists"
      @load="onLoad"
    >
      <van-grid
        v-for="item in list"
        :column-num="5"
        :border="false"
        :key="item.id">
        <van-grid-item
          v-for="itemIndex in item"
          :key="itemIndex"
          :text="itemIndex"/>
      </van-grid>
      <!-- <van-cell
        v-for="item in list"
        :key="item.index">
        <van-row>
          <van-col span="4">
            <div class="c-tc">{{ item.index }}</div>
          </van-col>
          <van-col span="5">
            <div class="c-tc">{{ item.name }}</div>
          </van-col>
          <van-col span="5"><div class="c-tc">{{ item.number }}</div></van-col>
          <van-col span="5"><div class="c-tc">{{ item.total }}</div></van-col>
          <van-col span="5"><div class="c-tc">{{ item.average }}</div></van-col>
        </van-row>
      </van-cell> -->
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'TaskRank',
  data() {
    return {
      active: 0,
      active1: 0,
      searchValue: '',
      list: [

      ],
      loading: false,
      finished: false,
      title: ['排名', '姓名', '完成数量', '总质量分', '平均质量分']
    }
  },
  methods: {
    onSearch(searchValue) {
      console.log(searchValue)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({ index: this.list.length + 1, name: '林好好', number: '90', total: '9900', average: '110.3' });
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
      this.loading = false
      this.list = []
      this.onLoad()
      console.log('onClick')
    }
  }
}
</script>

<style scoped>
</style>
