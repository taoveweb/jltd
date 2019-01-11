const request = require("./request");
const reportCfg = {
    list: './reportConfig/selectPage',
    detail: './reportConfig/getDetail',
    save: './reportConfig/save',
    update: './reportConfig/save',
    delete: './reportConfig/remove',
    customEnabled: './reportConfig/customEnabled',
    getCode: './reportConfig/getCode',
    publish: './reportConfig/publish',
    cancelPublish: './reportConfig/cancelPublish',
};
export function create(params) {
    return request({
        url: reportCfg.save,
        method: 'post',
        data: params,
    });
}
export function update(params) {
    return request({
        url: reportCfg.update,
        method: 'post',
        data: params,
    });
}
export function getCode(params) {
    return request({
        url: reportCfg.getCode,
        method: 'get',
        data: params,
    });
}
export function queryAll(params) {
    return request({
        url: reportCfg.list,
        method: 'get',
        data: params,
    });
}
export function detail(params) {
    return request({
        url: reportCfg.detail,
        method: 'get',
        data: params,
    });
}
export function removeAll(params) {
    return request({
        url: reportCfg.delete,
        method: 'post',
        data: params,
    });
}
export function cancelPublish(params) {
    return request({
        url: reportCfg.cancelPublish,
        method: 'post',
        data: params,
    });
}
export function publish(params) {
    return request({
        url: reportCfg.publish,
        method: 'post',
        data: params,
    });
}
