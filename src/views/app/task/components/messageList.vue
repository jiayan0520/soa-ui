<template>
  <div class="soa-task-message-list">
    <van-cell
      v-for="items in list"
      :key="items.id">
      <div class="soa-task-message-list__commentList">
        <div class="name">【{{ items.userName }}】</div>
        <div class="content">{{ items.content }}</div>
        <div class="time">{{ items.createTime }}</div>
      </div>
    </van-cell>
    <van-cell v-if="show">
      <van-field
        v-model="inputText"
        center
        clearable
        label=""
        placeholder="输入回复内容"
      >
        <template #button>
          <van-button
            size="small"
            type="info">发送</van-button>
        </template>
      </van-field>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'Messagelist',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    }
  },
  methods: {}
}
</script>
<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@import '@/assets/style/var.scss';
@include b(task-message-list){
 @include e(commentList){
     display:flex;
     justify-content: space-between;
      align-items:center;
     & > .name{color: $--color-light;}
     & > .time{
       font-size: $--font-size-extra-small;
       color: $--color-light;
     }
     & > .content{width: 45%;}
  }
}
</style>
