import * as React from 'react';
import { Card } from 'antd';
 
 const Grid =Card.Grid;
 const Meta =Card.Meta;
 class JltCard extends React.Component{
    static Grid: typeof Grid;
    static Meta: typeof Meta;
    render() {
        return (
            <Card {...this.props}/>
        )
    }
}
JltCard.Grid = Grid;
JltCard.Meta = Meta;
export default Card;