import { message, Modal, Table } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
// 字段自定义列表
const TenantModal = ({ dispatch, loading, customColumnInfo, onCancel, onOk, idList, }) => {
    const { list, selectedRowKeys, visible } = customColumnInfo;
    const newList = list.filter((info) => !idList.includes(info.defaultId || info.id));
    const columns = [
        {
            title: '序号',
            dataIndex: 'orderNum',
            key: 'orderNum',
            width: 60,
        },
        {
            title: '字段名称',
            dataIndex: 'propertyName',
            key: 'propertyName',
            width: 120,
        },
        {
            title: '标题名称',
            dataIndex: 'columnName',
            key: 'columnName',
        },
    ];
    const tableProps = {
        columns,
        dataSource: newList,
        loading: loading.effects['customColumnInfo/findCustomColumnInfoList'],
        pagination: false,
        location,
        rowSelection: {
            fixed: false,
            selectedRowKeys,
            hideDefaultSelections: true,
            onChange: (keys) => {
                dispatch({
                    type: 'customColumnInfo/updateState',
                    payload: {
                        selectedRowKeys: keys,
                    },
                });
            },
        },
    };
    const handleOk = () => {
        if (!selectedRowKeys || !selectedRowKeys.length) {
            message.error('请至少选中一条记录');
            return;
        }
        const data = newList.filter((info) => selectedRowKeys.includes(info.id));
        onOk(data);
        dispatch({
            type: 'customColumnInfo/updateState',
            payload: {
                selectedRowKeys: [],
            },
        });
    };
    // TODO:宽
    return (<Modal title="字段自定义列表" visible={visible} onOk={handleOk} onCancel={onCancel} destroyOnClose>
      // @ts-ignore
      <Table {...tableProps} rowKey={(record) => record.id} scroll={{ y: 400 }}/>
    </Modal>);
};
export default connect(({ loading, customColumnInfo }) => ({
    loading,
    customColumnInfo,
}))(TenantModal);
