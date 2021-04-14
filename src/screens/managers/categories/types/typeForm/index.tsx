import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, InputNumber, Modal, Row, Select } from 'antd';
import { Rule } from 'antd/lib/form';
import { RootState } from 'boot/rootState';
import DebounceInput from 'containers/debonceInput';
import useError from 'containers/hooks/useError';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { ITypesModel, TypesModel } from '../models';
import { addNewTypesAction, toggleFormTypesAction, updateTypesAction } from '../redux/actions';
import { createTypes, updateTypes } from '../services';
import { IProps, IState } from './propState';

export default function TypeForm(props: IProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    toggleForm: state.screen.manager.categories.types.toggleForm,
    editData: state.screen.manager.categories.types.data,
    dispatchToggleForm: (toggleForm: boolean, data: ITypesModel) => dispatch(toggleFormTypesAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: ITypesModel) => dispatch(addNewTypesAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: ITypesModel) => dispatch(updateTypesAction(isUpdate, data)),
  }));

  const currentFields = [
    { name: ['nameEN'], value: '' },
    { name: ['nameVI'], value: '' },
    { name: ['amount'], value: '' },
    { name: ['unit'], value: 'VNĐ' },
    { name: ['status'], value: 'ACTIVE' },
  ];

  const [state, setState] = useState<IState>({
    toggleForm: false,
    fields: currentFields,
    id: 0,
    loading: false,
  });

  useEffect(() => {
    let fields = currentFields;
    let id = 0;
    if (props.editData?.id && props.editData.id > 0) {
      id = props.editData.id;
      fields = [
        { name: ['nameEN'], value: props.editData.nameEN || '' },
        { name: ['nameVI'], value: props.editData.nameVI || '' },
        { name: ['amount'], value: props.editData.amount || '' },
        { name: ['unit'], value: props.editData.unit || 'VNĐ' },
        { name: ['status'], value: props.editData.status || 'ACTIVE' },
      ];
    }
    setState((state) => ({ ...state, toggleForm: props.toggleForm || false, id, fields }));
  }, [props.toggleForm]);

  const addNew = () => props.dispatchToggleForm && props.dispatchToggleForm(true, new TypesModel());

  const onCancel = () => {
    props.dispatchToggleForm && props.dispatchToggleForm(false, new TypesModel());
    setState((state) => ({ ...state, loading: false }));
  };

  const onFinish = (values: ITypesModel) => {
    values.nameEN = values.nameVI;
    setState((state) => ({ ...state, loading: true }));
    if (state.id === 0) {
      createTypes(values)
        .then((result) => {
          if (props.dispatchAddNew) props.dispatchAddNew(true, result.data);
          notification.success(t('common:notification.addSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.addError')));
    } else {
      values.id = state.id;
      updateTypes(values)
        .then((result) => {
          if (props.dispatchUpdate) props.dispatchUpdate(true, result.data);
          notification.success(t('common:notification.updateSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.updateError')));
    }
  };

  const validation: { [key: string]: Rule[] } = {
    nameVI: [{ required: true, message: t('manager:types.message.nameVI') }],
    nameEN: [{ required: true, message: t('manager:types.message.nameEN') }],
    fees: [
      {
        required: true,
        message: t('manager:types.message.fees'),
      },
      {
        validator: async (_rule, value) => {
          if (value) {
            const valid = value.toString().match(/^-?\d*(\.\d+)?$/);
            if (!valid) {
              throw new Error(t('manager:types.amount.notNumber'));
            }
          }
        },
      },
    ],
  };

  const onFieldsChange = (_: any, allFields: any) => setState((state) => ({ ...state, fields: allFields }));

  return (
    <>
      <Button size="small" type="primary" icon={<PlusOutlined />} onClick={addNew}>
        {t('common:action.add')}
      </Button>
      <Modal
        centered={true}
        bodyStyle={{ paddingBottom: 0 }}
        title={props.editData?.id ? t('manager:types.titleEdit') : t('manager:types.titleAdd')}
        visible={state.toggleForm}
        destroyOnClose={true}
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
              <Form.Item name="nameVI" label={t('manager:types.name')} rules={validation.nameVI}>
                <DebounceInput autoFocus={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="amount" label={t('manager:types.fees')} rules={validation.fees}>
                <InputNumber step={0.1} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="unit" label={t('manager:types.currency')}>
                <Select>
                  <Select.Option value="VNĐ">{t('common:vnd')}</Select.Option>
                  <Select.Option value="USD">{t('common:usd')}</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
