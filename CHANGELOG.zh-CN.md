---
order: 6
title: 更新日志
toc: false
timeline: true
---

`jltd` 严格遵循 [Semantic Versioning 1.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。


---

## 修复
`2019-1-16`
- 📖 修复下拉级联文字过长问题

## 修复
`2019-1-16`
- 📖 修复j-form组件下，日期选择器无法使用年选择，月选择bug
- 📖 修复j-form组件下，下拉框，内容溢出撑开内容
- 📖 添加j-select 数据加载成功回调，loadSuccess

## 新增
`2019-1-14`
- 📖 新增JProgress组件

## 3.11.43
`2019-1-14`

- 📖 JInput.Search 的readOnly 默认值为true  
- 📖 buttonGroup 功能废弃不用   新增JButtonGroup组件替代 <JButtonGroup data={[按钮数组(很原来一致)]}/>
- 📖 JDatePicker 添加开始禁止时间和结束禁止时间2个字段 limitStartTime | limitEndTime(原limitTime等价与limitStartTime ，做兼容处理了，所以可以不用改，以后都用limitStartTime 就行)


`2018-07-11`

- 📖 发布了全新的官网和设计文档。
- 📖 二次封装antd
- 📖 添加现有框架组件

## 1.0.X

`2018-07-11`

- 📖 发布了全新的官网和设计文档。
- 📖 二次封装antd
- 📖 添加现有框架组件
