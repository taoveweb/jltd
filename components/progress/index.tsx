import * as React from 'react';
import { Progress } from 'antd';
 
 class JltProgress extends React.Component{
   
    render() {
        return (
            <Progress {...this.props}/>
        )
    }
}

export default JltProgress;