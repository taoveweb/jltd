import { Button } from 'antd';
import classnames from 'classnames';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import * as React from 'react';
import CreateImportBatch from './createImportBatch';

const queryString = require('query-string');

interface IImportExcelProps {
  dispatch?: any;
  buttonInfo?: any;
  buttonType?: any;
}
// 导入列表
class ImportExcel extends React.Component<IImportExcelProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isCreateBatchModalShow: false,
    };
  }

  // 新增批次属性
  onAddBatchImport = () => {
    this.setState({
      isCreateBatchModalShow: true,
    });
  };

  // 新增批次属性确认
  onCreateBatchModelOK = (importBatchNum: any, templateId: any) => {
    this.setState({
      isCreateBatchModalShow: false,
    });

    this.props.dispatch(
      routerRedux.push({
        pathname: '../importTemplate',
        search: queryString.stringify({
          templateId,
          importBatchNum,
        }),
      })
    );
  };

  // 新增批次属性取消
  onCreateBatchModelCancel = () => {
    this.setState({
      isCreateBatchModalShow: false,
    });
  };

  // 新增批次属性弹窗
  renderImportBatchModal = () => {
    const { isCreateBatchModalShow } = this.state;
    const { buttonInfo } = this.props;

    return (
      <CreateImportBatch
        isCreateBatchModalShow={isCreateBatchModalShow}
        onCreateBatchModelOK={this.onCreateBatchModelOK}
        onCreateBatchModelCancel={this.onCreateBatchModelCancel}
        templateId={buttonInfo.templateId}
      />
    );
  };

  renderALink = (buttonInfo: any) => {
    return (
      <React.Fragment>
        <a onClick={this.onAddBatchImport}>{buttonInfo.text}</a>
        {this.renderImportBatchModal()}
      </React.Fragment>
    );
  };

  renderButton = (buttonInfo: any) => {
    return (
      <React.Fragment>
        <Button
          className={classnames(
            'ant-pro-button-group',
            'button-group',
            buttonInfo.className && buttonInfo.className
          )}
          type={buttonInfo.type || 'default'}
          size={buttonInfo.size || 'default'}
          loading={buttonInfo.loading}
          onClick={this.onAddBatchImport}
          disabled={buttonInfo.disabled}
        >
          {buttonInfo.text}
        </Button>
        {this.renderImportBatchModal()}
      </React.Fragment>
    );
  };

  render() {
    const { buttonInfo, buttonType } = this.props;

    return buttonType === 'a' ? this.renderALink(buttonInfo) : this.renderButton(buttonInfo);
  }
}
export default connect(()=>({}))(ImportExcel);
