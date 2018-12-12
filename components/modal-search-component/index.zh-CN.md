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
| dataSource | 点击搜索时返回的数据| any[] | - |
| modalTitle | 模态框标题 | string | - |
| dispatch | 异步时用于触发reducer的函数 | Function() | - |
| type | 多选/单选，checkbox or radio | string | radio |
| queryList | 点击搜索按钮时触发的回调函数 | Function | - |
```jsx
<ModalSearchCompontne>
  ...
</ModalSearchCompontne>
```
