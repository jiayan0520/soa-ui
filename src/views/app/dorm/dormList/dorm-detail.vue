<template>
  <div
    v-if="!loading"
    class="dorm-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        :value="`${data.dormData.userNum}/${data.dormData.totalNum}人`"
        title="人员信息"
        class="soa-collapse-item"
        name="1"
      >
        <div
          v-for="(item,index) in data.soaDormBeds"
          :key="index"
          class="soa-box-item people-item">
          <div @click="routerToBedDetail(item)">
            <div
              v-if="item.users"
              class="flex-between user-info">
              <img
                v-if="item.users.avatar"
                :src="item.users.avatar"
                class="soa-avatar" >
              <div
                v-else
                class="soa-avatar">{{ item.users.name.substr(-2,2) }}</div>
              <span>{{ item.users.name }}</span>
              <span class="c-ml10">({{ item.users.className||'未找到班级信息' }})</span>
            </div>
            <div
              v-else
              class="no-user-info">未分配</div>
            <div>
              {{ item.bedName }}
              <span class="c-light">床位</span>
              <span class="c-ml10 c-light">
                状态：
                <span :class="item.statusClass">{{ item.statusName }}</span>
              </span>
              <span
                v-if="item.users"
                class="c-ml10 c-info">{{ item.users.mobile }}</span>
            </div>
          </div>
          <div
            :style="`${data.soaDormBeds.length>2?'position:relative':'position:inherit'}`"
            class="soa-gengduo"
            @click.stop="bindMoreClick(index)"
          >
            <i class="soa-icon soa-icon-gengduo" />
            <ul
              v-if="showMoreIndex === index"
              class="soa-op__dropdown">
              <div
                v-for="btn in moreOpList"
                :key="btn.index">
                <li
                  v-if="showMoreOpItem(item,btn)"
                  @click.stop="clickMoreBtn(btn.value,item)"
                >{{ btn.label }}</li>
              </div>
            </ul>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item
        :value="`${checkList.length>0?'最后一次检查：'+checkList[0].checkTime:'无检查信息'}`"
        :class="{'soa-collapse-overflow':activeNames.includes('2')}"
        title="宿舍检查信息"
        class="soa-collapse-item"
        name="2"
        include
      >
        <van-list
          v-model="checkLoading"
          :finished="checkFinished"
          finished-text="没有更多了"
          @load="getResultList"
        >
          <div
            v-for="(item,index) in checkList"
            :key="index"
            class="check-item soa-box-item">
            <div
              class="flex-between"
              @click="showCheckDetail(item)">
              <div>
                <div class="time">{{ item.checkTime }}</div>
                <div class="c-info text-nowrap">结果：{{ item.inspectionResultsInfo }}</div>
              </div>
              <div>{{ item.score }}</div>
            </div>
            <div
              class="soa-gengduo"
              @click.stop="bindCheckMoreClick(index)">
              <i class="soa-icon soa-icon-gengduo" />
              <ul
                v-if="showCheckMoreIndex === index"
                class="soa-op__dropdown">
                <div
                  v-for="btn in moreOpCheckList"
                  :key="btn.index">
                  <li @click.stop="clickCheckMoreBtn(btn.value,item)">{{ btn.label }}</li>
                </div>
              </ul>
            </div>
          </div>
        </van-list>
      </van-collapse-item>
    </van-collapse>
    <div class="soa-btn-box">
      <van-button
        type="info"
        class="btn-op"
        @click="clickCheckBtn">新增检查</van-button>
    </div>
    <!--新建检查项-->
    <van-popup
      v-if="showCheckPopup"
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom"
    >
      <dorm-check
        :data="data"
        :dorm-id="id"
        :id="currentCheckId"
        :is-detail="isCheckDetail"
        type="DORM"
        @close="closeCheckPopop"
      />
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import dormCheck from '../components/check-common'
import { dormTypeEnum, statusList } from '../utils/dorm-enum'
import { getQuery } from '@/utils'
import bedMoreOp from '../mixins/bed-more-op'
import baseCheckList from '../mixins/base-check-list'
export default {
  name: 'DormDetail',
  components: {
    customPanel,
    dormCheck
  },
  mixins: [bedMoreOp, baseCheckList],
  // props: {
  //   id: {
  //     type: String,
  //     default: null
  //   }
  // },
  data() {
    return {
      id: null,
      loading: true,
      activeNames: [],
      showMoreIndex: -1, // 显示更多的行index
      data: {},
      fieldList: [
        { prop: 'buildingName', label: '楼栋' },
        { prop: 'dormName', label: '宿舍名称' },
        {
          prop: 'dormManager',
          label: '舍长',
          type: 'array',
          childrenFields: [
            { prop: 'name' },
            { prop: 'mobile', class: 'c-info' }]
        },
        {
          prop: 'containList',
          label: '容纳情况',
          type: 'array',
          childrenFields: [
            { prop: 'name' },
            { prop: 'num', class: 'c-info', unit: '人' }]
        },
        { prop: 'dormType', label: '宿舍类型' },
        { prop: 'singleFee', label: '宿舍费用', unit: '元/人/年' }
      ],
      apiMethod: 'getResultListByDormId',
      checkParams: { dormId: null }
    }
  },
  created() {
    this.id = getQuery('id')
    this.checkParams.dormId = this.id
    this.getDetail()
    this.againResultList()
  },
  methods: {
    // 获取详情
    getDetail() {
      this.$api.getDormDetail(this.id).then(data => {
        this.data = {
          ...data,
          dormManager: data.dormManager ? [data.dormManager] : [],
          containList: [
            { name: '可容纳人数：', num: data.dormData.totalNum },
            { name: '已容纳人数：', num: data.dormData.userNum },
            { name: '需激活人数：', num: (data.dormData.userNum - data.dormData.activationNum) },
            { name: '已激活人数：', num: data.dormData.activationNum, class: 'c-info' },
            { name: '请假人数：', num: data.dormData.leaveNum, class: 'c-danger' }
          ],
          dormType: dormTypeEnum[data.dormType].label,
          soaDormBeds: data.soaDormBeds.map(bed => {
            const statusObj = statusList.find(status => status.value === bed.status) || {}
            bed.statusName = statusObj.text
            bed.statusClass = statusObj.class
            return bed
          })
        }
        this.loading = false
      })
    },
    // 跳转到床位详情
    routerToBedDetail(item) {
      if (window.location.href.indexOf('qrcode') > -1) {
        this.$router.push('/bed-qrcode/bedDetail?id=' + item.id);
      } else {
        this.$router.push('/dorm/bedDetail?id=' + item.id);
      }
    }
  }
}
</script>

<style lang="scss">
.dorm-detail {
  width: 100%;
  overflow: auto;
  .van-collapse-item {
    .van-cell__title {
      flex: unset;
      width: 100px;
    }
  }
  .people-item {
    .soa-avatar {
      width: 32px;
      height: 32px;
      font-size: 12px;
      flex: unset;
    }
    .user-info {
      font-size: 16px;
    }
    .no-user-info {
      font-size: 16px;
      color: #909399;
    }
  }
}
</style>
