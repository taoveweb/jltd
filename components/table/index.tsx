import * as React from 'react';
import { Table } from 'antd';

class JltTable extends React.Component{
  
    render() {
        return (
            <Table  {...this.props}/>
        )
    }
}

export default JltTable;