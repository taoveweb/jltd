---
category: Components
subtitle: 表格组件
type: self-table
cols: 1
title: TableComponents
toc: false
---


## API

```html
<Pagination onChange={onChange} total={50} />
```


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableColumns | 表格列的配置描述，具体项见下表 | [ColumnProps](https://git.io/vMMXC)\[] | - |
| tableData | 数据数组 | any\[] |  |
| isEditable | 是否可编缉 | boolean | - |
| isDeleteable | 是否可删除 | boolean | - |
| isAddable | 是否可添加 | boolean | - |
| isSave | 是否可保存 | boolean | - |
| isCancel | 是否可取消 | boolean | - |
| total | 数据总数 | number | 0 |
| selectedRowKeys | 选种行key | string | - |
| rowKey | 行key | string | - |
| tableWidth | 表格宽度 | number | - |
| loading | 加载中 | boolean | false |
| pagination | 分页器，参考[配置项](#pagination)或 [pagination](/components/pagination/)，设为 false 时不展示和进行分页 | object |  |
| onChange | 页码改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize) | noop |


