import * as React from 'react';
import { Select } from 'antd';
 
 const Option =Select.Option;
 const OptGroup = Select.OptGroup;


 class JltSelect extends React.Component{
    static Option: typeof Option;
    static OptGroup : typeof OptGroup;
    render() {
        return (
            <Select {...this.props}/>
        )
    }
}

JltSelect.Option = Option;
JltSelect.OptGroup = OptGroup;
export default JltSelect;
