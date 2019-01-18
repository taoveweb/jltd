import { connect } from 'dva';
// @ts-ignore
import React, { Component } from 'react';

import LabelWithController from '../label-with-controller';
import ModalComponent from '../modal-component';

interface CreateImportBatchProps {
  dispatch: any;
  isCreateBatchModalShow: any;
  addImportBatchNum: any;
}
class CreateImportBatch extends Component<CreateImportBatchProps, any> {
  constructor(props: CreateImportBatchProps) {
    super(props);
    this.state = {
      importBatchNum: '',
      importRemark: '',
    };
  }

  componentWillReceiveProps(nextPorps: CreateImportBatchProps) {
    if (
      this.state.importBatchNum == ''
      && nextPorps.isCreateBatchModalShow
      && nextPorps.isCreateBatchModalShow !== this.props.isCreateBatchModalShow
    ) {
      this.props
        .dispatch({
          type: 'importBatchInfoList/addImportBatchNum',
        })
        .then(() => {
          this.setState(() => {
            return {
              loading: false,
            };
          });
        });
    }
    if (nextPorps.addImportBatchNum && nextPorps.addImportBatchNum !== this.state.importBatchNum) {
      this.setState({
        importBatchNum: nextPorps.addImportBatchNum,
      });
    }
  }

  // 导入批次号
  onImportBatchNumChange = () => {
    //    this.setState({
    //    	importBatchNum,
    //    });
  };

  // 导入描述
  onImportRemarkChange = (importRemark: any) => {
    this.setState({
      importRemark,
    });
  };

  onConfirm = () => {
    const { importBatchNum, importRemark } = this.state;
    const { templateId, orderType }: any = this.props;
    this.props
      .dispatch({
        type: 'importBatchInfoList/add',
        payload: {
          importBatchNum,
          importRemark,
          orderType,
          templateId,
        },
      })
      .then(() => {
        //        if (result.status > 0) {
        const { onCreateBatchModelOK }: any = this.props;
        onCreateBatchModelOK && onCreateBatchModelOK(importBatchNum, templateId);
        //        } else {
        //          // 错误信息在dataFetch里已经展示
        //          // message.error(result.message);
        //        }
      });
  };

  onCancel = () => {
    const { onCreateBatchModelCancel }: any = this.props;
    onCreateBatchModelCancel && onCreateBatchModelCancel();
  };

  renderControllerList = () => {
    const { importBatchNum, importRemark } = this.state;
    const controllerList = [
      {
        label: '导入批次号',
        type: 'input',
        onChange: this.onImportBatchNumChange,
        value: importBatchNum,
        disabled: true,
      },
      {
        label: '导入描述',
        type: 'textarea',
        onChange: this.onImportRemarkChange,
        value: importRemark,
      },
    ];
    const renderControllerList = controllerList.map((info: any) => {
      return (
        <LabelWithController
          type={info.type}
          label={info.label}
          key={info.label}
          onChange={info.onChange}
          optionData={info.optionData}
          value={info.value}
          disabled={info.disabled}
        />
      );
    });
    return renderControllerList;
  };

  renderImportBatch = () => {
    return (
      <div>
        <span>导入批次号：</span>
        <input id="importBatchNum" onChange={this.onImportBatchNumChange} />
      </div>
    );
  };

  render() {
    const child = (
      <div className="impexp-modal-style">
        <div className="impexp-right-style">
          <div>{this.renderControllerList()}</div>
        </div>
      </div>
    );
    return (
      <div>
        <ModalComponent
          width={400}
          title="创建批次"
          okText="保存"
          visible={this.props.isCreateBatchModalShow}
          child={child}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  const { addImportBatchNum } = state.importBatchInfoList;
  return { addImportBatchNum };
}
export default connect(mapStateToProps)(CreateImportBatch);
