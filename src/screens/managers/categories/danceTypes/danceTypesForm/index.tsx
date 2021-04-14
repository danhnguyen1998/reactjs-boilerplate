import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Row } from 'antd';
import { Rule } from 'antd/lib/form';
import { RootState } from 'boot/rootState';
import DebounceInput from 'containers/debonceInput';
import useError from 'containers/hooks/useError';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { DanceTypeModel, IDanceTypeModel } from '../models';
import { addNewAction, toggleFormAction, updateAction } from '../redux/actions';
import { createKindDance, updateKindDance } from '../services';
import { IProps, IState } from './propState';

export default function DanceTypesForm(props: IProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    toggleForm: state.screen.manager.categories.danceType.toggleForm,
    editData: state.screen.manager.categories.danceType.data,
    dispatchToggleForm: (toggleForm: boolean, data: IDanceTypeModel) => dispatch(toggleFormAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: IDanceTypeModel) => dispatch(addNewAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: IDanceTypeModel) => dispatch(updateAction(isUpdate, data)),
  }));

  const currentFields = [
    { name: ['code'], value: '' },
    { name: ['descriptionEN'], value: '' },
    { name: ['descriptionVI'], value: '' },
    { name: ['nameEN'], value: '' },
    { name: ['nameVI'], value: '' },
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
        { name: ['code'], value: props.editData.code || '' },
        { name: ['descriptionEN'], value: props.editData.descriptionEN || '' },
        { name: ['descriptionVI'], value: props.editData.descriptionVI || '' },
        { name: ['nameEN'], value: props.editData.nameEN || '' },
        { name: ['nameVI'], value: props.editData.nameVI || '' },
        { name: ['status'], value: props.editData.status || 'ACTIVE' },
      ];
    }
    setState((state) => ({ ...state, toggleForm: props.toggleForm || false, id, fields }));
  }, [props.toggleForm]);

  const addNew = () => props.dispatchToggleForm && props.dispatchToggleForm(true, new DanceTypeModel());

  const onCancel = () => {
    props.dispatchToggleForm && props.dispatchToggleForm(false, new DanceTypeModel());
    setState((state) => ({ ...state, loading: false }));
  };

  const onFinish = (values: IDanceTypeModel) => {
    if (!values.code) values.code = moment().unix().toString();
    values.nameEN = values.nameVI;
    setState((state) => ({ ...state, loading: true }));
    if (state.id === 0) {
      createKindDance(values)
        .then((result) => {
          if (props.dispatchAddNew) {
            props.dispatchAddNew(true, result.data);
          }
          notification.success(t('common:notification.addSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.addError')));
    } else {
      values.id = state.id;
      updateKindDance(values)
        .then((result) => {
          if (props.dispatchUpdate) props.dispatchUpdate(true, result.data);
          notification.success(t('common:notification.updateSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.updateError')));
    }
  };

  const validation: { [key: string]: Rule[] } = {
    name: [{ required: true, message: t('manager:danceTypes.message.name') }],
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
        title={props.editData?.id ? t('manager:danceTypes.titleEdit') : t('manager:danceTypes.titleAdd')}
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
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="nameVI" label={t('manager:danceTypes.name')} rules={validation.name}>
                <DebounceInput autoFocus={true} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
