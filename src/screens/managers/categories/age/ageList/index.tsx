import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Empty, Modal, Tooltip } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { RootState } from 'boot/rootState';
import constant from 'constant/system';
import useError from 'containers/hooks/useError';
import i18n from 'lang';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { AgeModel, IAgeModel } from '../models';
import { addNewAgeAction, toggleFormAgeAction, updateAgeAction } from '../redux/actions';
import { deleteAge, searchList } from './../services';
import { IProps, IState } from './propsState';

export default function AgeList(props: IProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();
  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    isNew: state.screen.manager.categories.age.isNew,
    isUpdate: state.screen.manager.categories.age.isUpdate,
    newData: state.screen.manager.categories.age.data,
    dispatchToggleForm: (toggleForm: boolean, data: IAgeModel) => dispatch(toggleFormAgeAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: IAgeModel) => dispatch(addNewAgeAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: IAgeModel) => dispatch(updateAgeAction(isUpdate, data)),
  }));

  const columns: ColumnType<object>[] = [
    {
      title: t('age:table.title.name'),
      dataIndex: `name${i18n.language.toUpperCase()}`,
      width: 200,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('age:table.title.totalAge'),
      dataIndex: 'totalAge',
      align: 'center',
      width: 100,
      ellipsis: { showTitle: false },
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('age:table.title.singleStartAge'),
      dataIndex: 'fromAgeOne',
      ellipsis: { showTitle: false },
      render: (value: any, record: any) => {
        const newText = (value: string) => (
          <>
            Từ <b>{value}</b> tuổi trở lên
          </>
        );
        const personOne = (
          <>
            <b>{value}</b> - <b>{record.toAgeOne}</b>
          </>
        );
        const personSecond = (
          <>
            {!record.toAgeSecond ? newText(record.fromAgeSecond) : record.fromAgeSecond}
            {record.toAgeSecond ? (
              <>
                {' '}
                - <b>{record.toAgeSecond}</b>
              </>
            ) : (
              ''
            )}
          </>
        );
        return (
          <Tooltip placement="topLeft" title={value}>
            {record.fromAgeSecond ? (
              <>
                Người thứ nhất: {personOne}
                <br />
                Người thứ hai: {personSecond}
              </>
            ) : (
              <>
                {!record.toAgeOne ? newText(value) : <b>{value}</b>}
                {record.toAgeOne ? (
                  <>
                    {' '}
                    - <b>{record.toAgeOne}</b>
                  </>
                ) : (
                  ''
                )}
              </>
            )}
          </Tooltip>
        );
      },
    },
    {
      dataIndex: 'operation',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => {
        return (
          <>
            <Tooltip title={t('common:action.edit')}>
              <Button size="small" type="primary" icon={<FileSearchOutlined />} onClick={edit(record)} />
            </Tooltip>{' '}
            <Tooltip title={'Xóa'}>
              <Button size="small" type="primary" danger={true} icon={<DeleteOutlined />} onClick={remove(record.id)} />
            </Tooltip>
          </>
        );
      },
    },
  ];

  const [state, setState] = useState<IState>({
    data: [],
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
          data: result.data.result,
          pagination: {
            ...state.pagination,
            total: parseInt(result.data.totalItem),
            pageSize: result.data.pageSize,
          },
        })),
      )
      .catch((error) => addError(error, t('common:notification.loadDataError')));
  }, [state.pagination.current, props.search]);

  useEffect(() => {
    if (props.isNew && props.newData) {
      const ages = state.data.concat();
      ages.push(props.newData);
      const pagination = state.pagination;
      pagination.total += 1;
      pagination.pageSize = ages.length;
      setState((state) => ({ ...state, data: ages, pagination }));
      if (props.dispatchAddNew) props.dispatchAddNew(false, new AgeModel());
    }
  }, [props.isNew]);

  useEffect(() => {
    if (props.isUpdate && props.newData) {
      const ages = state.data.concat();
      const index = ages.findIndex((e: IAgeModel) => e.id === props.newData?.id);
      if (index !== -1) {
        ages[index] = props.newData;
      }

      // listDanceType.push(props.newData);
      setState((state) => ({ ...state, data: ages }));
      if (props.dispatchUpdate) props.dispatchUpdate(false, new AgeModel());
    }
  }, [props.isUpdate]);

  const edit = (record: AgeModel) => () => {
    if (props.dispatchToggleForm) props.dispatchToggleForm(true, record);
  };

  // delete item
  const deleteItem = (id: number) => {
    setState((state) => ({ ...state, loading: true }));
    deleteAge(id)
      .then((result) => {
        setState((state) => ({ ...state, loading: false }));
        if (result.data) {
          const ages = state.data.concat();
          const index = ages.findIndex((e: IAgeModel) => e.id === id);
          if (index !== -1) {
            ages.splice(index, 1);
            setState((state) => ({ ...state, data: ages }));
            notification.success(t('common:notification.deleteSuccess'));
          } else {
            notification.error(t('common:notification.updateError'));
          }
        }
      })
      .catch((error) => {
        addError(error, t('common:notification.updateError'));
        setState((state) => ({ ...state, loading: false }));
      });
  };

  const remove = (id: number) => () => {
    Modal.confirm({
      title: t('age:titleDel'),
      content: t('age:contentDel'),
      okText: t('common:button.okButton'),
      cancelText: t('common:button.cancelButton'),
      onOk: () => deleteItem(id),
    });
  };
  // end delete item

  const onPageChange = (page: number) => {
    setState((state) => ({ ...state, pagination: { ...state.pagination, current: page } }));
  };

  const renderStatus = (value: string) => {
    let text = '';
    switch (value) {
      case constant.STATUS.ACTIVE:
        text = t('age:form.message.active');
        break;
      default:
        text = t('age:form.message.block');
        break;
    }
    return text;
  };

  return (
    <Table
      locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('common:noData')} /> }}
      columns={columns}
      dataSource={state.data}
      bordered={true}
      size="small"
      pagination={state.pagination}
      loading={state.loading}
      rowKey="id"
    />
  );
}
