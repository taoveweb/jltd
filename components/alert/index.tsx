import * as React from 'react';
import { Alert } from 'antd';

 class JltAlert extends React.Component{
    render() {
        return (
            <Alert message {...this.props}/>
        )
    }
}
export default JltAlert;