<template>
  <div class="building-detail">
    <custom-panel
      :data="data"
      :field-list="fieldList" />
    <custom-cell
      title="楼栋位置"
      value="福州大学学生公寓1号楼（福州市闽侯县）" />
    <custom-cell title="班级信息">
      <template slot="value">
        <div
          v-html="`石油化工学院-过控2018级一班：54人
        <br/>
石油化工学院-化工2019级二班：58人
        <br/>
老师：8人
        <br/>
石油化工学院-油储2019级三班：1人`"
        />
      </template>
    </custom-cell>
    <custom-cell
      title="简介"
      value="本宿舍属于福大生活区1区，里面入住的大部分是石化学院的学生。宿舍建于2008年，最近一次宿舍翻新是2019年。" />
  </div>
</template>

<script>
import customPanel from '@/components/customPanel'
import customCell from '@/components/customCell'
export default {
  name: 'BuildingDetail',
  components: {
    customCell,
    customPanel
  },
  data() {
    return {
      data: {
        buildingName: '福大生活1区1号楼-601',
        managementList: [{ userName: '杨荣发', telephone: '14777777747' }, { userName: '杨荣', telephone: '14777777747' }],
        repairList: [{ userName: '杨荣发', telephone: '14777777747' }, { userName: '杨荣', telephone: '14777777747' }],
        annexList: [
          { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          { url: 'https://cloud-image', isImage: true }
        ]
      },
      fieldList: [
        { prop: 'buildingName', label: '楼栋名称' },
        {
          prop: 'managementList',
          label: '楼管',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        {
          prop: 'repairList',
          label: '维修人员',
          type: 'array',
          childrenFields: [
            { prop: 'userName' },
            { prop: 'telephone', class: 'c-info' }]
        },
        {
          prop: 'annexList',
          label: '楼栋照片',
          type: 'uploader'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.building-detail {
  width: 100%;
  overflow: auto;
}
</style>
