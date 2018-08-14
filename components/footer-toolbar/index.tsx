import * as React  from 'react';
import classNames from 'classnames';
const styles =require( './style/indexnolink.less');

export default class FooterToolbar extends React.Component {
  render() {
    const { children, className, extra, ...restProps }:any = this.props;
    return (
      <div className={classNames(className, styles.toolbar)} {...restProps}>
        <div className={styles.left}>{extra}</div>
        <div className={styles.right}>{children}</div>
      </div>
    );
  }
}
