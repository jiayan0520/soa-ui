<template>
  <div class="user-out-list">
    <list-layout
      ref="listLayout"
      :data-list="dataList"
      :is-show-bar="true"
      op-label="管理"
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
            type="info"
            @click="del">删除</van-button>
        </div>
        <form action="/">
          <van-search
            v-model="searchForm.seachKey"
            placeholder="姓名/电话号码"
            @search="onSearch"
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
          <div>是否站内用户</div>
        </div>
      </template>
      <template
        slot="item-content"
        slot-scope="slotProps">
        <div class="soa-list-rank__row rank-item">
          <div class="index-column">{{ slotProps.item.rowNum }}</div>
          <div>{{ slotProps.item.realName }}</div>
          <div>{{ slotProps.item.phone }}</div>
          <div>{{ slotProps.item.isSoaUser }}</div>
        </div>
      </template>
    </list-layout>
    <van-popup
      v-if="isShowEditPopup"
      v-model="isShowEditPopup"
      :style="{ height: '50%' }"
      closeable
      class="soa-popup"
      position="bottom"
    >
      <van-form
        class="building-edit-form soa-custom-form"
        @submit="onSubmit(null)">
        <van-field
          v-model="formData.realName"
          :rules="formDataRules.realName"
          :required="true"
          maxlength="50"
          label="姓名"
          placeholder="请输入姓名"
        />
        <van-field
          v-model="formData.phone"
          :rules="formDataRules.phone"
          :required="true"
          maxlength="50"
          label="电话号码"
          placeholder="请输入电话号码"
        />
        <van-divider />
        <div class="soa-btn-box">
          <van-button
            block
            type="info"
            native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import baseList from '../mixins/base-list'
import { outUserTypeEnum } from '../utils/dorm-enum'
import { checkMask } from '@/utils'
import { complexPicker } from '@/utils/ddApi'
import { Toast } from 'vant'
export default {
  name: 'UserOutList',
  components: {
  },
  mixins: [baseList],
  props: {
    type: {
      type: String,
      default: 'DORM_MANAGER'
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
        seachKey: null,
        roleType: this.type
      },
      formData: {
        realName: null,
        phone: null
      },
      formDataRules: {
        realName: [{ required: true, message: '请输入姓名' }],
        phone: [
          { required: true, message: '请输入手机号码' },
          { validator: (value) => {
            if (value) {
              return checkMask(value, /^1[3|4|5|6|7|8|9]\d{9}$/);
            }
          }, message: '手机号码格式不正确' }
        ]
      },
      title: ''
    }
  },
  computed: {
    system() {
      return this.$store.getters['core/system']
    }
  },
  created() {
    this.title = outUserTypeEnum[this.type].label
  },
  methods: {
    loadData() {
      this.$api.getUserOutList(this.searchForm).then(data => {
        data.rows.forEach((row, index) => {
          row.rowNum = index + 1
          row.isCheck = this.ids && this.ids.includes(row.id)
          row.isSoaUser = row.soaUserId ? '是' : '否'
        })
        // 加载状态结束
        this.$refs.listLayout.loading = false
        this.dataList = data.rows
        // 数据全部加载完成
        if (this.dataList.length >= data.total) {
          this.$refs.listLayout.finished = true
        }
      })
    },
    add() {
      this.rowId = null
      this.isShowEditPopup = true
    },
    // 新增钉钉用户选人
    async addDD() {
      const result = await complexPicker(this.system, this.title, 2)
      this.getUserList(result.users)
    },
    // 循环获取用户基础信息（主要需要手机号码）
    getUserList(users) {
      if (users) {
        for (let i = 0; i < users.length; i++) {
          this.$api.getUserInfo({ userId: users[i].emplId }).then(data => {
            this.onSubmit({ realName: data.name, phone: data.mobile })
          })
        }
      }
    },
    handleRowClick(item) {
      this.formData = JSON.parse(JSON.stringify(item))
      this.isShowEditPopup = true
    },
    // 保存
    onSubmit(obj) {
      let params = {}
      if (obj) {
        params = obj
      } else {
        params = this.formData
      }
      console.log(obj, params)
      if (params.id) {
        this.$api.updateUserOut({ ...params }).then(data => {
          Toast('修改成功')
          this.loadData()
          this.isShowEditPopup = false
        })
      } else {
        this.$api.addUserOut({ roleType: this.type, ...params }).then(data => {
          Toast('新增成功')
          this.loadData()
          this.isShowEditPopup = false
        })
      }
    },
    // 删除
    del(obj, id) {
      this.handleIdList(id, '删除', 'deleteUserOut')
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
      padding: 10px;
      border-bottom: #f5f5f5;
    }
  }
  // vant部分样式
  & + .van-popup__close-icon--top-right {
    top: 5px;
    right: 5px;
  }
}
</style>
