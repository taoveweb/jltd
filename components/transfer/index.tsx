import * as React from 'react';
import { Transfer } from 'antd';
 

 class JltTransfer extends React.Component{
    render() {
        return (
            <Transfer dataSource={[]} {...this.props}/>
        )
    }
}

export default JltTransfer;