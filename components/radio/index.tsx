import * as React from 'react';
import { Radio } from 'antd';
 
 const RadioButton =Radio.Button;
 const RadioGroup = Radio.Group;


 class JltRadio extends React.Component{
    static Button:typeof RadioButton;
    static Group:typeof RadioGroup;
    render() {
        return (
            <Radio {...this.props}/>
        )
    }
}

JltRadio.Button = RadioButton;
JltRadio.Group = RadioGroup;
export default JltRadio;