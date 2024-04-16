import { useUserContext } from '@/hooks/userHooks';
import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import React from 'react';
import { AUTH_TOKEN } from '@/utils/constants';
import { routes } from '@/routes/menus';
import styles from './index.module.less';

const menuItemRender = (
  item:MenuDataItem,
  dom:React.ReactNode,

) => <Link to={item.path || '/'}>{dom}</Link>;

function Layout() {
  const outlet = useOutlet();
  const nav = useNavigate();
  const { store } = useUserContext();
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
        src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: store.tel,
        size: 'small',
        onClick: logout,
      }}
      logo={<img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />}
      className={styles.container}
      route={{
        path: '/',
        routes,
      }}
      onMenuHeaderClick={() => nav('/')}
      menuItemRender={menuItemRender}
    >
      <PageContainer>
        {outlet}
      </PageContainer>
    </ProLayout>
  );
}

export default Layout;
