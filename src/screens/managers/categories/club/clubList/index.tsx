import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import notification from 'utils/notification';
import OperationModal from '../component/operationModal';

export default function ClubList(props: any) {
  const { t } = useTranslation();
  const data = [
    {
      key: '1',
      name: 'CLB Hà Nội',
      contactPerson: 'Nguyễn Văn A',
      phone: '012345652',
      email: 'thanhnd@gmail.com',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'CLB Hải Phòng',
      contactPerson: 'Nguyễn Văn B',
      phone: '012345652',
      email: 'thanhnd@gmail.com',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'CLB Hưng Yên',
      contactPerson: 'Nguyễn Văn A',
      phone: '012345652',
      email: 'thanhnd@gmail.com',
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'CLB Lạng Sơn',
      contactPerson: 'Nguyễn Văn A',
      phone: '012345652',
      email: 'thanhnd@gmail.com',
      address: 'London No. 2 Lake Park',
    },
  ];

  const columns: ColumnType<object>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Người liên hệ',
      dataIndex: 'contactPerson',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const [state, setState] = useState({
    data,
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
    visible: false,
    current: {},
  });

  const edit = (record) => () => {
    setState((state) => ({ ...state, visible: true }));
  };

  const deleteItem = (id: string) => {
    notification.success(t('common:notification.deleteSuccess'));
  };

  const del = (id) => () => {
    Modal.confirm({
      title: t('manager:level.titleDel'),
      content: t('manager:level.contentDel'),
      okText: t('common:button.okButton'),
      cancelText: t('common:button.cancelButton'),
      onOk: () => deleteItem(id),
    });
  };

  const handleCancel = () => {
    // setAddBtnblur();
    setState((state) => ({ ...state, visible: false }));
  };

  const handleSubmit = () => {
    setState((state) => ({ ...state, visible: false }));

    // const id = current ? current.id : '';
  };

  const renderColumns = () => {
    const listColumn: ColumnType<object>[] = [];
    columns.map((item) =>
      listColumn.push({
        title: item.title,
        dataIndex: item.dataIndex,
        align: item.align || 'left',
        ellipsis: { showTitle: false },
        render: (value: any) => (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        ),
      }),
    );
    listColumn.push({
      dataIndex: 'operation',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => {
        return (
          <>
            <Tooltip title={'Xem'}>
              <Button size="small" type="primary" icon={<FileSearchOutlined />} onClick={edit(record)} />
            </Tooltip>{' '}
            <Tooltip title={'Xóa'}>
              <Button size="small" type="primary" danger={true} icon={<DeleteOutlined />} onClick={del(record.key)} />
            </Tooltip>
          </>
        );
      },
    });
    return listColumn;
  };

  return (
    <>
      <Table
        columns={renderColumns()}
        dataSource={state.data}
        bordered={true}
        size="small"
        pagination={state.pagination}
        loading={state.loading}
      />
      <OperationModal current={state.current} visible={state.visible} onCancel={handleCancel} onSubmit={handleSubmit} />
    </>
  );
}
