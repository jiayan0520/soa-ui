<template>
  <div class="soa-child-task">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="soa-child-task__child">
      <div class="title">{{ item.title }}</div>
      <div class="c-light">
        <!-- {{ item.done }}/{{ item.total }}完成 -->
        <span
          v-if="showStatus && item.state"
          :class="['c-ml10',taskStatus[item.state].type]">{{ taskStatus[item.state].label }}</span>
      </div>
      <div class="c-mr10">
        <i
          class="van-icon van-icon-edit c-info c-mr10"
          @click="handleEdit(index)"/>
        <i
          class="van-icon van-icon-clear c-danger"
          @click="handleDelete(index,item)"/>
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
      :params="editTask"
      :parent-id="parentId"
      @submit="handleSubmit"
      @input="handleInput"
      @closeModal="closeChildModal"/>
  </div>
</template>

<script>
import TaskChildForm from './taskChildForm'
import { taskStatus } from '../components/taskEnum'
import { Toast } from 'vant';
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
    },
    parentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      taskIndex: '',
      taskStatus
    }
  },
  computed: {
    userId() {
      return this.$store.getters['core/user'].userId
    },
    editTask() {
      const tempTask = {
        createUserId: this.userId,
        annexId: '',
        title: '任务1',
        content: '任务1',
        executor: [], // 执行人
        isRemind: 'Y',
        deadline: '',
        dueReminder: 'NOT_NOTICE',
        emergencyCoefficient: 'GENERAL',
        difficulty: 'DICFFICULTY1',
        annexList: [], // 附件
        state: 'UNFINISHED'
      }
      return this.taskIndex || this.taskIndex === 0 ? this.list[this.taskIndex] : tempTask
    }
  },
  methods: {
    handleDelete(index, item) {
      const listtemp = this.list
      if (item.parentTaskId) {
        this.$dialog.confirm({
          title: '提示',
          message: `请确认要删除任务【${item.title}】，删除后数据将无法恢复`
        }).then(() => {
          this.$api.deleteTask(item.id).then(() => {
            this.$emit('input', listtemp.splice(index, 1))
            Toast('任务删除成功');
          })
        })
      } else {
        this.$emit('input', listtemp.splice(index, 1))
      }
    },
    handleAdd() {
      this.taskIndex = '';
      this.show = true;
    },
    handleEdit(index) {
      this.taskIndex = index;
      this.show = true;
    },
    handleSubmit(value) {
      this.show = false;
      this.taskIndex = '';
      this.$emit('submit', value);
    },
    // 获取子任务数据
    handleInput(data) {
      const listtemp = this.list
      if (this.taskIndex || this.taskIndex === 0) {
        listtemp[this.taskIndex] = data
      } else {
        listtemp.push(data)
      }
      this.$emit('input', listtemp)
      this.show = false;
      this.taskIndex = '';
    },
    // 关闭modal
    closeChildModal(val) {
      this.show = !val
      this.taskIndex = '';
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
    align-items: center;
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
