---
order: 1
title:
  zh-CN: 行选择使用
---

## zh-CN

分页的相关属性操作。

````jsx
import MyTable from '../index';
import {Tag ,Divider,Button} from 'antd'
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [];
function initData(){
    for(let i=0;i<18;i++){
        data.push({
            key: i,
            name: 'John Brown',
            age: Math.random()*40+20,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        })
    }
}
class Demo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isRowSelect:false
        }
        initData()
    }

    toggleisRowSelect=()=>{
        this.setState({isRowSelect:!this.state.isRowSelect})
    }

    setRowKeys = ()=>{
        this.table.setSelectedRowKeys([1,2,3,4,5])
    }

    resetRowKeys=()=>{
        this.table.setSelectedRowKeys();
    }
    render(){
        let {isRowSelect} = this.state;
        return(
            <div>
                <div>
                    <Button onClick={this.toggleisRowSelect}>行{isRowSelect?'隐藏':'显示'}</Button>  
                    <Button onClick={this.setRowKeys}>setRowKeys</Button>  
                    <Button onClick={this.resetRowKeys}>cleerRowKeys</Button>  
                </div>
                <MyTable 
                    rowKey='key'
                    ref={e=>this.table = e} 
                    columns={columns} 
                    dataSource={data} 
                    isRowSelect={isRowSelect} 
                />
            </div>
        )
    }
}
ReactDOM.render(<Demo/>, mountNode);

````
