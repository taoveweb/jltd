// importExcel --引用太深了
import * as React from 'react';
import { Button, Popconfirm, Dropdown, Menu, Icon } from 'antd';
import classnames from 'classnames';
import { connect } from 'dva';
import buttonPermission from './buttonPermission';
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
    <a onClick={buttonInfo.onClick}>{buttonInfo.text}</a>
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
    <SubMenu title={buttonInfo.text} key='sub-button'>
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
const buttonGroup: any = (buttonOptList: Array<any> = []) => {
  const filterButtonOptList = buttonPermission.filterPermission(buttonOptList);
  const defaultBtnOptList = filterButtonOptList.slice(0, 5);
  const dropdownBtnOptList = filterButtonOptList.slice(5);
  const menu = (
    <Menu>
      {dropdownBtnOptList.map((opt: any, index: number) => {
        if (opt.children && opt.children.length > 0) {
          renderSubMenu(opt);
        }
        return (
          <Menu.Item key={index} disabled={opt.disabled}>
            {renderDefaultMenu(opt)}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  const buttonList = defaultBtnOptList.map((buttonInfo: any) => {
    return (
      <span key={buttonInfo.text} style={{ display: 'inline-block' }}>
        {buttonInfo.children && buttonInfo.children.length > 0
          ? renderDropdown(buttonInfo)
          : renderDefaultButton(buttonInfo)}
      </span>
    );
  });
  if (dropdownBtnOptList.length > 0) {
    buttonList.push(
      <Dropdown overlay={menu} key='more'>
        <Button className="button-group">
          更多 <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
  return buttonList;
};

interface GlobalButtonProps {
  buttonInfo: any;
  load: any;
  dispatch: any;
}
class GlobalButton extends React.PureComponent<GlobalButtonProps, {}> {
  componentDidMount() {
  }

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

buttonGroup.operationButtonGroup = operationButtonGroup;
buttonGroup.renderButton = renderButton;
export default buttonGroup;
