import * as React from 'react';
import { List } from 'antd';

interface ListProps {
    dataSource: any;
    renderItem: any;
}

const Item =List.Item;
 
class JltList extends React.Component<ListProps>{
    static Item: typeof Item;
    render() {
        return (
            <List dataSource={this.props.dataSource} renderItem={this.props.renderItem} {...this.props}/>
        )
    }
}

JltList.Item = Item;
export default JltList;