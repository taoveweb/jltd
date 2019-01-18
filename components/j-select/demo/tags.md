---
order: 4
title:
  zh-CN: 标签
  en-US: Tags
---

## zh-CN

tags select，随意输入的内容（scroll the menu）

## en-US

Select with tags, transform input to tag (scroll the menu)

````jsx
import { JSelect } from 'jltd';

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <JSelect
    mode="tags"
    defaultValue={['luck', 'future']}
    style={{ width: '40%' }}
    placeholder="Tags Mode"
    onChange={handleChange}
  />,
  mountNode
);
````
