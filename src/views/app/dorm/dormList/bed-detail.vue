<template>
  <div class="soa-dorm-detail soa-bed-detail">
    <van-cell-group>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">宿舍名称：</van-col>
          <van-col
            span="19"
            class="t-light">{{ data.dormName }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">姓名：</van-col>
          <van-col
            span="19"
            class="t-light">{{ data.userName }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">床位：</van-col>
          <van-col
            span="19"
            class="t-light">{{ data.bedName }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">状态：</van-col>
          <van-col
            class="t-light"
            span="19">{{ data.statusName }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">学号：</van-col>
          <van-col
            class="t-light"
            span="19">{{ data.sno }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">电话：</van-col>
          <van-col
            class="t-info"
            span="19">{{ data.telephone }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">政治面貌：</van-col>
          <van-col
            class="t-light"
            span="19">{{ data.zzmm }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">学院专业：</van-col>
          <van-col
            class="t-light"
            span="19">{{ data.college }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">籍贯：</van-col>
          <van-col
            class="t-light"
            span="19">{{ data.place }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">家庭住址：</van-col>
          <van-col
            class="t-light"
            span="19">{{ data.address }}</van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">辅导员：</van-col>
          <van-col
            class="t-light"
            span="19">
            <div
              v-for="(item,index) in data.instructorList"
              :key="index">
              {{ item.userName }}
              <span class="t-info ml10">{{ item.telephone }}</span>
            </div>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">家长信息：</van-col>
          <van-col
            class="t-light"
            span="19">
            <div
              v-for="(item,index) in data.parentList"
              :key="index">
              {{ item.userName }}
              <span class="t-info ml10">{{ item.telephone }}</span>
            </div>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col
            class="label"
            span="5">宿舍费用：</van-col>
          <van-col
            class="t-light"
            span="19">{{ data.cost }}</van-col>
        </van-row>
      </van-cell>
      <van-collapse v-model="activeNames">
        <van-collapse-item
          :value="`最后一次检查：${data.bedCheckInfos[0].time}`"
          title="床位检查信息："
          name="1">
          <div
            v-for="(item,index) in data.bedCheckInfos"
            :key="index"
            class="check-item">
            <div class="check-item-left">
              <div class="time">{{ item.time }}</div>
              <div class="t-info">结果：{{ item.checkResult }}</div>
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
          <div class="check-btn">
            <van-button
              type="info"
              class="btn-op">新增检查</van-button>
          </div>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
    <!--新建检查项-->
    <van-popup
      v-model="showCheckPopup"
      :style="{ height: '100%' }"
      closeable
      position="bottom" />
  </div>
</template>

<script>
export default {
  name: 'BedDetail',
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
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/mixins/mixins.scss";
.soa-bed-detail {
  width: 100%;
  overflow: auto;
  .van-cell-group {
    width: 100%;
    .label {
      text-align: right;
      white-space: nowrap;
    }
    .van-collapse-item {
      .van-cell__title {
        flex: unset;
        width: 100px;
      }
    }
    .check-item {
      @include base-between;
      padding: 5px;
      margin-bottom: 5px;
      background: #f2f2f2;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      .check-item-left {
        flex: 1;
        .time {
          color: #000;
        }
      }
      .check-item-grade {
        width: 10%;
      }
    }
    .check-btn {
      text-align: center;
    }
  }
}
</style>
