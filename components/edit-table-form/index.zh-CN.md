---
category: Components
subtitle: 编缉表格表单
type: self-table
cols: 1
title: EditTableForm
toc: false
---


## API


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| getRefForm | 获取Form对象 | Form Object | - |
| columns | 表格列的配置描述，具体项见下表	 | ColumnProps[] | 0 |
| dataSource | 数据数组	 | any[] | - |
| loading | 页面是否加载中	 | boolean|object (更多) | false |
| onClickRow | 设置行属性 onRow	 | Function(record, index) | noop |
| pagination | 分页器，参考配置项或 pagination，设为 false 时不展示和进行分页 | object | false |
| rowSelection | 列表项是否可选择，配置项 | object | null |
| tableWidth | scroll 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，建议为 x 设置一个数字 | number | - |


