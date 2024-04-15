/* eslint-disable max-len */
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import UserInfo from '@/components/UserInfo';
import zhCN from 'antd/locale/zh_CN';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import { ROUTE_CONFIG } from './routes/index';
import './index.css';
import Layout from './components/Layout';
import Login from './containers/Login';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <ConfigProvider
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
    >
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              {ROUTE_CONFIG.map((item) => (
                <Route
                  path={item.path}
                  element={<item.element />}
                  key={item.path}
                />
              ))}
            </Route>
          </Routes>
        </UserInfo>
      </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>,
);
