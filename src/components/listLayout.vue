<template>
  <div class="soa-list-container">
    <div
      v-if="title"
      class="tool-bar">
      <h3>{{ title }}</h3>
      <van-button
        v-if="opLabel"
        type="warning"
        @click="handleOperator">{{ opLabel }}</van-button>
    </div>
    <section
      v-if="$slots.top"
      class="soa-list-container-top">
      <slot name="top" />
    </section>
    <van-pull-refresh
      v-model="refreshing"
      :class="{'soa-refresh__loading':refreshing}"
      :disabled="disableRefresh"
      @refresh="onRefresh"
    >
      <div class="soa-list-refresh">
        <slot name="refresh-top" />
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          class="soa-list-main"
          @load="loadData"
        >
          <van-row
            v-for="(item,index) in dataList"
            :key="index"
            class="soa-list-item"
            @click="handleClick(item)"
          >
            <div
              v-show="isShowBar"
              class="soa-list-item-checkbox">
              <van-checkbox
                v-model="item.isCheck"
                shape="square"
                @click="changeItemCheck(item)" />
            </div>
            <div class="soa-list-item-main">
              <slot
                :item="item"
                :index="index"
                name="item-content" />
              <i
                v-if="moreOpList"
                class="soa-icon soa-icon-gengduo"
                @click.stop="bindMoreClick(index)"
              />
              <ul
                v-if="showMoreIndex === index"
                class="soa-op__dropdown">
                <li
                  v-for="btn in moreOpList"
                  :key="btn.index"
                  @click.stop="clickMoreBtn(btn.value,item)"
                >{{ btn.label }}</li>
              </ul>
            </div>
          </van-row>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'ListLayout',
  props: {
    /**
     * 表单title
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * 操作按钮
     */
    opLabel: {
      type: String,
      default: ''
    },
    /**
     * 更多操作按钮
     */
    moreOpList: {
      type: Array,
      default: () => []
    },
    /**
     * 列表数据
     */
    dataList: {
      type: Array,
      default: () => []
    },
    /**
     * 详情路由
     */
    detailUrl: {
      type: String,
      default: ''
    },
    /**
     * 是否展示checkbox框
     */
    isShowBar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      refreshing: false, // 下拉刷新状态
      disableRefresh: false, // 禁用刷新
      loading: false,
      finished: false,
      showMore: false, // 更多操作
      showMoreIndex: -1 // 第几项的更多操作
    }
  },
  created() {
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.showMoreIndex === -1
      setTimeout(() => {
        this.refreshing = false
        this.$emit('search')
      }, 500)
    },
    // 加载数据
    loadData() {
      this.showMoreIndex === -1
      this.$emit('loadData')
    },
    // 行复选框点击
    changeItemCheck(item) {
      item.isCheck = !item.isCheck
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
      this.$emit('clickMoreBtn', val, item)
      this.showMoreIndex = -1
    },
    // 点击行进入详情页
    handleClick(item) {
      console.log('handleClick', item, this.detailUrl)
      const id = item.id
      this.$router.push({
        path: this.detailUrl,
        query: { id }
      })
    },
    // 管理操作按钮
    handleOperator() {
      this.$emit('clickOperator')
    }
  }
}
</script>

<style lang="scss">
.soa-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  .soa-list-container-top {
    width: 100%;
  }
  .tool-bar {
    // position: absolute;
    // top: 0;
    height: 50px;
    line-height: 50px;
    width: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px solid #f5f5f5;
  }
  .search-bar {
    z-index: 10;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    .van-icon {
      display: flex;
      align-items: center;
      margin: 0 6px;
    }
  }
  .van-pull-refresh {
    height: 100%;
    user-select: none;
    .van-pull-refresh__track {
      height: 100%;
      .van-pull-refresh__head {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .soa-list-refresh {
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        .soa-list-total {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          background: #f2f2f2;
          padding: 10px 5px;
          margin: 8px 0 12px 0;
          .total-item {
            margin: 0 10px;
          }
        }
        .soa-list-main {
          height: 100%;
          .soa-list-item {
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            .soa-list-item-checkbox {
              display: flex;
              justify-content: center;
              margin-right: 10px;
              width: 20px;
            }
            .soa-list-item-main {
              flex: 1;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: relative;
              .soa-list-item-content {
                flex: 1;
                // .item-row {
                //   display: flex;
                //   justify-content: space-between;
                //   align-items: center;
                // }
              }
            }
          }
        }
      }
    }
  }
}
</style>
