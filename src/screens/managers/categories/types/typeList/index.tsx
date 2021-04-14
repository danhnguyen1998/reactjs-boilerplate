import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Empty, Modal, Tooltip } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { RootState } from 'boot/rootState';
import useError from 'containers/hooks/useError';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { ITypesModel, TypesModel } from '../models';
import { addNewTypesAction, toggleFormTypesAction, updateTypesAction } from '../redux/actions';
import { deleteTypes, searchList } from '../services';
import { IProps, IState } from './propsState';

export default function TypeList(props: any) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    isNew: state.screen.manager.categories.types.isNew,
    isUpdate: state.screen.manager.categories.types.isUpdate,
    newData: state.screen.manager.categories.types.data,
    dispatchToggleForm: (toggleForm: boolean, data: ITypesModel) => dispatch(toggleFormTypesAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: ITypesModel) => dispatch(addNewTypesAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: ITypesModel) => dispatch(updateTypesAction(isUpdate, data)),
  }));

  const [state, setState] = useState<IState>({
    listTypes: [],
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
          listTypes: result.data.result,
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
      const listTypes = state.listTypes.concat();
      listTypes.push(props.newData);
      setState((state) => ({ ...state, listTypes }));
      if (props.dispatchAddNew) props.dispatchAddNew(false, new TypesModel());
    }
  }, [props.isNew]);

  useEffect(() => {
    if (props.isUpdate && props.newData) {
      const listTypes = state.listTypes.concat();
      const index = listTypes.findIndex((e: ITypesModel) => e.id === props.newData?.id);
      if (index !== -1) {
        listTypes[index] = props.newData;
      }
      setState((state) => ({ ...state, listTypes }));
      if (props.dispatchUpdate) props.dispatchUpdate(false, new TypesModel());
    }
  }, [props.isUpdate]);

  const edit = (record: ITypesModel) => () => {
    if (props.dispatchToggleForm) props.dispatchToggleForm(true, record);
  };

  const deleteItem = (id: number) => {
    deleteTypes({ id })
      .then((result) => {
        if (result.data) {
          const listTypes = state.listTypes.concat();
          const index = listTypes.findIndex((e: ITypesModel) => e.id === id);
          if (index !== -1) {
            listTypes.splice(index, 1);
            setState((state) => ({ ...state, listTypes }));
            notification.success(t('common:notification.deleteSuccess'));
          } else {
            notification.error(t('common:notification.updateError'));
          }
        }
      })
      .catch((error) => addError(error, t('common:notification.updateError')));
  };

  const del = (id: number) => () => {
    Modal.confirm({
      title: t('manager:types.titleDel'),
      content: t('manager:types.contentDel'),
      okText: t('common:button.okButton'),
      cancelText: t('common:button.cancelButton'),
      onOk: () => deleteItem(id),
    });
  };

  const onPageChange = (page: number) => {
    setState((state) => ({ ...state, pagination: { ...state.pagination, current: page } }));
  };

  const formatMoney = (amount: any) => {
    amount = parseFloat(amount) || 0;

    return amount.toLocaleString();
  };

  const columns: ColumnType<object>[] = [
    {
      title: t('manager:types.name'),
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
      title: t('manager:types.fees'),
      key: `amount`,
      dataIndex: `amount`,
      ellipsis: { showTitle: false },
      align: 'right',
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {formatMoney(value)}
        </Tooltip>
      ),
    },
    {
      title: t('manager:types.currency'),
      key: `unit`,
      dataIndex: `unit`,
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
    <>
      <Table
        locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('common:noData')} /> }}
        columns={columns}
        dataSource={state.listTypes}
        bordered={true}
        size="small"
        pagination={state.pagination}
        loading={state.loading}
        rowKey="id"
      />
    </>
  );
}
