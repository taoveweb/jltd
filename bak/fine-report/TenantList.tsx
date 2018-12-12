import { connect } from 'dva';
import * as React from 'react';

import { Table } from './components';
import enums from './utils/enums';

require('./List.less');

const TenantList = ({
  tenantReportConfigList,
  loading,
  onChange,
  dispatch,
}: any) => {
  const { list, pagination, selectedRowKeys } = tenantReportConfigList;


  const columns = [
    {
      title: '租户名称',
      dataIndex: 'tenantName',
      key: 'tenantName',
      width: 180,
    },
    {
      title: '报表名称',
      dataIndex: 'reportName',
      key: 'reportName',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'isPermit',
      key: 'isPermit',
      width: 180,
      render: (text: any) => {
        return enums.getValue(enums.EnumEnableState, text);
      },
    },
    {
      title: '报表URL',
      dataIndex: 'reportUrl',
      key: 'reportUrl',
      width: 180,
    },
    {
      title: '配置参数',
      dataIndex: 'paramJson',
      key: 'paramJson',
      width: 450,
    },
  ];

  return (
    <Table
      // @ts-ignore
      dataSource={list}
      pagination={pagination}
      loading={loading.effects['tenantReportConfigList/query']}
      //className={classnames(styles.table)}
      columns={columns}
      rowKey={(record: any) => record.id}
      onChange={onChange}
      rowSelection={{
        selectedRowKeys,
        onChange: (keys: any) => {
          dispatch({
            type: 'tenantReportConfigList/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          });
        },
      }}
    />
  );
};

// export default List
export default connect(({ tenantReportConfigList, loading }: any) => ({
  tenantReportConfigList,
  loading,
}))(TenantList);
