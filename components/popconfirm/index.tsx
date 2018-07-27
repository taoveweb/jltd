import * as React from 'react';
import { Popconfirm } from 'antd';
 
interface PopconfirmProps  {
    title: React.ReactNode;
}

class JltPopconfirm extends React.Component<PopconfirmProps,any>{
    render() {
        return (
            <Popconfirm title={this.props.title} {...this.props}/>
        )
    }
}

export default JltPopconfirm;