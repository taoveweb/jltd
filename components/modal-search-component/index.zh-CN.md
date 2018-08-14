---
category: Components
subtitle: ModalSearchCompontne组件
type: self-table
title: ModalSearchCompontne
---



## 何时使用
弹出查询框，支持选中行和双击回填数据。



## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示模态框 | boolean | - |
| onCancel | 取消模态框的回调函数 | Function() | - |
| onChangeVisible | 点击确定时，数据回填的回调函数 | Function(selectedRows:any) | - |
| columns | 数据数组 | any[] | - |
| searchParam | 查询条件数组| any[] | - |
| modalTitle | 模态框标题 | string | - |
| dispatch | 异步时用于触发reducer的函数 | Function() | - |
| url | 用于查询条件的url | string | - |
| hiddenField | 隐藏域字段 | any | - |
| type | 多选/单选，checkbox or radio | string | radio |
| async | 异步dispatch(action)/同步$.ajax() | boolean | false |
```jsx
<ModalSearchCompontne>
  ...
</ModalSearchCompontne>
```
