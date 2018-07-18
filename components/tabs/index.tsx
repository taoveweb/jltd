import * as React from 'react';
import { Tabs } from 'antd';
 
 const TabPane  =Tabs.TabPane ;

 class JltTabs extends React.Component{
    static TabPane:typeof TabPane;
    render() {
        return (
            <Tabs {...this.props}/>
        )
    }
}

JltTabs.TabPane = TabPane;
export default JltTabs;