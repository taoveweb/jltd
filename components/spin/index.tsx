import * as React from 'react';
import { Spin } from 'antd';
 
class JltSpin extends React.Component{
   
    render() {
        return (
            <Spin  {...this.props}/>
        )
    }
}

export default JltSpin;