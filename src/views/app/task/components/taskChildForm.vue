<template>
  <div>
    <van-popup
      v-model="showModal"
      :style="{ height: '100%' }"
      closeable
      position="bottom"
      @close="closeModal">
      <div class="soa-task-addChild__title">添加子任务</div>
      <van-form
        class="soa-task-add"
        @submit="onChildSubmit">
        <van-field
          v-model="childQuery.title"
          :rules="[{ required: true, message: '请输入任务标题' }]"
          name="请输入任务标题"
          placeholder="请输入任务标题"
        />
        <van-field
          v-model="childQuery.content"
          :rules="[{ required: true, message: '请输入任务内容' }]"
          maxlength="200"
          show-word-limit
          type="textarea"
          name="请输入任务内容"
          placeholder="请输入任务内容"
        />
        <van-field
          v-model="childQuery.executor"
          :readonly="true"
          label="执行人"
          right-icon="add"
          placeholder=""
          @click="handleExecutorClick"
        />
        <van-cell
          center
          title="是否提醒">
          <van-switch
            v-model="childQuery.checked"
            size="20" />
        </van-cell>
        <van-field
          center
          label="截止时间"
        >
          <template #input>
            <date-picker
              v-model="childQuery.deadline"
              :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
              :editable="false"
              :not-before="minDate"
              :clearable="false"
              type="datetime"
              value-type="format"
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择截止时间"
              append-to-body
              @change="bindChildDeadlineChange"/>
          </template>
        </van-field>
        <van-field
          v-model="childQuery.expire"
          :readonly="true"
          label="到期提醒"
          right-icon="arrow"
          @click="showChildInfoAction = true"
        />
        <van-action-sheet
          v-model="showChildInfoAction"
          :actions="infoActions"
          @select="onChildInfoSelect" />

        <van-field
          v-model="childQuery.critical"
          :readonly="true"
          label="紧急系数"
          right-icon="arrow"
          @click="showChildCriticalAction = true"
        />
        <van-action-sheet
          v-model="showChildCriticalAction"
          :actions="criticalActions"
          @select="onChildCriticalSelect" />
        <van-field
          v-model="childQuery.weight"
          :readonly="true"
          label="任务权重"
          right-icon="arrow"
          @click="showChildWeightAction = true"
        />
        <van-action-sheet
          v-model="showChildWeightAction"
          :actions="weightActions"
          @select="onChildWeightSelect" />
        <van-field
          v-model="childQuery.searcher"
          :readonly="true"
          label="可公开查阅人"
          right-icon="add"
          placeholder=""
          @click="handleExecutorClick"
        />
        <van-field
          v-model="childQuery.files"
          :readonly="true"
          label="附件"
          placeholder=""
          @click="handleExecutorClick"
        >
          <template #input>
            <van-uploader
              v-model="fileList"
              upload-icon="upgrade"
              accept="*"/>
          </template>
        </van-field>
        <div class="soa-task-add__submit">
          <van-button
            block
            type="info"
            native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  name: 'TaskChild',
  components: {
    DatePicker
  },
  props: {
    show: {
      type: Boolean(),
      defalut: false,
      required: true
    },
    deadline: {
      type: String,
      default: null,
      required: true
    },
    params: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      childQuery: {
        title: '',
        content: '',
        executor: '', // 执行人
        checked: false,
        deadline: '',
        expire: '不提醒',
        critical: '特急',
        weight: '1.0',
        searcher: '', // 可查阅人
        files: '' // 附件
      },
      minDate: '',
      showModal: false,
      showChildInfoAction: false,
      showChildCriticalAction: false,
      showChildWeightAction: false,
      criticalActions: [{ name: '特急' }, { name: '紧急' }, { name: '一般' }, { name: '不急' }],
      infoActions: [{ name: '不提醒' }, { name: '截止15分钟' }, { name: '截止1小时' }, { name: '截止3小时' }, { name: '截止前1天' }],
      weightActions: [{ name: '1.0' }, { name: '1.1' }, { name: '1.2' }, { name: '1.3' },
        { name: '1.4' }, { name: '1.5' }, { name: '1.6' }, { name: '1.7' }, { name: '1.8' }, { name: '1.9' }, { name: '2.0' }],
      fileList: []
    }
  },
  watch: {
    show(val) {
      this.showModal = val
    }
  },
  created() {
    if (this.params) {
      this.childQuery = this.params;
    }
    console.log(this.params);
  },
  methods: {
    // 子任务事件
    onChildSubmit() {
      if (this.childQuery.deadline > this.deadline) {
        this.$notify({ type: 'danger', message: '子任务截止时间不得超过主任务时间' });
      } else {
        // 虚拟数据
        this.childQuery.total = 5;
        this.childQuery.done = 0;
        this.$emit('childData', this.childQuery);
      }
    },
    onChildInfoSelect(item) {
      this.showChildInfoAction = false;
      this.childQuery.expire = item.name;
    },
    onChildCriticalSelect(item) {
      this.showChildCriticalAction = false;
      this.childQuery.critical = item.name
    },
    onChildWeightSelect(item) {
      this.showChildWeightAction = false;
      this.childQuery.weight = item.name
    },
    // 子任务截止时间不能超过主任务的截止时间
    bindChildDeadlineChange(e) {
      if (e > this.deadline) {
        this.$notify({ type: 'danger', message: '子任务截止时间不得超过主任务时间' });
      }
    },
    handleExecutorClick() {
      console.log('executor')
    },
    // 关闭弹出框
    closeModal() {
      this.showModal = false;
      this.$emit('closeModal', true)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@include b(task-addChild){
   @include e(title){
        margin:15px 0;
        text-align: center;
        font-size: 20px;
   }
}
.mx-datepicker-main.mx-datepicker-popup{z-index: 9999!important;}
</style>
