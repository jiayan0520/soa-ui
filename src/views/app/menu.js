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
        to: './task-examine-list',
        label: '任务审核',
        icon: 'shenhe',
        type: 'warming'
      },
      // {
      //   to: './task-import',
      //   label: '导入任务',
      //   icon: 'daoru'
      // },
      {
        to: './task-rank',
        label: '任务榜',
        icon: 'paihang',
        type: 'success'
      }
    ]
  }
]

export default menu
