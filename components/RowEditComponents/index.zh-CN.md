---
category: Components
subtitle: 单格
type: Data Display
cols: 1
title: RowEditComponents
toc: false
---


## API

```html
<Pagination onChange={onChange} total={50} />
```


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页数 | number | - |
| total | 数据总数 | number | 0 |
| pageSize | 每页条数 | number | - |
| onChange | 页码改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize) | noop |
| onShowSizeChange | pageSize 变化的回调 | Function(current, size) | noop |
| pageSizeOptions | 指定每页可以显示多少条 | string\[] | ['10', '20', '30', '40'] |
| showTotal | 用于显示数据总量和当前数据顺序 | Function(total, range) | - |


