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
          <div>
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
            class="soa-gengduo"
            @click.stop="bindMoreClick(index)">
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
        :value="`最后一次检查：${checkList.length>0&&checkList[0].checkTime}`"
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
            <div class="flex-between">
              <div>
                <div class="time">{{ item.checkTime }}</div>
                <div class="c-info">结果：{{ item.inspectionResultsInfo }}</div>
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
import { Dialog, Toast } from 'vant'
import { getQuery } from '@/utils'
import bedMoreOp from '../mixins/bed-more-op'
export default {
  name: 'DormDetail',
  components: {
    customPanel,
    dormCheck
  },
  mixins: [bedMoreOp],
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
      showCheckMoreIndex: -1, // 显示更多的行index
      showCheckPopup: false,
      moreOpCheckList: [
        { value: 'edit', label: '编辑' },
        { value: 'del', label: '删除' }
      ],
      checkLoading: false,
      checkFinished: false,
      pageNum: 0,
      pageSize: 5,
      checkList: [],
      currentCheckId: null // 检查对象id
    }
  },
  computed: {
    system() {
      return this.$store.getters['core/system']
    }
  },
  created() {
    this.id = getQuery('id')
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
          dormManager: data.dormManager ? [data.dormManager] : [],
          containList: [
            { name: '可容纳人数：', num: data.dormData.totalNum },
            { name: '已容纳人数：', num: data.dormData.userNum },
            { name: '需激活人数：', num: (data.dormData.userNum - data.dormData.activationNum) },
            { name: '已激活人数：', num: data.dormData.activationNum, class: 'c-info' },
            { name: '请假人数：', num: data.dormData.leaveNum, class: 'c-danger' }
          ],
          dormType: dormTypeEnum[data.dormType].label,
          singleFee: data.singleFee,
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
    // 检查项新增修改，删除时重新刷
    againResultList() {
      this.checkList = []
      this.pageNum = 0
      this.checkLoading = true
      this.getResultList()
    },
    // 获取宿舍检查列表
    getResultList() {
      if (this.checkLoading) {
        this.showMoreIndex = -1
        this.showCheckMoreIndex = -1
        this.pageNum++
        this.$api.getResultListByDormId({ dormId: this.id, pageNum: this.pageNum, pageSize: this.pageSize }).then(data => {
          console.log(data.rows)
          this.checkList = this.checkList.concat(data.rows)
          // 加载状态结束
          this.checkLoading = false
          // 数据全部加载完成
          if (this.checkList.length >= data.total) {
            this.checkFinished = true
          }
        })
      }
    },
    // 检查项更多操作
    bindCheckMoreClick(index) {
      this.showMoreIndex = -1
      this.showCheckMoreIndex = this.showCheckMoreIndex === index ? -1 : index
    },
    // 检查项点击更多操作按钮了
    clickCheckMoreBtn(val, item) {
      switch (val) {
        case 'edit':
          this.currentCheckId = item.id
          this.showCheckPopup = true
          break
        case 'del':
          Dialog.confirm({
            title: `确认删除？`,
            message: `确定删除该检查项，删除的数据无法恢复`
          }).then(() => {
            this.$api.deleteResult(item.id).then(res => {
              Toast(`删除成功！`);
              this.againResultList()
            }).catch(error => {
              Toast(`删除失败！` + error);
            })
          })

          break
      }
      this.showMoreIndex = -1
    },
    // 新增宿舍检查
    clickCheckBtn() {
      this.currentCheckId = null
      this.showCheckPopup = true
    },
    // 关闭检查项的弹框
    closeCheckPopop(flag) {
      flag && this.againResultList()
      this.showCheckPopup = false
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
