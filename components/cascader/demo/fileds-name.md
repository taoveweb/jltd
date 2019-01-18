---
order: 10
title:
  zh-CN: 自定义字段名
  en-US: Custom Filed Names
---

## zh-CN

自定义字段名。

## en-US

Custom filed names.

````jsx
import { Cascader } from 'jltd';

const options = [{
  code: 'zhejiang',
  name: 'Zhejiang',
  items: [{
    code: 'hangzhou',
    name: 'Hangzhou',
    items: [{
      code: 'xihu',
      name: 'West Lake',
    }],
  }],
}, {
  code: 'jiangsu',
  name: 'Jiangsu',
  items: [{
    code: 'nanjing',
    name: 'Nanjing',
    items: [{
      code: 'zhonghuamen',
      name: 'Zhong Hua Men',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <Cascader filedNames={{ label: 'name', value: 'code', children: 'items' }} options={options} onChange={onChange} placeholder="Please select" />,
  mountNode);
````
