---
order: 9
title:
    zh-CN: 搜索框删除 
    en-US: Input.Search  allow-clear
---

## zh-CN

搜索框删除

## en-US

Input.Search  allowClear

````jsx
import { JInput } from 'jltd';
    ReactDOM.render(
        <JInput.Search 
            placeholder="allowClear " 
            allowClear 
            onClear={()=>{alert('点击删除了')}} 
            onSearch={()=>{
                alert('点击搜索了')
            }}
        />, mountNode);
````
