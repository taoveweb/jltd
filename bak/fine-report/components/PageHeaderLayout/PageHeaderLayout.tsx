import classNames from 'classnames';
import { Link } from 'dva/router';
import * as React from 'react';

import PageHeader from './PageHeader';
require('./PageHeaderLayout.less');

export default ({ children, wrapperClassName = '', ...restProps }:any) => (
  <div className={classNames('jlt-body', wrapperClassName, 'page-div')}>
    <PageHeader {...restProps} linkElement={Link} />
    {children ? <div className={classNames('jlt-content')}>{children}</div> : null}
  </div>
);
