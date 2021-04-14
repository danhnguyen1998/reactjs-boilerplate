import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Empty, Modal, Tooltip } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { RootState } from 'boot/rootState';
import useError from 'containers/hooks/useError';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { DanceTypeModel, IDanceTypeModel } from '../models';
import { addNewAction, toggleFormAction, updateAction } from '../redux/actions';
import { deleteKindDance, searchList } from '../services';
import { IProps, IState } from './propsState';

export default function DanceTypesList(props: IProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    isNew: state.screen.manager.categories.danceType.isNew,
    isUpdate: state.screen.manager.categories.danceType.isUpdate,
    newData: state.screen.manager.categories.danceType.data,
    dispatchToggleForm: (toggleForm: boolean, data: IDanceTypeModel) => dispatch(toggleFormAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: IDanceTypeModel) => dispatch(addNewAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: IDanceTypeModel) => dispatch(updateAction(isUpdate, data)),
  }));

  const [state, setState] = useState<IState>({
    listDanceType: [],
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
    searchList({ pageNumber: state.pagination.current, search: props.search || '' })
      .then((result) =>
        setState((state) => ({
          ...state,
          loading: false,
          listDanceType: result.data.result,
          pagination: {
            ...state.pagination,
            total: parseInt(result.data.totalPage),
          },
        })),
      )
      .catch((error) => {
        addError(error, t('common:notification.loadDataError'));
        setState((state) => ({ ...state, loading: false }));
      });
  }, [state.pagination.current, props.search]);

  useEffect(() => {
    if (props.isNew && props.newData) {
      const listDanceType = state.listDanceType.concat();
      listDanceType.unshift(props.newData);
      setState((state) => ({ ...state, listDanceType }));
      if (props.dispatchAddNew) props.dispatchAddNew(false, new DanceTypeModel());
    }
  }, [props.isNew]);

  useEffect(() => {
    if (props.isUpdate && props.newData) {
      const listDanceType = state.listDanceType.concat();
      const index = listDanceType.findIndex((e: IDanceTypeModel) => e.id === props.newData?.id);
      if (index !== -1) {
        listDanceType[index] = props.newData;
      }
      setState((state) => ({ ...state, listDanceType }));
      if (props.dispatchUpdate) props.dispatchUpdate(false, new DanceTypeModel());
    }
  }, [props.isUpdate]);

  const edit = (record: IDanceTypeModel) => () => {
    if (props.dispatchToggleForm) props.dispatchToggleForm(true, record);
  };

  const deleteItem = (id: number) => {
    deleteKindDance({ id })
      .then((result) => {
        if (result.data) {
          const listDanceType = state.listDanceType.concat();
          const index = listDanceType.findIndex((e: IDanceTypeModel) => e.id === id);
          if (index !== -1) {
            listDanceType.splice(index, 1);
            setState((state) => ({ ...state, listDanceType }));
            notification.success(t('common:notification.deleteSuccess'));
          } else {
            notification.error(t('common:notification.deleteError'));
          }
        }
      })
      .catch((error) => addError(error, t('common:notification.deleteError')));
  };

  const del = (id: number) => () => {
    Modal.confirm({
      title: t('manager:danceTypes.titleDel'),
      content: t('manager:danceTypes.contentDel'),
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
      title: t('manager:danceTypes.name'),
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
      locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('common:noData')} /> }}
      columns={columns}
      dataSource={state.listDanceType}
      bordered={true}
      size="small"
      pagination={state.pagination}
      loading={state.loading}
      rowKey="id"
    />
  );
}
