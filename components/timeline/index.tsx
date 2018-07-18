import * as React from 'react';
import { Timeline } from 'antd';
 
 const Item  =Timeline.Item ;

 class JltTimeline extends React.Component{
    static Item:typeof Item;
    render() {
        return (
            <Timeline {...this.props}/>
        )
    }
}

JltTimeline.Item = Item;
export default JltTimeline;