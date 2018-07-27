import * as React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

const Trend = ({
  colorful = true,
  reverseColor = false,
  flag,
  children,
  className,
  ...rest
}: any) => {
  const precls = 'ant-trend';

  const classString = classNames(
    `${precls}`,
    {
      [`${precls}-trendItemGrey`]: !colorful,
      [`${precls}-reverseColor`]: reverseColor && colorful,
    },
    className
  );
  return (
    <div
      {...rest}
      className={classString}
      title={typeof children === 'string' ? children : ''}
    >
      <span className={`${precls}-value`}>{children}</span>
      {flag && (
        <span className={`${precls}-${flag}`}>
          <Icon type={`caret-${flag}`} />
        </span>
      )}
    </div>
  );
};
export default Trend;
