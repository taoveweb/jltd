import * as React from 'react';
import { Tooltip } from 'antd';
 
 class JltTooltip extends React.Component{
    render() {
        return (
            <Tooltip {...this.props}/>
        )
    }
}

export default JltTooltip;