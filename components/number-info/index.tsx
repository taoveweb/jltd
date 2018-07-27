import * as React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
const preCls = 'ant-numberInfo';
const NumberInfo = ({
  theme,
  title,
  subTitle,
  total,
  subTotal,
  status,
  suffix,
  gap,
  ...rest
}: any) => (
  <div
    className={classNames(preCls, {
      [`numberInfo${theme}`]: theme,
    })}
    {...rest}
  >
    {title && <div className={'numberInfoTitle'}>{title}</div>}
    {subTitle && <div className={'numberInfoSubTitle'}>{subTitle}</div>}
    <div className={'numberInfoValue'} style={gap ? { marginTop: gap } : {}}>
      <span>
        {total}
        {suffix && <em className={'suffix'}>{suffix}</em>}
      </span>
      {(status || subTotal) && (
        <span className={'subTotal'}>
          {subTotal}
          {status && <Icon type={`caret-${status}`} />}
        </span>
      )}
    </div>
  </div>
);
export default NumberInfo;
