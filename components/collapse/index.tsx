import * as React from 'react';
import { Collapse } from 'antd';
 
 const Panel =Collapse.Panel;

 class JltCollapse extends React.Component{
    static Panel:typeof Panel;
    render() {
        return (
            <Collapse {...this.props}/>
        )
    }
}

JltCollapse.Panel = Panel;
export default JltCollapse;