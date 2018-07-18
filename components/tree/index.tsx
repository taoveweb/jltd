import * as React from 'react';
import { Tree } from 'antd';
 
 const TreeNode  =Tree.TreeNode ;

 class JltTree extends React.Component{
    static TreeNode:typeof TreeNode;
    render() {
        return (
            <Tree {...this.props}/>
        )
    }
}

JltTree.TreeNode = TreeNode;
export default JltTree;