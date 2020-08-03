import Mock from 'mockjs';
// import { param2Obj } from 'sky-engine/utils'

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      'id|1-2000': 1,
      'cloudDesktopState|1': [
        'creating',
        'running'
      ],
      number: '@increment',
      userName: '@cname',
      userGroup: '@ctitle(1, 5)',
      ip: '@ip',
      mac: /[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/,
      display_time: '@datetime',
      isoFileSize: '@float(0, 5, 2, 2)' + 'G'
    })
  );
}

export default {
  fetch: config => {
    const params = JSON.parse(config.body);
    const {
      importance,
      type,
      title,
      limit = 20,
      sort,
      filterBy,
      filterStr
    } = params;

    // const { importance, type, title, page = 1, limit = 20, sort, filterBy, filterStr } = JSON.parse(config.body)
    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false;
      if (type && item.type !== type) return false;
      if (title && item.title.indexOf(title) < 0) return false;
      if (filterBy && item[filterBy].indexOf(filterStr) < 0) return false;
      return true;
    });

    if (sort === '-id') {
      mockList = mockList.reverse();
    }
    let page = params.page;
    page = page + 1;
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );

    return {
      content: {
        total: mockList.length,
        items: pageList
      },
      status: 'SUCCESS'
    };
  },
  getUserId: config => {
    const result = {
      content: {
        userId: 163447243721147282
      },
      code: 1,
      msg: 'create is success'
    };
    return result;
  },
  getUserInfo: config => {
    const result = {
      content: {
        userId: 163447243721147282
      },
      code: 1,
      msg: 'create is success'
    };
    return result;
  },
  sign: config => {
    const result = {
      content: {
        AccessToken: '68d5ed415bf13a0c85c18342fee7b1dd',
        corpId: 'ding424c9303b402c60835c2f4657eb6378f',
        TOKEN: 'token',
        agentId: 270738754,
        nonceStr: 'eb6378f',
        signature: 'eb6378f'
      },
      code: 1,
      msg: 'create is success'
    };
    return result;
  },
  getTaskStatisticsList: config => {
    const result = {
      'content': {
        'itemArr': [
          {
            'averageScore': 0,
            'finishNumber': 0,
            'id': '',
            'name': '张三三',
            'serialNumber': 0,
            'totalScore': 0
          },
          {
            'averageScore': 0,
            'finishNumber': 0,
            'id': '',
            'name': '李思思',
            'serialNumber': 0,
            'totalScore': 0
          }
        ],
        'total': 1
      },
      'message': ''
    }
    return result;
  }
};
