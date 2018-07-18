---
category: Components
type: self-table
title: SelectComponents
subtitle: 按钮
---

适用于下拉框

## 何时使用

根据一个字典CODE 获取key-value用于下拉框

##    API

下拉框的属性说明如下：


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| codeType | 数据字典CODE | string | -|
| url | 请求地址 | string | -|
| allowClear | 	支持清除 | 	boolean	| false|
| autoFocus | 默认获取焦点 | boolean |	false|
| defaultActiveFirstOption | 	是否默认高亮第一个选项。| 	boolean	| true|
| defaultValue | 	指定默认选中的条目 | string string[] number number[] | 	-|
| disabled | 	是否禁用| boolean | false|
| dropdownClassName	| 下拉菜单的 className 属性	| string	| -|
| dropdownMatchSelectWidth	| 下拉菜单和选择器同宽	| boolean	| true|
| dropdownStyle	| 下拉菜单的 style 属性	| object	| -|
| firstActiveValue	| 默认高亮的选项	| string string[]	| -|
| labelInValue	| 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: ReactNode} 的格式	| boolean	| false|
| maxTagCount  |最多显示多少个 tag	| number	| -|
| mode	| 设置 Select 的模式（2.9 之后支持）	| 'multiple'  'tags'  'combobox' |	-|
| notFoundContent	| 当下拉列表为空时显示的内容	| string	| 'Not Found'|
| optionFilterProp	| 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索	| string	| value|
| optionLabelProp	| 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。	| string	| children （combobox 模式下为 value）|
| placeholder	| 选择框默认文字	| string	| -|
| showArrow	| 是否显示下拉小箭头	| boolean	| true|
| showSearch	| 使单选模式可搜索	| boolean	| false|
| size	| 选择框大小，可选 large small	| string	| default|
| tags	| 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配（2.9 之后废弃，请使用 mode） |	boolean	| false|
| tokenSeparators	| 在 tags 和 multiple 模式下自动分词的分隔符 |	string[]	|
| value	| 指定当前选中的条目	| string string[] number number[]	| -|
| onBlur	| 失去焦点的时回调	| function	| -|
| onChange	| 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数	| function(value, option:Option/Array<Option>)	| -|
| onDeselect	| 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效	| function(value，option:Option)	| -|
| onFocus	| 获得焦点时回调	| function	| -|
| onMouseEnter	| 鼠标移入时回调	| function	| -|
| onMouseLeave	| 鼠标移出时回调	| function	| -|
| onPopupScroll	| 下拉列表滚动时的回调	| function	| -|
| onSearch	| 文本框值变化时回调	| function(value: string)	|
| onSelect	| 被选中时调用，参数为选中项的 value (或 key) 值	| function(value, option:Option)	| -|