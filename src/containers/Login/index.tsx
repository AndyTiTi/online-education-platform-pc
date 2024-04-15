/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
import type { CSSProperties } from 'react';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import {
  ConfigProvider,
  Space, Tabs, message, theme,
} from 'antd';
import { useState } from 'react';
import { SEND_CODE_MSG, LOGIN } from '@/graphql/auth';
import { AUTH_TOKEN } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

interface IValue {
  tel:string;
  code:string;
  autoLogin:boolean;
}
type LoginType = 'phone' | 'account';

export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const nav = useNavigate();

  const loginHadler = async (values:IValue) => {
    const res = await login({
      variables: values,
    });
    if (res.data.login.code === 200) {
      if (values.autoLogin) {
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(res.data.login.message);
      nav('/');
      return;
    }
    message.error(res.data.login.message);
  };
  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  const items = [
    { label: '账户密码登录', key: 'account' },
    { label: '手机号登录', key: 'tel' },
  ];
  return (
    // <div style={{ backgroundColor: token.colorBgContainer }}>
    <ConfigProvider>
      <div
        className={styles.container}
      >
        <LoginForm
          onFinish={loginHadler}
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="全球最大的代码托管平台"
          actions={(
            <Space>
              其他登录方式
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
            </Space>
          )}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            items={items}
          />
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            name="tel"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder="请输入验证码"
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`;
              }
              return '获取验证码';
            }}
            phoneName="tel"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async (tel: string) => {
              const res = await run({
                variables: {
                  tel,
                },
              });
              if (res.data.sendCodeMsg.code === 200) {
                message.success(res.data.sendCodeMsg.message);
              } else {
                message.error(res.data.sendCodeMsg.message);
              }
            }}
          />
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </ConfigProvider>
  );
};
