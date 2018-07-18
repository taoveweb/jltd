import * as React from 'react';
import { Dropdown } from 'antd';
 
 const Button =Dropdown.Button;
 class JltDropdown extends React.Component{
    static Button: typeof Button;
    render() {
        return (
            <Dropdown overlay={[]} {...this.props}/>
        )
    }
}
JltDropdown.Button = Button;
export default JltDropdown;