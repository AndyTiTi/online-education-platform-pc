import { useUserContext } from '@/hooks/userHooks';

function Home() {
  const { store } = useUserContext();
  return (
    <div>{store.tel}</div>
  );
}

export default Home;
