import { Button } from 'antd';
import { useUserContext } from '@/hooks/userHooks';
import { useGoTo } from '@/hooks';

function Home() {
  const { store } = useUserContext();
  const { go } = useGoTo();
  return (
    <div>
      {store.tel}
      <Button onClick={() => go()}>去个人中心</Button>
    </div>
  );
}

export default Home;
