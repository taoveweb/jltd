var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import classNames from 'classnames';
import { Link } from 'dva/router';
import * as React from 'react';
import PageHeader from './PageHeader';
require('./PageHeaderLayout.less');
export default (_a) => {
    var { children, wrapperClassName = '' } = _a, restProps = __rest(_a, ["children", "wrapperClassName"]);
    return (<div className={classNames('jlt-body', wrapperClassName, 'page-div')}>
    <PageHeader {...restProps} linkElement={Link}/>
    {children ? <div className={classNames('jlt-content')}>{children}</div> : null}
  </div>);
};
