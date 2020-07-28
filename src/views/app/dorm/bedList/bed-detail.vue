<template>
  <div class="soa-dorm-detail soa-bed-detail">
    <custom-cell
      :value="data.dormName"
      title="宿舍名称" />
    <custom-cell
      :value="data.userName"
      title="姓名" />
    <custom-cell
      :value="data.bedName"
      title="床位" />
    <custom-cell
      :value="data.statusName"
      title="状态" />
    <custom-cell
      :value="data.sno"
      title="学号" />
    <custom-cell
      :value="data.statusName"
      title="电话" />
    <custom-cell
      :value="data.zzmm"
      title="政治面貌" />
    <custom-cell
      :value="data.college"
      title="学院专业" />
    <custom-cell
      :value="data.place"
      title="籍贯" />
    <custom-cell
      :value="data.address"
      title="家庭住址" />
    <custom-cell
      :value="data.college"
      title="学院专业" />
    <custom-cell title="辅导员">
      <template slot="value">
        <div
          v-for="(item,index) in data.instructorList"
          :key="index">
          {{ item.userName }}
          <span class="c-info c-ml10">{{ item.telephone }}</span>
        </div>
      </template>
    </custom-cell>
    <custom-cell title="家长信息">
      <template slot="value">
        <div
          v-for="(item,index) in data.parentList"
          :key="index">
          {{ item.userName }}
          <span class="c-ml10">{{ item.role }}</span>
          <span class="c-info c-ml10">{{ item.telephone }}</span>
        </div>
      </template>
    </custom-cell>
    <custom-cell
      :value="data.cost"
      title="宿舍费用" />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        :value="`最后一次检查：${data.bedCheckInfos[0].time}`"
        title="床位检查信息"
        name="1">
        <div
          v-for="(item,index) in data.bedCheckInfos"
          :key="index"
          class="check-item soa-box-item"
        >
          <div class="check-item-left">
            <div class="time">{{ item.time }}</div>
            <div class="c-info">结果：{{ item.checkResult }}</div>
          </div>
          <div class="check-item-grade">{{ item.grade }}</div>
          <i
            class="soa-icon soa-icon-gengduo"
            @click.stop="bindMoreClick(index)" />
          <ul
            v-if="showMoreIndex === index"
            class="soa-op__dropdown">
            <li
              v-for="btn in moreOpList"
              :key="btn.index"
              @click.stop="clickMoreBtn(btn.value)"
            >{{ btn.label }}</li>
          </ul>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div class="soa-btn-box">
      <van-button
        type="info"
        @click="clickCheckBtn">新增检查</van-button>
    </div>
    <!--新建检查项-->
    <van-popup
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <bed-check />
    </van-popup>
  </div>
</template>

<script>
import customCell from '@/components/customCell'
import bedCheck from './bed-check'
export default {
  name: 'BedDetail',
  components: {
    bedCheck,
    customCell
  },
  data() {
    return {
      activeNames: [],
      showMoreIndex: -1, // 显示更多的行index
      showCheckPopup: false,
      data: {
        dormName: '福大生活1区1号楼-601',
        userName: '李荣浩',
        bedName: '1号',
        statusName: '正常',
        sno: '12312312312',
        telephone: '15874214741',
        zzmm: '党员',
        college: '石油化工学院-2019级过控一班',
        place: '福建省福州市',
        address: '福建省福州市闽侯县科技路一号',
        instructorList: [{ userName: '杨荣发', telephone: '14777777747' }, { userName: '杨荣', telephone: '14777777747' }],
        parentList: [{ userName: '李国强', telephone: '14777777747', role: '父亲' }, { userName: '张秀哈', telephone: '14777777747', role: '母亲' }],
        cost: '900元/人/年',
        bedCheckInfos: [
          { checkResult: '桌面脏乱', grade: -10, time: '2020年6月28日 20:01' },
          { checkResult: '被子没叠', grade: -20, time: '2020年6月28日 20:01' },
          { checkResult: '非常好', grade: 20, time: '2020年6月28日 20:01' }
        ]
      },
      moreOpList: [
        { value: 'edit', label: '编辑' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  methods: {
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
    // 新增床位检查
    clickCheckBtn() {
      this.showCheckPopup = true
    }
  }
}
</script>

<style lang="scss">
.soa-bed-detail {
  width: 100%;
  overflow: auto;
  .van-collapse-item {
    .van-cell__title {
      flex: unset;
      width: 100px;
    }
  }
}
</style>
