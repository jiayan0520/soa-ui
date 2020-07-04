const menu = [
  {
    header: '任务管理',
    list: [
      {
        to: './taskAdd',
        label: '新建任务',
        icon: 'icon_compile'
      },
      {
        to: './taskList',
        label: '任务列表',
        icon: 'icon_calendar'
      },
      {
        to: './taskExamineList',
        label: '任务审核',
        icon: 'shenhe',
        type: 'warming'
      },
      {
        to: './taskImport',
        label: '导入任务',
        icon: 'daoru'
      },
      {
        url: 'https://www.baidu.com/',
        label: '任务榜',
        icon: 'paihang',
        type: 'success'
      }
    ]
  }
]

export default menu
