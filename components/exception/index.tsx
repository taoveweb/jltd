import { createElement } from 'react';
import * as React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
const config = require('./typeConfig').default;

const Exception = ({
  className,
  linkElement = 'a',
  type,
  title,
  desc,
  img,
  actions,
  ...rest
}: any) => {
  const pageType = type in config ? type : '404';
  const clsString = classNames('ant-pro-exception', className);
  return (
    <div className={clsString} {...rest}>
      <div className={'imgBlock'}>
        <div
          className={'imgEle'}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={'content'}>
        <h1>{title || config[pageType].title}</h1>
        <div className={'desc'}>{desc || config[pageType].desc}</div>
        <div className={'actions'}>
          {actions ||
            createElement(
              linkElement,
              {
                to: '/',
                href: '/',
              },
              <Button type="primary">返回首页</Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Exception;
