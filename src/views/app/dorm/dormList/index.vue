<template>
  <div class="soa-dorm-list">
    <van-row>
      <van-col span="12"><div class="mt10 fwb ft20">任务列表</div></van-col>
      <van-col span="12">
        <div class="tr fwb">
          <van-button
            class="soa-task-list-accounts"
            size="normal"
            type="warning"
            native-type="submit">
            任务结算
          </van-button>
        </div>
      </van-col>
    </van-row>

    <van-search
      v-model="searchValue"
      show-action
      label="任务内容"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
  </div>
</template>

<script>
import { Search, Tab, Tabs, Button, List, Cell, Col, Row, Icon } from 'vant';
export default {
  name: 'Index',
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
      searchValue: ''
    }
  },
  methods: {
    onSearch(searchValue) {
      console.log(searchValue)
    }
  }
}
</script>

<style scoped>

</style>
