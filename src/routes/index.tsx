import Home from '@/containers/Home';
import { HomeOutlined } from '@ant-design/icons';
import Page404 from '@/containers/error/404';

export const ROUTE_CONFIG = [
  {
    key: 'home',
    path: '/home',
    element: Home,
    name: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: '*',
    path: '*',
    hideInMenu: true,
    element: Page404,
    name: '404',
  },
];
