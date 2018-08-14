import * as React from 'react';
import { connect } from 'dva';

import LabelWithController from '../label-with-controller';
import ModalComponent from './ModalComponent';


// 新建批次
class CreateImportBatch extends React.Component<any,any> {
  constructor(props:any) {
    super(props);

    this.state = {
		importBatchNum:'',
		importRemark:'',
    };
  }
  
  componentWillReceiveProps(nextPorps:any) {
    if (this.state.importBatchNum == "" &&
      nextPorps.isCreateBatchModalShow &&
      nextPorps.isCreateBatchModalShow !== this.props.isCreateBatchModalShow) {
      this.props.dispatch({
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
    if (nextPorps.addImportBatchNum &&
      nextPorps.addImportBatchNum !== this.state.importBatchNum) {
    	this.setState({
        	importBatchNum : nextPorps.addImportBatchNum,
        });
      }
  }
  
  //导入批次号
  onImportBatchNumChange = () => {
//    this.setState({
//    	importBatchNum,
//    });
  };
  
  //导入描述
  onImportRemarkChange = (importRemark:any) => {
    this.setState({
    	importRemark,
    });
  };
  

  onConfirm = () => {
    const { importBatchNum,importRemark } = this.state;
    const { templateId,orderType } = this.props;

    this.props
      .dispatch({
        type: 'importBatchInfoList/add',
        payload: {
        	importBatchNum,
        	importRemark,
        	orderType:orderType,
        	templateId:templateId,
        },
      })
      .then(() => {
//        if (result.status > 0) {
          const { onCreateBatchModelOK } = this.props;
          onCreateBatchModelOK && onCreateBatchModelOK(importBatchNum,templateId);
//        } else {
//          // 错误信息在dataFetch里已经展示
//          // message.error(result.message);
//        }
      });
  };

  onCancel = () => {
    const { onCreateBatchModelCancel } = this.props;
    onCreateBatchModelCancel && onCreateBatchModelCancel();
  };

  renderControllerList = () => {
    const { 
    	importBatchNum,
    	importRemark,
    	} = this.state;
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

    const renderControllerList = controllerList.map((info:any) => {
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
				<input id={'importBatchNum'}
		          onChange={this.onImportBatchNumChange} ></input>
			</div>
	  );
  }

  render() {
    const child = (
      <div className={'ant-pro-modal-style'}>
        <div className={'ant-pro-right-style'}>
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

function mapStateToProps(state:any) {
  const { addImportBatchNum } = state.importBatchInfoList;
  return { addImportBatchNum };
}
export default connect(mapStateToProps)(CreateImportBatch);
