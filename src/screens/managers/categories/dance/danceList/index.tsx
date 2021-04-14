import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Empty, Modal, Tooltip } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { RootState } from 'boot/rootState';
import useError from 'containers/hooks/useError';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { DanceModel, IDanceModel } from '../models';
import { addNewDanceAction, toggleFormDanceAction, updateDanceAction } from '../redux/actions';
import { deleteDance, searchList } from '../services';
import { IProps, IState } from './propsState';

export default function DanceList(props: IProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    isNew: state.screen.manager.categories.dance.isNew,
    isUpdate: state.screen.manager.categories.dance.isUpdate,
    newData: state.screen.manager.categories.dance.data,
    dispatchToggleForm: (toggleForm: boolean, data: IDanceModel) => dispatch(toggleFormDanceAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: IDanceModel) => dispatch(addNewDanceAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: IDanceModel) => dispatch(updateDanceAction(isUpdate, data)),
  }));

  const [state, setState] = useState<IState>({
    listDance: [],
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
    searchList({ pageNumber: state.pagination.current, search: props.search } || '')
      .then((result) => {
        setState((state) => ({
          ...state,
          loading: false,
          listDance: result.data.result,
          pagination: {
            ...state.pagination,
            total: parseInt(result.data.totalItem),
            pageSize: parseInt(result.data.pageSize),
          },
        }));
      })
      .catch((error) => {
        addError(error, t('common:notification.loadDataError'));
        setState((state) => ({ ...state, loading: false }));
      });
  }, [state.pagination.current, props.search]);

  useEffect(() => {
    if (props.isNew && props.newData) {
      const listDance = state.listDance.concat();
      listDance.unshift(props.newData);
      setState((state) => ({ ...state, listDance }));
      if (props.dispatchAddNew) props.dispatchAddNew(false, new DanceModel());
    }
  }, [props.isNew]);

  useEffect(() => {
    if (props.isUpdate && props.newData) {
      const listDance = state.listDance.concat();
      const index = listDance.findIndex((e: IDanceModel) => e.id === props.newData?.id);
      if (index !== -1) {
        listDance[index] = props.newData;
      }
      setState((state) => ({ ...state, listDance }));
      if (props.dispatchUpdate) props.dispatchUpdate(false, new DanceModel());
    }
  }, [props.isUpdate]);

  const onPageChange = (page: number) => {
    setState((state) => ({ ...state, pagination: { ...state.pagination, current: page } }));
  };

  const columns: ColumnType<object>[] = [
    {
      title: t('manager:dance.name'),
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
      title: t('manager:dance.code'),
      key: `code`,
      dataIndex: `code`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:dance.type'),
      key: `KindOfDanceModel`,
      dataIndex: `KindOfDanceModel`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value[`name${i18n.language.toUpperCase()}`]}>
          {value[`name${i18n.language.toUpperCase()}`]}
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

  const deleteItem = (id: number) => {
    deleteDance({ id })
      .then((result) => {
        if (result.data) {
          const listDance = state.listDance.concat();
          const index = listDance.findIndex((e: IDanceModel) => e.id === id);
          if (index !== -1) {
            listDance.splice(index, 1);
            setState((state) => ({ ...state, listDance }));
            notification.success(t('common:notification.deleteSuccess'));
          } else {
            notification.error(t('common:notification.deleteError'));
          }
        }
      })
      .catch((error) => addError(error, t('common:notification.deleteError')));
  };

  const del = (id) => () => {
    Modal.confirm({
      title: t('manager:dance.titleDel'),
      content: t('manager:dance.contentDel'),
      okText: t('common:button.okButton'),
      cancelText: t('common:button.cancelButton'),
      onOk: () => deleteItem(id),
    });
  };

  const edit = (record: IDanceModel) => () => {
    if (props.dispatchToggleForm) props.dispatchToggleForm(true, record);
  };

  return (
    <>
      <Table
        locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('common:noData')} /> }}
        columns={columns}
        dataSource={state.listDance}
        bordered={true}
        size="small"
        pagination={state.pagination}
        loading={state.loading}
        rowKey="id"
      />
    </>
  );
}
