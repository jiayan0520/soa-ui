<template>
  <div class="soa-child-task">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="soa-child-task__child">
      <div class="title">{{ item.title }}</div>
      <div>{{ item.done }}/{{ item.total }}完成
        <span
          v-if="showStatus"
          :class="['c-ml20',`c-${stateMap[item.state].type}`]">{{ stateMap[item.state].label }}</span>
      </div>
      <div class="c-mr10">
        <i
          class="van-icon van-icon-edit c-info"
          @click="handleEdit(index)"/>
        <i
          class="van-icon van-icon-clear c-danger"
          @click="handleDelete(index)"/>
      </div>
    </div>
    <van-button
      block
      icon="add-o"
      type="info"
      @click="handleAdd">
      添加子任务
    </van-button>
    <TaskChildForm
      :show="show"
      :deadline="deadline"
      :params="taskDetail"
      @childData="getChildData"
      @closeModal="closeChildModal"/>
  </div>
</template>

<script>
import TaskChildForm from './taskChildForm'
export default {
  name: 'ChildTaskList',
  components: {
    TaskChildForm
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    deadline: {
      type: String,
      default: ''
    },
    showStatus: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      taskDetail: {},
      stateMap: {
        NUFINISHED: { label: '  任务未完成', type: 'light' },
        FAILED: { label: '  未完成', type: 'danger' },
        PASS: { label: '  已完成', type: 'success' }
      }
    }
  },
  methods: {
    handleDelete(index) {
      const listtemp = this.list
      this.$emit('input', listtemp.splice(index, 1))
    },
    handleAdd() {
      this.show = true;
    },
    handleEdit(index) {
      this.taskDetail = this.list[index];
      this.show = true;
      console.log('编辑子任务')
    },
    // 获取子任务数据
    getChildData(data) {
      const arr = this.form.child;
      arr.push(data);
      this.form.child = arr;
      this.show = false;
    },
    // 关闭modal
    closeChildModal(val) {
      this.show = !val
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@import '@/assets/style/var.scss';
@include b(child-task){
 @include e(child){
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #ddd;
    border-radius: 6px;
    margin-bottom: 10px;
    & > .title{
      font-size: $--font-size-extra-small;
      width: 50%;
    }
  }
}
</style>
