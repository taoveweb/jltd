import { Divider } from 'antd';
import { Link } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import * as React from 'react';

// import NoticeIcon from '../NoticeIcon';
// import HeaderSearch from '../HeaderSearch';

interface IGlobalHeaderProps {
  notices?: any;
  collapsed?: any;
  onCollapse?: any;
  currentUser?: any;
  isMobile?: any;
  logo?: any;
  onNoticeVisibleChange?: any;
  onMenuClick?: any;
  onNoticeClear?: any;
}

export default class GlobalHeader extends React.PureComponent<IGlobalHeaderProps, any> {
  props: any;

  componentWillUnmount() {
    // @ts-ignore
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  renderUserinfo = () => {
    const { currentUser = {} } = this.props;
    const info = [];
    let url = './HeaderView/logo_pic.png';
    if (currentUser.logoPic) {
      url = currentUser.logoPic;
    }

    info.push(
      <div className="antd-header-logo-pic">
        <img src={url} />
      </div>
    );

    if (currentUser.userName) {
      info.push(<span className="username">{currentUser.userName}</span>);
    }
    if (currentUser.url) {
      info.push(
        <a
          className="ant-top-handle"
          href={currentUser.url.workplat + '/workplat/index.html#/workplat/message'}
        >
          <i id="msgc" />
        </a>
      );
    }

    info.push(
      <div onClick={() => {}} className="antd-header-logo-pic">
        <img src={'./HeaderView/logoutSub.png'} />
      </div>
    );
    return info;
  };
  render() {
    const { isMobile, logo } = this.props;

    return (
      <div className={'ant-pro-global-header'}>
        {isMobile && [
          <Link to="/" className={'logo'} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <div className="logo">
          <img src="./logo.png" alt="logoimg" />
        </div>
        <div className={'right ant-userinfo'}>{this.renderUserinfo()}</div>
      </div>
    );
  }
}
