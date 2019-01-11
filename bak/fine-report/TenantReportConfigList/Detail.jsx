import { Button, Form, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as React from 'react';
import { LabelWithController, PageHeaderLayout } from '../components';
import ReportModal from './ReportModal';
import TenantModal from './TenantModal';
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenantId: 0,
            reportCode: '',
        };
    }
    // componentWillReceiveProps(nextProps) {
    //   let { tenantReportConfigList: { currentItem: { tenantId, reportCode } } } = this.props;
    // }
    render() {
        const { dispatch, loading, tenantReportConfigList, form, form: { setFieldsValue, getFieldsValue, validateFields }, } = this.props;
        const { currentItem } = tenantReportConfigList;
        const { reportName, isPermit, tenantName, paramJson, reportUrl, recVer, id, tenantId, reportCode, } = currentItem;
        // TODO缺少数据信息
        const controllerList = [
            {
                id: 'tenantName',
                label: '租户名称',
                type: 'search',
                required: true,
                value: tenantName,
                placeholder: '请选择租户',
                modalOnClick: () => {
                    dispatch({
                        type: 'tenant/showModal',
                    });
                },
            },
            { type: 'br' },
            {
                id: 'reportName',
                label: '报表名称',
                type: 'search',
                value: reportName,
                required: true,
                placeholder: '请选择报表',
                modalOnClick: () => {
                    dispatch({
                        type: 'reportConfigList/showModal',
                    });
                },
            },
            { type: 'br' },
            {
                id: 'reportUrl',
                label: '报表URL',
                type: 'input',
                value: reportUrl,
                required: true,
                rules: [{ max: 50 }],
            },
            { type: 'br' },
            {
                id: 'isPermit',
                label: '状态',
                type: 'radio',
                optionData: [
                    {
                        key: 1,
                        value: '启用',
                    },
                    {
                        key: 0,
                        value: '停用',
                    },
                ],
                value: isPermit || 0,
            },
            { type: 'br' },
            {
                id: 'paramJson',
                label: 'URL参数',
                type: 'textarea',
                value: paramJson || '{}',
                rules: [{ max: 500 }],
            },
        ];
        const renderControllerList = controllerList.map(info => {
            // @ts-ignore
            return <LabelWithController key={info.id} {...info} form={form}/>;
        });
        const onSave = () => {
            validateFields((errors) => {
                if (errors) {
                    return;
                }
                const data = Object.assign({}, getFieldsValue(), { recVer: recVer, id: id, tenantId: tenantId, reportCode: reportCode });
                dispatch({
                    type: 'tenantReportConfigList/save',
                    payload: data,
                }).then(() => {
                    message.success('操作成功');
                    dispatch(routerRedux.goBack());
                });
            });
        };
        const onCancel = () => {
            dispatch({
                type: 'tenant/updateState',
                payload: {
                    tenantVisible: false,
                },
            });
        };
        const onOk = (data) => {
            const { id, name } = data;
            dispatch({
                type: 'tenant/updateState',
                payload: {
                    tenantVisible: false,
                },
            });
            setFieldsValue({ tenantName: name });
            dispatch({
                type: 'tenantReportConfigList/updateState',
                payload: {
                    currentItem: Object.assign({ tenantId: id }, currentItem),
                },
            });
            // this.setState({ tenantId: id });
        };
        const onCancelRpt = () => {
            dispatch({
                type: 'reportConfigList/updateState',
                payload: {
                    reportConfigVisible: false,
                },
            });
        };
        const onOkRpt = (data) => {
            const { reportCode, reportName } = data;
            dispatch({
                type: 'reportConfigList/updateState',
                payload: {
                    reportConfigVisible: false,
                },
            });
            setFieldsValue({ reportName: reportName });
            dispatch({
                type: 'tenantReportConfigList/updateState',
                payload: {
                    currentItem: Object.assign({ reportCode }, currentItem),
                },
            });
            // this.setState({ reportCode: reportCode });
        };
        return (<PageHeaderLayout title="租户定制报表模板" showBackBtn>
        <div>{renderControllerList}</div>
        <Button type="primary" onClick={onSave} loading={loading.effects['tenantReportConfigList/save']}>
          保存
        </Button>
        <TenantModal onCancel={onCancel} onOk={onOk}/>
        <ReportModal onCancel={onCancelRpt} onOk={onOkRpt}/>
      </PageHeaderLayout>);
    }
}
export default Form.create({
    validateMessages: require('utils/formValidatorMessage').messages,
})(connect(({ loading, tenantReportConfigList }) => ({
    loading,
    tenantReportConfigList,
}))(Detail));
