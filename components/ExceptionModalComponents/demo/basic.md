---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本使用。

## en-US

Basic Usage.

````jsx
import { ExceptionModalComponent,Button} from 'jltd';


class App extends React.Component {

  state = { visible: false,
            errorData:{id:100000,code:-1,message:'系统繁忙'}
          }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  render() {
    return (
     <div>
       <Button type="primary" onClick={this.showModal}>OpenExceptionModal</Button>
       <ExceptionModalComponent visible={this.state.visible} url="/test" errorData={this.state.errorData}/>
     </div>
    );
  }
}


ReactDOM.render(
  <App />
, mountNode);
````
