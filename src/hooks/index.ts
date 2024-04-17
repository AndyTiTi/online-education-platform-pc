import { useEffect, useMemo } from 'react';
import {
  ROUTE_CONFIG, ROUTE_KEY, getRouteByKey, routes,
} from '@/routes/menus';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

/**
 * 通用页面跳转
 * 可进行日志埋点
 */
export const useGoTo = () => {
  const nav = useNavigate();
  const back = () => nav(-1);
  const go = (
    pageKey?: string,
    params?: Record<string, string | number>,
  ) => {
    if (!pageKey) {
      nav('/');
      return;
    }
    const route = getRouteByKey(pageKey);
    if (route && route.path) {
      if (!params) {
        nav(`/${route.path}`);
        return;
      }
      // /page/:id params: { id: 1 } => /page/1
      const url = route.path.replace(
        /\/:(\w+)/g,
        (exp: string, exp1: string) => `/${params[exp1]}`,
      );
      nav(`/${url}`);
    }
  };
  return { back, go };
};

/**
 * 获取当前 URL 匹配的路由
 */
export const useMatchedRoute = () => {
  // 使用 useLocation() Hook 获取当前页面的路径并赋值给变量 r
  const r = useLocation();
  const route = useMemo(() => routes.find(
    // 用于比较路径名称（/${item.path}）是否与当前请求的路径名称（r.pathname）匹配
    (item) => matchPath(`/${item.path}`, r.pathname),
  ), [r.pathname]);
  return route;
};

export const useIsOrgRoute = () => {
  const curRoute = useMatchedRoute();
  if (curRoute?.path === ROUTE_CONFIG[ROUTE_KEY.ORG].path) {
    return true;
  }
  return false;
};
