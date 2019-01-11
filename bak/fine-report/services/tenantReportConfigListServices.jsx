const request = require("./request");
const tenantReportCfg = {
    list: './tenantReportConfig/selectPage',
    detail: './tenantReportConfig/getDetail',
    save: './tenantReportConfig/save',
    update: './tenantReportConfig/save',
    delete: './tenantReportConfig/remove',
    customEnabled: './tenantReportConfig/customEnabled',
    getCode: './tenantReportConfig/getCode',
    publish: './tenantReportConfig/publish',
    cancelPublish: './tenantReportConfig/cancelPublish',
};
export function create(params) {
    return request({
        url: tenantReportCfg.save,
        method: 'post',
        data: params,
    });
}
export function update(params) {
    return request({
        url: tenantReportCfg.update,
        method: 'post',
        data: params,
    });
}
export function getCode(params) {
    return request({
        url: tenantReportCfg.getCode,
        method: 'get',
        data: params,
    });
}
export function queryAll(params) {
    return request({
        url: tenantReportCfg.list,
        method: 'get',
        data: params,
    });
}
export function detail(params) {
    return request({
        url: tenantReportCfg.detail,
        method: 'get',
        data: params,
    });
}
export function removeAll(params) {
    return request({
        url: tenantReportCfg.delete,
        method: 'post',
        data: params,
    });
}
export function cancelPublish(params) {
    return request({
        url: tenantReportCfg.cancelPublish,
        method: 'post',
        data: params,
    });
}
export function publish(params) {
    return request({
        url: tenantReportCfg.publish,
        method: 'post',
        data: params,
    });
}
