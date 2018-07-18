---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本使用。

## en-US

Basic Usage.

````jsx
import { SelectComponents } from 'jltd';

function focus() {
 
}

function onSelectChange(value){
 
}
ReactDOM.render(
  <div>
    <SelectComponents  url="/jlt-workplat-web/member/getCompanyType"   codeType="COMPANY_TYPE" onFocus={focus}/>
  </div>
, mountNode);
````
