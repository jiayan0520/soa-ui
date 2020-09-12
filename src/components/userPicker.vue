<template>
  <van-field
    v-model="choosedPerson"
    :readonly="true"
    :label="title"
    :rules="rules"
    class="soa-user-picker"
    right-icon="add"
    placeholder=""
    @click="handleClick"
  />
</template>
<script>
export default {
  name: 'ComplexPicker',
  props: {
    // 选人显示的label
    title: {
      type: String,
      required: true
    },
    rules: {
      type: Array,
      default: () => []
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: true
    },
    // 最大可选人数
    maxUsers: {
      type: Number,
      default: 300
    },
    // 不可选用户
    disabledUsers: {
      type: Array,
      default: () => []
    },
    // 不可选部门
    disabledDepts: {
      type: Array,
      default: () => []
    },
    // true：返回人员信息；false：返回人员和部门信息
    userOnly: {
      type: Boolean,
      default: true
    },
    // 0 表示从企业最上层开始；-1 表示从自己所在部门开始
    startWithDepartmentId: {
      type: Number,
      default: 0
    },
    /*
      单选人：{emplId:'',name:''}
      多选只选人：[{emplId:'',name:''}]
      多选选部门和人：{users:[{emplId:'',name:''}],departments:[]}
    */
    value: {
      type: [String, Object, Array],
      default: ''
    }
  },
  computed: {
    // 单选
    isSingle() {
      return !this.multiple && this.userOnly
    },
    // 多选并只返回人
    isMultipleUserOnly() {
      return this.multiple && this.userOnly
    },
    // 多选并返回人和部门
    isMultipleUserDep() {
      return this.multiple && !this.userOnly
    },
    choosedPerson() {
      // 单选
      if (this.isSingle) {
        return this.value.name;
      }
      let chooseNumber = 0
      let arrName = []
      // 多选并只返回人
      if (this.isMultipleUserOnly) {
        chooseNumber = this.value.length
        arrName = this.value.map(p => p.name);
      }
      // 多选并返回人和部门
      if (this.isMultipleUserDep) {
        const arr = [...this.value.users, ...this.value.departments];
        arrName = arr.map(p => p.name);
        const departmentNumber = this.value.departments.map(p => p.number)
        const sumDepartment = departmentNumber.length && departmentNumber.reduce(function(prev, cur, index, array) {
          return prev + cur
        })
        chooseNumber = this.value.users.length + sumDepartment
      }
      return chooseNumber
        ? chooseNumber > 7
          ? '已选择' + chooseNumber + '人'
          : arrName.join('，')
        : '请选择' + this.title;
    },
    // 已选人员id数组，用于回显在选人页面
    strChoosedPersonIds() {
      return this.isSingle ? [this.value.emplId]
        : (this.isMultipleUserOnly ? this.value.map(p => p.emplId)
          : this.value.users.map(p => p.emplId));
    },
    // 已选部门id数组，用于回显在选人页面
    strChoosedDeptIds() {
      return this.userOnly ? [] : this.value.departments.map(d => d.id);
    }
  },
  methods: {
    handleClick() {
      this.$dd.biz.contact.complexPicker({
        title: '选择' + this.title,
        corpId: this.$store.getters[ 'core/system'].corpId,
        multiple: this.multiple,
        limitTips: `最多选择${this.maxUsers}人`,
        maxUsers: this.maxUsers,
        pickedUsers: this.strChoosedPersonIds,
        pickedDepartments: this.strChoosedDeptIds,
        disabledUsers: this.disabledUsers,
        disabledDepartments: this.disabledDepts,
        requiredUsers: [],
        requiredDepartments: [],
        appId: this.$store.getters['core/system'].appId,
        permissionType: 'GLOBAL',
        responseUserOnly: this.userOnly,
        startWithDepartmentId: this.startWithDepartmentId,
        onSuccess: result => {
          console.group('钉钉选人与部门：');
          console.log(result);
          console.groupEnd();
          // 单选
          if (this.isSingle) {
            this.$emit('input', result.users[0]);
          }
          // 多选并只返回人
          if (this.isMultipleUserOnly) {
            this.$emit('input', result.users);
          }
          // 多选并返回人和部门
          if (this.isMultipleUserDep) {
            this.$emit('input', result);
          }
        },
        onFail: function(err) {
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

@include b(user-picker) {
  & .van-field__right-icon{
    color: $--color-info
  }
}
</style>
