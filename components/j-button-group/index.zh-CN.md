---
category: Components
subtitle: 组按钮
type: jlt-Components
title: JButtonGroup
---



## 何时使用



## API

属性如下

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 按钮数组-[item](#item) | Array | [] |


## item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否可点击 | boolean | false |
| popconfirmTitle | 确认弹框的title | string | '' |
| onClick | 点击事件 | Function | - |
| templateId | 代入模板id | string | '' |
| children | 二级弹窗的data-[item](#item) | Array | [] |
| menuCode | 菜单权限码 | string | '' |
| operateCode | 按钮权限码 | string | '' |
| text | 无权限配置,按钮显示的标题 | string | '' |