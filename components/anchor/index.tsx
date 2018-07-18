import * as React from 'react';
import { Anchor } from 'antd';
const Link = Anchor.Link;
class JltAnchor extends React.Component{
    static Link : typeof Link;
    render() {
        return (
            <Anchor  {...this.props}/>
        )
    }
}
JltAnchor.Link = Link;
export default JltAnchor;