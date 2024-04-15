import { Spin } from 'antd';
import { connect, useGetUser } from '@/hooks/userHooks';
import { IPropChild } from '@/utils/types';

/**
* 获取用户信息组件
*/
const UserInfo = ({ children }: IPropChild) => {
  const { loading } = useGetUser();
  return (
    <Spin spinning={loading}>
      <div style={{ height: '100vh' }}>
        {children}
      </div>
    </Spin>
  );
};

export default connect(UserInfo);
