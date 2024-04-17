/* eslint-disable @typescript-eslint/no-unused-vars */
import OSSImageUpload from '@/components/OSSImageUpload';
import { UPDATE_USER } from '@/graphql/user';
import { useGetUser, useUserContext } from '@/hooks/userHooks';
import {
  PageContainer, ProForm, ProFormInstance, ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import {
  Col, Row, Form,
} from 'antd';
import { useEffect, useRef } from 'react';

/**
* 个人中心
*/
const My = () => {
  const formRef = useRef<ProFormInstance>();
  const { store, setStore } = useUserContext();
  const { refetch } = useGetUser();
  const [updateUserInfo] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!store.tel) return;
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [{
        url: store.avatar,
      }],
    });
  }, [store]);
  return (
    <PageContainer>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (values) => {
          const res = await updateUserInfo({
            variables: {
              id: store.id,
              params: {
                name: values.name,
                desc: values.desc,
                avatar: values.avatar[0]?.url || '',
              },
            },
          });
          if (res.data.updateUserInfo.code === 200) {
            if (store.refetchHandler) {
              // store.refetchHandler();
              refetch().then((data: any) => {
                if (data) {
                  // 当 refetch 完成后，新的数据将可用
                  const {
                    id, name, tel, desc, avatar,
                  } = data.data.getUserInfo;

                  setStore({
                    id, name, tel, desc, avatar,
                  });
                }
              }).catch((error) => {
                // 处理可能的错误
                console.error('Error fetching new user info:', error);
              });
            }
            // message.success(res.data.updateUserInfo.message);
          }
          // message.error(res.data.updateUserInfo.message);
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText
              name="tel"
              label="手机号"
              tooltip="不能修改"
              disabled
            />
            <ProFormText
              name="name"
              label="昵称"
              placeholder="请输入昵称"
            />
            <ProFormTextArea
              name="desc"
              label="简介"
              placeholder="请输入简介信息"
            />
          </Col>
          <Col>
            <Form.Item
              name="avatar"
            >
              <OSSImageUpload label="更改头像" />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default My;
