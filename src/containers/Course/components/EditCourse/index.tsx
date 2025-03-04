/* eslint-disable react-hooks/rules-of-hooks */
import { COMMIT_COURSE } from '@/graphql/course';
import { useCourseInfo } from '@/services/course';
import { useMutation } from '@apollo/client';
import {
  Button,
  Col,
  Drawer, Form, Input, InputNumber, Row,
  Space,
  message,
} from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;

interface IProps {
  id?: string;
  onClose: () => void;
}

const EditCourse = ({
  id,
  onClose,
}: IProps) => {
  const [form] = Form.useForm();
  // const { getCourse } = useCourse();
  const { refetch } = useCourseInfo(id as string);

  const [edit, { loading }] = useMutation(COMMIT_COURSE);

  useEffect(() => {
    const init = async () => {
      if (id) {
        const res = await refetch();
        form.setFieldsValue(res.data?.getCourseInfo.data);
        console.log('🚀 ~ init ~ init:', res.data?.getCourseInfo.data);
      } else {
        console.log('🚀 ~ resetFields');
        form.resetFields();
      }
    };
    init();
  }, [id]);

  const handleEdit = async (
    params: any,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitCourseInfo.code === 200) {
      message.success(res.data.commitCourseInfo.message);
      callback(true);
      return;
    }
    message.error(res.data.commitCourseInfo.message);
  };

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      handleEdit(values, onClose);
    }
  };

  return (
    <Drawer
      title={id ? '编辑课程' : '新建课程'}
      width={720}
      onClose={() => onClose()}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          <Button
            loading={loading}
            onClick={onSubmitHandler}
            type="primary"
          >
            提交
          </Button>
        </Space>
      )}
      open
    >
      <Form
        form={form}
      >
        <Form.Item
          label="课程名称"
          name="name"
          rules={[{
            required: true,
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="课程描述"
          name="desc"
          rules={[{
            required: true,
          }]}
        >
          <TextArea rows={5} showCount maxLength={200} />
        </Form.Item>
        <Row gutter={20}>
          <Col>
            <Form.Item
              label="限制人数"
              name="limitNumber"
              rules={[{
                required: true,
              }]}
            >
              <InputNumber min={0} addonAfter="人" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="持续时长"
              name="duration"
              rules={[{
                required: true,
              }]}
            >
              <InputNumber min={0} addonAfter="分钟" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="适龄人群"
          name="group"
          rules={[{
            required: true,
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="基础能力"
          name="baseAbility"
          rules={[{
            required: true,
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="预约信息"
          name="reserveInfo"
          rules={[{
            required: true,
          }]}
        >
          <TextArea rows={5} showCount maxLength={200} />
        </Form.Item>
        <Form.Item
          label="退款信息"
          name="refundInfo"
          rules={[{
            required: true,
          }]}
        >
          <TextArea rows={5} showCount maxLength={200} />
        </Form.Item>
        <Form.Item label="其他信息" name="otherInfo">
          <TextArea rows={5} showCount maxLength={200} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

EditCourse.defaultProps = {
  id: '',
};
export default EditCourse;
