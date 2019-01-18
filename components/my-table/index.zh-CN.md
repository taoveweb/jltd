---
category: Components
subtitle: Table组件
type: self-table
title: MyTable
cols: 1
---

## 何时使用
使用方法与Table组件一致


## API

属性如下
antd design Table所以属性，以下是特有属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isRowSelect | 是否显示多选框 | boolean | false |
| scrollWidth | 横向滚动距离 | string|number | 0 |
| scrollHeight | 纵向滚动距离 | string|number | 0 |
| showPagination | 是否显示分页器 | boolean | true |
| singleExanded | 是否单项打开row | boolean | false |
| total | 数据总数 | number | 0 |
| onPageChange | page/pageSize改变后触发 | string | -|


函数方法


| 方法名 | 方法说明 | 参数 | 参数说明 | 默认值 |
| --- | --- | --- | --- | --- |
| setSelectedRowKeys | 设置选中列表 | selectedRowKeys | 选中key的集合 | [] |
| setSelectRows | 设置选中列表 | selectedRows | 选中列表内容的集合 | [] |
| resetPagination | 初始化分页内容 | object:{} | page <br>pageSize | 1<br>10 |
| resetExpanded | 初始化展开项 | expandedRowKeys | 展开项的key集合<br>不传参数是清空展开项 | [] |


