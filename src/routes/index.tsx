import Home from '@/containers/Home';
import My from '@/containers/My';
import Org from '@/containers/Org';
import NoOrg from '@/containers/NoOrg';
import Page404 from '@/containers/error/404';
import { ROUTE_KEY } from './menus';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]: Org,
  [ROUTE_KEY.NO_ORG]: NoOrg,
  [ROUTE_KEY.PAGE_404]: Page404,
};
