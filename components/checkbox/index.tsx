import * as React from 'react';
import { Checkbox } from 'antd';
 
 const Group =Checkbox.Group;

 class JltCheckbox extends React.Component{
    static Group:typeof Group;
    render() {
        return (
            <Checkbox {...this.props}/>
        )
    }
}

JltCheckbox.Group = Group;
export default JltCheckbox;