<template>
  <div class="dorm-check-list">
    <list-layout
      ref="listLayout"
      :data-list="dataList"
      :title="'检查信息统计'"
      :more-op-list="moreOpList"
      detail-url="/dorm/bedDetail"
      op-label="导出数据"
      @search="onSearch"
      @loadData="loadData"
      @clickOperator="expontData"
      @clickMoreBtn="clickMoreBtn"
    >
      <template slot="top">
        <div class="soa-list__search">
          <div
            class="title"
            @click="bindSearchClick">
            搜索条件
            <span class="arrow-down" />
          </div>
          <div
            v-if="showSearch"
            class="content">
            <van-form @submit="onSearch">
              <van-field
                v-model="searchForm.floorName"
                name="楼栋名称"
                label="楼栋名称"
                placeholder="楼栋名称" />
              <van-field
                v-model="searchForm.dormName"
                name="宿舍号"
                label="宿舍号"
                placeholder="宿舍号" />
              <van-field
                v-if="active===0"
                v-model="searchForm.userName"
                name="姓名"
                label="姓名"
                placeholder="姓名" />
              <van-field
                center
                label="检查时间起">
                <template #input>
                  <date-picker
                    v-model="searchForm.startTime"
                    :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
                    :editable="false"
                    :not-before="minDate"
                    :clearable="false"
                    type="datetime"
                    value-type="format"
                    format="YYYY-MM-DD HH:mm"
                    placeholder="请选择检查时间"
                    append-to-body
                  />
                </template>
              </van-field>
              <van-field
                center
                label="检查时间结">
                <template #input>
                  <date-picker
                    v-model="searchForm.endTime"
                    :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
                    :editable="false"
                    :not-before="minDate"
                    :clearable="false"
                    type="datetime"
                    value-type="format"
                    format="YYYY-MM-DD HH:mm"
                    placeholder="请选择检查时间"
                    append-to-body
                  />
                </template>
              </van-field>
              <van-field
                v-if="active===0"
                v-model="searchForm.xy"
                name="学院名称"
                label="学院名称"
                placeholder="学院名称" />
              <van-field
                v-if="active===0"
                v-model="searchForm.zybj"
                name="专业班级"
                label="专业班级"
                placeholder="专业班级" />
              <div class="soa-btn-box">
                <van-button
                  type="default"
                  native-type="submit">重置</van-button>
                <van-button
                  type="info"
                  native-type="submit">提交</van-button>
              </div>
            </van-form>
          </div>
        </div>
        <van-tabs
          v-model="active"
          @click="onSearch">
          <van-tab title="学生" />
          <van-tab title="宿舍" />
        </van-tabs>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <img
          v-if="active===0"
          class="soa-avatar"
          src="../../../../assets/images/timg.jpg" >
        <div
          v-if="active===0"
          class="soa-list-item-content">
          <div>
            <span>{{ slotProps.item.userName }}</span>
            <span>（{{ slotProps.item.banji }}）</span>
          </div>
          <div>{{ slotProps.item.dormName }}</div>
          <div class="c-light">
            结果： {{ slotProps.item.checkResult }}
            <span class="c-ml10">{{ slotProps.item.time }}</span>
          </div>
        </div>
        <div
          v-if="active===1"
          class="soa-list-item-content">
          <div>
            {{ slotProps.item.dormName }}
          </div>
          <div class="c-light">
            结果： {{ slotProps.item.checkResult }}
            <span class="c-ml10">{{ slotProps.item.time }}</span>
          </div>
        </div>
      </template>
    </list-layout>
    <!--宿舍检查修改弹框-->
    <van-popup
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <check-common
        :type="'dorm'"
        :data="currentDrom" />
    </van-popup>
    <!--床位检查修改弹框-->
    <van-popup
      v-model="showCheckBedPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <check-common :data="currentBed" />
    </van-popup>
  </div>
</template>

<script>
import listLayout from '@/components/listLayout'
import DatePicker from 'vue2-datepicker'
import checkCommon from '../components/check-common'
export default {
  name: 'DormCheckList',
  components: {
    listLayout,
    DatePicker,
    checkCommon
  },
  data() {
    return {
      active: 0,
      searchValue: null,
      dataList: [],
      showSearch: false,
      minDate: '',
      searchForm: {
        floorName: '',
        dormName: '',
        userName: null,
        startTime: null,
        endTime: null,
        xy: null,
        zybj: null
      },
      moreOpList: [
        { value: 'edit', label: '编辑' },
        { value: 'del', label: '删除' }
      ],
      showCheckPopup: false,
      showCheckBedPopup: false,
      currentDrom: null, // 选中编辑的宿舍检查项
      currentBed: null // 选中床位编辑检查
    }
  },
  methods: {
    onSearch() {
      console.log(this.active)
      this.pageIndex = 0
      this.pageTotal = 9999
      this.dataList = []
      this.loadData()
    },
    loadData() {
      this.pageIndex++;
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
            dormName: '福大生活1区1号楼-601',
            checkResult: '宿舍干净整洁',
            time: '2020年08月20日 18:00'
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
    },
    // 条件搜索
    bindSearchClick() {
      this.showSearch = !this.showSearch
    },
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      if (this.active === 0) {
        // 床位操作项
        switch (val) {
          case 'edit': {
            this.currentBed = item
            this.showCheckBedPopup = true
            break
          }
          default:
            break
        }
      } else {
        switch (val) {
          case 'edit':
            this.currentDrom = item
            this.showCheckPopup = true
            break
          default:
            break
        }
      }
      this.showMore = false
    },
    // 导出数据
    expontData() {
    }
  }
}
</script>

<style lang="scss">
.dorm-check-list {
}
</style>
