<template>
  <div class="dorm-import">
    <van-nav-bar title="宿舍数据" />
    <van-form class="soa-task-add">
      <van-field
        :readonly="true"
        label="示例">
        <template slot="input">
          <a
            href="/宿舍导入模板.xlsx"
            class="c-info">导入示例下载</a>
        </template>
      </van-field>
      <van-field
        v-model="dormFiles"
        :readonly="true"
        label="导入">
        <template #input>
          <van-uploader
            v-model="dormFileList"
            :max-count="1"
            upload-icon="upgrade"
            accept="*" />
        </template>
      </van-field>
    </van-form>
    <div class="soa-btn-box">
      <van-button
        block
        type="info"
        @click="dormSubmit">导入</van-button>
    </div>
    <van-divider />
    <van-nav-bar title="入住数据" />
    <van-form class="soa-task-add">
      <van-field
        :readonly="true"
        label="示例">
        <template slot="input">
          <a
            href="/images/myw3schoolimage.jpg"
            download="w3logo"
            class="c-info">导入示例下载</a>
        </template>
      </van-field>
      <van-field
        v-model="userFiles"
        :readonly="true"
        label="导入">
        <template #input>
          <van-uploader
            v-model="userFileList"
            :max-count="1"
            upload-icon="upgrade"
            accept="*" />
        </template>
      </van-field>
    </van-form>
    <div class="soa-btn-box">
      <van-button
        block
        type="info"
        @click="userSubmit">导入</van-button>
    </div>
    <van-popup
      v-model="isShowDormErrDialog"
      :style="{ height: '100%' }"
      position="bottom"
      closeable
      class="soa-popup soa-popup__import"
    >
      <div>
        <div class="title">报错信息如下：</div>
        <van-list>
          <div class="soa-list-row">
            <div>宿舍类型</div>
            <div>楼号</div>
            <div>房间号</div>
            <div>宿舍人数</div>
            <div>床位编号格式</div>
            <div>床位号</div>
            <div>宿舍费用/人/年(元)</div>
            <div>错误信息</div>
          </div>
          <div
            v-for="item in dormErrData"
            :key="item"
            class="soa-list-row">
            <div>{{ item.dormType }}</div>
            <div>{{ item.buildingName }}</div>
            <div>{{ item.dormName }}</div>
            <div>{{ item.peopleNum }}</div>
            <div>{{ item.bedFormatType }}</div>
            <div>{{ item.bedNames }}</div>
            <div>{{ item.singleFee }}</div>
            <div>{{ item.result }}</div>
          </div>
        </van-list>
      </div>
    </van-popup>
    <van-popup
      v-model="isShowUserErrDialog"
      :style="{ height: '100%' }"
      position="bottom"
      closeable
      class="soa-popup soa-popup__import"
    >
      <div>
        <div class="title">报错信息如下：</div>
        <van-list>
          <div class="soa-list-row">
            <div>楼号</div>
            <div>房间号</div>
            <div>床位号</div>
            <div>错误信息</div>
          </div>
          <div
            v-for="item in userErrData"
            :key="item"
            class="soa-list-row">
            <div>{{ item.buildingName }}</div>
            <div>{{ item.dormName }}</div>
            <div>{{ item.bedName }}</div>
            <div>{{ item.result }}</div>
          </div>
        </van-list>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'DormImport',
  data() {
    return {
      userFiles: '',
      userFileList: [],
      isShowUserErrDialog: false,
      userErrData: [],
      dormFiles: '',
      dormFileList: [],
      isShowDormErrDialog: false,
      dormErrData: []
    }
  },
  methods: {
    userSubmit() {
      console.log(this.userFileList)
      Toast.loading('导入入住信息中，请稍后...')
      this.$api.importDormUser(this.userFileList[0]).then(data => {
        console.log(data)
        Toast('导入成功')
        this.userFileList = []
      }).catch(err => {
        console.log(err)
        if (err.data) {
          this.userErrData = err.data
          this.isShowUserErrDialog = true
        } else if (err.msg) {
          // Toast('导入的模版不是正规模版，请下载模版填写数据再上报！')
        } else {
          Toast('导入的模版不是正规模版，请下载模版填写数据再上报！')
        }
      })
    },
    dormSubmit() {
      console.log(this.dormFileList)
      Toast.loading('导入宿舍信息中，请稍后...')
      this.$api.importDorm(this.dormFileList[0]).then(data => {
        console.log(data)
        Toast('导入成功')
        this.dormFileList = []
      }).catch(err => {
        console.log(err)
        if (err.data) {
          this.dormErrData = err.data
          this.isShowDormErrDialog = true
        } else if (err.msg) {
          // Toast('导入的模版不是正规模版，请下载模版填写数据再上报！')
        } else {
          Toast('导入的模版不是正规模版，请下载模版填写数据再上报！')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.dorm-import {
  .soa-popup__import {
    > div {
      overflow: auto;
      padding-top: 30px;
      .title {
        line-height: 40px;
      }
      .soa-list-row {
        display: flex;
        > div {
          flex: 1;
        }
      }
    }
  }
}
</style>
