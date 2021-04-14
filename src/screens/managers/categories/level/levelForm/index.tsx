import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Row, Select } from 'antd';
import { Rule } from 'antd/lib/form';
import { RootState } from 'boot/rootState';
import DebounceInput from 'containers/debonceInput';
import useError from 'containers/hooks/useError';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { getKindOfDance } from '../../dance/services';
import { TypesModel } from '../../types/models';
import { ILevelModel } from '../models';
import { addNewLevelAction, toggleFormLevelAction, updateLevelAction } from '../redux/actions';
import { createLevel, getDanceByKind, updateLevel } from '../services';
import { IProps, IState } from './propState';

export default function LevelForm(props: IProps) {
  const { t, i18n } = useTranslation();
  const { Option } = Select;
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    toggleForm: state.screen.manager.categories.level.toggleForm,
    editData: state.screen.manager.categories.level.data,
    dispatchToggleForm: (toggleForm: boolean, data: ILevelModel) => dispatch(toggleFormLevelAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: ILevelModel) => dispatch(addNewLevelAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: ILevelModel) => dispatch(updateLevelAction(isUpdate, data)),
  }));

  const currentFields = [
    { name: ['nameEN'], value: '' },
    { name: ['idKindOfDance'], value: '' },
    { name: ['idDances'], value: new Array<number>() },
    { name: ['status'], value: 'ACTIVE' },
  ];

  const [state, setState] = useState<IState>({
    toggleForm: false,
    fields: currentFields,
    listKindOfDance: [],
    listDanceByKind: [],
    id: 0,
    loading: false,
  });

  useEffect(() => {
    let fields = currentFields;
    let id = 0;
    if (props.editData?.id && props.editData.id > 0) {
      id = props.editData.id;
      const idDances = props.editData.idDances ? props.editData.idDances.split(',').map((x) => +x) : [];
      selectKind(props.editData.kindOfDanceId);
      fields = [
        { name: ['nameEN'], value: props.editData.nameEN || '' },
        { name: ['nameVI'], value: props.editData.nameVI || '' },
        { name: ['idKindOfDance'], value: props.editData.kindOfDanceId || '' },
        { name: ['idDances'], value: idDances },
        { name: ['status'], value: props.editData.status || 'ACTIVE' },
      ];
    }
    setState((state) => ({ ...state, toggleForm: props.toggleForm || false, id, fields }));
  }, [props.toggleForm]);

  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    getKindOfDance()
      .then((result) => {
        setState((state) => ({ ...state, loading: false, listKindOfDance: result.data }));
      })
      .catch((error) => {
        addError(error, t('common:notification.loadDataError'));
        setState((state) => ({ ...state, loading: false }));
      });
  }, [props.listKindOfDance]);

  const addNew = () => props.dispatchToggleForm && props.dispatchToggleForm(true, new TypesModel());

  const onCancel = () => {
    props.dispatchToggleForm && props.dispatchToggleForm(false, new TypesModel());
    setState((state) => ({ ...state, loading: false }));
  };

  const onFinish = (values) => {
    values.nameEN = values.nameVI;
    setState((state) => ({ ...state, loading: true }));
    if (state.id === 0) {
      createLevel(values)
        .then((result) => {
          if (props.dispatchAddNew) props.dispatchAddNew(true, result.data);
          notification.success(t('common:notification.addSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.addError')));
    } else {
      values.id = state.id;
      updateLevel(values)
        .then((result) => {
          if (props.dispatchUpdate) props.dispatchUpdate(true, result.data);
          notification.success(t('common:notification.updateSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.updateError')));
    }
  };

  const onFieldsChange = (_: any, allFields: any) => {
    setState((state) => ({ ...state, fields: allFields }));
  };

  const validation: { [key: string]: Rule[] } = {
    nameVI: [{ required: true, message: t('manager:level.message.nameVI') }],
    idKindOfDance: [{ required: true, message: t('manager:level.message.idKindOfDance') }],
    idDances: [{ required: true, message: t('manager:level.message.idDances') }],
  };

  const renderOption = () => {
    const children: object[] = state.listKindOfDance.map((item: ILevelModel, index) => (
      <Option key={index} value={item.id || ''}>
        {item[`name${i18n.language.toUpperCase()}`]}
      </Option>
    ));
    return children;
  };

  const renderOptionDanceByKind = () => {
    const children: object[] = state.listDanceByKind.map((item: any, index) => (
      <Option key={index} value={item.id || ''}>
        {item[`name${i18n.language.toUpperCase()}`]}
      </Option>
    ));
    return children;
  };

  const selectKind = (e) => {
    setState((state) => ({ ...state, fields: [{ name: ['idDances'], value: [] }] }));
    getDanceByKind({ idKindOfDance: e })
      .then((result) => {
        setState((state) => ({ ...state, listDanceByKind: result.data }));
      })
      .catch((error) => addError(error, t('common:notification.addError')));
  };

  return (
    <>
      <Button size="small" type="primary" icon={<PlusOutlined />} onClick={addNew}>
        {t('common:action.add')}
      </Button>
      <Modal
        centered={true}
        bodyStyle={{ paddingBottom: 0 }}
        title={props.editData?.id ? t('manager:level.titleEdit') : t('manager:level.titleAdd')}
        destroyOnClose={true}
        visible={state.toggleForm}
        closable={false}
        footer={[
          <Button form="formSubmit" key="submit" type="primary" htmlType="submit" loading={state.loading}>
            {t('common:button.saveButton')}
          </Button>,
          <Button key="back" type="primary" danger={true} onClick={onCancel} loading={state.loading}>
            {t('common:button.cancelButton')}
          </Button>,
        ]}
      >
        <Form
          id="formSubmit"
          layout="vertical"
          fields={state.fields}
          onFieldsChange={onFieldsChange}
          onFinish={onFinish}
          size="small"
        >
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item name="nameVI" label={t('manager:level.name')} rules={validation.nameVI}>
                <DebounceInput autoFocus={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="idKindOfDance" label={t('manager:level.idKindOfDance')} rules={validation.idKindOfDance}>
                <Select onChange={selectKind}>{renderOption()}</Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="idDances" label={t('manager:level.idDances')} rules={validation.idDances}>
                <Select mode="multiple">{renderOptionDanceByKind()}</Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
