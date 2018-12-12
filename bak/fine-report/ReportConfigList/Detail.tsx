import { Button, Form, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as React from 'react';

import LabelWithController from '../components/LabelWithController/LabelWithController';
import PageHeaderLayout from '../components/PageHeaderLayout/PageHeaderLayout';
import enums from '../utils/enums';

// import FileUpload from '../../../utils/fileUpload';
// 新闻发布
class Detail extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    // this.state = {
    //   reletiveUrl: '',
    // };
  }

  componentWillReceiveProps(nextPorps: any) {
    if (
      this.props.reportConfigList.currentItem !==
      nextPorps.reportConfigList.currentItem
    ) {
      //const { currentItem } = nextPorps.reportConfigList;
      // const { reletiveUrl } = currentItem;
      // this.setState({ reletiveUrl });
    }
  }

  // componentWillMount() {
  //   this.setState({ user_pic: this.props.reportConfigList.currentItem.reletiveUrl });
  // }

  render() {
    const {
      dispatch,
      loading,
      reportConfigList,
      dictByCode,
      form,
      form: { getFieldsValue, validateFields },
    } = this.props;

    const { currentItem } = reportConfigList;
    const { moduleList } = dictByCode;
    const {
      reportCode,
      reportName,
      reportType,
      isTenant,
      publishStatus,
      reletiveUrl,
      paramJson,
      remark,
      recVer,
      id,
    } = currentItem;

    // TODO缺少数据信息
    const controllerList = [
      {
        id: 'reportCode',
        label: '报表编码',
        type: 'input',
        value: reportCode,
        disabled: true,
        placeholder: '',
      },
      { type: 'br' },
      {
        id: 'reportName',
        label: '报表名称',
        type: 'input',
        value: reportName,
        required: true,
        rules: [{ max: 50 }],
      },
      { type: 'br' },
      {
        id: 'reportType',
        label: '报表类型',
        type: 'radio',
        required: true,
        optionData: (moduleList || []).map((info: any) => ({
          key: info.key,
          value: info.label,
        })),
        value: reportType || '1',
      },
      { type: 'br' },
      {
        id: 'isTenant',
        label: '是否租户',
        type: 'radio',
        optionData: enums.IsTenant,
        value: isTenant || 0,
      },
      { type: 'br' },
      {
        id: 'publishStatus',
        label: '发布状态',
        type: 'radio',
        optionData: enums.PublishState,
        value: publishStatus || 0,
      },
      { type: 'br' },
      {
        id: 'reletiveUrl',
        label: '相对URL',
        type: 'input',
        value: reletiveUrl || '',
        rules: [{ max: 50 }],
        required: true,
      },
      { type: 'br' },
      {
        id: 'paramJson',
        label: 'URL参数',
        type: 'textarea',
        value: paramJson || '{}',
        rules: [{ max: 500 }],
      },
      { type: 'br' },
      {
        id: 'remark',
        label: '描述',
        type: 'textarea',
        value: remark || '',
        rules: [{ max: 500 }],
      },
    ];
    const renderControllerList = controllerList.map(info => {
      // @ts-ignore
      return <LabelWithController key={info.id} {...info} form={form} />;
    });

    /* const onNoteChange = htmlString => {
      this.setState({
        contents: htmlString,
      });
    }; */
    const onSave = () => {
      validateFields((errors: any) => {
        if (errors) {
          return;
        }
        const data = {
          ...getFieldsValue(),
          recVer: recVer,
          id: id,
        };

        dispatch({
          type: 'reportConfigList/save',
          payload: data,
        }).then(() => {
          message.success('操作成功');
          // handleCancel();
          dispatch(routerRedux.goBack());
          // queryList();
        });
      });
    };

    // const handlePmCode = (reletiveUrl, event) => {
    //   this.setState({ reletiveUrl: reletiveUrl });
    // };
    return (
      <PageHeaderLayout title="报表模板编辑" showBackBtn>
        <div>{renderControllerList}</div>
        {/* <Card title="报表模板附件：">
          <FileUpload
            id={'reletiveUrl'}
            uploadType="file"
            businessPmCode={this.state.reletiveUrl}
            sencondPmCode=""
            uploadCount={1}
            maxSize="204800"
            handlePmCode={handlePmCode.bind(this)}
          />
        </Card> */}
        <Button
          type="primary"
          onClick={onSave}
          loading={loading.effects['reportConfigList/save']}
        >
          保存
        </Button>
      </PageHeaderLayout>
    );
  }
}

export default Form.create({
  validateMessages: require('utils/formValidatorMessage').messages,
})(
  connect(({ loading, reportConfigList, dictByCode }: any) => ({
    loading,
    reportConfigList,
    dictByCode,
  }))(Detail),
);
