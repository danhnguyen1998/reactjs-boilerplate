import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, InputNumber, Modal, Row, Switch } from 'antd';
import { Rule, RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import { RootState } from 'boot/rootState';
import DebounceInput from 'containers/debonceInput';
import useError from 'containers/hooks/useError';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { AgeModel, IAgeModel } from '../models';
import { addNewAgeAction, toggleFormAgeAction, updateAgeAction } from '../redux/actions';
import { createAge, updateAge } from '../services';
import { IProps, IState } from './propState';

export default function AgeForm(props: IProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    toggleForm: state.screen.manager.categories.age.toggleForm,
    editData: state.screen.manager.categories.age.data,
    dispatchToggleForm: (toggleForm: boolean, data: IAgeModel) => dispatch(toggleFormAgeAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: IAgeModel) => dispatch(addNewAgeAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: IAgeModel) => dispatch(updateAgeAction(isUpdate, data)),
  }));

  const currentFields = [
    { name: ['nameVI'], value: '' },
    { name: ['nameEN'], value: '' },
    { name: ['fromAgeOne'], value: '' },
    { name: ['toAgeOne'], value: '' },
    { name: ['fromAgeSecond'], value: '' },
    { name: ['toAgeSecond'], value: '' },
    { name: ['status'], value: 'ACTIVE' },
    { name: ['isTotalAge'], value: 0 },
    { name: ['totalAge'], value: '' },
    //
  ];

  useEffect(() => {
    let fields = currentFields;
    let id = 0;
    let isTotalAge = false;
    let isAddAgeSecond = false;
    if (props.editData?.id && props.editData.id > 0) {
      id = props.editData.id;
      isTotalAge = props.editData.isTotalAge ? true : false;
      isAddAgeSecond = props.editData.fromAgeSecond ? true : false;
      fields = [
        { name: ['nameVI'], value: props.editData.nameVI || '' },
        { name: ['nameEN'], value: props.editData.nameEN || '' },
        { name: ['fromAgeOne'], value: props.editData.fromAgeOne || '' },
        { name: ['toAgeOne'], value: props.editData.toAgeOne || '' },
        { name: ['fromAgeSecond'], value: props.editData.fromAgeSecond || '' },
        { name: ['toAgeSecond'], value: props.editData.toAgeSecond || '' },
        { name: ['status'], value: 'ACTIVE' },
        { name: ['isTotalAge'], value: props.editData.isTotalAge || 0 },
        { name: ['totalAge'], value: props.editData.totalAge || '' },
      ];
    }
    setState((state) => ({ ...state, toggleForm: props.toggleForm || false, id, fields, isTotalAge, isAddAgeSecond }));
  }, [props.toggleForm]);

  const [state, setState] = useState<IState>({
    visible: false,
    fields: currentFields,
    id: 0,
    loading: false,
    isTotalAge: false,
    isAddAgeSecond: false,
  });

  const addNew = () => {
    if (props.dispatchToggleForm) props.dispatchToggleForm(true, new AgeModel());
  };

  const handleCancel = () => {
    if (props.dispatchToggleForm) props.dispatchToggleForm(false, new AgeModel());
    setState((state) => ({ ...state, loading: false, isTotalAge: false, isAddAgeSecond: false }));
  };

  const onFieldsChange = (_: any, allFields: any) => setState((state) => ({ ...state, fields: allFields }));

  const onFinish = (value: AgeModel) => {
    value.isTotalAge = state.isTotalAge ? 1 : 0;
    setState((state) => ({ ...state, loading: true }));
    if (state.id === 0) {
      createAge(value)
        .then((result) => {
          if (props.dispatchAddNew) props.dispatchAddNew(true, result.data);
          notification.success(t('common:notification.addSucc'));
          handleCancel();
        })
        .catch((error) => {
          addError(error, t('common:notification.addError'));
          handleCancel();
        });
    } else {
      value.id = state.id;
      updateAge(value)
        .then((result) => {
          if (props.dispatchUpdate) props.dispatchUpdate(true, result.data);
          notification.success(t('common:notification.updateSucc'));
          handleCancel();
        })
        .catch((error) => {
          addError(error, t('common:notification.updateError'));
          handleCancel();
        });
    }
  };

  const changeTotalAge = (isTotalAge: boolean) => {
    setState((state) => ({ ...state, isTotalAge }));
  };

  const validation: { [key: string]: Rule[] } = {
    nameVI: [{ required: true, message: t('age:form.message.nameVI') }],
    nameEN: [{ required: true, message: t('age:form.message.nameEN') }],
    totalAge: [
      {
        validator: async (_rule, value) => {
          if (!state.isTotalAge) return Promise.resolve();
          if (!value) return Promise.reject(t('age:form.message.totalAge'));
        },
      },
    ],
    fromAgeOne: [
      ({ getFieldValue }) => ({
        required: true,
        validator: (_rule: RuleObject, value: StoreValue) => {
          if (!value) return Promise.reject(t('age:form.message.singleStartAge'));
          if (value && getFieldValue('toAgeOne') && parseInt(getFieldValue('toAgeOne')) < parseInt(value))
            return Promise.reject(t('age:form.message.startLargeEnd'));
          return Promise.resolve();
        },
      }),
    ],
    toAgeOne: [
      ({ getFieldValue }) => ({
        required: true,
        validator: async (_rule, value) => {
          if (state.isTotalAge) {
            if (value && getFieldValue('fromAgeOne') && parseInt(getFieldValue('fromAgeOne')) > parseInt(value))
              return Promise.reject(t('age:form.message.startLessEnd'));
            return Promise.resolve();
          }
          if (!value) return Promise.reject(t('age:form.message.singleEndAge'));
          if (value && getFieldValue('fromAgeOne') && parseInt(getFieldValue('fromAgeOne')) > parseInt(value))
            return Promise.reject(t('age:form.message.startLessEnd'));
          return Promise.resolve();
        },
      }),
    ],
    toAgeSecond: [
      ({ getFieldValue }) => ({
        validator: async (_rule, value) => {
          if (state.isTotalAge) return Promise.resolve();
          if (value && getFieldValue('fromAgeSecond') && parseInt(getFieldValue('fromAgeSecond')) > parseInt(value))
            return Promise.reject(t('age:form.message.startLessEnd'));
          return Promise.resolve();
        },
      }),
    ],
  };

  const changeAddMore = () => setState((state) => ({ ...state, isAddAgeSecond: !state.isAddAgeSecond }));

  const renderAddMoreAge = () => {
    if (state.isTotalAge) return null;
    return (
      <>
        {!state.isAddAgeSecond || (
          <Row gutter={8}>
            <Col span={6} />
            <Col span={6} />
            <Col span={5} />
            <Col span={3}>
              <Form.Item name="fromAgeSecond">
                <InputNumber min={1} max={100} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="toAgeSecond" rules={validation.toAgeSecond}>
                <InputNumber min={1} max={100} />
              </Form.Item>
            </Col>
            <Col span={1} />
          </Row>
        )}
      </>
    );
  };

  return (
    <>
      <Button size="small" type="primary" icon={<PlusOutlined />} onClick={addNew}>
        {t('age:form.addNewBtn')}
      </Button>
      <Modal
        centered={true}
        closable={false}
        title={props.editData?.id ? t('age:form.titleUpdate') : t('age:form.titleAddNew')}
        visible={props.toggleForm}
        width={'50%'}
        footer={[
          <Button
            size="small"
            key="submit"
            type="primary"
            form="formAgeSubmit"
            htmlType="submit"
            loading={state.loading}
          >
            {t('common:button.saveButton')}
          </Button>,
          <Button size="small" key="back" type="primary" danger={true} onClick={handleCancel} loading={state.loading}>
            {t('common:button.cancelButton')}
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          id="formAgeSubmit"
          fields={state.fields}
          onFieldsChange={onFieldsChange}
          onFinish={onFinish}
          size="small"
        >
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item name="nameVI" label={t('age:table.title.nameVI')} rules={validation.nameVI}>
                <DebounceInput autoFocus={true} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="nameEN" label={t('age:table.title.nameEN')} rules={validation.nameEN}>
                <DebounceInput />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="totalAge"
                label={
                  <Switch
                    checked={state.isTotalAge}
                    onChange={changeTotalAge}
                    checkedChildren={t('age:table.title.totalAge')}
                    unCheckedChildren={t('age:table.title.totalAge')}
                  />
                }
                rules={validation.totalAge}
              >
                <InputNumber min={1} disabled={!state.isTotalAge} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="fromAgeOne" label={t('age:table.title.singleStartAge')} rules={validation.fromAgeOne}>
                <InputNumber min={1} max={100} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="toAgeOne" label={t('age:table.title.singleEndAge')} rules={validation.toAgeOne}>
                <InputNumber min={1} max={100} />
              </Form.Item>
            </Col>
            <Col span={1}>
              <Form.Item className="mb0" label=" " labelCol={{ style: { padding: 2 } }}>
                <Button type="text">
                  {!state.isAddAgeSecond ? (
                    <PlusCircleOutlined onClick={changeAddMore} size={25} />
                  ) : (
                    <MinusCircleOutlined onClick={changeAddMore} />
                  )}
                </Button>
              </Form.Item>
            </Col>
          </Row>

          {renderAddMoreAge()}
        </Form>
      </Modal>
    </>
  );
}
