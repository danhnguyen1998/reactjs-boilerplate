import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import OperationModal from '../component/operationModal';
import { IState } from './propState';

export default function ClubForm(props: any) {
  const [state, setState] = useState<IState>({
    visible: false,
    current: {},
  });

  const addNew = () => {
    setState((state) => ({ ...state, current: undefined, visible: true }));
  };

  const handleSubmit = () => {
    setState((state) => ({ ...state, visible: false }));
  };

  const handleCancel = () => {
    setState((state) => ({ ...state, visible: false }));
  };

  return (
    <>
      <Space style={{ marginBottom: 15 }}>
        <Search placeholder="input search text" enterButton="Tìm kiếm" />
        <Button type="primary" icon={<RedoOutlined />}>
          Làm mới
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={addNew}>
          Thêm mới
        </Button>
      </Space>
      <OperationModal current={state.current} visible={state.visible} onCancel={handleCancel} onSubmit={handleSubmit} />
    </>
  );
}
