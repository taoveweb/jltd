import * as React from 'react';
import { connect } from 'dva';
import url from '../_util/url';
const __html = require('./HeaderViewTemplate').default;
const template = { __html };
/* declare global {
  interface Window {
    p_common_path: any;
  }
} */

template.__html = template.__html.replace(
  'class="logoimg"',
  'class="logoimg" src="./HeaderView/logo.png"'
);
template.__html = template.__html.replace(
  'class="logo_pic"',
  'class="logo_pic" style="background: url(./HeaderView/logo_pic.png) no-repeat center center;"'
);
template.__html = template.__html.replace(
  'class="c2 m-nav-msg"',
  'class="c2 m-nav-msg" style="background: url(./HeaderView/mail_users.png) no-repeat center center;"'
);
template.__html = template.__html.replace(
  'class="m-nav-auditors"',
  'class="m-nav-auditors" style="background: url(./HeaderView/auditors.png) no-repeat center center;"'
);
template.__html = template.__html.replace(
  'class="c2 m-nav-msg-logoutSub"',
  'class="c2 m-nav-msg-logoutSub" style="background: url(./HeaderView/logoutSub.png) no-repeat center center;"'
);
const pathList = ['http://139.196.99.87:8080', 'http://47.100.39.104:9082'];
const regList = pathList.map(path => {
  return new RegExp(path, 'g');
});
const createHeadBtnHtml = (
  pmCode: any,
  domain: any,
  essCode: any,
  essName: any
) => {
  return `
  <li id="${pmCode}">
      <a href="javascript:void(0);" onclick="go('${domain}/jlt-bcs/bcs/esService/forword/${essCode}.shtml', false, '${essCode}')">${essName}</a>
  </li>
  <li>
      <input hidden="true" value="${pmCode}"></input>
  </li>
`;
};
// TODO: 重定向url地址
// 1. 将原始div复制到 HeaderViewTemplate
// 2. 修改顶栏右侧3个按钮的相对地址，并将图片保存到本地
// 3. componentDidMount 中，手动执行新消息提醒方法
// 4. 顶部“费用管理”按钮高亮
interface HeaderViewProps {
  userInfo: any;
  centerPageUrl: any;
  dispatch: Function;
  msgCount: any;
  esServices: any;
  userPic: any;
  userLogo: any;
}


class HeaderView extends React.Component<HeaderViewProps, {}> {
  componentDidMount() {
    const { centerPageUrl } = this.props;
    /* eslint-disable */
    //    Top.init();
    $('#21CBA9CC6CC243379206254FAF8C4B2C').addClass('cur');
    /* eslint-enable */
    this.props
      .dispatch({
        type: 'rest/userInfo',
      })
      .then((userInfo: any) => {
        this.refreshUserInfo(userInfo);
      });
    if (centerPageUrl.length === 0) {
      this.props
        .dispatch({
          type: 'rest/getCenterPageUrl',
        })
        .then((centerPageUrlTemp: any) => {
          this.refreshData(centerPageUrlTemp);
        });
    } else {
      this.refreshData(centerPageUrl);
    }
  }
  refreshData(centerPageUrl: any) {
    this.props.dispatch({
      type: 'nav/getMsgCount',
      payload: {
        urlPath: centerPageUrl[0],
      },
    });
    this.props.dispatch({
      type: 'nav/getEsServices',
      payload: {
        urlPath: centerPageUrl[0],
      },
    });
    this.props.dispatch({
      type: 'nav/getMenu',
      payload: {
        urlPath: centerPageUrl[0],
      },
    });
    this.props.dispatch({
      type: 'nav/getButtonPermission',
      payload: {},
    });
  }
  refreshUserInfo(userInfo: any) {
    const condition: any = {};
    condition.businessPmCode = `${userInfo.tenantId}`;
    this.props.dispatch({
      type: 'rest/userLogo',
      payload: {
        condition,
      },
    });
    condition.businessPmCode = `${userInfo.userId}member`;
    this.props.dispatch({
      type: 'rest/userPic',
      payload: {
        condition,
      },
    });
  }
  render() {
    const {
      userInfo,
      msgCount,
      centerPageUrl,
      esServices,
      userPic,
      userLogo,
    } = this.props;
    const templateTemp = { __html: template.__html };
    if (userInfo) {
      templateTemp.__html = templateTemp.__html.replace(
        /userName/g,
        userInfo.userName
      );
      templateTemp.__html = templateTemp.__html.replace(
        /userCode/g,
        userInfo.userCode
      );
    }
    if (userLogo) {
      templateTemp.__html = templateTemp.__html.replace(
        'src="./HeaderView/logo.png"',
        `src="${url.file.fileDownload}?pmCode=${userLogo}"`
      );
    }
    if (userPic) {
      templateTemp.__html = templateTemp.__html.replace(
        'src="./HeaderView/logo_pic.png"',
        `src="${url.file.fileDownload}?pmCode=${userPic}"`
      );
    }
    if (msgCount > 0) {
      templateTemp.__html = templateTemp.__html.replace(
        '<i id="msgc" style="display: none;"></i>',
        '<i id="msgc"></i>'
      );
    }
    if (centerPageUrl.length > 0) {
      (window as any).p_common_path = centerPageUrl[0];
      centerPageUrl.forEach((url: any, index: any) => {
        const reg = regList[index];
        templateTemp.__html = templateTemp.__html.replace(reg, url);
      });
    }
    if (esServices.length > 0) {
      let html = '';
      esServices.forEach((esService: any) => {
        html = `${html}${createHeadBtnHtml(
          esService.pmCode,
          centerPageUrl[0],
          esService.essCode,
          esService.essName
        )}`;
      });
      templateTemp.__html = templateTemp.__html.replace('<!-- menu -->', html);
    }
    return <div dangerouslySetInnerHTML={templateTemp} />;
  }
}
function mapStateToProps(state: any) {
  const { userInfo, userPic, userLogo } = state.rest;
  const { msgCount, esServices, menu } = state.nav;
  const { centerPageUrl } = state.rest;
  return {
    userInfo,
    msgCount,
    centerPageUrl,
    esServices,
    menu,
    userPic,
    userLogo,
  };
}
export default connect(mapStateToProps)(HeaderView);
