<template>
  <div class="soa-app">
    <div
      v-for="(value,index) in moduleList"
      :key="index">
      <h3
        class="soa-app-title"
        @click="handleClick(index)">{{ value.header }}
      <i :class="['van-icon van-icon-play', activeIndex.indexOf(index)>=0 && 'trasform']"/></h3>
      <van-grid
        v-if="activeIndex.indexOf(index)>=0"
        :border="false">
        <van-grid-item
          v-for="item in value.list"
          :key="item.label"
          :to="item.to"
          :url="item.url">
          <menu-icon
            :icon="item.icon"
            :type="item.type"/>
          <span class="soa-app_label">{{ item.label }}</span>
        </van-grid-item>
      </van-grid>
      <div
        v-else
        class="soa-app-list"
        @click="handleClick(index)">
        <menu-icon
          v-for="item in value.list"
          :key="item.label"
          :icon="item.icon"
          :type="item.type"
          class="soa-app-list-icon"
          size="mini"/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuIcon from '@/components/MenuIcon'
import menu from './menu.js'
export default {
  name: 'Home',
  components: {
    MenuIcon
  },
  data () {
    return {
      moduleList: menu,
      activeIndex: [0, 1]
    }
  },
  methods: {
    handleClick(index) {
      const indexNum = this.activeIndex.indexOf(index)
      if (indexNum >= 0) {
        this.activeIndex.splice(indexNum, 1)
      } else {
        this.activeIndex.push(index)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.soa-app_label{
  font-size: 14px;
  margin-top: 5px
}
.soa-app-title{
  position: relative;
}
.soa-app-title i{
  position: absolute;
  top: 4px
}
.trasform{
  transform:rotate(90deg);
  -ms-transform:rotate(90deg); 	/* IE 9 */
  -moz-transform:rotate(90deg); 	/* Firefox */
  -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  -o-transform:rotate(90deg); 	/* Opera */
}
.soa-app-list{
  background-color: #f2f2f2;
  padding: 10px 10px;
  border-radius: 10px
}
.soa-app-list-icon{
  margin-left: 5px
}
</style>
