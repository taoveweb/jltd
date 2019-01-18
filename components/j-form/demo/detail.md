---
order: 1
title:
    zh-CN: 详情列表
    en-US: detail usage
---

## zh-CN

详情使用。

## en-US

detail usage example.

````jsx
import { JForm,Input,Select,DatePicker ,Button} from 'jltd';
class Demo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    render(){
        const datas = [
            {
                label:'用户名',
                node: 'phillip',
                span:8
            },
            {
                label:'密码',
                node:'*******',
                span:8
            },
            {
                label:'邮箱类型',
                node: '百度',
                span: 16,
                wrap: 16
            },
            {
                label:'日期',
                node: '2018-12-27'
            },
        ]
        return (
            <div>
                <JForm 
                    datas={datas} 
                    colon
                    showDetail
                 />
            </div> 
        )
    }
}
ReactDOM.render(<Demo />, mountNode);
````
