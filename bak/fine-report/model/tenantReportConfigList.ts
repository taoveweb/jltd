/* global window */
// @ts-ignore
import modelExtend from 'dva-model-extend';
import update from 'immutability-helper';
// @ts-ignore
import queryString from 'query-string';

import * as tenantReportConfigListServices from '../services/tenantReportConfigListServices';

import { pageModel } from './common';

const defaultState = {
  selectedRowKeys: [],
  currentItem: {},
};

export default modelExtend(pageModel, {
  namespace: 'tenantReportConfigList',

  state: defaultState,

  subscriptions: {
    setup({ dispatch, history }: any) {
      history.listen((location: any) => {
        // 进入页面刷新
        dispatch({ type: 'updateState', payload: defaultState });
        if (location.pathname === '/pms/report/TenantReportConfigList') {
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
        }
        if (location.pathname === '/pms/report/TenantReportConfigList/Detail') {
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
        }
      });
    },
  },
  effects: {
    *query({ payload }: any, { call, put }: any) {
      let { page, pageSize, pageNumber, ...other } = payload;
      pageSize = pageSize || 10;
      pageNumber = pageNumber || 1;
      const params = {
        pageSize,
        pageNumber,
        ...other,
      };

      const data = yield call(tenantReportConfigListServices.queryAll, params);

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

      const data = yield call(tenantReportConfigListServices.detail, {
        id: id,
      });

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
      const data = yield call(
        tenantReportConfigListServices.update,
        ...payload,
      );
      if (data.success && data.errorCode != 600) {
      } else {
        throw data;
      }
    },

    *multiDelete({ payload }: any, { call }: any) {
      const { infoList } = payload;
      const data = yield call(
        tenantReportConfigListServices.removeAll,
        infoList,
      );

      if (data.success && data.status !== -500 && data.errorCode !== 500) {
      } else {
        throw data;
      }
    },

    *publish({ payload }: any, { call }: any) {
      const { infoList } = payload;

      const data = yield call(tenantReportConfigListServices.publish, infoList);

      if (data.success && data.status !== -500 && data.errorCode !== 500) {
      } else {
        throw data;
      }
    },
    *cancelPublish({ payload }: any, { call }: any) {
      const { infoList } = payload;
      const data = yield call(
        tenantReportConfigListServices.cancelPublish,
        infoList,
      );

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
