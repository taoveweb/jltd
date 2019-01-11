import { message, Modal } from 'antd';
import { PageHeaderLayout, SearchView, buttonGroup } from './components';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
// @ts-ignore
import queryString from 'query-string';
import * as React from 'react';
import enums from './utils/enums';
import List from './TenantList';
// @ts-ignore
// @ts-ignore
const menuCode = 'M011102';
// 报表模板列表
const TenantReportConfigList = ({ location, dispatch, tenantReportConfigList, loading, }) => {
    const { selectedRowKeys, list } = tenantReportConfigList;
    const { pathname } = location;
    const query = queryString.parse(location.search);
    const handleRefresh = (newQuery) => {
        dispatch(routerRedux.push({
            pathname,
            search: queryString.stringify(Object.assign({}, query, newQuery)),
        }));
        dispatch({
            type: 'tenantReportConfigList/updateState',
            payload: { selectedRowKeys: [] },
        });
    };
    const onSearchClick = (value) => {
        handleRefresh(Object.assign({}, value, { pageNumber: 1 }));
    };
    const controllerList = [
        {
            id: 'tenantName',
            label: '租户名称',
            type: 'input',
            value: '',
        },
        {
            id: 'reportName',
            label: '报表名称',
            type: 'input',
            value: '',
        },
        {
            id: 'isPermit',
            label: '状态',
            type: 'select',
            optionData: enums.EnumEnableState,
            value: null,
        },
    ];
    function returnInfoList(list, tip) {
        const selectList = list.filter((info) => {
            return selectedRowKeys.includes(info.id);
        });
        // if (selectList['0'].isEnable === 1) {
        //   message.error('已启用的记录不能删除');
        //   return;
        // }
        let _flag = true;
        selectList.forEach((info) => {
            if (info.isPermit === 1) {
                message.error(tip);
                _flag = false;
                return;
            }
        });
        if (!_flag)
            return;
        return selectList.map((info) => {
            const { id, recVer } = info;
            return {
                id,
                recVer,
            };
        });
    }
    const operateButton = [
        {
            text: '新增',
            type: 'ghost',
            onClick: () => {
                dispatch(routerRedux.push({
                    pathname: '/pms/report/TenantReportConfigList/Detail',
                }));
            },
            menuCode,
            operateCode: 'BADD0001',
        },
        {
            text: '编辑',
            type: 'ghost',
            disabled: selectedRowKeys.length === 0,
            onClick: () => {
                if (selectedRowKeys.length != 1) {
                    message.error('请只选择一条记录');
                    return;
                }
                dispatch(routerRedux.push({
                    pathname: '/pms/report/TenantReportConfigList/Detail',
                    search: queryString.stringify({
                        id: selectedRowKeys[0],
                    }),
                }));
            },
            menuCode,
            operateCode: 'BEDIT0002',
        },
        {
            text: '删除',
            type: 'ghost',
            disabled: selectedRowKeys.length === 0,
            loading: loading.effects['tenantReportConfigList/multiDelete'],
            onClick: () => {
                const infoList = returnInfoList(list, '已发布的记录不能删除');
                if (!infoList)
                    return;
                Modal.confirm({
                    title: `确定要删除${selectedRowKeys.length} 条记录吗？`,
                    cancelText: '取消',
                    okText: '删除',
                    iconType: 'exclamation-circle',
                    onOk: () => {
                        dispatch({
                            type: 'tenantReportConfigList/multiDelete',
                            payload: {
                                infoList,
                            },
                        }).then(() => {
                            handleRefresh({});
                        });
                    },
                });
            },
            menuCode,
            operateCode: 'BDEL0003',
        },
        {
            text: '发布',
            type: 'ghost',
            disabled: selectedRowKeys.length === 0,
            loading: loading.effects['tenantReportConfigList/publish'],
            onClick: () => {
                const infoList = returnInfoList(list, '已发布的记录无需重新发布！');
                if (!infoList)
                    return;
                dispatch({
                    type: 'tenantReportConfigList/publish',
                    payload: {
                        infoList,
                    },
                }).then(() => {
                    handleRefresh({});
                });
            },
            menuCode,
            operateCode: 'B01110101',
        },
        {
            text: '停用',
            type: 'ghost',
            disabled: selectedRowKeys.length === 0,
            loading: loading.effects['tenantReportConfigList/cancelPublish'],
            onClick: () => {
                const selectList = list.filter((info) => {
                    return selectedRowKeys.includes(info.id);
                });
                let _flag = true;
                selectList.forEach((info) => {
                    if (info.isPermit === 0) {
                        message.error('停用状态的数据无需重新停用');
                        _flag = false;
                        return;
                    }
                });
                if (!_flag)
                    return;
                const infoList = selectList.map((info) => {
                    const { id, recVer } = info;
                    return { id, recVer };
                });
                dispatch({
                    type: 'tenantReportConfigList/cancelPublish',
                    payload: {
                        infoList,
                    },
                }).then(() => {
                    handleRefresh({});
                });
            },
            menuCode,
            operateCode: 'B01110102',
        },
    ];
    return (<PageHeaderLayout title="租户定制报表管理">
      <SearchView onSearchClick={onSearchClick} searchViewList={controllerList}/>
      <div className="menu-btn-group">{buttonGroup(operateButton)}</div>
      <div className="page-body">
        <List onChange={(page) => {
        handleRefresh({
            pageNumber: parseInt(page.current, 1),
            pageSize: parseInt(page.pageSize, 10),
        });
    }}/>
      </div>
    </PageHeaderLayout>);
};
export default connect(({ tenantReportConfigList, loading }) => ({
    tenantReportConfigList,
    loading,
}))(TenantReportConfigList);
