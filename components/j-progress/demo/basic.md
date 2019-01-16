---
order: 0
title:
  zh-CN: 进度条弹窗
  en-US: Controlled Panels
---

## zh-CN

通过组合 `limitDate` 限制日期时间范围

## en-US


````jsx
import { JProgress } from 'jltd';
import moment from 'moment'
// limitEendTime='2019-1-3 12:35'
// limitTime={'2019-1-1 12:35'}
class Demo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visible:false,
      percent:0
    }
  }
  render(){
    let {visible,percent} = this.state;
    return <div>
      <Button onPress={()=>{
        this.setState({
          visible:true,
          percent: 0
        })
        this.timer = setInterval(() => {
          this.setState({
            percent: percent+2
          })
          if(percent==102){
            this.setState({
              visible:false
            })
            clearInterval(this.timer)
          }
        }, 100);
      }}>显示进度</Button>
      <JProgress visible={visible} percent={percent}/>
    </div>
  }
}
ReactDOM.render(
  Demo
, mountNode);
````
