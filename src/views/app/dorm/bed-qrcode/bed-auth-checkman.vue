<template>
  <div
    v-if="!loading"
    class="bed-auth-checkman">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <van-collapse
      v-if="data.dormData"
      v-model="activeNames">
      <van-collapse-item
        :value="`${data.dormData.userNum}/${data.dormData.totalNum}人`"
        title="人员信息"
        name="1"
      >
        <div
          v-for="(item,index) in data.soaDormBeds"
          :key="index"
          class="soa-box-item">
          <div>
            <div style="color: #323233;">{{ item.bedName }}床</div>
            <div>
              <span>
                状态：
                <span :class="item.statusClass">{{ item.statusName }}</span>
              </span>
              <span
                v-if="item.users"
                class="c-light">最后一次检查：{{ item.lastCheckTime }}</span>
            </div>
          </div>
          <van-button
            v-if="item.users"
            class="soa-list-right-btn"
            type="info"
            @click="clickCheckDed(item)"
          >检查</van-button>
        </div>
      </van-collapse-item>
      <van-collapse-item
        :value="`${checkList.length>0?'最后一次检查：'+checkList[0].checkTime:'无检查信息'}`"
        :class="{'soa-collapse-overflow':activeNames.includes('2')}"
        title="宿舍检查信息"
        class="soa-collapse-item soa-collapse-overflow"
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
import { getQuery } from '@/utils'
import baseCheckList from '../mixins/base-check-list'
import { statusList } from '../utils/dorm-enum'
import dayjs from 'dayjs';
export default {
  name: 'BeaAuthCheckman',
  components: {
    customPanel,
    dormCheck
  },
  mixins: [baseCheckList],
  data() {
    return {
      loading: true,
      activeNames: [],
      showMoreIndex: -1, // 显示更多的行index
      data: {},
      fieldList: [
        { prop: 'dormName', label: '宿舍名称' }
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
          dormData: data.dormData,
          dormName: data.buildingName + '-' + data.dormName,
          soaDormBeds: data.soaDormBeds.map(bed => {
            const statusObj = statusList.find(status => status.value === bed.status) || {}
            bed.statusName = bed.userId ? statusObj.text : '未分配'
            bed.statusClass = bed.userId ? statusObj.class : ''
            bed.lastCheckTime = dayjs(bed.lastCheckTime).format('YYYY年MM月DD日 HH:mm')
            return bed
          })
        }
        console.log(this.data)
        this.loading = false
      })
    },
    // 更多操作
    bindMoreClick(index) {
      this.showMoreIndex = this.showMoreIndex === index ? -1 : index
      console.log(this.showMoreIndex)
    },
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      switch (val) {
        case 'qc':
          break
      }
      this.showMoreIndex = -1
    },
    // 新增宿舍检查
    clickCheckDed(item) {
      this.$router.push('/bed-qrcode/bedDetail?id=' + item.id + '&isOnlyCheck=1');
    }
  }
}
</script>

<style lang="scss">
.bed-auth-checkman {
  width: 100%;
  overflow: auto;
}
</style>
