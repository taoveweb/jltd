import * as React from 'react';
import { Modal,Button } from 'antd';



type ExceptionModalComponentsState = {
  visible:boolean,
  url:'',
  errorData:null,
  errorId:null
};

interface ExceptionModalComponentsprops {
  visible : any;
  url:any;
  errorData:any;
  errorId:any;
}
class ExceptionModalComponent   extends React.Component<ExceptionModalComponentsprops,ExceptionModalComponentsState>  {
  constructor(props:ExceptionModalComponentsprops) {
    super(props);
    const { visible,url,errorData } = props;
  
    this.state = {
     visible :visible,
     url:url,
     errorData:errorData,
     errorId:null
    };
  }
  visibleCheck(){
    if(this.props.visible=== undefined || this.props.visible=== '' ||this.props.visible=== null || this.props.visible=== 'null' || this.props.visible=== 'NULL'){
      return true;
    }
    return false
  }
  urlCheck(){
    if(this.props.url=== undefined || this.props.url=== '' ||this.props.url=== null || this.props.url=== 'null' || this.props.url=== 'NULL'){
      return true;
    }
    return false
  }
  errorDateCheck(){
    if(this.props.errorData=== undefined || this.props.errorData=== '' ||this.props.errorData=== null || this.props.errorData=== 'null' || this.props.errorData=== 'NULL'){
      return true;
    }
    if(JSON.stringify(this.props.errorData)=='{}'){
      return true;
    }
    return false;
  }
  componentWillReceiveProps(nextprops:ExceptionModalComponentsprops){
    if(nextprops.visible !==this.state.visible){
      this.setState({visible:nextprops.visible,
        errorId:this.errorDateCheck()?'':nextprops.errorData.id,
        url:nextprops.url,
      })
    }
  }
  
  exceptionModelCancel = () => {
    this.setState({
      visible: false
    })
  }
  
  onExceptionModelConfirm = () => {
    this.setState({
      visible: false
    });
    
    /**const {
      errorId,
      url
    } = this.state;

    $.ajax({
      url: url,
      data: { "exceptionInfoId": errorId },
      cache: false,
      type: 'POST',
      dataType: 'x-www-form-urlencoded',
      success: function (data) {
      },
      error: function () {
      }
     });
     Modal.success({
      content: '异常已上报!',
     })**/
}

render() {
    const  code=this.errorDateCheck()?'' :this.props.errorData.code;
    const  message=this.errorDateCheck()?'' :this.props.errorData.message;

    if(this.visibleCheck() || this.urlCheck() || this.errorDateCheck()){
      return (<div></div>);
    }
    return (
      <Modal title="异常信息"
      visible={this.state.visible}
      onOk={this.onExceptionModelConfirm}
      onCancel={this.exceptionModelCancel}
     
      footer={[
      <Button key="close"  onClick={this.exceptionModelCancel}>关闭</Button>,
      <Button key="upload" type="primary"  onClick={this.onExceptionModelConfirm}>上报</Button>,
      ]}>
      <p>异常代码:{code}</p>
      <p>异常信息:{message}</p>
      </Modal>
    );
  }
} 
export default ExceptionModalComponent;
