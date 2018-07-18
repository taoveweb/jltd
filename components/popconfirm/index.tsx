import * as React from 'react';
import { Popconfirm } from 'antd';
 
 class JltPopconfirm extends React.Component{
   
    render() {
        return (
            <Popconfirm title {...this.props}/>
        )
    }
}

export default JltPopconfirm;