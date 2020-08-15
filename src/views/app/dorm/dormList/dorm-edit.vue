<template>
  <div class="dorm-edit">
    <van-form
      class="soa-custom-form"
      @submit="onSubmit">
      <van-field
        :readonly="true"
        v-model="formData.buildingName"
        center
        label="楼栋名称"
        right-icon="arrow"
        placeholder="请选择"
        @click="isShowSelect=true"
      />
      <van-field
        v-model="formData.dormName"
        :rules="formDataRules.dormName"
        :required="true"
        maxlength="50"
        label="宿舍名称"
        placeholder="请输入宿舍名称"
      />
      <van-field
        v-model="formData.dormManagerIds"
        :readonly="true"
        label="舍长"
        right-icon="add"
        placeholder
        @click="handleExecutorClick"
      />
      <van-field
        center
        label="宿舍类型">
        <template #input>
          <van-radio-group
            v-model="formData.dormType"
            direction="horizontal">
            <van-radio name="ALLSTUDENT">学生宿舍</van-radio>
            <van-radio name="ALLTEACHER">教师宿舍</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="formData.peopleNum"
        :rules="formDataRules.peopleNum"
        :required="true"
        type="number"
        label="床位数"
      />
      <van-field
        :rules="formDataRules.bedFormatType"
        :required="true"
        center
        label="床位编号格式">
        <template #input>
          <van-radio-group
            v-model="formData.bedFormatType"
            direction="horizontal"
            @change="changeFormatType"
          >
            <van-radio name="LETTER">字母</van-radio>
            <van-radio name="NUM">数字</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="formData.bedNames"
        :rules="formDataRules.bedNames"
        :required="true"
        label="床位号"
        placeholder="请输入床位号用、隔开"
      />
      <van-field
        :required="true"
        label="单人费用">
        <template #input>
          <van-field
            v-model="formData.singleFee"
            :rules="formDataRules.singleFee"
            style="padding:0"
          />
          <span
            class="unit"
            style="width:80px">(元/人/年)</span>
        </template>
      </van-field>
      <van-divider />
      <div class="soa-btn-box">
        <van-button
          block
          type="info"
          native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-popup
      v-model="isShowSelect"
      position="bottom"
      style="min-height: 20% ">
      <van-picker
        :columns="buildingList"
        show-toolbar
        @confirm="onConfirm"
        @cancel="isShowSelect = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'DormEdit',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isAdd: false, // 是否是新增
      isShowSelect: false, // 下拉选择楼栋
      formData: {
        buildingId: null,
        buildingName: null,
        dormName: null,
        dormManagerIds: null, // 舍长
        dormType: 'ALLSTUDENT',
        peopleNum: null,
        bedFormatType: 'LETTER', // 床位编号格式
        bedIds: null,
        bedNames: null,
        singleFee: 600
      },
      buildingList: null,
      data: {},
      formDataRules: {
        dormName: [{ required: true, message: '请输入宿舍名称' }],
        peopleNum: [{ required: true, message: '请输入床位数' },
          { validator: (value) => {
            if (value) {
              return value <= 10
            }
          }, message: '床位数不能超过10' }
        ],
        bedFormatType: [{ required: true, message: '请输入床位号用、隔开' }],
        singleFee: [{ required: true, message: '请输入每人每年费用' }]
      }
    }
  },
  computed: {
    peopleNum() {
      return this.formData.peopleNum
    }
  },
  watch: {
    peopleNum(val) {
      if (val <= 10) {
        this.changeFormatType()
      }
    }
  },
  created() {
    this.getDimension()
    if (!this.id) {
      this.isAdd = true
      this.formData.peopleNum = 6
      this.changeFormatType()
    } else {
      this.getDetail()
    }
  },
  methods: {
    handleExecutorClick() {
      this.$router.push('/task-add-executor');
      console.log('handleExecutorClick')
    },
    // 获取楼栋维数据
    getDimension() {
      this.$api.getBuildingDimension().then(data => {
        this.buildingList = data
      })
    },
    // 选择楼栋内容
    onConfirm(obj) {
      this.formData.buildingId = obj.value
      this.formData.buildingName = obj.text
      this.isShowSelect = false;
    },
    // 宿舍类型改变床位号
    changeFormatType() {
      if (this.formData.peopleNum) {
        const bedNameList = []
        if (this.formData.bedFormatType === 'NUM') {
          // 数字
          for (let i = 1; i <= this.formData.peopleNum; i++) {
            bedNameList.push(i)
          }
        } else {
          // 字母
          for (let i = 0; i < this.formData.peopleNum; i++) {
            bedNameList.push(String.fromCharCode(i + 65))
          }
        }
        this.formData.bedNames = bedNameList.join(',')
      }
    },
    // 获取详情
    getDetail() {
      this.$api.getDormDetail(this.id).then(data => {
        this.formData = data
      })
    },
    // 保存
    onSubmit() {
      if (this.isAdd) {
        Toast.loading('新增宿舍中，请稍后...')
        this.$api.addDorm(this.formData).then(data => {
          Toast.clear()
          Toast('新增宿舍成功')
          this.$emit('close', true)
        })
      } else {
        Toast.loading('修改宿舍中，请稍后...')
        this.$api.updateDorm(this.formData).then(data => {
          Toast.clear()
          Toast('修改宿舍成功')
          this.$emit('close', true)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.dorm-edit {
  padding-top: 20px;
}
</style>
