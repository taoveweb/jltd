var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/* global window */
// @ts-ignore
import modelExtend from 'dva-model-extend';
import update from 'immutability-helper';
const queryString = require('query-string');
import * as reportConfigListServices from '../services/reportConfigListServices';
import { pageModel } from './common';
const dictCode = 'REPORT_TYPE';
const defaultState = {
    selectedRowKeys: [],
    currentItem: {},
    reportConfigVisible: false,
};
export default modelExtend(pageModel, {
    namespace: 'reportConfigList',
    state: defaultState,
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                let _dictFlag = false;
                // 进入页面刷新
                dispatch({ type: 'updateState', payload: defaultState });
                if (location.pathname === '/pms/report/ReportConfigList') {
                    dispatch({
                        type: 'updateState',
                        payload: defaultState,
                    });
                    const payload = queryString.parse(location.search) || {
                        pageNumber: 1,
                        pageSize: 10,
                    };
                    dispatch({
                        type: 'query',
                        payload: Object.assign({}, payload),
                    });
                    _dictFlag = true;
                }
                if (location.pathname === '/pms/report/ReportConfigList/Detail') {
                    const payload = queryString.parse(location.search);
                    if (payload.id) {
                        setTimeout(() => {
                            dispatch({
                                type: 'getDetail',
                                payload: {
                                    id: payload.id,
                                },
                            });
                        }, 500);
                    }
                    else {
                        dispatch({
                            type: 'getCode',
                        });
                    }
                    _dictFlag = true;
                }
                if (_dictFlag)
                    dispatch({
                        type: 'dictByCode/getDictByCode',
                        payload: { code: dictCode },
                    });
            });
        },
    },
    effects: {
        *showModal({ payload }, { put }) {
            yield put({
                type: 'updateState',
                payload: {
                    reportConfigVisible: true,
                    selectedRowKeys: [],
                },
            });
            yield put({
                type: 'query',
                payload: payload || {},
            });
        },
        *query({ payload }, { call, put }) {
            let { page, pageSize, pageNumber } = payload, other = __rest(payload, ["page", "pageSize", "pageNumber"]);
            pageSize = pageSize || 10;
            pageNumber = pageNumber || 1;
            const params = Object.assign({ pageSize,
                pageNumber }, other);
            const data = yield call(reportConfigListServices.queryAll, params);
            if (data.success && data.status !== -500 && !data.errorCode) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data,
                        pagination: {
                            current: Number(payload.page) || 1,
                            pageSize: Number(payload.pageSize) || 10,
                            total: data.rowsCount,
                        },
                    },
                });
            }
            else {
                throw data;
            }
        },
        *getDetail({ payload }, { call, put }) {
            const { id } = payload;
            const data = yield call(reportConfigListServices.detail, { id: id });
            // if (!data || !data.success) {
            //   throw data;
            // }
            yield put({
                type: 'Item',
                payload: {
                    currentItem: data,
                },
            });
        },
        *save({ payload }, { call }) {
            const data = yield call(reportConfigListServices.update, ...payload);
            if (data.success && data.errorCode != 600) {
            }
            else {
                throw data;
            }
        },
        *getCode(_, { call, put }) {
            const data = yield call(reportConfigListServices.getCode, {});
            if (data.success && data.status !== -500 && !data.errorCode) {
                yield put({
                    type: 'updateState',
                    payload: {
                        currentItem: {
                            reportCode: data.data,
                        },
                    },
                });
            }
            else {
                throw data;
            }
        },
        *multiDelete({ payload }, { call }) {
            const { infoList } = payload;
            const data = yield call(reportConfigListServices.removeAll, infoList);
            if (data.success && data.status !== -500 && data.errorCode !== 500) {
            }
            else {
                throw data;
            }
        },
        *publish({ payload }, { call }) {
            const { infoList } = payload;
            const data = yield call(reportConfigListServices.publish, infoList);
            if (data.success && data.status !== -500 && data.errorCode !== 500) {
            }
            else {
                throw data;
            }
        },
        *cancelPublish({ payload }, { call }) {
            const { infoList } = payload;
            const data = yield call(reportConfigListServices.cancelPublish, infoList);
            if (data.success && data.status !== -500 && data.errorCode !== 500) {
            }
            else {
                throw data;
            }
        },
    },
    reducers: {
        Item(state, { payload }) {
            const { currentItem } = payload;
            return update(state, {
                currentItem: { $set: currentItem },
            });
        },
    },
});
