import { useUserContext } from '@/hooks/userHooks';
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import React from 'react';
import { AUTH_TOKEN } from '@/utils/constants';
import { ROUTE_KEY, routes } from '@/routes/menus';
import { useGoTo } from '@/hooks';
import { Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const menuItemRender = (
  item:MenuDataItem,
  dom:React.ReactNode,

) => <Link to={item.path || '/'}>{dom}</Link>;

function Layout() {
  const outlet = useOutlet();
  const nav = useNavigate();
  const { store } = useUserContext();
  const { go } = useGoTo();
  const logout = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };
  return (
    <ProLayout
      siderWidth={150}
      layout="mix"
      avatarProps={{
        src: store.avatar,
        title: store.name,
        size: 'small',
        onClick: () => go(ROUTE_KEY.MY),
      }}
      links={[
        <Space key="space" onClick={logout}>
          <LogoutOutlined />
          退出
        </Space>,
      ]}
      logo={<img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />}
      className={styles.container}
      route={{
        path: '/',
        routes,
      }}
      onMenuHeaderClick={() => nav('/')}
      menuItemRender={menuItemRender}
    >
      {outlet}
    </ProLayout>
  );
}

export default Layout;
