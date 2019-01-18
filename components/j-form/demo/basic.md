---
order: 0
title:
    zh-CN: 基本使用
    en-US: Basic usage
---

## zh-CN

基本使用。

## en-US

Basic usage example.

````jsx
import { JForm,Input,Select,DatePicker ,Button,JDatePicker} from 'jltd';
import moment from 'moment'
class Demo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSearch:false,
            isSetStyle:false,
            hideDate:false
        }
    }

    toggleSearch=()=>{
        this.setState({isSearch:!this.state.isSearch})
    }

    toggleStyle=()=>{
        this.setState({isSetStyle:!this.state.isSetStyle})
    }
    toggleHideDate=()=>{
        this.setState({hideDate:!this.state.hideDate})
    }
    initForm=()=>{
        this.form&&this.form.setFieldsValue({
            username:'phillip',
            password:'1111111',
            type:'qq',
            date: moment()
            })
    }
    getFormDate=()=>{
         let data = this.form&&this.form.values();
         if(data){
             console.log(data)
            //  alert(JSON.stringify(data))
         }
    }
    render(){
        let {isSearch,isSetStyle,hideDate} = this.state;
        const datas = [
            {
                label:'用户名',
                node:<Input placeholder='请输入用户名'/>,
                fileId:'username',
                rules:[{required:true,message:'请输入账号'}],
                span:8,
            },
            {
                label:'密码',
                node:<Input placeholder='请输入密码' type='password'/>,
                fileId:'password',
                rules:[{required:true,message:'请输入密码'}],
                span: 8,
            },
            {
                label:'邮箱类型',
                node:<Select>
                    {[
                        {text:'360',value:'360'},
                        {text:'qq',value:'qq'},
                        {text:'雅虎雅虎雅虎雅虎雅虎雅虎雅虎雅虎雅虎雅虎雅虎',value:'yahu'},
                        {text:'百度',value:'baidu'},
                    ].map(item=><Select.Option key={item.value} value={item.value} dropdownMatchSelectWidth={false}>{item.text}</Select.Option>)}
                </Select>,
                fileId:'type',
                span:8
            },
            {
                label:'日期',
                node:<JDatePicker placeholder='请选择' onChange={(a,b)=>{
                    console.log(a,b)
                }}/>,
                fileId:'date',
                span:8,
                hide:hideDate,
            },
        ]
        return (
            <div>
                <div style={{marginBottom:20}}>
                    <Button onClick={this.toggleSearch}>{isSearch?'隐藏':'显示'}搜索栏</Button>
                    <Button onClick={this.toggleStyle}>{isSetStyle}设置style</Button>
                    <Button onClick={this.toggleHideDate}>{hideDate?'显示':'隐藏'}时间</Button>
                    <Button onClick={this.initForm}>初始化设置表单</Button>
                    <Button onClick={this.getFormDate}>获取表单值</Button>
                </div> 
                <JForm 
                    datas={datas} 
                    style={isSetStyle&&{width:'80%'}}
                    getRefForm = {e=>this.form = e} 
                    isSearch={isSearch}
                    onResetClick={()=>{
                        alert('你点击了重置按钮')
                    }}
                    onSearchClick={()=>{
                        alert('你点击了搜索按钮')
                    }}
                 />
                 <Select mode='multiple' >
                    {[
                        {text:'360',value:'360'},
                        {text:'qq',value:'qq'},
                        {text:'雅虎雅虎雅虎雅虎雅虎雅虎雅虎雅虎雅虎雅虎雅虎',value:'yahu'},
                        {text:'百度',value:'baidu'},
                    ].map(item=><Select.Option key={item.value} value={item.value} >{item.text}</Select.Option>)}
                </Select>
            </div> 
        )
    }
}
ReactDOM.render(<Demo />, mountNode);
````
