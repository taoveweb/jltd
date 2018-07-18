import * as React from 'react';
import { Popover } from 'antd';
 

 class JltPopover extends React.Component{
    render() {
        return (
            <Popover {...this.props}/>
        )
    }
}

export default JltPopover;