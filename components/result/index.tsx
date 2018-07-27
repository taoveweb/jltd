import * as React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
const preCls = 'ant-result';
export default function Result({
  className,
  type,
  title,
  description,
  extra,
  actions,
  ...restProps
}: any) {
  const iconMap: any = {
    error: <Icon className={'error'} type="close-circle" />,
    success: <Icon className={'success'} type="check-circle" />,
  };
  const clsString = classNames(preCls, className);
  return (
    <div className={clsString} {...restProps}>
      <div className={'icon'}>{iconMap[type]}</div>
      <div className={'title'}>{title}</div>
      {description && <div className={'description'}>{description}</div>}
      {extra && <div className={'extra'}>{extra}</div>}
      {actions && <div className={'actions'}>{actions}</div>}
    </div>
  );
}
