import Home from '@/containers/Home';
import { HomeOutlined } from '@ant-design/icons';
import Page404 from '@/containers/error/404';

interface IRoute {
  path: string;
  name: string;
  element: ()=>JSX.Element;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  PAGE_404: 'p404',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: 'home',
    name: '首页',
    element: Home,
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.PAGE_404]:
  {
    path: '*',
    hideInMenu: true,
    element: Page404,
    name: '404',
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
