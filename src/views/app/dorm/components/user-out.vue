<template>
  <div class="user-out-list">
    <list-layout
      ref="listLayout"
      :data-list="dataList"
      :is-show-bar="true"
      op-label="管理"
      class="dorm-list"
      @search="onSearch"
      @loadData="loadData"
      @handleRowClick="handleRowClick"
    >
      <template slot="top">
        <h3 class="user-out-title">
          选择{{ title }}
          <van-button
            style="float: right;"
            class="btn-op"
            type="warning"
            @click="sure">确定</van-button>
        </h3>
        <div class="tool-bar">
          <van-button
            class="btn-op"
            type="info"
            @click="add">新增</van-button>
          <van-button
            class="btn-op"
            type="info"
            @click="addDD">新增站内用户</van-button>
          <van-button
            class="btn-op"
            type="info">删除</van-button>
        </div>
        <form action="/">
          <van-search
            v-model="searchForm.searchValue"
            show-action
            placeholder="姓名/电话号码"
            @search="onSearch"
            @cancel="isShowSearch=false"
          />
        </form>
        <div class="soa-list-rank__row rank-title">
          <div class="user-out-all-checkbox">
            <van-checkbox
              v-model="isCheckAll"
              shape="square"
              @click.native="changeCheckAll" />
          </div>
          <div class="index-column">序号</div>
          <div>名字</div>
          <div>电话号码</div>
          <div>是否是站内用户</div>
        </div>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <div class="soa-list-rank__row rank-item">
          <div class="index-column">{{ slotProps.item.rowNum }}</div>
          <div>{{ slotProps.item.realName }}</div>
          <div>{{ slotProps.item.phone }}</div>
          <div>{{ slotProps.item.type }}</div>
        </div>
      </template>
    </list-layout>
    <van-popup
      v-if="isShowEditPopup"
      v-model="isShowEditPopup"
      :style="{ height: '100%' }"
      closeable
      class="soa-popup"
      position="bottom"
    >
      <van-form
        class="building-edit-form soa-custom-form"
        @submit="onSubmit">
        <van-field
          v-model="formData.realName"
          :rules="[{ required: true, message: '请输入姓名' }]"
          :required="true"
          maxlength="50"
          label="姓名"
          placeholder="请输入姓名"
        />
        <van-field
          v-model="formData.phone"
          :rules="[{ required: true, message: '请输入电话号码' }]"
          :required="true"
          maxlength="50"
          label="电话号码"
          placeholder="请输入电话号码"
        />
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import baseList from '../mixins/base-list'
export default {
  name: 'UserOutList',
  components: {
  },
  mixins: [baseList],
  props: {
    title: {
      type: String,
      default: '选择维修人员'
    },
    // 已选中的人
    ids: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchForm: {
        searchValue: null
      },
      formData: {
        realName: null,
        phone: null
      }
    }
  },
  computed: {
    system() {
      return this.$store.getters['core/system']
    }
  },
  methods: {
    loadData() {
      console.log(1111111111)
      this.pageNum++;
      const dataList = []
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          dataList.push({
            isCheck: this.ids && this.ids.includes(this.dataList.length + 1),
            isShowMore: false,
            id: this.dataList.length + 1,
            rowNum: this.dataList.length + 1,
            realName: '张三峰',
            phone: '18233422111',
            type: '是'
          });
        }
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = this.dataList.concat(dataList)
        // 数据全部加载完成
        if (this.dataList.length >= 20) {
          this.$refs.listLayout.finished = true
        }
      }, 1000)
      // this.$api.getBuildingList(this.searchParams).then(data => {
      //   // 加载状态结束
      //   this.$refs.listLayout.loading = false
      //   this.dataList = this.dataList.concat(data.rows)
      //   // 数据全部加载完成
      //   if (this.dataList.length >= data.total) {
      //     this.$refs.listLayout.finished = true
      //   }
      // })
    },
    add() {
      this.rowId = null
      this.isShowEditPopup = true
    },
    // 新增钉钉用户选人
    addDD() {
      this.$dd.biz.contact.complexPicker({
        title: '选择' + this.title,
        corpId: this.system.corpId,
        multiple: true, // 是否多选
        limitTips: '超出了最大人数',
        maxUsers: 2, // 最大可选人数
        pickedUsers: null, // 已选人员id数组，用于回显在选人页面
        pickedDepartments: null, // 已选部门id数组，用于回显在选人页面
        disabledUsers: null, // 不可选用户
        disabledDepartments: null, // 不可选部门
        requiredUsers: [],
        requiredDepartments: [],
        appId: '841409507',
        permissionType: 'xxx',
        responseUserOnly: true, // true：返回人员信息；false：返回人员和部门信息
        startWithDepartmentId: 0, // 0 表示从企业最上层开始；-1 表示从自己所在部门开始
        onSuccess: result => {
          console.group('钉钉选人与部门：');
          console.log(result);
          console.groupEnd();
          this.getUserList(result.users)
          // 选择的人员
          // if (result.users.length > 0) {
          //   this.people = result.users;
          // }
        },
        onFail: function (err) {
          // Toast(JSON.stringify(err))
          console.error(err);
        }
      });
    },
    // 循环获取用户基础信息（主要需要手机号码）
    getUserList(users) {
      if (users) {
        for (let i = 0; i < users.length; i++) {
          this.$api.getUserInfo({ userId: users.emplId }).then(data => {
            this.onSubmit({ realName: data.name, phone: data.mobile })
          })
        }
      }
    },
    handleRowClick(item) {
      this.rowId = item.id
      this.isShowEditPopup = true
    },
    // 保存
    onSubmit(obj) {
      // if (this.formData.id) {
      // }
    },
    // 选择确定
    sure() {
      const list = this.dataList.filter(item => item.isCheck)
      this.$emit('sure', list)
    }
  }
}
</script>

<style lang="scss">
.user-out-list {
  padding: 10px;
  height: 100%;
  .soa-list-rank__row {
    display: flex;
    & div {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
      &.index-column {
        width: 40px;
        flex: unset;
      }
      &.user-out-all-checkbox {
        width: 20px;
        flex: unset;
        margin-right: 10px;
      }
    }
    &.rank-item {
      width: 100%;
    }
    &.rank-title {
      padding: 10px 20px 10px 10px;
      border-bottom: #f5f5f5;
    }
  }
}
</style>
