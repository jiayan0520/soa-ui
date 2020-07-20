<template>
  <div class="soa-dorm">
    <van-tabs
      v-model="active"
      title-active-color="#38A4F5"
      @click="onNavClick">
      <van-tab
        title="床位列表"
        name="1">
        <dorm-list />
      </van-tab>
      <van-tab
        title="宿舍列表"
        name="2" />
      <van-tab
        title="楼栋列表"
        name="3" />
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Button, List, Cell, Col, Row, Icon } from 'vant';
import dormList from './dormList/dorm-list'
export default {
  name: 'Index',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    dormList
  },
  data() {
    return {
      active: ''
    }
  },
  methods: {
    onNavClick() {
      console.log('navbar')
    },
    onSearch(searchValue) {
      console.log(searchValue)
    },
    bindMoreClick() {
      console.log('更多')
    },
    bindRoomClick() {
      this.$router.push('/dormitory-room')
    }
  }
}
</script>
<style lang="scss">
.soa-dorm {
  .van-tabs {
    padding-top: 45px;
  }
}
</style>
