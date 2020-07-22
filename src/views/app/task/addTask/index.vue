<template>
  <div>
    <van-form
      class="soa-task-add"
      @submit="onSubmit">
      <van-field
        v-model="query.title"
        :rules="[{ required: true, message: '请输入任务标题' }]"
        name="请输入任务标题"
        placeholder="请输入任务标题"
      />
      <van-field
        v-model="query.content"
        :rules="[{ required: true, message: '请输入任务内容' }]"
        maxlength="200"
        show-word-limit
        type="textarea"
        name="请输入任务内容"
        placeholder="请输入任务内容"
      />
      <van-field
        v-model="query.executor"
        :readonly="true"
        class="soa-task-add-executor"
        label="执行人"
        right-icon="add"
        placeholder=""
        @click="handleExecutorClick"
      />
      <van-cell
        center
        title="是否提醒">
        <van-switch
          v-model="query.checked"
          size="20" />
      </van-cell>
      <van-field
        center
        label="截止时间"
      >
        <template #input>
          <date-picker
            v-model="query.deadline"
            :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"
            :editable="false"
            :not-before="minDate"
            :clearable="false"
            type="datetime"
            value-type="format"
            format="YYYY-MM-DD HH:mm"
            placeholder="请选择截止时间"
            append-to-body/>
        </template>
      </van-field>
      <van-field
        v-model="query.expire"
        :readonly="true"
        label="到期提醒"
        right-icon="arrow"
        @click="showInfoAction = true"
      />
      <van-action-sheet
        v-model="showInfoAction"
        :actions="infoActions"
        @select="onInfoSelect" />

      <van-field
        v-model="query.critical"
        :readonly="true"
        label="紧急系数"
        right-icon="arrow"
        @click="showCriticalAction = true"
      />
      <van-action-sheet
        v-model="showCriticalAction"
        :actions="criticalActions"
        @select="onCriticalSelect" />
      <van-field
        v-model="query.weight"
        :readonly="true"
        label="任务权重"
        right-icon="arrow"
        @click="showWeightAction = true"
      />
      <van-action-sheet
        v-model="showWeightAction"
        :actions="weightActions"
        @select="onWeightSelect" />
      <van-field
        v-model="query.searcher"
        :readonly="true"
        label="可公开查阅人"
        right-icon="add"
        placeholder=""
        @click="handleExecutorClick"
      />
      <van-field
        v-model="query.files"
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
      <van-divider />
      <div class="soa-task-add-child">
        <div class="soa-task-add-list">
          <div
            v-for="(item, index) in query.child"
            :key="index"
            class="soa-task-add-list-cell">
            <van-row gutter="10">
              <van-col span="12"><div class="ft12">{{ item.title }}</div></van-col>
              <van-col span="4">
                <div class="t-light ft12">{{ item.done }}/{{ item.total }}完成</div>
              </van-col>
              <van-col span="4">
                <div
                  :class="{'t-success':item.total==item.done,'t-danger':item.total!=item.done}"
                  class="ft12">{{ item.total==item.done?'已完成':'未完成' }}</div>
              </van-col>
              <van-col span="4">
                <div class="cursor right">
                  <van-icon
                    name="clear"
                    color="#f00"
                    @click="handleChildClear(index)"/>
                </div>
                <div class="right mr10 cursor">
                  <van-icon
                    name="edit"
                    @click="handleChildEdit(index)"/>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="soa-task-add-btn">
          <van-button
            block
            icon="add-o"
            type="info"
            @click="handleAddChildClick">
            添加子任务
          </van-button>
        </div>
      </div>
      <van-divider />
      <div class="soa-task-add-submit">
        <van-button
          block
          type="info"
          native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-popup
      v-model="showModel"
      :style="{ height: '100%' }"
      closeable
      position="bottom">
      <div class="mtb10 tc ft20">添加子任务</div>
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
          class="soa-task-add-executor"
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
        <div class="soa-task-add-submit">
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
// import formatData from '@/utils/index.js'
export default {
  name: 'AddTask',
  components: {
    DatePicker
  },
  data() {
    return {
      query: {
        title: '',
        content: '',
        executor: '', // 执行人
        checked: false,
        deadline: '',
        expire: '不提醒',
        critical: '特急',
        weight: '1.0',
        searcher: '', // 可查阅人
        files: '', // 附件
        child: [
          { title: '搜集党员信息子任务', total: 5, done: 0 }
        ]
      },
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
      showInfoAction: false,
      showCriticalAction: false,
      showWeightAction: false,
      showChildInfoAction: false,
      showChildCriticalAction: false,
      showChildWeightAction: false,
      fileList: [],
      criticalActions: [{ name: '特急' }, { name: '紧急' }, { name: '一般' }, { name: '不急' }],
      infoActions: [{ name: '不提醒' }, { name: '截止15分钟' }, { name: '截止1小时' }, { name: '截止3小时' }, { name: '截止前1天' }],
      weightActions: [{ name: '1.0' }, { name: '1.1' }, { name: '1.2' }, { name: '1.3' },
        { name: '1.4' }, { name: '1.5' }, { name: '1.6' }, { name: '1.7' }, { name: '1.8' }, { name: '1.9' }, { name: '2.0' }],
      showModel: false
    }
  },
  methods: {
    onSubmit() {
      console.log('')
    },
    handleExecutorClick() {
      this.$router.push('/task-add-executor');
      console.log('handleExecutorClick')
    },
    onInfoSelect(item) {
      this.showInfoAction = false;
      this.query.expire = item.name
    },
    onCriticalSelect(item) {
      this.showCriticalAction = false;
      this.query.critical = item.name
    },
    onWeightSelect(item) {
      this.showWeightAction = false;
      this.query.weight = item.name
    },
    handleAddChildClick() {
      this.showModel = true;
      this.childQuery = {}
    },
    handleChildEdit(index) {
      this.childQuery = this.query.child[index];
      this.showModel = true;
      console.log('编辑子任务')
    },
    handleChildClear(index) {
      const arr = this.query.child;
      arr.splice(index, 1);
      this.query.child = arr;
    },
    // 子任务事件
    onChildSubmit() {
      if (this.childQuery.deadline > this.query.deadline) {
        this.$notify({ type: 'danger', message: '子任务截止时间不得超过主任务时间' });
      } else {
        const arr = this.query.child;
        // 虚拟数据
        this.childQuery.total = 5;
        this.childQuery.done = 0;
        arr.push(this.childQuery);
        this.query.child = arr;
        this.showModel = false;
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
      if (e > this.query.deadline) {
        this.$notify({ type: 'danger', message: '子任务截止时间不得超过主任务时间' });
      }
    }
  }
}
</script>
<style>
  .mx-datepicker-main.mx-datepicker-popup{z-index: 9999!important;}
</style>
<style lang="scss">
@import '@/assets/style/var.scss';
.soa-task-add-executor .van-field__right-icon{
  color:$--color-info
}
.soa-task-add-submit{
  margin: 16px 16px 55px
}
.soa-task-add-child {
  margin: 16px 16px 0;
}
.soa-task-add-list-cell {
  background: #F8F8F8;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
}
.cursor{ cursor: pointer}
</style>
