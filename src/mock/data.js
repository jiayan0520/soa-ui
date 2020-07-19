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
  create: config => {
    const data = JSON.parse(config.body);
    console.log(data);
    const result = {
      data: 'success',
      code: 0,
      msg: 'create is success'
    };
    return result;
  }
};
