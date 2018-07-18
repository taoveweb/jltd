import * as React from 'react';
import { AutoComplete } from 'antd';
 
 const Option  =AutoComplete.Option;
 const OptGroup = AutoComplete.OptGroup;
 class JltAutoComplete extends React.Component{
    static Option: typeof Option;
    static OptGroup: typeof OptGroup;
    render() {
        return (
            <AutoComplete   />
        )
    }
}

JltAutoComplete.Option = Option;
JltAutoComplete.OptGroup = OptGroup;
export default JltAutoComplete;