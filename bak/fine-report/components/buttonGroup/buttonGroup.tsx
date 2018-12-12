import { Button, Dropdown, Icon, Menu, Popconfirm } from 'antd';
import classnames from 'classnames';
import * as React from 'react';

import buttonPermission from '../../utils/buttonPermission';
import './buttonGroup.less';

const renderButton = (buttonInfo:any) => {
  return (
    <Button
      className={classnames('jlt-button-group', buttonInfo.className)}
      type={buttonInfo.type || 'primary'}
      size={buttonInfo.size || 'default'}
      loading={buttonInfo.loading}
      onClick={buttonInfo.onClick}
      disabled={buttonInfo.disabled}
    >
      {buttonInfo.text}
    </Button>
  );
};

const renderPopconfirm = (buttonInfo:any) => {
  return (
    <Popconfirm
      placement="top"
      title={buttonInfo.popconfirmText}
      onConfirm={buttonInfo.onClick}
      okText="确定"
      cancelText="取消"
    >
      {renderButton({ ...buttonInfo, onClick: null })}
    </Popconfirm>
  );
};

const dropdownOnClick = (dropdownBtnOptList:any, index:any) => {
  const opt = dropdownBtnOptList[index];
  opt.onClick();
};

const buttonGroup:any = (buttonOptList:any=[],/*  buttonPromission:any */) => {
  const filterButtonOptList = buttonPermission.filterPermission(
    buttonOptList,
    //buttonPromission,
  );

  const defaultBtnOptList = filterButtonOptList.slice(0, 5);
  const dropdownBtnOptList = filterButtonOptList.slice(5);

  const menu = (
    <Menu onClick={({ key }) => dropdownOnClick(dropdownBtnOptList, key)}>
      {dropdownBtnOptList.map((opt:any, index:any) => {
        return (
          <Menu.Item key={index} disabled={opt.disabled}>
            {opt.text}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const buttonList = defaultBtnOptList.map((buttonInfo:any) => {
    return (
      <span key={buttonInfo.text}>
        {buttonInfo.popconfirmText
          ? renderPopconfirm(buttonInfo)
          : renderButton(buttonInfo)}
      </span>
    );
  });

  if (dropdownBtnOptList.length > 0) {
    buttonList.push(
      <Dropdown overlay={menu}>
        <Button className={'jlt-button-group'}>
          更多 <Icon type="down" />
        </Button>
      </Dropdown>,
    );
  }

  return buttonList;
};

const renderButtonGroup = (buttonOptList:any=[], type?: 'title') => {
  const stateBtnArray = buttonOptList
    .map((item:any) => {
      item.size = 'large';
      if (item.selected) {
        item.className = classnames(item.className, 'btn-selected');
      }
      return item;
    })
    .map(buttonGroup.renderButton);

  return <Button.Group className={type || ''}>{stateBtnArray}</Button.Group>;
};

buttonGroup.renderButton = renderButton;
buttonGroup.renderButtonGroup = renderButtonGroup;

export default buttonGroup;
