import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Row, Select } from 'antd';
import { Rule } from 'antd/lib/form';
import { Option } from 'antd/lib/mentions';
import { RootState } from 'boot/rootState';
import DebounceInput from 'containers/debonceInput';
import useError from 'containers/hooks/useError';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import notification from 'utils/notification';
import { AccountModel, IAccountModel } from '../models';
import { addNewAccountAction, toggleFormAccountAction, updateAccountAction } from '../redux/actions';
import { createAccount, updateAccount } from '../services';
import { IProps, IState } from './propState';

export default function AccountForm(props: IProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addError } = useError();

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    toggleForm: state.screen.manager.categories.account.toggleForm,
    editData: state.screen.manager.categories.account.data,
    dispatchToggleForm: (toggleForm: boolean, data: IAccountModel) =>
      dispatch(toggleFormAccountAction(toggleForm, data)),
    dispatchAddNew: (isNew: boolean, data: IAccountModel) => dispatch(addNewAccountAction(isNew, data)),
    dispatchUpdate: (isUpdate: boolean, data: IAccountModel) => dispatch(updateAccountAction(isUpdate, data)),
  }));

  const currentFields = [
    // { name: ["name"], value: "" },
    { name: ['userName'], value: '' },
    { name: ['unitWork'], value: '' },
    { name: ['role'], value: '1' },
    { name: ['address'], value: '' },
    { name: ['references'], value: '' },
    { name: ['phoneNumber'], value: '' },
    { name: ['email'], value: '' },
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
        // { name: ["name"], value: props.editData.name || "" },
        { name: ['address'], value: props.editData.address || '' },
        { name: ['references'], value: props.editData.references || '' },
        { name: ['phoneNumber'], value: props.editData.phoneNumber || '' },
        { name: ['email'], value: props.editData.email || '' },
        { name: ['userName'], value: props.editData.userName || '' },
        { name: ['unitWork'], value: props.editData.unitWork || '' },
        { name: ['role'], value: props.editData.role?.toString() || '1' },
      ];
    }
    setState((state) => ({ ...state, toggleForm: props.toggleForm || false, id, fields }));
  }, [props.toggleForm]);

  const addNew = () => props.dispatchToggleForm && props.dispatchToggleForm(true, new AccountModel());

  const onCancel = () => {
    props.dispatchToggleForm && props.dispatchToggleForm(false, new AccountModel());
    setState((state) => ({ ...state, loading: false }));
  };

  const onFinish = (values: IAccountModel) => {
    setState((state) => ({ ...state, loading: true }));
    if (state.id === 0) {
      createAccount(values)
        .then((result) => {
          if (props.dispatchAddNew) props.dispatchAddNew(true, result.data);
          notification.success(t('common:notification.addSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.addError')));
    } else {
      values.id = state.id;
      updateAccount(values)
        .then((result) => {
          if (props.dispatchUpdate) props.dispatchUpdate(true, result.data);
          notification.success(t('common:notification.updateSucc'));
          onCancel();
        })
        .catch((error) => addError(error, t('common:notification.updateError')));
    }
  };

  const validation: { [key: string]: Rule[] } = {
    name: [{ required: true, message: t('manager:account.message.nameVI') }],
    address: [{ required: true, message: t('manager:account.message.addressVI') }],
    references: [{ required: true, message: t('manager:account.message.contactPerson') }],
    email: [{ required: true, type: 'email', message: t('manager:account.message.email') }],
    phoneNumber: [{ required: true, message: t('manager:account.message.phone') }],
    userName: [{ required: true, message: t('manager:account.message.userName') }],
    role: [{ required: true, message: t('manager:account.message.role') }],
    unitWork: [{ required: true, message: t('manager:account.message.unitWork') }],
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
        title={props.editData?.id ? t('manager:account.titleEdit') : t('manager:account.titleAdd')}
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
              <Form.Item name="userName" label={t('manager:account.userName')} rules={validation.userName}>
                <DebounceInput autoFocus={true} autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="unitWork" label={t('manager:account.unitWork')} rules={validation.unitWork}>
                <DebounceInput />
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item name="name" label={t("manager:account.name")} rules={validation.name}>
                <Input autoFocus={true} autoComplete="off" />
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item name="role" label={t('manager:account.role')} rules={validation.role}>
                <Select>
                  <Option value={'0'}>{t('manager:account.organizer')}</Option>
                  <Option value={'1'}>{t('manager:account.member')}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="address" label={t('manager:account.address')} rules={validation.address}>
                <DebounceInput autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="references" label={t('manager:account.contactPerson')} rules={validation.references}>
                <DebounceInput autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phoneNumber" label={t('manager:account.phone')} rules={validation.phoneNumber}>
                <DebounceInput autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label={t('manager:account.email')} rules={validation.email}>
                <DebounceInput autoComplete="off" />
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item name="status" label={t("manager:account.status")} rules={validation.status}>
                <Select>
                  <Option value={"ACTIVE"}>{t("common:active")}</Option>
                  <Option value={"BLOCK"}>{t("common:block")}</Option>
                </Select>
              </Form.Item>
            </Col> */}
          </Row>
        </Form>
      </Modal>
    </>
  );
}
