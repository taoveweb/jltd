---
category: Components
subtitle: 下拉组件
type: jlt-Components
title: JSelect
cols: 1
---

下拉控件。

## 何时使用

模向布局上展示布局。


## API


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| style | 定议下拉样式样式 | boolean | - |
| textStyle | 文本样式样式 | boolean | - |
| placeholder | 选择框默认文字 | string | - |
| value | 指定当前选中的条目 | - | - |
| disabled | 下拉框是否允许操作 | boolean | `true` |
| allowClear | 支持清除 | boolean | false |
| defaultValue | 指定默认选中的条目 | string\|string\[]<br />number\|number\[] | - |
| onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value, option:Option/Array&lt;Option>) | - |
| className | 类名 | string | - |
| mode | 设置 Select 的模式为多选或标签 | 'multiple' \| 'tags' | - |
| editable | 是否是可编辑状态 | boolean | `true` |
| requestUrl | 数据的请求地址 | string | '/jlt-workplat-web/system/getDataDictionary' |
| requestType | 数据的请求方式 | string | 'POST' |
| headers | 数据的请求头部 | object | - |
| params | 数据的请求参数 | object | - |
| labelName | label的值 | string | 'label'|
| valueName | key的值 | string | 'key' |
| dataType | 参数类型 | string | 'json' \| 'formDate'(默认) |
| filter | 过滤选项,return true 显示，return false不显示 | Funtion(option) | - |
| loadSuccess | 后台数据请求成功回调 | (data)=> |  |

