<template>
  <div class="custom-panel">
    <custom-cell
      v-for="(field,index) in fieldList"
      :key="index"
      :title="field.label">
      <template slot="value">
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
        <span v-else>{{ data[field.prop] }}</span>
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
    }
  },
  computed: {
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
