import * as React from 'react';
import { DatePicker } from 'antd';
 
 const MonthPicker =DatePicker.MonthPicker;
 const RangePicker =DatePicker.RangePicker;
 const WeekPicker =DatePicker.WeekPicker;
 class JltDatePicker extends React.Component{
    static MonthPicker: typeof MonthPicker;
    static RangePicker: typeof RangePicker;
    static WeekPicker: typeof WeekPicker;
    render() {
        return (
            <DatePicker  {...this.props}/>
        )
    }
}
JltDatePicker.MonthPicker = MonthPicker;
JltDatePicker.RangePicker = RangePicker;
JltDatePicker.WeekPicker = WeekPicker;
export default JltDatePicker;