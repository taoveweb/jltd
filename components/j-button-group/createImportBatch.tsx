import * as React from 'react';
import { connect } from 'dva';
import * as fetch from 'dva/fetch';
// import {LabelWithController} from 'jltd'
import LabelWithController from '../label-with-controller';
import ModalComponent from './ModalComponent';


function addImportBatchNum(params:any={}) {
  let formData = new FormData();
  Object.keys(params).map((item:any)=>{
    formData.append(item,params[item]);
  })
  return fetch('../importBatch/addImportBatchNum', {
    method: 'POST',
    body: formData,
    credentials: "include",
    headers:{
      "Content-Type":'application/x-www-form-urlencoded'
    },
  });
}


function add(params:any = {}) {
  return fetch('../importBatch/add', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
  });
}

// 新建批次
class CreateImportBatch extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      importBatchNum: '',
      importRemark: '',
    };
  }

  componentWillReceiveProps(nextPorps: any) {
    if (nextPorps.isCreateBatchModalShow
      && nextPorps.isCreateBatchModalShow !== this.props.isCreateBatchModalShow
    ) {
      addImportBatchNum().then(res=>res.json()).then(res=>{
        this.setState({
          loading: false,
          importBatchNum:res,
          importRemark:''
        })
      })
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
    const { templateId, orderType } = this.props;
    if(!importBatchNum){
      return 
    }
    add({
      importBatchNum,
      importRemark,
      orderType,
      templateId,
    }).then(res=>res.json())
    .then(()=>{
      const { onCreateBatchModelOK } = this.props;
        onCreateBatchModelOK && onCreateBatchModelOK(importBatchNum, templateId);
    })
    // this.props
    //   .dispatch({
    //     type: 'importBatchInfoList/add',
    //     payload: {
    //       importBatchNum,
    //       importRemark,
    //       orderType,
    //       templateId,
    //     },
    //   })
    //   .then(() => {
    //     //        if (result.status > 0) {
    //     const { onCreateBatchModelOK } = this.props;
    //     onCreateBatchModelOK && onCreateBatchModelOK(importBatchNum, templateId);
    //     //        } else {
    //     //          // 错误信息在dataFetch里已经展示
    //     //          // message.error(result.message);
    //     //        }
    //   });
  };

  onCancel = () => {
    const { onCreateBatchModelCancel } = this.props;
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
      <div className="ant-pro-modal-style">
        <div className="ant-pro-right-style importModal">
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
