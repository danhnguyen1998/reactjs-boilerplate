import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import useError from 'containers/hooks/useError';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import notification from 'utils/notification';
import { ICompetitionModel } from '../models';
import { searchList } from '../services';
import { IState } from './propState';

export default function CompetitionList() {
  const { t, i18n } = useTranslation();
  const { addError } = useError();

  const [state, setState] = useState<IState>({
    listCompetition: [],
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
    searchList({ pageNumber: state.pagination.current, search: '' })
      .then((result) =>
        setState((state) => ({
          ...state,
          loading: false,
          listTournament: result.data.result,
          pagination: {
            ...state.pagination,
            total: parseInt(result.data.totalPage),
          },
        })),
      )
      .catch((error) => addError(error, t('common:notification.loadDataError')));
  }, [state.pagination.current]);

  const edit = (record: ICompetitionModel) => () => {
    console.log('TODO');
  };

  const deleteItem = (id: number) => {
    notification.success(t('common:notification.deleteSuccess'));
  };

  const del = (id: number) => () => {
    Modal.confirm({
      title: t('competition:titleDel'),
      content: t('competition:contentDel'),
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
      title: t('competition:code'),
      key: 'code',
      dataIndex: 'code',
      ellipsis: { showTitle: false },
    },
    {
      title: t('competition:name'),
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
      title: t('competition:danceType'),
      key: `danceType`,
      dataIndex: `danceType`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('competition:dance'),
      key: `dance`,
      dataIndex: `dance`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('competition:minYear'),
      key: `minYear`,
      dataIndex: `minYear`,
      ellipsis: { showTitle: false },
      render: (value: string) => moment(value).format('YYYY'),
    },
    {
      title: t('competition:maxYear'),
      key: `maxYear`,
      dataIndex: `maxYear`,
      ellipsis: { showTitle: false },
      render: (value: string) => moment(value).format('YYYY'),
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
      dataSource={state.listCompetition}
      bordered={true}
      size="small"
      pagination={state.pagination}
      loading={state.loading}
      rowKey="id"
    />
  );
}
