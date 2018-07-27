---
category: Components
subtitle: Form组件
type: self-table
title: FormComponents
---

将Form表单封装成组件。

## 何时使用

新增或编辑form表单时使用。


## API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| handleSubmit | form表单提交的方法 | function(e) | - |
| datas | 距离窗口顶部达到指定偏移量后触发 | Array<> | - |
| getRefForm | 获取组件form引用 | Form | - |

## datas 
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isRequire | 是否显示必填星号提示 | boolean | - |
| type | 控件的类型如 Input Select | string | - |
| value | 外部修改输入框的值 | string | - |
| codeType | 数据字典选择框的类型 | string | - |
| defaultValue | 默认值 | string | - |
| onChange | 状态变化方法的回调函数 | Function | - |
| className | type类型的自定义样式如(Input) | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| mode | 设置 Select 的模式（2.9 之后支持） | 'multiple' or 'tags' | - |
| style | 同className | Object | - |
| col | 宽度自适应 24为占满父元素宽度 8为占父元素宽度的三分之一 | any | 8 |
| placeholder | 提示文字 | Array | - |
| optionData | 下拉框内容 | Array | - |
| radioData | 单选框内容 | Object | - |
```jsx
<FormComponents handleSubmit={this.subminOnClick} datas={searchFormList} getRefForm={this.getSkuInfoRefForm}>
  ...
</FormComponents>
```
