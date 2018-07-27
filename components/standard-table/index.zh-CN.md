---
category: Components
subtitle: 标准表格
type: pro component
cols: 1
title: StandardTable
toc: false
---


## API

```html
<Pagination onChange={onChange} total={50} />
```


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 页面是否加载中	 | boolean|object (更多) | - |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string|Function(record):string | 'key' |
| columns | 表格列的配置描述，具体项见下表	 | ColumnProps[] | - |
| data |  {list,pagination}	 list-数据数组  pagination参考下一行| object| - |
| pagination | 分页器，参考配置项或 pagination，设为 false 时不展示和进行分页| object| - |
| selectedRows | 选种的行 | any[] |  |
| onSelectRow | 分页、排序、筛选变化时触发	 | Function(selectedRows） | - |
| onChange | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter) | - |


