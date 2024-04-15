/* eslint-disable max-len */
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider, theme, App as AppMain } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import { ROUTE_CONFIG } from './routes';
import Page404 from './containers/error/404';
import './index.css';

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
        // algorithm: theme.darkAlgorithm, // 暗黑算法
        algorithm: theme.defaultAlgorithm, // 默认算法
      // algorithm: theme.compactAlgorithm, // 紧凑算法
      }}
    >
      <AppMain>
        <BrowserRouter>
          <Routes>
            {ROUTE_CONFIG.map((item) => (
              <Route
                path={item.path}
                element={<item.element />}
                key={item.path}
              />
            ))}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </AppMain>
    </ConfigProvider>
  </ApolloProvider>,
);
