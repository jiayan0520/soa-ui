<template>
  <div class="custom-panel">
    <slot />
    <div
      v-for="(field,index) in fieldList"
      :key="index">
      <!--折叠框展示形式-->
      <div v-if="field.type==='collapse'">
        <van-collapse v-model="field.activeNames">
          <van-collapse-item
            :value="field.leftValue"
            :title="field.label"
            name="1">
            <div
              v-for="(item,index) in data[field.prop]"
              :key="index"
              class="check-item soa-box-item"
            >
              <div
                v-for="(child,ci) in field.childrenFields"
                :key="ci">
                <div
                  v-for="(subField,si) in child"
                  :key="si"
                  :class="subField.class">
                  <span v-if="subField.prefix">{{ subField.prefix }}</span>
                  {{ item[subField.prop] }}
                </div>
                <!-- 若只有一个操作按钮，直接用按钮显示，多个是时候用...-->
                <van-button
                  v-if="moreOpList.length===1"
                  class="soa-list-right-btn"
                  type="info"
                  @click="clickMoreBtn(moreOpList[0].value,item)"
                >{{ moreOpList[0].label }}</van-button>
                <i
                  v-else-if="moreOpList.length>1"
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
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <custom-cell
        v-else
        :title="field.label">
        <template slot="value">
          <!--普通数组展示形式 -->
          <div v-if="field.type==='array'">
            <div
              v-for="(item,index) in data[field.prop]"
              :key="index">
              <span
                v-for="(son,idx) in field.childrenFields"
                :key="idx"
                :class="[son.class,item.class]"
              >
                {{ item[son.prop] }}
                <span
                  v-if="son.unit"
                  class="unit">{{ son.unit }}</span>
              </span>
            </div>
          </div>
          <span v-else>
            <slot
              :field="field"
              name="item-span">{{ data[field.prop] }}</slot>
          </span>
          <span
            v-if="field.unit"
            class="unit">{{ field.unit }}</span>
        </template>
      </custom-cell>
    </div>
  </div>
</template>

<script>
import customCell from './customCell'
export default {
  name: 'CustomPanel',
  components: {
    customCell
  },
  props: {
    // 数据
    data: {
      type: Object,
      default: () => { }
    },
    // 字段配置信息
    fieldList: {
      type: Array,
      default: () => []
    },
    /**
     * 更多操作按钮
     */
    moreOpList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showMore: false, // 更多操作
      showMoreIndex: -1 // 第几项的更多操作
    }
  },
  computed: {
  },
  methods: {
    // 更多操作
    bindMoreClick(index) {
      this.showMoreIndex = this.showMoreIndex === index ? -1 : index
    },
    // 点击更多操作按钮了
    clickMoreBtn(val, item) {
      this.$emit('clickMoreBtn', val, item)
      this.showMoreIndex = -1
    }
  }
}
</script>

<style lang="scss">
.custom-panel {
  .unit {
    // float: right;
  }
}
</style>
