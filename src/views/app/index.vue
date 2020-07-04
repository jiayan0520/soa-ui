<template>
  <div class="apps">
    <div
      v-for="(value,index) in moduleList"
      :key="index"
      class="apps-item">
      <h3 class="title">{{ value.header }}</h3>
      <!-- <ul class="list clearfix">
        <li
          v-for="(app,i) in value.list"
          :key="i"
          class="flex">
          <router-link
            :to="app.url">
            <i class="van-icon van-icon-location-o"/>
            <div>{{ app.label }}</div>
          </router-link>
        </li>
      </ul> -->
      <van-grid>
        <van-grid-item
          icon="photo-o"
          text="文字" />
        <van-grid-item
          icon="photo-o"
          text="文字" />
        <van-grid-item
          icon="photo-o"
          text="文字" />
        <van-grid-item
          icon="photo-o"
          text="文字" />
        <van-grid-item
          icon="photo-o"
          text="文字" />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vant';
export default {
  name: 'Home',
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data () {
    return {
      moduleList: [
        {
          header: '任务管理',
          list: [
            {
              url: './taskAdd',
              label: '新建任务'
            },
            {
              url: './taskList',
              label: '任务列表'
            },
            {
              url: './taskExamineList',
              label: '任务审核'
            },
            {
              url: './taskImport',
              label: '导入任务'
            },
            {
              url: './taskRank',
              label: '任务榜'
            }
          ]
        }
      ]
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
