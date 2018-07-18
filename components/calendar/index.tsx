import * as React from 'react';
import { Calendar } from 'antd';

 class JltCalendar extends React.Component{
    render() {
        return (
            <Calendar  {...this.props} />
        )
    }
}
export default JltCalendar;