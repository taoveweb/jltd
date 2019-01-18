---
order: 0
title:
  zh-CN: 典型卡片
  en-US: Basic card
---

## zh-CN

包含标题、内容、操作区域。

## en-US

A basic card containing a title, content and an extra corner content.

````jsx
import { JCard } from 'jltd';

ReactDOM.render(
  <JCard title="标题名称" bordered={false} viewStyle='viewStyle' viewsunStyle='viewsunStyle'>
        展示内容
  </JCard>,
  mountNode);
````

<style>
.viewStyle {
  border-top: 1px solid #e9e9e9;
  padding-top: 20px;
}
.viewsunStyle{
  font-size: 16px;
    line-height: 24px;
    color: #595959;
    font-family: 'PingFangSC', 'helvetica neue', 'hiragino sans gb', 'arial', 'microsoft yahei ui', 'microsoft yahei', 'simsun', 'sans-serif' !important;
    font-weight: 650;
    margin-bottom: 20px;
    font-weight: bold;
}
</style>
