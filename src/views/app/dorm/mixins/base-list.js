import listLayout from '@/components/listLayout'
import { Dialog, Toast } from 'vant'
export default {
  components: {
    listLayout
  },
  data() {
    return {
      isShowBar: false, // 是否展示checkbox框
      isShowSearch: false, // 是否展示搜索弹框
      isShowEditPopup: false, // 是否展示宿舍编辑弹框
      isShowDetailPopup: false, // 是否展示宿舍详情弹框
      rowId: null, // 当前编辑的id
      pageSize: 20, // 每页行数
      pageNum: 0, // 当前页码 total 总条数
      dataList: [],
      isCheckAll: false, // 列表选中全部
      showMore: false // 更多操作
    }
  },
  computed: {
    searchParams() {
      return {
        ...this.searchForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
    }
  },
  created() {

  },
  mounted() {
    // if (window.history && window.history.pushState) {
    //   history.pushState(null, null, document.URL);
    //   window.addEventListener('popstate', this.popstate, false)
    // }
  },
  methods: {
    popstate(evt) {
      console.log(1111, this.searchForm.isFull)
      // const state = evt.state
      // const keys = Object.keys(this.searchForm)
      // keys.forEach(element => {
      //   this.searchForm[element] = state[element] || this.searchForm[element]
      // })
      // this.pageNum = state.pageNum || this.pageNum
      // this.pageSize = state.pageSize || this.pageSize
      // this.searchForm.isFull = 0
      // console.log(222, this.searchForm.isFull)
      this.onSearch()
      this.$forceUpdate()
    },
    onSearch() {
      this.pageNum = 0
      this.dataList = []
      this.loadData()
    },
    cancelSearch() {
      this.isShowSearch = false
      this.onSearch()
    },
    // tab便签点击切换路由
    tabClick(value) {
      switch (value) {
        case 1:
          this.$router.push('/dorm/bedList')
          break
        case 2:
          this.$router.push('/dorm/dormList')
          break
        case 3:
          this.$router.push('/dorm/buildingList')
          break
      }
    },
    // 取消管理
    cancalManage() {
      this.isCheckAll = false
      this.dataList.forEach((item, index) => {
        item.isCheck = this.isCheckAll
      });
      this.isShowBar = false
    },
    // 复选框选择所有
    changeCheckAll() {
      this.isCheckAll = !this.isCheckAll
      this.dataList.forEach((item, index) => {
        item.isCheck = this.isCheckAll
      });
    },
    // 行中的复选框变化了
    changeRowCheckbox(val) {
      if (!val) {
        this.isCheckAll = false
      } else {
        this.isCheckAll = !this.dataList.some(item => item.isCheck === false) // 全部是选中
      }
    },
    // 行点击弹详情框
    handleRowClick(item) {
      this.rowId = item.id
      this.isShowDetailPopup = true
    },
    // 关闭弹框
    closePopup(isload) {
      this.isShowEditPopup = false
      this.isShowDetailPopup = false
      this.showMore = false
      if (isload) {
        this.onSearch()
      }
    },
    // 获取需要操作的idlist
    handleIdList(id, opLabel, method) {
      let idList = []
      if (id) {
        idList = [id]
      } else {
        if (!this.isCheckAll) {
          idList = this.dataList.filter(item => item.isCheck).map(item => { return item.id })
          if (idList.length <= 0) {
            Toast(`请选中一条要${opLabel}的记录！`);
            return;
          }
        }
      }
      // 全部删除？ 需要做二次确认
      if (this.isCheckAll) {
        Dialog.confirm({
          title: `确定全部${opLabel}？`,
          message: `全部${opLabel}，${opLabel}的数据无法恢复，请慎重！`
        }).then(() => {
          Dialog.confirm({
            title: `二次确认，全部${opLabel}？`,
            message: `全部${opLabel}，${opLabel}的数据无法恢复，请慎重！`
          }).then(() => {
            this.$api[method]({ ids: idList.join(','), isCheckAll: this.isCheckAll }).then(res => {
              Toast(`全部${opLabel}成功`);
              this.onSearch()
            }).catch(error => {
              Toast(`${opLabel}失败！` + error);
            })
          })
        })
      } else {
        Dialog.confirm({
          title: `确认${opLabel}？`,
          message: `此次选中${idList.length}条记录，${opLabel}的数据无法恢复`
        }).then(() => {
          this.$api[method]({ ids: idList.join(','), isCheckAll: false }).then(res => {
            Toast(`${opLabel}成功，此次共操作${idList.length}条记录！`);
            this.onSearch()
          }).catch(error => {
            Toast(`${opLabel}失败！` + error);
          })
        })
      }
    }
    // 新增
    // add() {
    //   this.$router.push(this.editUrl)
    //   // var qs = [] // url参数
    //   // 只添加参数时，默认还是当前页面html
    //   // history.pushState(this.searchParams, '', '?' + qs.join('&'))
    //   window.history.pushState(this.searchParams, 'newTitle', '');
    // }
  }
  // destroyed() {
  //   window.removeEventListener('popstate', this.popstate, false);
  // }
}
