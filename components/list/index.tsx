import * as React from 'react';
import { List } from 'antd';
 
 const Item =List.Item;
 const Meta = Item.Meta;

 class JltList extends React.Component{
    static Item: typeof Item;
    render() {
        return (
            ""
        )
    }
}

JltList.Item = Item;
JltList.Item.Meta = Meta;
export default JltList;