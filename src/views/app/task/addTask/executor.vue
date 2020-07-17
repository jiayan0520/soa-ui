<template>
  <div class="soa-task-executor">
    <div class="soa-task-checked-header">
      <van-search
        v-model="searchValue"
        shape="round"
        background="#ffffff"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="soa-task-checked-content">
      <van-cell>
        <van-checkbox
          v-model="checkedAll"
          @change="bindCheckAll">全选</van-checkbox>
      </van-cell>
      <van-checkbox-group
        ref="checkboxGroup"
        v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            :key="index"
            clickable
          >
            <van-row>
              <van-col
                span="18"
                @click="bindCheckedToggle(index)">
                <van-checkbox
                  ref="checkboxes"
                  :name="item.id">{{ item.title }}</van-checkbox>
              </van-col>
              <van-col span="6">
                <div class="soa-task-checked-more">
                  <van-row>
                    <van-col span="6"><span class="left-line"/></van-col>
                    <van-col
                      span="18"
                      @click="bindShowDropClick(item.id)"><van-icon
                        name="cluster-o"
                        size="18"
                        color="#1989FA"/>
                      <span class="ft18 t-info">下级</span>
                    </van-col>
                  </van-row>
                </div>
              </van-col>
            </van-row>
            <div
              v-if="showDropm===`active${item.id}`"
              class="soa-task-checked-child">
              <van-checkbox-group
                ref="checkChildboxGroup"
                v-model="childResult">
                <van-cell-group>
                  <van-cell
                    v-for="(items, idx) in item.list"
                    :key="items.id"
                    clickable
                    @click="ChildToggle(idx)"
                  >
                    <van-checkbox
                      ref="checkChildboxes"
                      :name="items">{{ items.name }}</van-checkbox>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
    <div class="soa-tsk-checked-bottom">
      <van-row>
        <van-col span="14">
          <div class="mt10 t-info">已选择:12人</div>
        </van-col>
        <van-col span="10">
          <van-button type="info">确定（14/100）</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Search, Button, Col, CellGroup, Cell, Row, Icon, Checkbox, CheckboxGroup } from 'vant';
export default {
  name: 'Executor',
  components: {
    [Search.name]: Search,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      searchValue: '',
      checkedAll: false,
      list: [
        { id: 1, title: '党政工作（14人）', list: [{ name: '陈某某', id: 1 }, { name: '刘某某', id: 2 }] },
        { id: 2, title: '教学工作（26人）', list: [] },
        { id: 3, title: '科研系所（106人）', list: [] }],
      result: [],
      childResult: [],
      showDropm: ''
    }
  },
  methods: {
    bindCheckedToggle(index) {
      this.$refs.checkboxes[index].toggle();
      console.log(this.result)
    },
    bindCheckAll(e) {
      console.log(e);
      if (e) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    },
    ChildToggle(index) {
      this.$refs.checkChildboxes[index].toggle();
    },
    bindShowDropClick(index) {
      if (this.showDropm === 'active' + index) {
        this.showDropm = ''
      } else {
        this.showDropm = 'active' + index;
      }
    }
  }
}
</script>

<style scoped>
.soa-task-checked-more .left-line{
  display: inline-block;
  border-left: 1px solid #F7F5FA;
  width: 10px;
  height: 20px;
}
  .soa-tsk-checked-bottom{
    position: fixed;
    bottom: 50px;
    width: 100%;
    border-top: 1px solid #F7F5FA;
    padding: 10px;
  }
</style>
