import * as React from 'react';
import { Dropdown } from 'antd';
 
interface DropDownProps {
    overlay: React.ReactNode;
}

 const Button =Dropdown.Button;
 class JltDropdown extends React.Component<DropDownProps,any>{
    static Button: typeof Button;
    render() {
        return (
            <Dropdown overlay={this.props.overlay} {...this.props}/>
        )
    }
}
JltDropdown.Button = Button;
export default JltDropdown;