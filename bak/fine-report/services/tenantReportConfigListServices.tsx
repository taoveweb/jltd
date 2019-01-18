
const request=require("./request")
const tenantReportCfg:any={
  list: './tenantReportConfig/selectPage', // 列表查询
  detail: './tenantReportConfig/getDetail', // 列表查询
  save: './tenantReportConfig/save', // 新增
  update: './tenantReportConfig/save', // 编辑
  delete: './tenantReportConfig/remove', // 删除
  customEnabled: './tenantReportConfig/customEnabled',
  getCode: './tenantReportConfig/getCode',
  publish: './tenantReportConfig/publish',
  cancelPublish: './tenantReportConfig/cancelPublish',
};
export function create(params:any) {
  return request({
    url: tenantReportCfg.save,
    method: 'post',
    data: params,
  });
}

export function update(params:any) {
  return request({
    url: tenantReportCfg.update,
    method: 'post',
    data: params,
  });
}
export function getCode(params:any) {
  return request({
    url: tenantReportCfg.getCode,
    method: 'get',
    data: params,
  });
}

export function queryAll(params:any) {
  return request({
    url: tenantReportCfg.list,
    method: 'get',
    data: params,
  });
}

export function detail(params:any) {
  return request({
    url: tenantReportCfg.detail,
    method: 'get',
    data: params,
  });
}

export function removeAll(params:any) {
  return request({
    url: tenantReportCfg.delete,
    method: 'post',
    data: params,
  });
}

export function cancelPublish(params:any) {
  return request({
    url: tenantReportCfg.cancelPublish,
    method: 'post',
    data: params,
  });
}
export function publish(params:any) {
  return request({
    url: tenantReportCfg.publish,
    method: 'post',
    data: params,
  });
}
