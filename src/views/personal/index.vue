<template>
  <div class="soa-personal">
    <van-form
      class="soa-personal-form"
      @submit="onSubmit">
      <van-field
        :readonly="true"
        v-model="user.avatar"
        center
        label="头像"
        right-icon="arrow"
        placeholder="请选择"
      >
        <template #input>
          <div>
            <img
              v-if="user.avatar"
              :src="user.avatar"
              class="soa-avatar" >
            <div
              v-else
              class="soa-avatar">{{ user.name.substr(-2,2) }}</div>
          </div>
        </template>
      </van-field>
      <van-field
        :readonly="true"
        v-model="user.name"
        center
        label="用户名"
        right-icon="arrow"
        placeholder="请选择"
        @click="showNamePopup = true"
      />
      <van-field
        :readonly="true"
        v-model="user.mobile"
        center
        label="手机号码"
      />
      <van-field
        :readonly="true"
        v-model="user.name"
        center
        label="主组织机构"
        right-icon="arrow"
        placeholder="请选择"
        @click="showNamePopup = true"
      />
    </van-form>
    <van-popup
      v-model="showNamePopup"
      class="soa-peronal-popup">
      <div class="title">请输入</div>
      <input v-model="user.name">
      <div class="btn-box">
        <div @click="showNamePopup=false">取消</div>
        <div @click="showNamePopup=false">确定</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showNamePopup: false
    }
  },
  computed: {
    user() {
      return this.$store.getters['core/user']
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>
<style lang="scss">
.soa-personal {
  width: 100%;
  height: 100%;
  .van-field {
    display: flex;
    justify-content: space-between;
    .van-cell__value {
      flex: unset;
      .van-field__control {
        text-align: right;
      }
      .soa-avatar{
        width: 35px;
        height: 35px;
        margin-right: 0;
      }
    }
  }
  .soa-peronal-popup {
    width: 260px;
    border-radius: 10px;
    text-align: center;
    .title {
      text-align: center;
      font-size: 15px;
      line-height: 42px;
    }
    input {
      width: 90%;
      height: 28px;
      line-height: 28px;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 0 5px;
    }
    .btn-box {
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      > div {
        margin-top: 10px;
        width: 50%;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        &:first-child {
          border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>
