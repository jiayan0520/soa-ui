const menu = [
  {
    header: '任务管理',
    list: [
      {
        to: './task-add',
        label: '新建任务',
        icon: 'icon_compile'
      },
      {
        to: './task-list',
        label: '任务列表',
        icon: 'icon_calendar'
      },
      {
        to: './task-import',
        label: '导入任务',
        icon: 'daoru'
      },
      {
        to: './task-examine-list',
        label: '任务审核',
        icon: 'shenhe',
        type: 'warming'
      },
      {
        to: './task-rank',
        label: '任务榜',
        icon: 'paihang',
        type: 'success'
      }
    ]
  },
  {
    header: '宿舍管理',
    list: [
      {
        to: './dorm',
        label: '宿舍列表',
        icon: 'dorm'
      },
      {
        to: './dorm/unallocated',
        label: '未分配人员',
        icon: 'kuaisufenpei'
      },
      {
        to: './dorm-examine-list',
        label: '导入宿舍',
        icon: 'daoru'
      },
      {
        to: './dorm/exchange',
        label: '调换审核',
        icon: 'shenhe',
        type: 'warming'
      },
      {
        to: './dorm-rank',
        label: '检查信息',
        icon: 'checklist',
        type: 'success'
      },
      {
        to: './dorm-count',
        label: '检查信息统计',
        icon: 'results',
        type: 'success'
      },
      {
        to: './dorm-rank',
        label: '评分榜',
        icon: 'paihang',
        type: 'success'
      }
    ]
  }
];

export default menu
