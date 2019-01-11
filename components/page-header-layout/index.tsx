import * as React from 'react';
import { Link } from 'dva/router';
import classNames from 'classnames';
import PageHeader from './PageHeader';
// import styles from './PageHeaderLayout.less';

const PageHeaderLayout:any= ({ children, wrapperClassName, ...restProps }:any) => (
  <div className={classNames('page-body', wrapperClassName, 'page-div')}>
    <PageHeader {...restProps} linkElement={Link} />
    {children ? <div className={classNames('page-content')}>{children}</div> : null}
  </div>
);
export default PageHeaderLayout;
