import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import notification from 'utils/notification';
import { ITournamentModel } from '../models';
import { IState } from './propsState';

export default function TournamentList() {
  const { t, i18n } = useTranslation();

  const [state, setState] = useState<IState>({
    listTournament: [],
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0,
      onChange: (page: number) => onPageChange(page),
    },
    loading: false,
  });

  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    // searchList({ pageNumber: state.pagination.current, search: "" })
    //   .then((result) =>
    //     setState((state) => ({
    //       ...state,
    //       loading: false,
    //       listTournament: result.data.result,
    //       pagination: {
    //         ...state.pagination,
    //         total: parseInt(result.data.totalPage),
    //       },
    //     })),
    //   )
    //   .catch((error) => addError(error, t("manager:tournaments.message.loadDataError")));
  }, [state.pagination.current]);

  const edit = (record: ITournamentModel) => () => {
    console.log('TODO');
  };

  const deleteItem = (id: number) => {
    notification.success(t('common:notification.deleteSuccess'));
  };

  const del = (id: number) => () => {
    Modal.confirm({
      title: t('manager:tournaments.titleDel'),
      content: t('manager:tournaments.contentDel'),
      okText: t('common:button.okButton'),
      cancelText: t('common:button.cancelButton'),
      onOk: () => deleteItem(id),
    });
  };

  const onPageChange = (page: number) => {
    setState((state) => ({ ...state, pagination: { ...state.pagination, current: page } }));
  };

  const columns: ColumnType<object>[] = [
    {
      title: t('manager:tournaments.list.createdAt'),
      key: 'createdAt',
      dataIndex: 'createdAt',
      align: 'center',
      ellipsis: { showTitle: false },
      render: (value: string) => moment(value).format('DD/MM/YYYY'),
    },
    {
      title: t('manager:tournaments.list.name'),
      key: `name${i18n.language.toUpperCase()}`,
      dataIndex: `name${i18n.language.toUpperCase()}`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:tournaments.list.address'),
      key: `address${i18n.language.toUpperCase()}`,
      dataIndex: `address${i18n.language.toUpperCase()}`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:tournaments.list.active'),
      key: `active`,
      dataIndex: `active`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      key: 'operation',
      dataIndex: 'operation',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => {
        return (
          <>
            <Tooltip placement="topLeft" title={t('common:action.edit')}>
              <Button size="small" type="primary" icon={<FileSearchOutlined />} onClick={edit(record)} />
            </Tooltip>{' '}
            <Tooltip placement="topLeft" title={t('common:action.remove')}>
              <Button size="small" type="primary" danger={true} icon={<DeleteOutlined />} onClick={del(record.id)} />
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={state.listTournament}
      bordered={true}
      size="small"
      pagination={state.pagination}
      loading={state.loading}
      rowKey="id"
    />
  );
}
