<template>
  <div :class="['soa-menu-icon',`soa-menu-icon__${type}`,size === 'mini' && 'soa-menu-icon__mini']">
    <i :class="[`soa-icon soa-icon-${icon}`,size === 'mini' && 'icon-mini']" />
  </div>
</template>

<script>
export default {
  name: 'MenuIcon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'normal'
    },
    size: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/var.scss";
@import '@/assets/mixins/mixins.scss';

@include b(menu-icon){
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 25px;
  .soa-icon {
    font-size: 38px;
    color: #fff;
    &.icon-mini {
      font-size: 16px;
    }
  }
  @include e(normal){
    background-color: $--color-info;
  }
  @include e(warming){
    background-color: $--color-warning;
  }
  @include e(success){
    background-color: $--color-success;
  }
  @include e(mini){
    border-radius: 5px;
    line-height: 25px;
    width: 25px;
    height: 25px;
  }
}
</style>
