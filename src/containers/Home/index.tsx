import { Button } from 'antd';
import { useUserContext } from '@/hooks/userHooks';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';

function Home() {
  const { store } = useUserContext();
  const { go } = useGoTo();
  return (
    <div>
      {store.tel}
      <Button onClick={() => go(ROUTE_KEY.MY)}>去个人中心</Button>
    </div>
  );
}

export default Home;
