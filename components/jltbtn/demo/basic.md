---
order: 0
title:
  zh-CN: 按钮类型
---

## zh-CN

按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。

> `danger` 在 `antd@2.7` 后支持。

> `danger` is supported after `antd@2.7`.

````jsx
import { Jltbtn } from 'jltd';

ReactDOM.render(
  <div>
    <Jltbtn type="primary">Primaryby-jltbtn</Jltbtn>
    <Jltbtn>Default</Jltbtn>
    <Jltbtn type="dashed">Dashed</Jltbtn>
    <Jltbtn type="danger">Danger</Jltbtn>
  </div>,
  mountNode);
````
