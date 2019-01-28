// importExcel --引用太深了
import * as React from 'react';
import { Button, Popconfirm, Dropdown, Menu, Icon } from 'antd';
import classnames from 'classnames';
import { connect } from 'dva';
import * as fetch from 'dva/fetch';
import ImportExcel from './importExcel'; // 外引用组件
import operationButtonGroup from './operationButtonGroup';

const { SubMenu } = Menu;
const renderButton: any = (buttonInfo: any) => {
  let disabled = buttonInfo.disabled;
  if ((buttonInfo.loading || buttonInfo.text === '保存') && buttonInfo.load) {
    disabled = true;
  }
  return buttonInfo.templateId ? (
    <ImportExcel buttonInfo={buttonInfo} />
  ) : (
    <Button
      className={classnames('button-group', buttonInfo.className)}
      type={buttonInfo.type || 'default'}
      size={buttonInfo.size || 'default'}
      onClick={buttonInfo.onClick}
      disabled={disabled}
    >
      {buttonInfo.text}
    </Button>
  );
};
const renderMenuItem = (buttonInfo: any) => {
  return buttonInfo.templateId ? (
    <ImportExcel buttonInfo={buttonInfo} buttonType="a" />
  ) : (
    <div onClick={buttonInfo.onClick}>{buttonInfo.text}</div>
  );
};
const renderDropdown = (buttonInfo: any) => {
  const menu = (
    <Menu>
      {buttonInfo.children.map((opt: any, index: number) => {
        return (
          <Menu.Item key={index} disabled={opt.disabled}>
            {renderDefaultMenu(opt)}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button className="button-group">
        {buttonInfo.text} <Icon type="down" />
      </Button>
    </Dropdown>
  );
};
const renderSubMenu = (buttonInfo: any) => {
  return (
    <SubMenu title={buttonInfo.text} key="sub-button">
      {buttonInfo.children.map((opt: any, index: number) => {
        return (
          <Menu.Item key={index} disabled={opt.disabled}>
            {renderDefaultMenu(opt)}
          </Menu.Item>
        );
      })}
    </SubMenu>
  );
};
const renderDefaultButton = (buttonInfo: any) => {
  if (buttonInfo.popconfirmTitle) {
    return (
      <Popconfirm
        placement="top"
        title={buttonInfo.popconfirmTitle}
        onConfirm={buttonInfo.onClick}
        okText="确定"
        cancelText="取消"
      >
        <NewGlobalBotton buttonInfo={{ ...buttonInfo, onClick: null }} />;
      </Popconfirm>
    );
  }
  return <NewGlobalBotton buttonInfo={buttonInfo} />;
};
const renderDefaultMenu = (buttonInfo: any) => {
  if (buttonInfo.popconfirmTitle) {
    return (
      <Popconfirm
        placement="top"
        title={buttonInfo.popconfirmTitle}
        onConfirm={buttonInfo.onClick}
        okText="确定"
        cancelText="取消"
      >
        {renderMenuItem({ ...buttonInfo, onClick: null })}
      </Popconfirm>
    );
  }
  return renderMenuItem(buttonInfo);
};

class ButtonGroup extends React.Component<any, any> {
  static operationButtonGroup: any;
  static renderButton: any;
  constructor(props: any) {
    super(props);
    this.state = {
      buttonList: [],
      permissionList: [],
    };
  }

  componentDidMount() {
    this.getPermission();
  }
  componentWillReceiveProps(nextProps: any) {
    if (JSON.stringify(nextProps.data) != JSON.stringify(this.props.data)) {
      let list = this.filterPermission(nextProps.data, this.state.permissionList);
      this.setState({
        buttonList: list,
      });
    }
  }
  getPermission = () => {
    fetch('/system/getButtonPermission', {
      method: 'post',
      credentials: 'include',
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        let list = this.filterPermission(this.props.data, res.data);
        // @ts-ignore
        this.state.permissionList = res.data;
        this.setState({
          buttonList: list,
        });
      });
  };

  filterPermission = (buttonOptList: any = [], permission: any = {}) => {
    return buttonOptList.filter((opt: any) => {
      if (opt.children && opt.children.length > 0) {
        const filterChidrenList = this.filterPermission(opt.children);
        if (filterChidrenList.length === 0) {
          return false;
        }
        opt.children = filterChidrenList;
      }
      if (!opt.menuCode || !opt.operateCode) {
        return true;
      }
      return this.check(opt, permission);
    });
  };

  check = (buttonOpt: any = {}, permissionMap: any = {}) => {
    if (!buttonOpt.menuCode || !buttonOpt.operateCode) {
      return true;
    }
    if (permissionMap === null) {
      return false;
    }
    const operateCodeMap = permissionMap[buttonOpt.menuCode] || [];
    if (!operateCodeMap.hasOwnProperty(buttonOpt.operateCode)) {
      return false;
    }
    const operateName = operateCodeMap[buttonOpt.operateCode];
    if (operateName && operateName != '') {
      buttonOpt.text = operateCodeMap[buttonOpt.operateCode];
    }
    return true;
  };
  render() {
    let { buttonList } = this.state;
    const defaultBtnOptList = buttonList.slice(0, 5);
    const dropdownBtnOptList = buttonList.slice(5);
    const menu = (
      <Menu>
        {dropdownBtnOptList.map((opt: any, index: number) => {
          if (opt.children && opt.children.length > 0) {
            return renderSubMenu(opt);
          }
          return (
            <Menu.Item key={index} disabled={opt.disabled}>
              {renderDefaultMenu(opt)}
            </Menu.Item>
          );
        })}
      </Menu>
    );
    const result = defaultBtnOptList.map((buttonInfo: any) => {
      return (
        <span key={buttonInfo.text} style={{ display: 'inline-block' }}>
          {buttonInfo.children && buttonInfo.children.length > 0
            ? renderDropdown(buttonInfo)
            : renderDefaultButton(buttonInfo)}
        </span>
      );
    });
    if (dropdownBtnOptList.length > 0) {
      result.push(
        <Dropdown overlay={menu} key="more">
          <Button className="button-group">
            更多 <Icon type="down" />
          </Button>
        </Dropdown>
      );
    }
    return result;
  }
}

interface GlobalButtonProps {
  buttonInfo: any;
  load: any;
  dispatch: any;
}
class GlobalButton extends React.PureComponent<GlobalButtonProps, {}> {
  componentDidMount() {}

  render() {
    return renderButton({
      ...this.props.buttonInfo,
      load: this.props.load,
      dispatch: this.props.dispatch,
    });
  }
}
const NewGlobalBotton = connect(({ global }: { global: any }) => ({
  load: global.load,
}))(GlobalButton);

ButtonGroup.operationButtonGroup = operationButtonGroup;
ButtonGroup.renderButton = renderButton;
export default ButtonGroup;
