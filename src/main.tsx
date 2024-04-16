/* eslint-disable max-len */
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserInfo from '@/components/UserInfo';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import { routes } from './routes/menus';
import Layout from './components/Layout';
import Login from './containers/Login';
import { ROUTE_COMPONENT } from './routes';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    {/* <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: 'orange',
        },
        components: {
        // 修改单个组件的主色而不影响其他的UI组件
          Radio: {
            colorPrimary: '#00b96b',
          },
        },
        algorithm: theme.defaultAlgorithm, // theme.compactAlgorithm 紧凑算法  theme.darkAlgorithm 暗黑算法
      }}
    > */}
    <BrowserRouter>
      <UserInfo>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            {routes.map((item) => {
              const Component = ROUTE_COMPONENT[item.key];
              return (
                <Route
                  path={item.path}
                  key={item.path}
                  element={<Component />}
                />
              );
            })}
          </Route>
        </Routes>
      </UserInfo>
    </BrowserRouter>
    {/* </ConfigProvider> */}
  </ApolloProvider>,
);
