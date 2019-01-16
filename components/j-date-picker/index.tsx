// import { DatePicker } from 'antd';

// export default DatePicker;

import * as React from 'react';
import { DatePicker } from 'antd';
//@ts-ignore
import moment from 'moment';

const TIME_LIST = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
];

class JDatePicker extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      current: moment(),
    };
  }
  getLimitDate = (currentDate: any, limitDate: any, limitEndTime: any) => {
    console.log(currentDate.format('YYYY-MM-DD HH:mm'));
    if (typeof limitDate === 'string') {
      limitDate = moment(limitDate);
    }
    if (typeof limitEndTime === 'string') {
      limitEndTime = moment(limitEndTime);
    }
    if (!limitDate && !limitEndTime) {
      return {};
    }
    let hourStr = currentDate.hour();
    let isDateAfter;
    let isDateEndBefore;

    let limitHour = 0;
    let limitMinute = 0;
    let limitEndHour = 24;
    let limitEndMinute = 60;

    if (limitDate) {
      isDateAfter = currentDate.isAfter(limitDate.format('YYYY-MM-DD'), 'day');
      if (!isDateAfter) {
        limitHour = limitDate.hour();
      }
      if (isDateAfter || hourStr > limitDate.hour()) {
        limitMinute = 0;
      } else {
        limitMinute = limitDate.minute();
      }
    }

    if (limitEndTime) {
      isDateEndBefore = currentDate.isBefore(limitEndTime.format('YYYY-MM-DD'), 'day');
      if (!isDateEndBefore) {
        limitEndHour = limitEndTime.hour();
      }
      if (hourStr == limitEndHour) {
        limitEndMinute = limitEndTime.minute();
      }
    }
    return {
      disabledDate: (current: any) => {
        return (
          (limitDate && current && current.isBefore(limitDate.format('YYYY-MM-DD'), 'day')) ||
          (limitEndTime && current && current.isAfter(limitEndTime.format('YYYY-MM-DD'), 'day'))
        );
      },
      disabledTime: () => {
        return {
          disabledHours: () =>
            TIME_LIST.slice(0, limitHour).concat(TIME_LIST.slice(limitEndHour+1, 24)),
          disabledMinutes: () =>
            TIME_LIST.slice(0, limitMinute).concat(TIME_LIST.slice(limitEndMinute+1, 60)),
        };
      },
    };
  };
  render() {
    let { limitTime, getRef, onChange, limitStartTime, limitEndTime, ...rest } = this.props;
    let { current } = this.state;
    let limitProps =
      limitTime || limitEndTime
        ? this.getLimitDate(current, limitTime || limitStartTime, limitEndTime)
        : {};
    return (
      <DatePicker
        ref={(e: any) => getRef && getRef(e)}
        {...limitProps}
        {...rest}
        onChange={(date: any, dateString: string) => {
          this.setState({
            current: date,
          });
          onChange && onChange(date, dateString);
        }}
      />
    );
  }
}
// @ts-ignore
JDatePicker._name = 'JDatePicker';
// @ts-ignore
DatePicker.RangePicker._name = 'RangePicker';
// @ts-ignore
DatePicker.MonthPicker._name = 'MonthPicker';
// @ts-ignore
DatePicker.WeekPicker._name = 'WeekPicker';
//@ts-ignore
JDatePicker.RangePicker = DatePicker.RangePicker;
//@ts-ignore
JDatePicker.MonthPicker = DatePicker.MonthPicker;
//@ts-ignore
JDatePicker.WeekPicker = DatePicker.WeekPicker;

export default JDatePicker;
