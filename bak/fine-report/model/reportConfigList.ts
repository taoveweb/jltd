/* global window */
// @ts-ignore
import modelExtend from 'dva-model-extend';
import update from 'immutability-helper';
const queryString =require('query-string');

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
    setup({ dispatch, history }: any) {
      history.listen((location: any) => {
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
            payload: {
              ...payload,
            },
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
          } else {
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
    *showModal({ payload }: any, { put }: any) {
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

    *query({ payload }: any, { call, put }: any) {
      let { page, pageSize, pageNumber, ...other } = payload;
      pageSize = pageSize || 10;
      pageNumber = pageNumber || 1;
      const params = {
        pageSize,
        pageNumber,
        ...other,
      };

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
      } else {
        throw data;
      }
    },

    *getDetail({ payload }: any, { call, put }: any) {
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

    *save({ payload }: any, { call }: any) {
      const data = yield call(reportConfigListServices.update, ...payload);
      if (data.success && data.errorCode != 600) {
      } else {
        throw data;
      }
    },

    *getCode(_:any, { call, put }: any) {
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
      } else {
        throw data;
      }
    },

    *multiDelete({ payload }: any, { call }: any) {
      const { infoList } = payload;
      const data = yield call(reportConfigListServices.removeAll, infoList);

      if (data.success && data.status !== -500 && data.errorCode !== 500) {
      } else {
        throw data;
      }
    },

    *publish({ payload }: any, { call }: any) {
      const { infoList } = payload;

      const data = yield call(reportConfigListServices.publish, infoList);

      if (data.success && data.status !== -500 && data.errorCode !== 500) {
      } else {
        throw data;
      }
    },
    *cancelPublish({ payload }: any, { call }: any) {
      const { infoList } = payload;
      const data = yield call(reportConfigListServices.cancelPublish, infoList);

      if (data.success && data.status !== -500 && data.errorCode !== 500) {
      } else {
        throw data;
      }
    },
  },

  reducers: {
    Item(state: any, { payload }: any) {
      const { currentItem } = payload;
      return update(state, {
        currentItem: { $set: currentItem },
      });
    },
  },
});
