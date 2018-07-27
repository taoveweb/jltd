import * as React from 'react';
import classNames from 'classnames';
const StandardFormRow = ({
  title,
  children,
  last,
  block,
  grid,
  ...rest
}: any) => {
  const preCls = 'ant-standardFormRow';
  const cls = classNames(preCls, {
    [`${preCls}-standardFormRowBlock`]: block,
    [`${preCls}-standardFormRowLast`]: last,
    [`${preCls}-standardFormRowGrid`]: grid,
  });
  return (
    <div className={cls} {...rest}>
      {title && (
        <div className={`${preCls}-label`}>
          <span>{title}</span>
        </div>
      )}
      <div className={`${preCls}-content`}>{children}</div>
    </div>
  );
};
export default StandardFormRow;
