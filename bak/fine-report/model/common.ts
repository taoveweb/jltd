// @ts-ignore
import modelExtend from 'dva-model-extend';

export const model = {
  reducers: {
    updateState(state:any, { payload }:any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total:any) => `总共 ${total} 个项目`,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  reducers: {
    querySuccess(state:any, { payload }:any) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },
});

