import * as React from 'react';
import { TimePicker } from 'antd';
 

 class JltTimePicker extends React.Component{
    render() {
        return (
            <TimePicker {...this.props}/>
        )
    }
}

export default JltTimePicker;