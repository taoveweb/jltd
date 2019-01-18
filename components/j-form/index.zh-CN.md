---
category: Components
subtitle: 表单组件
type: jlt-Components
title: JFrom
cols: 1
---

表单控件。

## 何时使用

模向布局上展示布局。


## API


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isSearch | 是否带收索/重置/收缩按扭 | boolean | `false` |
| style | 定议表单样式 | boolean | `true` |
| isModal | 弹出框时表单为两项显示,即(span=12) | boolean | false |
| datas | 表单数据 | [object配置](#datas) | [] |
| form | 从父组件传入form 在直接使 this.props.form 进行表单控制 | 无 |
| onResetClick | 重置表单 | function | 无 |
| onSearchClick | click事件 | (e)=> | 无 |
| id | form.item Id | string | item.id || item.fileId || item.label |
| getRefForm | 从表单组件回form | (form)=> | form |
| showDetail | 显示详情列表 | boolean | false |
| colon | 是否全部显示  ':' | boolean | false |



### Tip:form
说明:
    this.props.form.values是对this.props.form.getFildsValue函数的封装，通过该函数，可以获取到时间自动转化字符串;
    使用方式参照实例

### datas


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | label 标签的文本 | boolean | `false` |
| fileId | 表单id，form操作设值取值使用 | boolean | `false` |
| node | 只能是表单组件 | ReactNode  | _ |
| Item | 参考Form.Item | object | - |
| colon | 局部控制是否显示 ':' | boolean | false |
| hide | 渲染时是否隐藏该表单 | boolean | false |
| wrap | 占位换行 | number | 0-24 |
| span | 表单占据宽度 | number | 0-24 |
| options | [getFieldDecorator(id, options)](http://192.168.3.138/components/form-cn/)  | object | - |
| initialValue | 组件的初始化值 | - | - |


## 注意

请确保 `Tooltip` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
