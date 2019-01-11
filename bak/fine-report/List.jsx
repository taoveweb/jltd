import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as React from 'react';
import { Table } from './components';
import buttonPermission from './utils/buttonPermission';
import enums from './utils/enums';
const queryString = require('query-string');
const menuCode = 'B01110101';
require('./List.less');
const List = ({ reportConfigList, loading, onChange, dispatch, dictByCode, }) => {
    const { list, pagination, selectedRowKeys } = reportConfigList;
    const { moduleList } = dictByCode;
    const jumpToDetail = (id) => {
        if (!buttonPermission.check({ menuCode, operateCode: 'BADD0001' })) {
            return;
        }
        dispatch(routerRedux.push({
            pathname: '/pms/report/ReportConfigList/Detail',
            search: queryString.stringify({
                id,
            }),
        }));
    };
    const moduleMap = {};
    moduleList.forEach((info) => {
        moduleMap[info.key] = info.label;
    });
    const columns = [
        {
            title: '报表编码',
            dataIndex: 'reportCode',
            key: 'reportCode',
            width: 180,
            render: (text, record) => {
                return (<div className={'jlt-detail-div'} onClick={() => {
                    jumpToDetail(record.id);
                }}>
            {text}
          </div>);
            },
        },
        {
            title: '报表名称',
            dataIndex: 'reportName',
            key: 'reportName',
            width: 180,
        },
        {
            title: '报表类型',
            dataIndex: 'reportType',
            key: 'reportType',
            width: 180,
            render: (text) => {
                return moduleMap[text];
            },
        },
        {
            title: '报表URL',
            dataIndex: 'reletiveUrl',
            key: 'reletiveUrl',
            width: 180,
        },
        {
            title: '是否租户',
            dataIndex: 'isTenant',
            key: 'isTenant',
            width: 180,
            render: (text) => {
                return enums.getValue(enums.IsTenant, text);
            },
        },
        {
            title: '发布状态',
            dataIndex: 'publishStatus',
            key: 'publishStatus',
            width: 180,
            render: (text) => {
                return enums.getValue(enums.PublishState, text);
            },
        },
        {
            title: '参数配置',
            dataIndex: 'paramJson',
            key: 'paramJson',
            width: 250,
        },
    ];
    return (<Table 
    // @ts-ignore
    dataSource={list} pagination={pagination} loading={loading.effects['reportConfigList/query']} columns={columns} rowKey={(record) => record.id} onChange={onChange} rowSelection={{
        selectedRowKeys,
        onChange: (keys) => {
            dispatch({
                type: 'reportConfigList/updateState',
                payload: {
                    selectedRowKeys: keys,
                },
            });
        },
    }}/>);
};
// export default List
export default connect(({ reportConfigList, loading, dictByCode }) => ({
    dictByCode,
    reportConfigList,
    loading,
}))(List);
