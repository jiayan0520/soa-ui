<template>
  <div
    v-if="!loading"
    class="bed-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <custom-panel
      v-if="isOnlyCheck==='0'"
      :data="data"
      :field-list="fieldList2" />
    <div v-if="data.users">
      <custom-panel
        v-if="isOnlyCheck==='0'"
        :data="data"
        :field-list="userFieldList" />
      <van-collapse v-model="activeNames">
        <van-collapse-item
          :value="`${checkList.length>0?'最后一次检查：'+checkList[0].checkTime:'无检查信息'}`"
          class="soa-collapse-item soa-collapse-overflow"
          title="床位检查信息"
          name="1"
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
                  <div class="time">
                    {{ item.checkTime }}
                    <span v-if="item.parentId">(宿舍检查)</span>
                  </div>
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
          @click="clickCheckBtn">新增检查</van-button>
      </div>
    </div>
    <!--新建检查项-->
    <van-popup
      v-if="showCheckPopup"
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom"
    >
      <bed-check
        :data="data"
        :dorm-id="data.dormId"
        :user-id="data.userId"
        :bed-id="id"
        :id="currentCheckId"
        :is-detail="isCheckDetail"
        :has-parent="hasParent"
        type="BED"
        @close="closeCheckPopop"
      />
    </van-popup>
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import bedCheck from '../components/check-common'
import { getQuery } from '@/utils'
import baseCheckList from '../mixins/base-check-list'
import { statusList } from '../utils/dorm-enum'
export default {
  name: 'BedDetail',
  components: {
    bedCheck,
    customPanel
  },
  mixins: [baseCheckList],
  // props: {
  //   id: {
  //     type: String,
  //     default: null
  //   }
  // },
  data() {
    return {
      id: null,
      data: {},
      loading: true,
      apiMethod: 'getResultListByUserId',
      checkParams: { userId: null },
      hasExchange: true,
      isOnlyCheck: '0', // 是否只检查，是不用展示那么多信息，卫生员扫码的时候的检查
      activeNames: [],
      fieldList: [
        { prop: 'buildingName', label: '楼栋' },
        { prop: 'dormName', label: '宿舍名称' },
        { prop: 'bedName', label: '床位' }
      ],
      fieldList2: [{ prop: 'singleFee', label: '宿舍费用', unit: '元/人/年' }],
      userFieldList: [
        { prop: 'name', label: '姓名' },
        { prop: 'isDormManagerText', label: '是否舍长' },
        { prop: 'statusName', label: '状态' },
        { prop: 'jobNumber', label: '学号' },
        { prop: 'mobile', label: '电话' },
        // { prop: 'zzmm', label: '政治面貌' },
        { prop: 'fullDeptNames', label: '学院专业' },
        // { prop: 'place', label: '籍贯' },
        // { prop: 'address', label: '家庭住址' },
        {
          prop: 'instructorList',
          label: '辅导员',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        {
          prop: 'buildingManagers',
          label: '楼管',
          type: 'array',
          childrenFields: [
            { prop: 'realName' },
            { prop: 'phone', class: 'c-info' }]
        },
        {
          prop: 'maintenanceWorkers',
          label: '维修人员',
          type: 'array',
          childrenFields: [
            { prop: 'realName' },
            { prop: 'phone', class: 'c-info' }]
        }
        // {
        //   prop: 'parentList',
        //   label: '家长信息',
        //   type: 'array',
        //   childrenFields: [
        //     { prop: 'userName' },
        //     { prop: 'grade' },
        //     { prop: 'telephone', class: 'c-info' }]
        // }
      ]
    }
  },
  created() {
    this.id = getQuery('id')
    this.getDetail()
    this.isOnlyCheck = getQuery('isOnlyCheck') || '0'
  },
  methods: {
    // 获取详情
    getDetail() {
      this.$api.getBedDetail(this.id).then(data => {
        if (data.users) {
          const statusObj = statusList.find(status => status.value === data.status)
          data.statusName = statusObj ? statusObj.text : data.status
          data.users.fullDeptNames = data.users.fullDeptNames.replace('[', '').replace(']', '').split(', ').join('-')
        }
        this.data = {
          ...data,
          ...data.users,
          isDormManagerText: data.isDormManager ? '是' : '否',
          instructorList: []
        }
        if (this.data.users) {
          this.checkParams.userId = this.data.userId
          this.againResultList()
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
.bed-detail {
  width: 100%;
  overflow: auto;
}
</style>
