---
category: Components
subtitle: Modal组件
type: self-table
title: ModalComponent
---

将Modal表单封装成组件。

## 何时使用

简单的Modal弹出框


## API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示 | boolean | - |
| onConfirm | 点击确定回调 | function(e) | - |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | - |
| title | 标题 | any | - |
| child | 距离窗口顶部达到指定偏移量后触发 | Array<> | - |
| width | 模态框宽度 | any | 50% |
| okText | 确认按钮文字 | any | 确定 |
| style | 可用于设置浮层的样式，调整浮层位置等 | any | - |

```jsx
<ModalComponent visible={visible} onConfirm={onConfirm} onCancel={onCancel} title={title} width={width} okText={okText} style={style}>
  ...
</ModalComponent>
```
