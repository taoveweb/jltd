import * as React from 'react';
import { Input } from 'antd';
 
 const Group =Input.Group;
 const Search = Input.Search;
 const TextArea =Input.TextArea;

 class JltInput extends React.Component{
    static Group: typeof Group;
    static Search : typeof Search;
    static TextArea: typeof TextArea;
    render() {
        return (
            <Input {...this.props}/>
        )
    }
}

JltInput.Group = Group;
JltInput.Search = Search;
JltInput.TextArea = TextArea;
export default JltInput;