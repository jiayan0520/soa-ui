<template>
  <div>
    <van-nav-bar
      title="宿舍号信息"
      left-text=""
      left-arrow
      @click-left="onClickBack"
    />
    <van-cell>
      <van-row>
        <van-col
          span="2"
          class="soa-dorm-img">
          <img
            src="../../../../assets/images/house.png"
            alt="">
        </van-col>
        <van-col span="18">
          <van-row>
            <van-col span="18">
              <div>101宿舍 <span class="ml20">王新强</span></div>
            </van-col>
            <van-col span="6"><span>学生宿舍</span></van-col>
          </van-row>
          <div>人数：6/6 <span class="t-warm ml20">激活：5/6</span></div>
        </van-col>
        <van-col span="4">
          <div class="soa-dorm-list-more">
            <van-row>
              <van-col span="12">
                <span
                  class="soa-icon soa-icon-gengduo"
                  @click="bindMoreClick"/>
              </van-col>
              <van-col span="12"><van-icon name="arrow-down" /></van-col>
            </van-row>

          </div>
        </van-col>
      </van-row>
    </van-cell>
    <van-cell>
      <van-row>
        <van-col span="20">
          <van-row>
            <van-col span="18">
              <div>101宿舍 <span class="ml20">王新强</span></div>
            </van-col>
            <van-col span="6"><span>教师宿舍</span></van-col>
          </van-row>
          <div>人数：4/4 <span class=" ml20">激活：4/4</span></div>
        </van-col>
        <van-col span="4">
          <div class="soa-dorm-list-more">
            <van-row>
              <van-col span="12">
                <span
                  class="soa-icon soa-icon-gengduo"
                  @click="bindMoreClick"/>
              </van-col>
              <van-col span="12"><van-icon name="arrow-down" /></van-col>
            </van-row>

          </div>
        </van-col>
      </van-row>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'Room',
  methods: {
    onClickBack() {
      this.$router.go(-1)
    },
    bindMoreClick() {
      console.log('细节')
    }
  }
}
</script>

<style scoped>
.soa-dorm-list-more{margin-top: 12px;}
    .soa-dorm-img img{
        width: 40px;
        height: 40px;
    }
</style>
