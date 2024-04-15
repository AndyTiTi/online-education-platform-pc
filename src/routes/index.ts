import Login from '@/containers/Login';
import Home from '@/containers/Home';

export const ROUTE_CONFIG = [
  {
    path: '/',
    element: Home,
    title: '首页',
  },
  {
    path: '/login',
    element: Login,
    title: '登录',
  },
];
