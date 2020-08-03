<template>
  <div class="soa-task-add">
    <van-form
      label-width="7.2em"
      class="soa-custom-form"
      @submit="onSubmit">
      <van-field
        v-model="form.title"
        :rules="[{ required: true, message: '请输入任务标题' }]"
        name="请输入任务标题"
        placeholder="请输入任务标题"
      />
      <van-field
        v-model="form.content"
        :rules="[{ required: true, message: '请输入任务内容' }]"
        maxlength="200"
        show-word-limit
        type="textarea"
        name="请输入任务内容"
        placeholder="请输入任务内容"
      />
      <people-picker
        v-model="form.soaTaskPerform"
        title="执行人"
        @complexPickerParent="handlePicker"/>
      <van-field
        :readonly="true"
        label="是否提醒"
        placeholder=""
      >
        <template #input>
          <van-switch
            v-model="form.isRemind"
            size="20" />
        </template>
      </van-field>
      <van-field
        center
        label="截止时间"
      >
        <template #input>
          <date-picker
            v-model="form.deadline"
            :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
            :editable="false"
            :not-before="minDate"
            :clearable="false"
            type="datetime"
            value-type="format"
            format="YYYY-MM-DD HH:mm"
            placeholder="请选择时间"
            append-to-body/>
        </template>
      </van-field>
      <custom-sheet
        v-model="form.dueReminder"
        :actions="infoActions"
        label="到期提醒"/>
      <custom-sheet
        v-model="form.emergencyCoefficient"
        :actions="criticalActions"
        label="紧急系数"/>
      <custom-sheet
        v-model="form.difficulty"
        :actions="weightActions"
        label="任务权重"/>
      <people-picker
        v-model="form.soaTaskReader"
        title="可公开查阅人"/>
      <van-field
        v-model="form.files"
        :readonly="true"
        label="附件"
        placeholder=""
      >
        <template #input>
          <van-uploader
            v-model="fileList"
            upload-icon="upgrade"
            accept="*"/>
        </template>
      </van-field>
      <van-divider />
      <van-cell>
        <div
          v-for="(item, index) in form.child"
          :key="index"
          class="soa-task-add__child">
          <div class="content">
            <div class="title">{{ item.title }}</div>
            <div class="c-mr20">{{ item.done }}/{{ item.total }}完成</div>
            <div
              :class="{'c-success':item.total==item.done,'c-danger':item.total!=item.done}"
              class="c-ft12">{{ item.total==item.done?'已完成':'未完成' }}</div>
          </div>
          <div class="icon">
            <div class="c-mr10">
              <van-icon
                name="clear"
                color="#f00"
                @click="handleChildClear(index)"/>
            </div>
            <div>
              <van-icon
                name="edit"
                @click="handleChildEdit(index)"/>
            </div>
          </div>
        </div>
        <div class="c-tc">
          <van-button
            block
            icon="add-o"
            type="info"
            @click="handleAddChildClick">
            添加子任务
          </van-button>
        </div>
      </van-cell>
      <div class="soa-task-add__submit">
        <van-button
          block
          type="info"
          native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <AddChild
      :show="showModal"
      :deadline="form.deadline"
      :params="editObj"
      @childData="getChildData"
      @closeModal="closeChildModal"/>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import AddChild from '../taskChild'
import peoplePicker from '@/components/peoplePicker'
import customSheet from '@/components/customSheet'
import dayjs from 'dayjs';
// import formatData from '@/utils/index.js'
export default {
  name: 'AddTask',
  components: {
    DatePicker,
    AddChild,
    peoplePicker,
    customSheet
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        soaTaskPerform: '', // 执行人
        isRemind: true,
        deadline: '',
        dueReminder: '不提醒',
        emergencyCoefficient: '特急',
        difficulty: '1.0',
        searcher: '', // 可查阅人
        files: '', // 附件
        child: [
          { title: '搜集党员信息子任务', total: 5, done: 0 }
        ]
      },
      showModal: false,
      minDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
      fileList: [],
      criticalActions: [{ name: '特急' }, { name: '紧急' }, { name: '一般' }, { name: '不急' }],
      infoActions: [{ name: '不提醒' }, { name: '截止15分钟' }, { name: '截止1小时' }, { name: '截止3小时' }, { name: '截止前1天' }],
      weightActions: [{ name: '1.0' }, { name: '1.1' }, { name: '1.2' }, { name: '1.3' },
        { name: '1.4' }, { name: '1.5' }, { name: '1.6' }, { name: '1.7' }, { name: '1.8' }, { name: '1.9' }, { name: '2.0' }],
      editObj: null
    }
  },
  mounted() {
    console.log('minDate', this.minDate)
    // 截止时间默认为今日或次日18点
    var date = new Date();
    if (new Date().getHours() < 18) {
      this.form.deadline = dayjs(date.setHours(18)).format('YYYY-MM-DD HH:mm') + ':00';
    } else {
      date.setDate(date.getDate() + 1);
      this.form.deadline = dayjs(date.setHours(18)).format('YYYY-MM-DD HH:mm') + ':00';
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    },
    handleAddChildClick() {
      this.showModal = true;
    },
    handleChildEdit(index) {
      this.editObj = this.form.child[index];
      this.showModal = true;
      console.log('编辑子任务')
    },
    handlePicker(people, departments) {
      console.log('handlePicker', people, departments)
    },
    handleChildClear(index) {
      const arr = this.form.child;
      arr.splice(index, 1);
      this.form.child = arr;
    },
    // 获取子任务数据
    getChildData(data) {
      const arr = this.form.child;
      arr.push(data);
      this.form.child = arr;
      this.showModal = false;
    },
    // 关闭modal
    closeChildModal(val) {
      this.showModal = !val
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/mixins/mixins.scss';
@import '@/assets/style/var.scss';
@include b(task-add){
  @include e(submit){
    margin: 16px 16px 55px
  }
 @include e(child){
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #ddd;
    border-radius: 6px;
    margin-bottom: 10px;
    & .content{
      display: flex;
      width: 92%;
      & > .title{
        font-size: $--font-size-extra-small;
        width: 50%;
      }
    }
    & > .icon {
      display: flex;
    }
  }
}
</style>
