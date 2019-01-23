import * as React  from 'react';
import classNames from 'classnames';

export default class FooterToolbar extends React.Component {
  render() {
    const { children, className, extra, ...restProps }:any = this.props;
    return (
      <div className={classNames(className, 'footer-toolbar-toolbar')} {...restProps}>
        <div className={'footer-toolbar-left'}>{extra}</div>
        <div className={'footer-toolbar-right'}>{children}</div>
      </div>
    );
  }
}
