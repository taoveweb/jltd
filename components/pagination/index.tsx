import * as React from 'react';
import { Pagination } from 'antd';

 class JltPagination extends React.Component{
    render() {
        return (
            <Pagination {...this.props}/>
        )
    }
}

export default JltPagination;