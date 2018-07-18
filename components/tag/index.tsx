import * as React from 'react';
import { Tag } from 'antd';
 
 const CheckableTag  =Tag.CheckableTag ;

 class JltTag extends React.Component{
    static CheckableTag:typeof CheckableTag;
    render() {
        return (
            <Tag {...this.props}/>
        )
    }
}

JltTag.CheckableTag = CheckableTag;
export default JltTag;