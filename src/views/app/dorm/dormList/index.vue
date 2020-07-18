<template>
  <div>
    <van-row>
      <van-col span="12"><div class="mt10 fwb ft20">宿舍楼列表</div></van-col>
      <van-col span="12">
        <div class="tr fwb">
          <van-button
            class="soa-task-list-accounts"
            size="normal"
            type="warning"
            native-type="submit">
            管理
          </van-button>
        </div>
      </van-col>
    </van-row>
    <van-tabs
      v-model="active"
      title-active-color="#38A4F5"
      @click="onNavClick">
      <van-tab
        title="床位列表"
        name="1"/>
      <van-tab
        title="宿舍列表"
        name="2"/>
      <van-tab
        title="楼栋列表"
        name="3"/>
    </van-tabs>

    <div class="soa-dorm-list">
      <van-row>
        <van-col span="4">
          <img
            src="../../../../assets/images/timg.jpg"
            alt="">
        </van-col>
        <van-col span="16">
          <div class="mt5">福大生活1区1号楼 <span class="t-light ml10">林雅黑</span></div>
          <div class="t-light">
            人数：120/240 <span class="t-warm ml10">激活：89/120</span>
          </div>
        </van-col>
        <van-col span="4">
          <div class="soa-dorm-list-more">
            <van-row>
              <van-col span="12">
                <span
                  class="soa-icon soa-icon-gengduo"
                  @click="bindMoreClick"/>
              </van-col>
              <van-col span="12"><van-icon
                name="arrow"
                @click="bindRoomClick"/></van-col>
            </van-row>

          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Button, List, Cell, Col, Row, Icon } from 'vant';
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
    [Icon.name]: Icon
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
      this.$router.push('/dorm-room')
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
  .soa-dorm-list{
    padding: 10px;
    background: #F2F2F2;
    border-radius: 10px;
    margin: 10px 0;
  }
 .soa-dorm-list img{
   width: 50px;
   height: 50px;
   border-radius: 50%;
 }
  .mt5{margin-top: 5px;}
  .soa-dorm-list-more{margin-top: 12px;}
</style>
