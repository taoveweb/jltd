import * as React from 'react';
import CheckPermissions from './CheckPermissions';
interface IAuthorizedProps{
  children?:any
  authority?:any
  noMatch?:any
}
class Authorized extends React.Component<IAuthorizedProps,any> {
  static Secured:any
  static AuthorizedRoute:any
  static check:any
  static PromiseRender:any
  static renderAuthorize:any
  render() {
    const { children, authority, noMatch = null }= this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
