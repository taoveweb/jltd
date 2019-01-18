import { message, Modal, Table } from 'antd';
//import { SearchView } from 'components';
import { connect } from 'dva';
import * as React from 'react';
import { SearchView } from '../components';

// 所属企业账户
const TenantModal = ({
  dispatch,
  loading,
  tenant,
  onCancel,
  onOk,
  isQuote,
}: any) => {
  const {
    tenantList,
    tenantPagination,
    selectedTenantKeys,
    tenantVisible,
  } = tenant;

  const handleRefresh = (newQuery?: any) => {
    dispatch({
      type: isQuote ? 'tenant/getQuoteTenant' : 'tenant/getTenant',
      payload: {
        ...newQuery,
      },
    });

    dispatch({
      type: 'tenant/updateState',
      payload: { selectedTenantKeys: [] },
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
      optionData: [{ key: 'tenantName', value: '公司名称' }],
      value: 'tenantName',
    },
    {
      id: 'tenantName',
      type: 'input',
      value: '',
    },
  ];

  const columns = [
    {
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const tableProps = {
    columns,
    dataSource: tenantList,
    loading:
      loading.effects[isQuote ? 'tenant/getQuoteTenant' : 'tenant/getTenant'],
    pagination: tenantPagination,
    location,

    onChange(page: any) {
      handleRefresh({
        pageNumber: page.current,
        pageSize: page.pageSize,
      });
    },
    rowSelection: {
      fixed: true,
      selectedRowKeys: selectedTenantKeys,
      hideDefaultSelections: true,
      onChange: (keys: any) => {
        dispatch({
          type: 'tenant/updateState',
          payload: {
            selectedTenantKeys: keys[keys.length - 1]
              ? [keys[keys.length - 1]]
              : [],
          },
        });
      },
    },
    scroll: { y: 300 },
  };

  const handleOk = () => {
    if (!selectedTenantKeys || !selectedTenantKeys.length) {
      message.error('请选中一条记录');
      return;
    }
    const index = selectedTenantKeys[0];
    onOk(tenantList[index]);
  };

  // TODO:宽
  return (
    <Modal
      title={'公司列表'}
      destroyOnClose
      visible={tenantVisible}
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

export default connect(({ loading, tenant }: any) => ({
  loading,
  tenant,
}))(TenantModal);
