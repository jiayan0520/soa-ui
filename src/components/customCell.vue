<template>
  <div class="van-cell soa-custom-cell">
    <div
      :style="titleStyle"
      class="soa-custom-cell__title">{{ title }}</div>
    <div
      v-if="value"
      class="soa-custom-cell__value">{{ value }}</div>
    <div
      v-if="$slots.value"
      class="soa-custom-cell__value">
      <slot name="value" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomCell',
  props: {
    labelWidth: {
      type: String,
      default: ''
    },
    textAlign: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'normal'
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    titleStyle() {
      const titleStyle = {}
      if (this.labelWidth) {
        titleStyle.width = this.labelWidth
      }
      if (this.textAlign) {
        titleStyle.textAlign = this.textAlign
      }
      return titleStyle
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/var.scss";
@import "@/assets/mixins/mixins.scss";

@include b(custom-cell) {
  @include e(title) {
    width: 6.2em;
    margin-right: 12px;
    text-align: right;
  }
  @include e(value) {
    width: 100%;
    color: $--color-light;
  }
}
</style>
