import { Layout, message, Modal } from 'antd';
import classNames from 'classnames';
import { connect } from 'dva';
import { Redirect, Route, Switch } from 'dva/router';
import PropTypes from 'prop-types';
import * as React from 'react';
import { ContainerQuery } from 'react-container-query';
// @ts-ignore
import store from 'store';

import NotFound from './404';
import Authorized from './Authorized';
import SiderMenu from './SiderMenu';
import { getRoutes } from './utils';

// @ts-ignore
const pathToRegexp = require('path-to-regexp');

const DocumentTitle = require('react-document-title');
const { enquireScreen, unenquireScreen } = require('enquire-js');
const logo = require('./img/logo.png');
const mailUsers = require('./img/mail_users.png');
const logoPic = require('./img/logo_pic.png');
const logoutSub = require('./img/logoutSub.png');

const { Content, Header } = Layout;
const { AuthorizedRoute, check }: any = Authorized;
const confirm = Modal.confirm;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData: any = [];
const getRedirect = (item: any) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach((children: any) => {
        getRedirect(children);
      });
    }
  }
};

/* queryMenu().then(data => {
  data.forEach(getRedirect);
}); */
// getMenuData().forEach(getRedirect);

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData: any, routerData: any) => {
  const result: any = {};
  const childResult = {};
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i;
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
    }
  }
  return Object.assign({}, routerData, result, childResult);
};

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

let isMobile: any;
enquireScreen((b: any) => {
  isMobile = b;
});
export interface BasicLayoutProps {
  currentUser: any;
  collapsed: any;
  fetchingNotices: any;
  notices: any;
  menuData: any;
  userInfo: any;
  centerPageUrl: any;
  userPic: any;
  userLogo: any;
  msgInfo: any;
  location: any;
  routerData: any;
  dispatch: any;
  match: any;
}
export interface BasicLayoutState {
  isMobile: any;
}
class BasicLayout extends React.PureComponent<BasicLayoutProps, BasicLayoutState> {
  enquireHandler: any;

  static propTypes = {
    menuData: PropTypes.array,
  };

  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };

  static defaultProps = {
    menuData: [],
  };

  constructor(props: BasicLayoutProps) {
    super(props);
    this.state = {
      isMobile,
    };
    props.menuData.forEach(getRedirect);
  }

  getChildContext() {
    const { location, routerData, menuData } = this.props;
    return {
      location,
      breadcrumbNameMap: getBreadcrumbNameMap(menuData, routerData),
    };
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen((mobile: any) => {
      this.setState({
        isMobile: mobile,
      });
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    const { centerPageUrl } = this.props;

    /* eslint-disable */
    //    Top.init();

    //$('#21CBA9CC6CC243379206254FAF8C4B2C').addClass('cur');
    /* eslint-enable */

    this.props.dispatch({
      type: 'global/userInfo',
    });
    //      .then((userInfo) => {
    //        this.refreshUserInfo(userInfo);
    //      });

    this.props.dispatch({
      type: 'global/msgInfo',
    });

    if (centerPageUrl.length === 0) {
      this.props
        .dispatch({
          type: 'global/getCenterPageUrl',
        })
        .then(() => {
          this.refreshData();
        });
    } else {
      this.refreshData();
    }
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  refreshData() {
    //    this.props.dispatch({
    //      type: 'nav/getMsgCount',
    //      payload: {
    //        urlPath: centerPageUrl[0],
    //      },
    //    });
    //    this.props.dispatch({
    //      type: 'nav/getEsServices',
    //      payload: {
    //        urlPath: centerPageUrl[0],
    //      },
    //    });
    //    this.props.dispatch({
    //      type: 'nav/getMenu',
    //      payload: {
    //        urlPath: centerPageUrl[0],
    //      },
    //    });
    //    this.props.dispatch({
    //        type: 'nav/getButtonPermission',
    //        payload: {},
    //	});
  }

  refreshUserInfo(userInfo: any) {
    if (!userInfo) {
      return;
    }
    const condition: any = {};
    condition.businessPmCode = `${userInfo.tenantId}`;
    this.props.dispatch({
      type: 'global/userLogo',
      payload: {
        condition,
      },
    });
    condition.businessPmCode = `${userInfo.userId}member`;
    this.props.dispatch({
      type: 'global/userPic',
      payload: {
        condition,
      },
    });
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    let currRouterData: any = null;
    // match params path
    // Object.keys(routerData).forEach(key => {
    //   if (key==pathname) {
    //     currRouterData = routerData[key];
    //   }
    // });
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
        // debugger
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - Ant Design Pro`;
    }
    return title;
  }

  getBaseRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const { routerData } = this.props;
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => check(routerData[item].authority, item) && item !== '/'
      );
      return authorizedPath;
    }
    return redirect;
  };

  handleMenuCollapse = (collapsed: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  handleNoticeClear = (type: any) => {
    message.success(`清空了${type}`);
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };

  handleMenuClick = () => {
    // const { dispatch } = this.props;
    confirm({
      title: '离开后就没有丰富的信息了哦!',
      okText: '确定',
      onOk() {
        store.remove('menuData');
        /* dispatch({
          type: 'login/logout',
        }); */
        window.location.href = '../logout';
      },
      cancelText: '取消',
      onCancel() {
      },
    });
  };

  handleNoticeVisibleChange = (visible: any) => {
    const { dispatch } = this.props;
    if (visible) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  };

  render() {
    const { collapsed, routerData, match, location, menuData, userInfo, msgInfo } = this.props;
    let logoImg;
    if (userInfo != null && userInfo.logoPic) {
      logoImg = <img className="logoImg" src={`../file/downLoadFile?pmCode=${userInfo.logoPic}`} />;
    } else {
      logoImg = <img className="logoImg" src={logo} />;
    }
    let userImg;
    if (userInfo != null && userInfo.userPic) {
      userImg = <img className="userImg" src={`../file/downLoadFile?pmCode=${userInfo.userPic}`} />;
    } else {
      userImg = <img className="userImg" src={logoPic} />;
    }
    let userName: any;
    if (userInfo != null && userInfo.userName) {
      userName = userInfo.userName;
    }
    let userMessage: any = '';
    if (msgInfo) {
      const currentUrl = window.location.href;
      const msgPageUrl = msgInfo.msgPageUrl.split('#');
      if (currentUrl.indexOf(msgPageUrl[0]) != -1) {
        msgInfo.msgPageUrl = `#${msgPageUrl[1]}`;
      }
      if (msgInfo.msgCount > 0) {
        userMessage = (
          <a className="userMessage" href={`#${msgPageUrl[1]}`}>
            <img src={mailUsers} />
            <i />
          </a>
        );
      } else {
        userMessage = (
          <a className="userMessage" href={`#${msgPageUrl[1]}`}>
            <img src={mailUsers} />
          </a>
        );
      }
    }
    const { isMobile: mb } = this.state;
    const bashRedirect: any = this.getBaseRedirect();
    const layout = (
      <Layout className="jlt-base-layout">
        <Header style={{ padding: 0 }} className="headerbg">
          {/* <GlobalHeader
            logo={logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            isMobile={mb}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          /> */}
          <div>
            {logoImg}
            <div className="right">
              {userImg}
              {userName}
              {userMessage}
              <a onClick={this.handleMenuClick}>
                <img src={logoutSub} />
              </a>
            </div>
          </div>
        </Header>
        <Layout>
          <SiderMenu
            // logo={logo}
            // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
            // If you do not have the Authorized parameter
            // you will be forced to jump to the 403 interface without permission
            Authorized={Authorized}
            menuData={menuData}
            collapsed={collapsed}
            location={location}
            isMobile={mb}
            onCollapse={this.handleMenuCollapse}
          />
          <Content className="content">
            <Switch>
              {redirectData.map((item: any) => (
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
              {getRoutes(match.path, routerData).map(item => {
                return (
                  <AuthorizedRoute
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority="admin"
                    // redirectPath="/exception/403"
                  />
                );
              })}
              <Redirect exact from="/" to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ user, global, loading }: any) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
  menuData: global.menuData,
  routerData: global.routerData,
  userInfo: global.userInfo,
  centerPageUrl: global.centerPageUrl,
  userPic: global.userPic,
  userLogo: global.userLogo,
  msgInfo: global.msgInfo,
}))(BasicLayout);
