<template>
  <div class="soa-dorm">
    <van-tabs v-model="active">
      <van-tab
        title="床位列表"
        name="1">
        <bed-list />
      </van-tab>
      <van-tab
        title="宿舍列表"
        name="2">
        <dorm-list />
      </van-tab>
      <van-tab
        title="楼栋列表"
        name="3">
        <building-list />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import dormList from './dormList/dorm-list'
import bedList from './bedList/bed-list'
import buildingList from './buildingList/building-list'
import { getQuery } from '@/utils/index.js'
export default {
  name: 'Dorm',
  components: {
    dormList,
    bedList,
    buildingList
  },
  data() {
    return {
      active: '1'
    }
  },
  created() {
    this.active = getQuery('active') || '1'
  },
  methods: {
  }
}
</script>
<style lang="scss">
.soa-dorm {
  .van-tabs {
    height: 100%;
    width: 100%;
    height: calc(100% - 50px);
    padding-top: 50px;
    .van-tabs__content {
      height: calc(100% - 44px);
      & .tool-bar {
        position: absolute;
        top: 0;
      }
      .van-tab__pane {
        height: 100%;
      }
    }
  }
}
</style>
