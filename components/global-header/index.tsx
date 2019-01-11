import { Divider,Dropdown, Icon,Menu,Modal } from 'antd';
import { Link } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import * as React from 'react';

const mail_users=require('./images/mail_users.png');
const confirm = Modal.confirm;

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
  locals?:any;
  dispatch?:any;
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
        <img src={`../file/downLoadFile?pmCode=${url}`} />
      </div>
    );

    if (currentUser.userName) {
      info.push(
        <span key="username" className="username">
          {currentUser.userName}
        </span>
      );
    }
    if (currentUser.url) {
      info.push(
        <a
          key="message"
          className="ant-top-handle"
          href={currentUser.url.workplat + '/workplat/index.html#/workplat/message'}
          style={{backgroundImage:`url(${mail_users})`}}
        >
          <i id="msgc" />
        </a>
      );
    }

    info.push(
      <div
        key="logoutSub"
        onClick={() => {
          confirm({
            title: '真的要离开吗？',
            content: '离开发就没有丰富的信息了哦！',
            okText: '确定',
            cancelText: '取消',
            onOk() {
              window.location.href = '../logout';
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }}
        className={this.props.locals?"antd-header-logo-pic":" "}
      >
        <img src={'./HeaderView/logoutSub.png'} />
      </div>
    );
    return info;
  };
  onChangeZh = ({ key }:any) => {
    this.props.dispatch({
      type: 'global/setLocalState',
      payload: key,
    });
  };
  render() {
    const { isMobile, logo } = this.props;
    const menu = (
      <Menu onClick={this.onChangeZh}>
        <Menu.Item key="zh">中文</Menu.Item>
        <Menu.Item key="en">English</Menu.Item>
      </Menu>
    );
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
        {this.props.locals?<Dropdown overlay={menu}>
          <a className="ant-dropdown-link  react-intl-lc">
            {this.props.locals === 'en' ? 'English' : '中文'} <Icon type="down" />
          </a>
        </Dropdown>:null}
        <div className={'right ant-userinfo'}>{this.renderUserinfo()}</div>
      </div>
    );
  }
}
