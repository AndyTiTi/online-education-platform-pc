import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useOutlet } from 'react-router-dom';

function Layout() {
  const outlet = useOutlet();
  return (
    <ProLayout>
      <PageContainer>
        {outlet}
      </PageContainer>
    </ProLayout>
  );
}

export default Layout;
