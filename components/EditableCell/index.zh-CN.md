---
category: Components
subtitle: 编缉表格单元
type: Data Display
cols: 1
title: EditableCell
toc: false
---

## 何时使用

表格中带有可编缉表单

## API


组件的属性说明如下：


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| getEditRowFormRef | 获取组件form引用 | Form | - |
| fieldId | getFieldDecorator('fieldId') | string | - |
| rows | TextArea的行数 | number | 4 |
| radioData | radio长成 | Array<{value,text}> | - |
| defaultValue | 指定默认选中的条目 | 根据生成的组件类型 | - |
| optionData | radio长成 | Array<{value,text}> | - |
| placeholder | 占位提示 | string | - |
| style | 设计样式 | styleObject | - |
| className | 为Select设置样式 | string | - |
| viewStyle | 为TextArea设置样式 | styleObject | - |
| DateEnd | RangePicker 结束日期 | [moment](http://momentjs.com/)\[] | - |
| DateBegin | RangePicker 结束日期 | [moment](http://momentjs.com/)\[] | - |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| disabled | 是否禁用 | boolean | false |
| onBlur | 失去焦点的时回调 | function | - |
| onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value, option:Option/Array<Option\>) | - |
| onClick | Search 点击搜索时 | function | - |
| maxLength | input 同 原生input maxLength | number | - |
| editable | 是否可编缉 | boolean | - |
| value | getFieldDecorator options.initialValue 初始值 | string | - |
| fieldOption | getFieldDecorator options | Object | - |
| field | 表单组件 <Input /> | component | - |
| type | 组件类型 | string(input，textarea,search,select,dataPicker ,rangePicker,checkbox,radioGroup) | - |



