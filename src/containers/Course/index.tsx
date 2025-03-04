/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GET_COURSES } from '@/graphql/course';
import { useQuery } from '@apollo/client';
import EditCourse from './components/EditCourse';
import { getColumns } from './constants';

const Course = () => {
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShowInfo(true);
  };

  const onOrderTimeHandler = (id: string) => {
    // setCurId(id);
    // setShowOrderTime(true);
  };

  const { loading, data, refetch } = useQuery(GET_COURSES, {
    skip: true,
    variables: {
      page: {
        pageNum: 1,
        pageSize: DEFAULT_PAGE_SIZE,
      },
    },
  });

  const refetchHandler = async (params: {
    name?: string;
    pageSize?: number;
    current?: number;
  }) => {
    const { data: res, errors } = await refetch({
      name: params.name,
      page: {
        pageNum: params.current || 1,
        pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      },
    });

    if (errors) {
      return {
        success: false,
      };
    }
    return {
      total: res?.getCourses.page.total,
      data: res?.getCourses.data,
      success: true,
    };
  };

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShowInfo(false);
    // if (isReload) {
    // }
    actionRef.current?.reload();
  };

  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          onOrderTimeHandler,
        })}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        toolBarRender={() => [
          <Button key="add" onClick={() => onClickAddHandler()} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
        request={refetchHandler}
      />
      {showInfo && (
        <EditCourse
          id={curId}
          onClose={() => closeAndRefetchHandler()}
        />
      )}
    </PageContainer>
  );
};

export default Course;
