---
order: 1
title:
  zh-CN: 分页使用
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

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];
data.push(...data);
data.push(...data);
class Demo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPagination:false
        }
    }
    onPageChange=(page,size)=>{
        console.log(page,size)
    }
    toggleShowPagination=()=>{
        this.setState({showPagination:!this.state.showPagination});
    }

    setPagination=()=>{
        this.table.resetPagination({pageSize:20})
    }

    render(){
        let {showPagination} = this.state;
        return(
            <div>
                <div>
                    <Button onClick={this.toggleShowPagination}>分页{showPagination?'隐藏':'显示'}</Button>  
                    <Button onClick={this.setPagination}>设置分页</Button>  
                </div>
                <MyTable 
                ref={e=>this.table = e} 
                columns={columns} 
                dataSource={data} 
                showPagination={showPagination} 
                onPageChange={this.onPageChange}
                total={data.length}
                />
            </div>
        )
    }
}
ReactDOM.render(<Demo/>, mountNode);

````
