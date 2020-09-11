<template>
  <div class="custom-panel">
    <slot />
    <custom-cell
      v-for="(field,index) in fieldList"
      :key="index"
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
        <div v-else-if="field.type==='uploader'">
          <van-uploader
            v-model="data[field.prop]"
            :disabled="true"
            :deletable="false"
            :show-upload="false"
            multiple
          />
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
