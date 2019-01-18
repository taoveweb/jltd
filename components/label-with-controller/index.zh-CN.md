---
category: Components
subtitle: LabelWithController组件
type: self-table
title: LabelWithController
---



## 何时使用


## API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isRequire | 是否显示星号 | boolean | false |
| type | labelwithcontroller类型 | string | - |
| viewStyle | 自定义样式 | string | 1 |
| disabled | 禁用 | boolean | false |
| value | 控件的值 | any | - |

## type=radioGroup API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| radioData | 单选框按钮组数组 | [] | - |
| onChange | 单机单选框的回调函数 | function() | - |

## type=inputnumber API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| min | 最小值 | any | 0 |
| max | 最大值 | any | 9999999999999999 |
| step | 每次改变步数，可以为小数 | any | 1 |
| formatter | 指定输入框展示值的格式 | any | - |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | any | - |
| precision | 数值精度 | number | - |
| onChange | 变化回调 | function() | - |

## type=input API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maxLength | input输入框最大显示的字节数 | string | 0 |
| defaultValue | 默认值 | any | - |
| placeholder | 占位符 | string | - |
| disabled | 禁用 | boolean | false |
| onChange | 变化回调 | function() | - |
| onBlur | 获取焦点的回调函数 | function() | - |
| onClick | 点击input框的回调函数 | function() | - |
| readOnly | 是否只读 | any | - |

## type=textarea API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maxLength | input输入框最大显示的字节数 | string | 0 |
| rows | 多行输入框的行数 | any | 4 |
| placeholder | 占位符 | string | - |
| disabled | 禁用 | boolean | false |
| onChange | 变化回调 | function() | - |


## type=search API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maxLength | input输入框最大显示的字节数 | string | 0 |
| placeholder | 占位符 | string | - |
| disabled | 禁用 | boolean | false |
| onChange | 变化回调 | function() | - |
| onSearch | 点击搜索或按下回车键时的回调 | function() | - |
| suffix | 带有后缀图标的 input | any | - |
| readOnly | 是否只读 | any | - |
| onBlur | 获取焦点的回调函数 | function() | - |
## type=Select API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showSearch | 使单选模式可搜索 | string | false |
| optionFilterProp | 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索 | string | - |
| defaultValue | 指定默认选中的条目 | string | - |
| onChange | 变化回调 | function() | - |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false | function() | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | function() | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| placeholder | 选择框默认文字 | string | - |
| mode | 设置 Select 的模式（2.9 之后支持） | 'multiple' | 'tags' | - |

## type=dataPicker API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 指定默认选中的条目 | string | - |
| format | 展示的日期格式 | string | YYYY-MM-DD HH:mm:ss |
| showTime | 增加时间选择功能 | Object|boolean | TimePicker Options |
| onChange | 变化回调 | function() | - |
| placeholder | 默认显示的文字 | string | - |

## type=rangePicker API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onChange | 变化回调 | function() | - |
| placeholder | 默认显示的文字 | string | - |

## type=cascader API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 可选项数据源 | 	object | - |
| onChange | 变化回调 | function() | - |
| placeholder | 默认显示的文字 | string | - |

## type=checkbox API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultChecked | 默认选中的值 | any | - |
| onChange | 变化回调 | function() | - |

## type=range API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| minValue | 最小值 | any | - |
| maxValue | 最大值 | any | - |
| onChange | 变化回调 | function() | - |

## type=dataDictionary API

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| codeType | 数据词典编码 | any | - |
| defaultValue | 默认值 | any | - |
| onChange | 变化回调 | function() | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| onChange | 变化回调 | function() | - |
| mode | 设置 Select 的模式（2.9 之后支持） | 'multiple' | 'tags' | - |
| style | 自定义样式 | any | - |
```jsx
<LabelWithController >
  ...
</LabelWithController>
```
