import * as React from 'react';
import { Breadcrumb } from 'antd';
 
 const Item =Breadcrumb.Item;
 class JltBreadcrumb extends React.Component{
    static Item: typeof Item;
    render() {
        return (
            <Breadcrumb {...this.props}/>
        )
    }
}
JltBreadcrumb.Item = Item;
export default JltBreadcrumb;