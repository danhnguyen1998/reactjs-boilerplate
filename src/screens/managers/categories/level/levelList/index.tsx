import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Empty, Modal, Tag, Tooltip } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { RootState } from 'boot/rootState';
import useError from 'containers/hooks/useError';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { ILevelModel, LevelModel } from '../models';
import { addNewLevelAction, toggleFormLevelAction, updateLevelAction } from '../redux/actions';
import { deleteLevel, searchList } from '../services';
import { IProps, IState } from './propsState';

export default function LevelList(props: IProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    isNew: state.screen.manager.categories.level.isNew,
    isUpdate: state.screen.manager.categories.level.isUpdate,
    newData: state.screen.manager.categories.level.data,
    dispatchToggleForm: (toggleForm: boolean, data: ILevelModel) => dispatch(toggleFormLevelAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: ILevelModel) => dispatch(addNewLevelAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: ILevelModel) => dispatch(updateLevelAction(isUpdate, data)),
  }));

  const [state, setState] = useState<IState>({
    loading: false,
    listLevel: [],
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0,
      onChange: (page: number) => onPageChange(page),
    },
  });

  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    searchList({ pageNumber: state.pagination.current, search: props.search } || '')
      .then((result) => {
        setState((state) => ({
          ...state,
          loading: false,
          listLevel: result.data.result,
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
      const listLevel = state.listLevel.concat();
      listLevel.push(props.newData);
      setState((state) => ({ ...state, listLevel }));
      if (props.dispatchAddNew) props.dispatchAddNew(false, new LevelModel());
    }
  }, [props.isNew]);

  useEffect(() => {
    if (props.isUpdate && props.newData) {
      const listLevel = state.listLevel.concat();
      const index = listLevel.findIndex((e: ILevelModel) => e.id === props.newData?.id);
      if (index !== -1) {
        listLevel[index] = props.newData;
      }
      setState((state) => ({ ...state, listLevel }));
      if (props.dispatchUpdate) props.dispatchUpdate(false, new LevelModel());
    }
  }, [props.isUpdate]);

  const columns: ColumnType<object>[] = [
    {
      title: t('manager:level.name'),
      key: `name${i18n.language.toUpperCase()}`,
      dataIndex: `name${i18n.language.toUpperCase()}`,
      ellipsis: { showTitle: false },
      width: 200,
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:level.type'),
      key: `kindOfDanceName${i18n.language.toUpperCase()}`,
      dataIndex: `kindOfDanceName${i18n.language.toUpperCase()}`,
      ellipsis: { showTitle: false },
      width: 200,
      render: (value: any) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: t('manager:level.idDances'),
      key: `danceData`,
      dataIndex: `danceData`,
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => (
            <Tooltip placement="topLeft" title={tag[`name${i18n.language.toUpperCase()}`]}>
              <Tag key={tag.id} color="geekblue">
                {tag.code}
              </Tag>
            </Tooltip>
          ))}
        </>
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
    deleteLevel({ id })
      .then((result) => {
        if (result.data) {
          const listLevel = state.listLevel.concat();
          const index = listLevel.findIndex((e: ILevelModel) => e.id === id);
          if (index !== -1) {
            listLevel.splice(index, 1);
            setState((state) => ({ ...state, listLevel }));
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
      title: t('manager:level.titleDel'),
      content: t('manager:level.contentDel'),
      okText: t('common:button.okButton'),
      cancelText: t('common:button.cancelButton'),
      onOk: () => deleteItem(id),
    });
  };
  const edit = (record: ILevelModel) => () => {
    if (props.dispatchToggleForm) props.dispatchToggleForm(true, record);
  };
  const onPageChange = (page: number) => {
    setState((state) => ({ ...state, pagination: { ...state.pagination, current: page } }));
  };

  return (
    <Table
      locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('common:noData')} /> }}
      columns={columns}
      dataSource={state.listLevel}
      bordered={true}
      size="small"
      pagination={state.pagination}
      loading={state.loading}
      rowKey="id"
    />
  );
}
