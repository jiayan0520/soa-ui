<template>
  <div class="soa-task-detail">
    <van-cell-group>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">发起人</van-col>
          <van-col span="19"><div class="t-light">{{ params.promoter }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">任务名称</van-col>
          <van-col span="19"><div class="t-light">{{ params.task }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">任务详情</van-col>
          <van-col span="19"><div class="t-light">{{ params.detail }}</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">备注</van-col>
          <van-col span="19">{{ params.remark }}<div class="t-danger"/></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">质量分</van-col>
          <van-col span="19"><div class="t-light"><span class="t-danger">未评定</span>/{{ params.quality }}分</div></van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5">截止时间</van-col>
          <van-col span="19"><div class="t-light">{{ params.deadline }}</div></van-col>
        </van-row>
      </van-cell>
      <van-collapse v-model="activeNames">
        <van-collapse-item
          title="完成情况"
          value="3/5完成"
          name="1">
          <div class="soa-task-complateList plr20">
            <div>
              <van-row>
                <van-col span="6">
                  <div class="t-danger">待审核</div>
                </van-col>
                <van-col span="6">
                  <div class="t-light">吴笑笑</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <van-cell>
        <van-row gutter="10">
          <van-col span="5"><div class="">附件信息</div></van-col>
          <van-col span="19">
            <div class="soa-task-file-list">
              <a
                href="/images/myw3schoolimage.jpg"
                download="w3logo" >学生信息.xls</a>
              <a
                href="/images/myw3schoolimage.jpg"
                download="w3logo">学生信息.xls</a>
            </div>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <div
          v-for="(item, index) in params.child"
          :key="index"
          class="soa-task-list-cell">
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
        <div class="tc">
          <van-button
            block
            icon="add-o"
            type="info"
            @click="handleAddChildClick">
            添加子任务
          </van-button>
        </div>
      </van-cell>
      <van-cell
        v-for="items in params.infos"
        :key="items.index">
        <van-row gutter="10">
          <van-col span="6">【{{ items.name }}】</van-col>
          <van-col span="10">
            <div class="t-light">{{ items.content }}</div>
          </van-col>
          <van-col span="8">
            <div class="t-light tr ft12">{{ items.time }}</div>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>
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
      <!--新建子任务-->
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
    </van-cell-group>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  name: 'ReceiveDetail',
  components: {
    DatePicker
  },
  data() {
    return {
      activeNames: [],
      inputText: '',
      showModel: false,
      params: {
        promoter: '李晓明',
        task: '收集党员信息',
        detail: '请各位尽快收拾好党员信息，按照excel表格里要求的数据进行填写',
        quality: '100',
        remark: '审核不通过原因：没有附件',
        deadline: '2020年6月19日 18时00分',
        child: [{ title: '搜集党员信息子任务', total: 5, done: 0 }],
        infos: [
          { name: '黄德彬', content: '这个任务很简单，大家尽快执行完后反馈该任务信息', time: '6月19日 18时00分' },
          { name: '李荣文', content: '已查看该任务', time: '6月19日 15时00分' },
          { name: '韩雯雯', content: '已反馈该任务', time: '6月19日 11时30分' }
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
        files: ''// 附件,
      },
      showChildInfoAction: false,
      showChildCriticalAction: false,
      showChildWeightAction: false,
      criticalActions: [{ name: '特急' }, { name: '紧急' }, { name: '一般' }, { name: '不急' }],
      infoActions: [{ name: '不提醒' }, { name: '截止15分钟' }, { name: '截止1小时' }, { name: '截止3小时' }, { name: '截止前1天' }],
      weightActions: [{ name: '1.0' }, { name: '1.1' }, { name: '1.2' }, { name: '1.3' },
        { name: '1.4' }, { name: '1.5' }, { name: '1.6' }, { name: '1.7' }, { name: '1.8' }, { name: '1.9' }, { name: '2.0' }],
      minDate: '',
      fileList: []
    }
  },
  methods: {
    handleDelectClick() {
      console.log('删除子任务')
    },
    //* *** 查看单个执行人详情***//
    bindDetail() {
      this.$router.push('/task-single-detail')
    },

    // 子任务事件
    onChildSubmit() {
      if (this.data.deadline > this.query.deadline) {
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

    handleExecutorClick() {
      console.log('handleExecutorClick')
    },
    handleAddChildClick() {
      this.showModel = true;
      this.childQuery = {}
    },
    handleChildEdit(index) {
      this.childQuery = this.params.child[index];
      this.showModel = true;
      console.log('编辑子任务')
    },
    handleChildClear(index) {
      const arr = this.params.child;
      arr.splice(index, 1);
      this.params.child = arr;
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
      if (e > this.params.deadline) {
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
    .soa-task-file-list > a{
        text-decoration: underline;
        color: $--color-info;
        margin-right: 10px;
    }
    .soa-task-list-cell {
        background: #F8F8F8;
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 16px;
    }
    .soa-task-complateList>div{
        margin-top: 8px;
    }
    .soa-task-add-submit{
      margin: 16px 16px 55px
    }
</style>
