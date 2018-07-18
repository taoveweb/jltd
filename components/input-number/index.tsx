import * as React from 'react';
import { InputNumber } from 'antd';
 
 class JltInputNumber extends React.Component{
    render() {
        return (
            <InputNumber {...this.props}/>
        )
    }
}

export default JltInputNumber;