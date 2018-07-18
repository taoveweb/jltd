import * as React from 'react';
import { Mention } from 'antd';
 
 const Nav =Mention.Nav;
 const toString = Mention.toString;
 const toContentState =Mention.toContentState;
 const getMentions = Mention.getMentions;

 class JltMention extends React.Component{
    static Nav: typeof Nav;
    static toString : typeof toString;
    static toContentState: typeof toContentState;
    static getMentions : typeof getMentions;
    render() {
        return (
            <Mention {...this.props}/>
        )
    }
}

JltMention.Nav = Nav;
JltMention.toString = toString;
JltMention.toContentState =toContentState;
JltMention.getMentions= getMentions;
export default JltMention;