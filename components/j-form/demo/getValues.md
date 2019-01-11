---
order: 3
title:
    zh-CN: 获取转化时间表单
    en-US: values usage
---

## zh-CN

获取转化时间表单

## en-US

Basic usage example.

````jsx
import { JForm,Input,Select,JDatePicker ,Button} from 'jltd';
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

    getFormDate=()=>{
        //获取全部表单，并转化时间格式，默认时间格式：YYYY-MM-DD HH:mm
         let data = this.form&&this.form.values();
         if(data){
             console.log(data)
            //  alert(JSON.stringify(data))
         }
    }
    getSingleFormDate=()=>{
        //获取单一表单，并转化时间格式
         let data = this.form&&this.form.values(['date']);
         if(data){
             console.log(data)
         }
    }
    render(){
        let {isSearch,isSetStyle,hideDate} = this.state;
        const datas = [
            {
                label:'用户名',
                node:<Input/>,
                fileId:'username2',
                rules:[{required:true,message:'请输入账号'}],
                span:8,
            },
            {
                label:'密码',
                node:<Input type='password'/>,
                fileId:'password2',
                rules:[{required:true,message:'请输入密码'}],
                span: 8,
            },
             {
                label:'搜索',
                node:<Input.Search  type='password'/>,
                fileId:'search',
                rules:[{required:true,message:'请输入密码'}],
                span: 8,
            },
            {
                label:'邮箱类型',
                node:<Select
                >
                    {[
                        {text:'360',value:'360'},
                        {text:'qq',value:'qq'},
                        {text:'雅虎',value:'yahu'},
                        {text:'百度',value:'baidu'},
                    ].map(item=><Select.Option key={item.value} value={item.value}>{item.text}</Select.Option>)}
                </Select>,
                fileId:'type',
                span:8
            },
            {
                label:'日期',
                node:<JDatePicker 
                 format="YYYY-MM-DD HH:mm:ss"
                   onChange={(a,b)=>{
                    console.log(a,b)
                }}/>,
                fileId:'date',
                span:8,
                hide:hideDate,
            },
             {
                label:'range日期',
                node:<JDatePicker.RangePicker format="YYYY-MM-DD HH:mm"/>,
                fileId:'date2',
                span:16,
                wrap:16,
                hide:hideDate,
            },
            {
                label:'range日期',
                node:<JDatePicker.WeekPicker />,
                fileId:'date3',
                span:16,
                wrap:16,
                hide:hideDate,
            },
            {
                label:'range日期',
                node:<JDatePicker.MonthPicker />,
                fileId:'date4',
                span:16,
                wrap:16,
                hide:hideDate,
            },
            {
                label:'备注',
                node:<Input.TextArea />,
                fileId:'textArea',
                span:16,
                wrap:16,
            },
        ]
        return (
            <div>
                <div style={{marginBottom:20}}>
                    <Button onClick={this.getFormDate}>获取全部表单值</Button>
                    <Button onClick={this.getSingleFormDate}>获取指定表单值</Button>
                </div> 
                <JForm 
                    datas={datas} 
                    style={isSetStyle&&{width:'80%'}}
                    getRefForm = {e=>this.form = e} 
                    isSearch={isSearch}
                    onResetClick={()=>{
                        // alert('你点击了重置按钮')
                    }}
                    onSearchClick={()=>{
                        // alert('你点击了搜索按钮')
                    }}
                 />
            </div> 
        )
    }
}
ReactDOM.render(<Demo />, mountNode);
````
