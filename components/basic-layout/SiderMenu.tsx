import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
const pathToRegexp = require('path-to-regexp');
import { Link } from 'react-router-dom';
require('./style/SiderMenu.less');
// import { urlToList } from '../_util/pathTools';
const { Sider } = Layout;
const { SubMenu } = Menu;
const preCls = 'ant-sidermenu';
// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
function urlToList(url:any) {
  const urllist = url.split('/').filter((i:any) => i);
  // @ts-ignore
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}
const getIcon = (icon:any) => {
  if (typeof icon === 'string') {
    if (icon.indexOf('http') === 0) {
      return (
        <img
          src={icon}
          alt="icon"
          className={`${preCls}-icon sider-menu-item-img`}
        />
      );
    }
    return <Icon type={icon} />;
  }
  return icon;
};
/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => [path,path2]
 * @param  menu
 */
export const getFlatMenuKeys = (menu:any) =>
  menu.reduce((keys:any, item:any) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);
/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys:any, paths:any) =>
  paths.reduce(
    (matchKeys:any, path:any) =>
      matchKeys.concat(
        flatMenuKeys.filter((item:any) => pathToRegexp(item).test(path))
      ),
    []
  );
export interface SiderMenuProps{
  menuData:any,
  location:any,
  isMobile:any,
  onCollapse:any,
  Authorized:any,
  collapsed:any
}
export interface SiderMenuState{
  openKeys:any,
  iconWidth:any
}
export default class SiderMenu extends React.PureComponent<SiderMenuProps,SiderMenuState> {
  flatMenuKeys:any;

  constructor(props:SiderMenuProps) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
      iconWidth: "212px"
    };
  }
  componentWillReceiveProps(nextProps:any) {
    const { location } = this.props;
    if (nextProps.location.pathname !== location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props:SiderMenuProps) {
    const {
      location: { pathname },
    } =
      props || this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  }
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item:any) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true);
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item:any) => {
    if (item.children && item.children.some((child:any) => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                  item.name
                )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
      );
    }
  };
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData:any) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item:any) => item.name && !item.hideInMenu)
      .map((item:any) => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item:any) => item);
  };
  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const {
      location: { pathname },
    } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  };
  // conversion Path
  // 转化路径
  conversionPath = (path:any) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };
  // permission to check
  checkPermissionItem = (authority:any, ItemDom:any) => {
    const { Authorized } = this.props;
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };
  isMainMenu = (key:any) => {
    const { menuData } = this.props;
    return menuData.some(
      (item:any) => key && (item.key === key || item.path === key)
    );
  };
  handleOpenChange = (openKeys:any) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne =
      openKeys.filter((openKey:any) => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (collapsed) {
      this.setState({
        iconWidth: "212px"
      })
    } else {
      this.setState({
        iconWidth: "80px"
      })
    }
    onCollapse(!collapsed);

  }
  render() {
    const { menuData, collapsed, onCollapse } = this.props;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
        openKeys,
      };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={212}
        className={`${preCls}-sider`}
      >
        <Menu
          key="Menu"
          theme="light"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
        <div className={"fixedBottom"} style={{ width: this.state.iconWidth }}>
          <Icon
            className={'trigger'}
            type={collapsed ? 'right' : 'left'}
            onClick={this.toggle}
          />
        </div>
      </Sider>
    );
  }
}
