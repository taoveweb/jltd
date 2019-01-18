import { Icon, Popconfirm } from 'antd';
import * as React from 'react';

import buttonPermission from '../../utils/buttonPermission';
require('./operationButtonGroup.less');

const renderButton = (buttonInfo:any) => {
  return buttonInfo.iconType ? (
    <a onClick={buttonInfo.onClick}>
      <Icon type={buttonInfo.iconType} className={'jlt-icon_style'} />
    </a>
  ) : (
    <a onClick={buttonInfo.onClick} className={'jlt-btn_style'}>
      {buttonInfo.text}
    </a>
  );

};

const renderPopconfirm = (buttonInfo:any) => {
  return (
    <Popconfirm
      placement="topRight"
      title={buttonInfo.popconfirmText}
      onConfirm={buttonInfo.onClick}
      okText="确定"
      cancelText="取消"
    >
      {renderButton({ ...buttonInfo, onClick: null })}
    </Popconfirm>
  );
};

const operationButtonGroup = (buttonList:any= []) => {
  const filterButtonList = buttonPermission.filterPermission(buttonList);

  const operationButtonList = filterButtonList.map((buttonInfo:any) => {
    return (
      <span key={buttonInfo.text}>
        {buttonInfo.popconfirmText
          ? renderPopconfirm(buttonInfo)
          : renderButton(buttonInfo)}
      </span>
    );
  });
  return operationButtonList;
};

export default operationButtonGroup;
