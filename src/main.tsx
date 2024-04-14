import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme, App as AppMain } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import App from './App';
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

        {/* 很诡异的一个组件，包裹组件 地址：https://ant.design/components/app-cn#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8 */}
        <App />
      </AppMain>
    </ConfigProvider>
  </ApolloProvider>,
);
