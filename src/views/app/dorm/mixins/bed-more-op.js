import { Dialog, Toast } from 'vant'
import { complexPicker, ding } from '@/utils/ddApi'
export default {
  prop: {
  },
  data() {
    return {
      isDetail: true,
      moreOpList: [
        { value: 'qc', label: '导出二维码' },
        { value: 'set', label: '设为舍长' },
        { value: 'out', label: '退舍' },
        { value: 'remind', label: '提醒' },
        { value: 'allot', label: '分配' },
        { value: 'del', label: '删除' }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters['core/user'] || {};
    },
    system() {
      return this.$store.getters['core/system']
    }
  },
  mounted() {
  },
  methods: {
    // 人员更多操作
    bindMoreClick(index) {
      this.showCheckMoreIndex = -1
      this.showMoreIndex = this.showMoreIndex === index ? -1 : index
    },
    // 人员点击更多操作按钮了
    clickMoreBtn(val, item) {
      switch (val) {
        // 导出二维码
        case 'qc':
          this.$api.getBedQRCodeImgs({ ids: item.id, isCheckAll: false }).then(res => {
            console.log(res)
            res = this.system.tcBaseUrl + '/profile/bedQrCode/zip/1599740350883.zip'
            window.open(res)
            Toast(`导出成功`);
            this.onSearch()
          }).catch(error => {
            Toast(`导出失败！` + error);
          })
          break
        case 'set':
          // 设置舍长
          this.$api.setDromManager({ dormId: item.dormId, userId: item.userId }).then(res => {
            this.loadAgain()
          })
          break
        case 'allot':
          // 分配宿舍
          this.allotBed(item.id)
          break
        case 'del':
          this.delBed(item.id)
          break
        case 'remind':
          this.remind(item)
          break
        case 'out':
          this.outBed(item.id)
          break
      }
      this.showMoreIndex = -1
    },
    // 列表中操作按钮根据每条数据来判断
    showMoreOpItem(item, btn, callback) {
      let isShow = true
      switch (btn.value) {
        case 'qc': {
          break
        }
        case 'allot':
        case 'del':
          if (item.userId) {
            isShow = false
          }
          break
        case 'set':
          isShow = false
          if (item.userId && !item.isDormManager) {
            isShow = true
          }
          break
        case 'remind':
          isShow = false
          if (item.userId && item.status === 'NOACTIVE') {
            isShow = true
          }
          break
        case 'out':
          isShow = false
          if (item.userId) {
            isShow = true
          }
          break
      }
      callback && callback(isShow)
      return isShow
    },
    // 提醒
    remind(item) {
      ding(this.system, [item.userId], '您当前的状态未激动，请及时扫描激活!')
    },
    // 分配宿舍
    async allotBed(bedId) {
      const result = await complexPicker(this.system, '学生', 1)
      this.$api.allotBed({ bedId: bedId, userId: result.users[0].emplId }).then(res => {
        this.loadAgain()
      })
    },
    // 退宿舍
    outBed(id) {
      Dialog.confirm({
        title: `确认退舍？`,
        message: `确定将该学生从该床位退舍`
      }).then(() => {
        this.$api.outBed({ ids: id }).then(res => {
          Toast(`退舍成功！`);
          this.loadAgain()
        }).catch(error => {
          Toast(`退舍失败！` + error);
        })
      })
    },
    // 删除床位
    delBed(id) {
      Dialog.confirm({
        title: `确认删除？`,
        message: `确定删除该床位，删除的数据无法恢复`
      }).then(() => {
        this.$api.deleteBed({ ids: id }).then(res => {
          Toast(`删除成功！`);
          this.loadAgain()
        }).catch(error => {
          Toast(`删除失败！` + error);
        })
      })
    },
    loadAgain() {
      if (this.isDetail) {
        this.getDetail()
      } else {
        this.onSearch()
      }
    }
  }
}
