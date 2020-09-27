import { Dialog, Toast } from 'vant'
import dayjs from 'dayjs';
export default {
  prop: {
  },
  data() {
    return {
      showCheckMoreIndex: -1, // 显示更多的行index
      showCheckPopup: false,
      moreOpCheckList: [
        { value: 'edit', label: '编辑' },
        { value: 'del', label: '删除' }
      ],
      checkLoading: false,
      checkFinished: false,
      pageNum: 0,
      pageSize: 5,
      checkList: [],
      currentCheckId: null, // 检查对象id
      currentCheck: null, // 检查对象
      isCheckDetail: false,
      hasParent: false
    }
  },
  mounted() {
  },
  methods: {
    // 检查项新增修改，删除时重新刷
    againResultList() {
      this.checkList = []
      this.pageNum = 0
      this.checkLoading = true
      this.getResultList()
    },
    // 获取用户检查列表
    getResultList() {
      if (this.checkLoading) {
        this.showMoreIndex = -1
        this.showCheckMoreIndex = -1
        this.pageNum++
        this.$api[this.apiMethod]({ ...this.checkParams, pageNum: this.pageNum, pageSize: this.pageSize }).then(data => {
          const rows = data.rows.map(row => {
            row.checkTime = dayjs(row.checkTime).format('YYYY年MM月DD日 HH:mm')
            return row
          })
          this.checkList = this.checkList.concat(rows)
          // 加载状态结束
          this.checkLoading = false
          // 数据全部加载完成
          if (this.checkList.length >= data.total) {
            this.checkFinished = true
          }
        })
      }
    },
    // 检查项更多操作
    bindCheckMoreClick(index) {
      this.showMoreIndex = -1
      this.showCheckMoreIndex = this.showCheckMoreIndex === index ? -1 : index
    },
    // 检查项点击更多操作按钮了
    clickCheckMoreBtn(val, item) {
      switch (val) {
        case 'edit':
          this.currentCheckId = item.id
          this.currentCheck = item
          this.isCheckDetail = false
          this.showCheckPopup = true
          this.hasParent = !!item.parentId
          break
        case 'del':
          Dialog.confirm({
            title: `确认删除？`,
            message: `确定删除该检查项，删除的数据无法恢复`
          }).then(() => {
            this.$api.deleteResult(item.id).then(res => {
              Toast(`删除成功！`);
              this.againResultList()
            }).catch(error => {
              Toast.fail(`删除失败！` + error);
            })
          })

          break
      }
      this.showMoreIndex = -1
    },
    // 新增宿舍检查
    clickCheckBtn() {
      this.currentCheckId = null
      this.isCheckDetail = false
      this.showCheckPopup = true
    },
    // 关闭检查项的弹框
    closeCheckPopop(flag) {
      this.showMoreIndex = -1
      flag && this.againResultList()
      this.showCheckPopup = false
    },
    // 弹检查详情框
    showCheckDetail(item) {
      this.currentCheck = item
      this.currentCheckId = item.id
      this.isCheckDetail = true
      this.showCheckPopup = true
      this.hasParent = !!item.parentId
    }
  }
}
