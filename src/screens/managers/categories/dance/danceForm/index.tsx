import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Row, Select } from 'antd';
import { Rule } from 'antd/lib/form';
import { RootState } from 'boot/rootState';
import DebounceInput from 'containers/debonceInput';
import useError from 'containers/hooks/useError';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { IDanceTypeModel } from '../../danceTypes/models';
import { DanceModel, IDanceModel } from '../models';
import { addNewDanceAction, toggleFormDanceAction, updateDanceAction } from '../redux/actions';
import { createDance, getKindOfDance, updateDance } from '../services';
import { IProps, IState } from './propState';

export default function DanceForm(props: IProps) {
  const { t, i18n } = useTranslation();
  const { Option } = Select;
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    toggleForm: state.screen.manager.categories.dance.toggleForm,
    editData: state.screen.manager.categories.dance.data,
    dispatchToggleForm: (toggleForm: boolean, data: IDanceModel) => dispatch(toggleFormDanceAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: IDanceModel) => dispatch(addNewDanceAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: IDanceModel) => dispatch(updateDanceAction(isUpdate, data)),
  }));

  const currentFields = [
    { name: ['code'], value: '' },
    { name: ['nameEN'], value: '' },
    { name: ['nameVI'], value: '' },
    { name: ['idKindOfDance'], value: '' },
    { name: ['status'], value: 'ACTIVE' },
  ];

  const [state, setState] = useState<IState>({
    listKindOfDance: [],
    toggleForm: false,
    loading: false,
    fields: currentFields,
    id: 0,
  });

  useEffect(() => {
    let fields = currentFields;
    let id = 0;
    if (props.editData?.id && props.editData.id > 0) {
      id = props.editData.id;
      fields = [
        { name: ['code'], value: props.editData.code || '' },
        { name: ['nameEN'], value: props.editData.nameEN || '' },
        { name: ['nameVI'], value: props.editData.nameVI || '' },
        { name: ['idKindOfDance'], value: props.editData.idKindOfDance || '' },
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

  const addNew = () => props.dispatchToggleForm && props.dispatchToggleForm(true, new DanceModel());

  const onCancel = () => {
    props.dispatchToggleForm && props.dispatchToggleForm(false, new DanceModel());
    setState((state) => ({ ...state, loading: false }));
  };

  const onFinish = (values: IDanceModel) => {
    if (!values.code) values.code = moment().unix().toString();
    values.nameEN = values.nameVI;
    setState((state) => ({ ...state, loading: true }));
    if (state.id === 0) {
      createDance(values)
        .then((result) => {
          if (props.dispatchAddNew) props.dispatchAddNew(true, result.data);
          notification.success(t('common:notification.addSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.addError')));
    } else {
      values.id = state.id;
      updateDance(values)
        .then((result) => {
          if (props.dispatchUpdate) props.dispatchUpdate(true, result.data);
          notification.success(t('common:notification.updateSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.updateError')));
    }
  };

  const validation: { [key: string]: Rule[] } = {
    code: [{ required: true, message: t('manager:dance.message.code') }],
    nameVI: [{ required: true, message: t('manager:dance.message.nameVI') }],
    idKindOfDance: [{ required: true, message: t('manager:dance.message.idKindOfDance') }],
  };

  const onFieldsChange = (_: any, allFields: any) => setState((state) => ({ ...state, fields: allFields }));

  const renderOption = () => {
    const children: object[] = state.listKindOfDance.map((item: IDanceTypeModel, index) => (
      <Option key={index} value={item.id || ''}>
        {item[`name${i18n.language.toUpperCase()}`]}
      </Option>
    ));
    return children;
  };

  return (
    <>
      <Button size="small" type="primary" icon={<PlusOutlined />} onClick={addNew}>
        {t('common:action.add')}
      </Button>
      <Modal
        centered={true}
        bodyStyle={{ paddingBottom: 0 }}
        title={props.editData?.id ? t('manager:dance.titleEdit') : t('manager:dance.titleAdd')}
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
          layout="vertical"
          id="formSubmit"
          fields={state.fields}
          onFieldsChange={onFieldsChange}
          onFinish={onFinish}
          size="small"
        >
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item name="code" label={t('manager:dance.code')} rules={validation.code}>
                <DebounceInput autoFocus={true} />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item name="nameVI" label={t('manager:dance.name')} rules={validation.nameVI}>
                <DebounceInput />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item name="idKindOfDance" label={t('manager:dance.idKindOfDance')} rules={validation.idKindOfDance}>
                <Select>{renderOption()}</Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
