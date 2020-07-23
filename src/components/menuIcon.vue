<template>
  <div :class="['soa-menu-icon',`soa-menu-icon-${type}`,size === 'mini' && 'soa-menu-icon-mini']">
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
.soa-menu-icon {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 25px;
  .soa-icon {
    font-size: 38px;
    color: #fff;
  }
}
.soa-menu-icon-normal {
  background-color: $--color-info;
}
.soa-menu-icon-warming {
  background-color: $--color-warning;
}
.soa-menu-icon-success {
  background-color: $--color-success;
}
.soa-menu-icon-mini {
  border-radius: 5px;
  line-height: 25px;
  width: 25px;
  height: 25px;
}
.icon-mini {
  font-size: 16px;
}
</style>
