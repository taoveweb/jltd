
const request=require("./request")
const reportCfg:any={
  list: './reportConfig/selectPage', // 列表查询
  detail: './reportConfig/getDetail', // 列表查询
  save: './reportConfig/save', // 新增
  update: './reportConfig/save', // 编辑
  delete: './reportConfig/remove', // 删除
  customEnabled: './reportConfig/customEnabled',
  getCode: './reportConfig/getCode',
  publish: './reportConfig/publish',
  cancelPublish: './reportConfig/cancelPublish',
}
export function create(params:any) {
  return request({
    url: reportCfg.save,
    method: 'post',
    data: params,
  });
}

export function update(params:any) {
  return request({
    url: reportCfg.update,
    method: 'post',
    data: params,
  });
}
export function getCode(params:any) {
  return request({
    url: reportCfg.getCode,
    method: 'get',
    data: params,
  });
}

export function queryAll(params:any) {
  return request({
    url: reportCfg.list,
    method: 'get',
    data: params,
  });
}

export function detail(params:any) {
  return request({
    url: reportCfg.detail,
    method: 'get',
    data: params,
  });
}

export function removeAll(params:any) {
  return request({
    url: reportCfg.delete,
    method: 'post',
    data: params,
  });
}

export function cancelPublish(params:any) {
  return request({
    url: reportCfg.cancelPublish,
    method: 'post',
    data: params,
  });
}
export function publish(params:any) {
  return request({
    url: reportCfg.publish,
    method: 'post',
    data: params,
  });
}
