import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';
import PromiseRender from './PromiseRender';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;
Authorized.PromiseRender = PromiseRender;
Authorized.renderAuthorize = renderAuthorize;

export default renderAuthorize(Authorized);
