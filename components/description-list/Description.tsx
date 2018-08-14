import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from 'antd';
const responsive: any = require('./responsive');

const Description: any = ({
  term,
  column,
  className,
  children,
  ...restProps
}: any) => {
  const clsString = classNames(className);

  return (
    <Col className={clsString} {...responsive[column]} {...restProps}>
      {term && <div className={'term'}>{term}</div>}
      {children !== null &&
        children !== undefined && <div className={'detail'}>{children}</div>}
    </Col>
  );
};

Description.defaultProps = {
  term: '',
};

Description.propTypes = {
  term: PropTypes.node,
};

export default Description;
