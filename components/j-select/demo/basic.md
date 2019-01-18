---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本使用，当数据格式是data=[{id: '1', customerName='xxx'}]。

## en-US

Basic Usage.

````jsx
import { JSelect } from 'jltd';

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <JSelect 
    defaultValue='company' 
    style={{ width: 120 }} 
    onChange={handleChange} 
    requestUrl='/bcs/basic/billRecCustomer'
    paras={{codeType:'list'}}
    valueName='id'
    labelName='customerName'
  />,
  mountNode
);
````
