<template>
  <van-uploader
    v-model="fileList"
    :after-read="afterRead"
    :before-delete="beforeDelete"
    :disabled="readOnly"
    :max-count="1"
    multiple
    config
    @before-read="beforeRead"
  />
</template>
<script>
import { Toast } from 'vant';
import { uuid32 } from '@/utils/index.js'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 附件标识
    value: {
      type: String,
      default: () => { }
    },
    // 业务模块类型，task，dorm
    type: {
      type: String,
      default: 'common'
    },
    // 已有的附件列表
    annexList: {
      type: Array,
      default: () => []
    },
    // 是否只读
    readOnly: {
      type: Boolean,
      default: false
    },
    // 最多可上传多少条数据
    maxCount: {
      type: Number,
      default: null
    },
    // TODO黑盒配置字段，config配置vant上传控件属性，将扁平化到vant-uploader上
    config: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      fileList: []
    };
  },
  mounted() {
    this.fileList = this.annexList || []
    if (!this.value) {
      this.onChangeFunc(uuid32())
    }
  },
  methods: {
    // 双向绑定附件标识
    onChangeFunc(value) {
      this.$emit('change', value);
      console.log(this.value, value)
    },
    afterRead(file) {
      console.log(this.value)
      // 上传
      this.$api.upload(file).then((data) => {
        data.annexId = this.value
        data.type = this.type
        // 关联上传的附件及该项业主的关联附件id
        this.$api.annex([data]).then((res) => {
          file.aid = res[0]
        }).catch((e) => { throw e })
      }).catch(() => {
        Toast('上传失败')
      })
    },
    beforeRead() {
    },
    beforeDelete(file) {
      if (this.readOnly) {
        return;
      }
      console.log(file)
      this.$api.deleteFile([file.aid]).then(() => {
        this.fileList.splice(this.fileList.indexOf(file), 1);
      }).catch(() => {
        Toast('删除失败')
      })
    }
  }
};
</script>
