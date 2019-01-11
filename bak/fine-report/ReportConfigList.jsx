import { message, Modal } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as React from 'react';
import { PageHeaderLayout, SearchView, buttonGroup } from './components';
import List from './List';
const queryString = require('query-string');
// @ts-ignore
const enums = require('utils/enums');
const menuCode = 'M011101';
// 报表模板列表
const ReportConfigList = ({ location, dispatch, reportConfigList, loading, dictByCode, }) => {
    const { selectedRowKeys, list } = reportConfigList;
    const { pathname } = location;
    const query = queryString.parse(location.search);
    const { moduleList } = dictByCode;
    const handleRefresh = (newQuery) => {
        dispatch(routerRedux.push({
            pathname,
            search: queryString.stringify(Object.assign({}, query, newQuery)),
        }));
        dispatch({
            type: 'reportConfigList/updateState',
            payload: { selectedRowKeys: [] },
        });
    };
    const onSearchClick = (value) => {
        handleRefresh(Object.assign({}, value, { pageNumber: 1 }));
    };
    const controllerList = [
        {
            id: 'reportName',
            label: '报表名称',
            type: 'input',
            value: '',
        },
        {
            id: 'reportType',
            label: '报表类型',
            type: 'select',
            allowClear: false,
            value: '',
            optionData: (moduleList || []).map((info) => ({
                key: info.key,
                value: info.label,
            })),
        },
        {
            id: 'publishStatus',
            label: '发布状态',
            type: 'select',
            optionData: enums.PublishState,
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
            if (info.publishStatus === 1) {
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
                    pathname: '/pms/report/ReportConfigList/Detail',
                }));
            },
            menuCode,
            operateCode: 'BADD0001',
        },
        {
            text: '删除',
            type: 'ghost',
            disabled: selectedRowKeys.length === 0,
            loading: loading.effects['reportConfigList/multiDelete'],
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
                            type: 'reportConfigList/multiDelete',
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
            loading: loading.effects['reportConfigList/publish'],
            onClick: () => {
                const infoList = returnInfoList(list, '已发布的记录无需重新发布！');
                if (!infoList)
                    return;
                dispatch({
                    type: 'reportConfigList/publish',
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
            loading: loading.effects['reportConfigList/cancelPublish'],
            onClick: () => {
                const selectList = list.filter((info) => {
                    return selectedRowKeys.includes(info.id);
                });
                let _flag = true;
                selectList.forEach((info) => {
                    if (info.publishStatus === 0) {
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
                    type: 'reportConfigList/cancelPublish',
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
    return (<PageHeaderLayout title="模板配置列表">
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
export default connect(({ reportConfigList, loading, dictByCode }) => ({
    reportConfigList,
    loading,
    dictByCode,
}))(ReportConfigList);
