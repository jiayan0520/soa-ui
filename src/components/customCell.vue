<template>
  <div class="van-cell soa-custom-cell">
    <div
      :style="titleStyle"
      class="soa-custom-cell__title">{{ title }}</div>
    <div
      v-if="value"
      class="soa-custom-cell__value">{{ value }}</div>
    <slot name="value" />
  </div>
</template>

<script>
export default {
  name: 'CustomCell',
  props: {
    labelWidth: {
      type: String,
      default: '6.2em'
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
      return {
        width: this.labelWidth
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/var.scss";
@import '@/assets/mixins/mixins.scss';

@include b(custom-cell){
    @include e(title){
      width: 6.2em;
      margin-right: 12px;
    }
    @include e(value){
      width: 100%;
      color:$--color-light
    }
}
</style>
