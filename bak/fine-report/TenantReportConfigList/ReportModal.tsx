import { message, Modal, Table } from 'antd';
import { SearchView } from '../components';
import { connect } from 'dva';
import * as React from 'react';

const ReportModal = ({
  dispatch,
  loading,
  reportConfigList,
  onCancel,
  onOk,
}: any) => {
  const {
    list,
    pagination,
    selectedRowKeys,
    reportConfigVisible,
  } = reportConfigList;

  const handleRefresh = (newQuery?: any) => {
    dispatch({
      type: 'reportConfigList/query',
      payload: {
        isTenant: 1,
        ...newQuery,
      },
    });

    dispatch({
      type: 'reportConfigList/updateState',
      payload: { selectedRowKeys: [] },
    });
  };

  const onSearchClick = (value: any) => {
    handleRefresh({
      ...value,
      pageNumber: 1,
    });
  };

  const controllerList = [
    {
      id: 'selectType',
      type: 'select',
      optionData: [{ key: 'reportName', value: '报表名称' }],
      value: 'reportName',
    },
    {
      id: 'reportName',
      type: 'input',
      value: '',
    },
  ];

  const columns = [
    {
      title: '报表编号',
      dataIndex: 'reportCode',
      key: 'reportCode',
      width: 280,
    },
    {
      title: '报表名称',
      dataIndex: 'reportName',
      key: 'reportName',
      width: 380,
    },
  ];

  const tableProps = {
    columns,
    dataSource: list,
    loading: loading.effects['reportConfigList/query'],
    pagination: pagination,
    location,

    onChange(page: any) {
      handleRefresh({
        pageNumber: page.current,
        pageSize: page.pageSize,
      });
    },
    rowSelection: {
      fixed: true,
      selectedRowKeys: selectedRowKeys,
      hideDefaultSelections: true,
      onChange: (keys: any) => {
        dispatch({
          type: 'reportConfigList/updateState',
          payload: {
            selectedRowKeys: keys[keys.length - 1]
              ? [keys[keys.length - 1]]
              : [],
          },
        });
      },
    },
    scroll: { y: 300 },
  };

  const handleOk = () => {
    if (!selectedRowKeys || !selectedRowKeys.length) {
      message.error('请选中一条记录');
      return;
    }
    const index = selectedRowKeys[0];
    onOk(list[index]);
  };

  // TODO:宽
  return (
    <Modal
      title={'报表模板列表'}
      destroyOnClose
      visible={reportConfigVisible}
      onOk={handleOk}
      onCancel={onCancel}
      width={920}
    >
      <SearchView
        notClear
        onSearchClick={onSearchClick}
        searchViewList={controllerList}
      />
      <Table
        {...tableProps}
        rowKey={(record:any) => record.id} // todo
      />
    </Modal>
  );
};

export default connect(({ loading, reportConfigList }: any) => ({
  loading,
  reportConfigList,
}))(ReportModal);
