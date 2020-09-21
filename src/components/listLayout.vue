<template>
  <div class="soa-list-container">
    <div
      v-if="title"
      class="tool-bar">
      <h3>{{ title }}</h3>
      <van-button
        v-if="opLabel"
        class="btn-op"
        type="warning"
        @click="handleOperator">{{ opLabel }}</van-button>
      <slot name="tool-bar-left" />
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
            class="soa-list-item">
            <div
              v-show="isShowBar"
              class="soa-list-item-checkbox">
              <van-checkbox
                v-model="item.isCheck"
                shape="square"
                @click.native="changeRowCheckbox(item)"
              />
            </div>
            <div
              class="soa-list-item-main"
              @click.stop="handleRowClick(item)">
              <slot
                :item="item"
                :index="index"
                name="item-content" />
              <div
                v-if="moreOpList.length"
                class="soa-gengduo"
                @click.stop="bindMoreClick(index)">
                <i :class="['soa-icon',showOpIcon(item) &&'soa-icon-gengduo']" />
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
    // 控制是否显示按钮
    showMoreOpItem(item, btn) {
      let isShow = true
      const allowStatus = btn.allowStatus
      allowStatus && Reflect.ownKeys(allowStatus).forEach(function (key) {
        if (!(item[key] && allowStatus[key].includes(item[key]))) { isShow = false }
      });
      if (this.$listeners['showMoreOpItem']) {
        this.$emit('showMoreOpItem', item, btn, (show) => {
          isShow = show
        })
      }
      return isShow
    },
    showOpIcon(item) {
      const vm = this
      let iconLength = this.moreOpList.length
      this.moreOpList.forEach(function (btn) {
        if (!vm.showMoreOpItem(item, btn)) { iconLength = iconLength - 1 }
      });
      return iconLength
    },
    // 下拉刷新
    onRefresh() {
      this.showMoreIndex = -1
      setTimeout(() => {
        this.refreshing = false
        this.$emit('search')
      }, 500)
    },
    // 加载数据
    loadData() {
      if (this.loading) {
        this.showMoreIndex = -1
        this.$emit('loadData')
      }
    },
    // 行复选框点击
    changeRowCheckbox(item) {
      item.isCheck = !item.isCheck
      this.$emit('changeRowCheckbox', item.isCheck)
      this.$forceUpdate()
    },
    // 更多操作
    bindMoreClick(index) {
      this.showMoreIndex = this.showMoreIndex === index ? -1 : index
    },
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      this.$emit('clickMoreBtn', val, item)
      this.showMoreIndex = -1
    },
    // 点击行进入详情页
    handleRowClick(item) {
      if (this.detailUrl) {
        const id = item.id || item.taskPerformId
        this.$router.push({
          path: this.detailUrl,
          query: { id }
        })
      }
      this.$emit('handleRowClick', item)
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
    line-height: 50px;
    height: 50px;
    width: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    h3 {
      margin: 0;
    }
  }
  .search-bar {
    z-index: 10;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    background-color: #fff;
    .van-icon {
      display: flex;
      align-items: center;
      margin: 0 6px;
    }
    .van-dropdown-menu__bar {
      background-color: transparent;
      box-shadow: unset;
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
                overflow: hidden;
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
