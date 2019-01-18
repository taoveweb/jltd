import * as React from 'react';
import { Button, Popconfirm, Icon } from 'antd';

import buttonPermission from './buttonPermission';

const operationButtonGroup = (buttonList: any = []) => {
  const filterButtonList = buttonPermission.filterPermission(buttonList);
  const operationButtonList = filterButtonList.map((buttonInfo: any) => {
    const renderIcon = (
      <a onClick={buttonInfo.onClick}>
        <Icon
          type={buttonInfo.iconType}
          style={{ color: '#0078D6', width: '20px', height: '20px' }}
        />
      </a>
    );
    const renderButton = buttonInfo.iconType ? (
      renderIcon
    ) : (
      <Button
        className={'operation-btn'}
        type={buttonInfo.type || 'default'}
        size={buttonInfo.size || 'default'}
        onClick={buttonInfo.onClick}
      >
        {buttonInfo.text}
      </Button>
    );
    const renderPopconfirm = (
      <Popconfirm
        placement="topRight"
        title={buttonInfo.popconfirmTitle}
        onConfirm={buttonInfo.onClick}
        okText="确定"
        cancelText="取消"
      >
        {buttonInfo.iconType ? (
          <a>
            <Icon
              type={buttonInfo.iconType}
              style={{
                color: '#0078D6',
                width: '20px',
                height: '20px',
                paddingLeft: '12px',
              }}
            />
          </a>
        ) : (
          <Button
            className={'operation-btn'}
            type={buttonInfo.type || 'default'}
            size={buttonInfo.size || 'default'}
          >
            {buttonInfo.text}
          </Button>
        )}
      </Popconfirm>
    );
    return (
      <span key={buttonInfo.text}>
        {buttonInfo.popconfirmTitle ? renderPopconfirm : renderButton}
      </span>
    );
  });
  return operationButtonList;
};
export default operationButtonGroup;
