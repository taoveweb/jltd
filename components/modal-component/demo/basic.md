---
order: 0
title:
  zh-CN: Demo
---

## zh-CN

````jsx
import { Modal, Button } from 'jltd';
import ModalComponent from '../index';
class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      visible:false
    }
  }
  onClick=()=>{
    this.setState({
      visible:true
    })
  }
  onOkModal=()=>{
    this.setState({
      visible:false
    })
  }
  onCancel=()=>{
    this.setState({
      visible:false
    })
  }
  render() {
    const child=(
      <div>传给子组件的component</div>
    )
    return (
      <div>
        <Button onClick={this.onClick}>open modal</Button>
        <ModalComponent 
          visible={this.state.visible}
          title={"自定义弹出框"}
          onConfirm={this.onOkModal}
          width={"200px"}
          onCancel={this.onCancel}
          child={child}
         />
      </div>
    );
  }
}
ReactDOM.render(<Demo />, mountNode);

````
