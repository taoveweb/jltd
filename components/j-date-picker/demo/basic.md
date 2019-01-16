---
order: 0
title:
  zh-CN: 时间限制
  en-US: Controlled Panels
---

## zh-CN

通过组合 `limitDate` 限制日期时间范围

## en-US


````jsx
import { JDatePicker,DatePicker } from 'jltd';
import moment from 'moment'
// limitEendTime='2019-1-3 12:35'
// limitTime={'2019-1-1 12:35'}
ReactDOM.render(
  <div>
    <JDatePicker limitTime={'2019-1-1 12:35'} limitEndTime='2019-1-3 12:35' showTime={{ format: 'HH:mm' }} format='YYYY-MM-DD HH:mm' />
  </div>
, mountNode);
````
