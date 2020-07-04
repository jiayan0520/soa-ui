<template>
  <div :class="['soa-menu-icon',`soa-menu-icon-${type}`,size === 'mini' && 'soa-menu-icon-mini']">
    <i :class="[`soa-icon soa-icon-${icon}`,size === 'mini' && 'icon-mini']"/>
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

<style scoped>
.soa-menu-icon{
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 10px;
}
.soa-icon{
  font-size: 40px;
  color:#fff
}
.soa-menu-icon-normal{
  background-color: #38A4F5;
}
.soa-menu-icon-warming{
  background-color: #E69D01;
}
.soa-menu-icon-success{
  background-color: #3BB113;
}
.soa-menu-icon-mini{
  border-radius: 5px;
  line-height: 25px;
  width: 25px;
  height: 25px;
}
.icon-mini{
  font-size: 16px;
}
</style>
