import { CheckOutlined, DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Empty, Modal, Tooltip } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { RootState } from 'boot/rootState';
import constants from 'constant/system';
import useError from 'containers/hooks/useError';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { AccountModel, IAccountModel } from '../models';
import { addNewAccountAction, toggleFormAccountAction, updateAccountAction } from '../redux/actions';
import { activeAccount, deleteAccount, searchList } from '../services';
import { IProps, IState } from './propsState';

export default function AccountList(props: any) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    isNew: state.screen.manager.categories.account.isNew,
    isUpdate: state.screen.manager.categories.account.isUpdate,
    newData: state.screen.manager.categories.account.data,
    dispatchToggleForm: (toggleForm: boolean, data: IAccountModel) =>
      dispatch(toggleFormAccountAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: IAccountModel) => dispatch(addNewAccountAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: IAccountModel) => dispatch(updateAccountAction(isUpdate, data)),
  }));

  const [state, setState] = useState<IState>({
    listAccount: [],
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
          listAccount: result.data.result,
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
      const listAccount = state.listAccount.concat();
      listAccount.push(props.newData);
      setState((state) => ({ ...state, listAccount }));
      if (props.dispatchAddNew) props.dispatchAddNew(false, new AccountModel());
    }
  }, [props.isNew]);

  useEffect(() => {
    if (props.isUpdate && props.newData) {
      const listAccount = state.listAccount.concat();
      const index = listAccount.findIndex((e: IAccountModel) => e.id === props.newData?.id);
      if (index !== -1) {
        listAccount[index] = props.newData;
      }
      setState((state) => ({ ...state, listAccount }));
      if (props.dispatchUpdate) props.dispatchUpdate(false, new AccountModel());
    }
  }, [props.isUpdate]);

  const edit = (record: IAccountModel) => () => {
    if (props.dispatchToggleForm) props.dispatchToggleForm(true, record);
  };

  const deleteItem = (id: number) => {
    deleteAccount({ id })
      .then((result) => {
        if (result.data) {
          const listAccount = state.listAccount.concat();
          const index = listAccount.findIndex((e: IAccountModel) => e.id === id);
          if (index !== -1) {
            listAccount.splice(index, 1);
            setState((state) => ({ ...state, listAccount }));
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
      title: t('manager:account.titleDel'),
      content: t('manager:account.contentDel'),
      okText: t('common:button.okButton'),
      cancelText: t('common:button.cancelButton'),
      onOk: () => deleteItem(id),
    });
  };

  const onPageChange = (page: number) => {
    setState((state) => ({ ...state, pagination: { ...state.pagination, current: page } }));
  };

  const active = (record: IAccountModel) => () => {
    activeAccount({ id: record.id })
      .then((result) => {
        if (props.dispatchUpdate) props.dispatchUpdate(true, result.data);
        notification.success(t('common:notification.updateSucc'));
      })
      .catch((error) => addError(error, t('common:notification.updateError')));
  };

  const columns: ColumnType<object>[] = [
    // {
    //   title: t("manager:account.name"),
    //   key: `name`,
    //   dataIndex: `name`,
    //   ellipsis: { showTitle: false },
    //   render: (value: any) => (
    //     <Tooltip placement="topLeft" title={value}>
    //       {value}
    //     </Tooltip>
    //   ),
    // },
    {
      title: t('manager:account.userName'),
      key: `userName`,
      dataIndex: `userName`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:account.unitWork'),
      key: `unitWork`,
      dataIndex: `unitWork`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:account.address'),
      key: `address`,
      dataIndex: `address`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:account.contactPerson'),
      key: `references`,
      dataIndex: `references`,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:account.phone'),
      key: `phoneNumber`,
      dataIndex: `phoneNumber`,
      align: 'right',
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:account.email'),
      key: `email`,
      dataIndex: `email`,
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
      align: 'right',
      width: 100,
      render: (_: any, record: any) => {
        return (
          <>
            {record.status !== constants.STATUS.BLOCK || (
              <>
                <Tooltip placement="topLeft" title={t('common:action.active')}>
                  <Button size="small" type="primary" icon={<CheckOutlined />} onClick={active(record)} />
                </Tooltip>{' '}
              </>
            )}
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
        dataSource={state.listAccount}
        bordered={true}
        size="small"
        pagination={state.pagination}
        loading={state.loading}
        rowKey="id"
      />
    </>
  );
}
