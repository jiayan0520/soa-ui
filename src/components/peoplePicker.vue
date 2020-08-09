<template>
  <van-field
    v-model="choosedPerson"
    :readonly="true"
    :label="title"
    class="soa-people-picker"
    right-icon="add"
    placeholder=""
    @click="handleClick"
  />
</template>
<script>
// import { Toast } from 'vant';
export default {
  name: 'ComplexPicker',
  props: {
    title: {
      // 选人显示的label
      type: String,
      required: true
    },
    align: {
      type: String,
      default: 'left'
    },
    multiple: {
      // 是否多选
      type: Boolean,
      default: true
    },
    maxUsers: {
      // 最大可选人数
      type: Number,
      default: 300
    },
    disabledUsers: {
      // 不可选用户
      type: Array,
      default: () => []
    },
    disabledDepts: {
      // 不可选部门
      type: Array,
      default: () => []
    },
    userOnly: {
      // true：返回人员信息；false：返回人员和部门信息
      type: Boolean,
      default: true
    },
    fromCurrentDept: {
      // 0 表示从企业最上层开始；-1 表示从自己所在部门开始
      type: Number,
      default: 0
    },
    pickedPeople: {
      type: Array,
      default: () => []
    },
    pickedDepts: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Array],
      default: ''
    }
  },
  data() {
    return {
      people: this.pickedPeople,
      department: this.pickedDepts
    };
  },
  computed: {
    // 用于界面展示的人员名称字符串
    choosedPerson() {
      if (!this.multiple && this.userOnly) {
        return this.value;
      }
      var arr = [...this.people, ...this.department];
      var arrChoosed = arr.map(p => p.name);
      return arrChoosed.length
        ? arrChoosed.length > 7
          ? '已选择' + arrChoosed.length + '人'
          : arrChoosed.join('，')
        : '请选择' + this.title;
    },
    // 已选人员id数组，用于回显在选人页面
    strChoosedPersonIds() {
      return this.people.map(p => p.emplId);
    },
    // 已选部门id数组，用于回显在选人页面
    strChoosedDeptIds() {
      return this.department.map(d => d.id);
    }
  },
  mounted() {
    console.log('选人mounted.');
  },
  methods: {
    // 选人
    handleClick() {
      this.$dd.biz.contact.complexPicker({
        title: '选择' + this.title,
        corpId: 'ding2121e6f85c89c1f9f2c783f7214b6d69',
        multiple: this.multiple,
        limitTips: '超出了最大人数',
        maxUsers: this.maxUsers,
        pickedUsers: this.strChoosedPersonIds,
        pickedDepartments: this.strChoosedDeptIds,
        disabledUsers: this.disabledUsers,
        disabledDepartments: this.disabledDepts,
        requiredUsers: [],
        requiredDepartments: [],
        appId: '841409507',
        permissionType: 'xxx',
        responseUserOnly: this.userOnly,
        startWithDepartmentId: this.fromCurrentDept,
        onSuccess: result => {
          console.group('钉钉选人与部门：');
          console.log(result);
          console.groupEnd();
          // 选择的人员
          if (result.users.length > 0) {
            this.people = result.users;
          }
          // 选择的部门
          if (result.departments.length > 0) {
            this.department = result.departments;
          }
          this.$emit('complexPickerParent', this.people, this.department);
        },

        onFail: function(err) {
          // Toast(JSON.stringify(err))
          console.error(err);
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/style/var.scss";
@import '@/assets/mixins/mixins.scss';

@include b(people-picker) {
  & .van-field__right-icon{
    color: $--color-info
  }
}
</style>
