import * as React from 'react';
import classNames from 'classnames';
import { Row } from 'antd';

const DescriptionList = ({
  className,
  title,
  col = 3,
  layout = 'horizontal',
  gutter = 32,
  children,
  size,
  ...restProps
}: any) => {
  const clsString = classNames('ant-pro-descriptionList', layout, className, {
    ['small']: size === 'small',
    ['large']: size === 'large',
  });
  const column = col > 4 ? 4 : col;
  return (
    <div className={clsString} {...restProps}>
      {title ? <div className={'title'}>{title}</div> : null}
      <Row gutter={gutter}>
        {React.Children.map(
          children,
          (child: any) =>
            child ? React.cloneElement(child, { column }) : child
        )}
      </Row>
    </div>
  );
};

export default DescriptionList;
