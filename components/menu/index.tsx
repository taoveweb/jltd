import * as React from 'react';
import { Menu } from 'antd';
 
 const Item =Menu.Item;
 const SubMenu = Menu.SubMenu;
 const ItemGroup =Menu.ItemGroup;
 const Divider = Menu.Divider;

 class JltMenu extends React.Component{
    static Item: typeof Item;
    static SubMenu : typeof SubMenu;
    static ItemGroup: typeof ItemGroup;
    static Divider : typeof Divider;
    render() {
        return (
            <Menu {...this.props}/>
        )
    }
}

JltMenu.Item = Item;
JltMenu.SubMenu = SubMenu;
JltMenu.ItemGroup = ItemGroup;
JltMenu.Divider= Divider;
export default JltMenu;