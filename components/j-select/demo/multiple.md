---
order: 2
title:
  zh-CN: 多选
  en-US: multiple selection
---

## zh-CN

多选，从已有条目中选择（scroll the menu）

## en-US

Multiple selection, selecting from existing items (scroll the menu).

````jsx
import { JSelect } from 'jltd';

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <JSelect
    mode="multiple"
    defaultValue={['luck', 'future']}
    style={{ width: '40%' }}
    placeholder="Please select"
    onChange={handleChange}
  />,
  mountNode
);
````
