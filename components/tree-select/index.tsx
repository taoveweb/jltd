import * as React from 'react';
import { TreeSelect } from 'antd';
 
const TreeNode = TreeSelect.TreeNode;
const SHOW_ALL = TreeSelect.SHOW_ALL;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_CHILD = TreeSelect.SHOW_CHILD;

 class JltTreeSelect extends React.Component{
    static TreeNode:typeof TreeNode;
    static SHOW_ALL:typeof SHOW_ALL;
    static SHOW_PARENT:typeof SHOW_PARENT;
    static SHOW_CHILD:typeof SHOW_CHILD;
    render() {
        return (
            <TreeSelect {...this.props}/>
        )
    }
}

JltTreeSelect.TreeNode = TreeNode;
JltTreeSelect.SHOW_ALL = SHOW_ALL;
JltTreeSelect.SHOW_PARENT = SHOW_PARENT;
JltTreeSelect.SHOW_CHILD = SHOW_CHILD;
export default JltTreeSelect;