import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Modal, Row } from 'antd';
import { Rule } from 'antd/lib/form';
import DebounceInput from 'containers/debonceInput';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IState } from './propState';

export default function CompetitionCreated(props: any) {
  const { t } = useTranslation();

  const currentFields = [
    { name: ['name'], value: '' },
    { name: ['code'], value: '' },
    { name: ['danceType'], value: '' },
    { name: ['dance'], value: '' },
    { name: ['rank'], value: '' },
    { name: ['age'], value: '' },
    { name: ['types'], value: '' },
  ];

  const [state, setState] = useState<IState>({
    toggleForm: false,
    fields: currentFields,
    id: 0,
  });

  useEffect(() => {
    let fields = currentFields;
    let id = 0;
    if (props.editData?.id && props.editData.id > 0) {
      id = props.editData.id;
      fields = [
        { name: ['name'], value: props.editData.nameEN || '' },
        { name: ['code'], value: props.editData.code || '' },
        { name: ['danceType'], value: props.editData.danceType || '' },
        { name: ['dance'], value: props.editData.dance || '' },
        { name: ['rank'], value: props.editData.rank || '' },
        { name: ['age'], value: props.editData.age || '' },
        { name: ['types'], value: props.editData.types || '' },
      ];
    }
    setState((state) => ({ ...state, toggleForm: props.toggleForm || false, id, fields }));
  }, [props.toggleForm]);

  const addNew = () => {
    setState((state) => ({ ...state, toggleForm: true }));
  };

  const onCancel = () => {
    setState((state) => ({ ...state, toggleForm: false }));
  };
  const onFieldsChange = () => {
    console.log('TODO');
  };

  const onFinish = () => {
    console.log('TODO');
  };

  const validation: { [key: string]: Rule[] } = {};
  return (
    <>
      <Button size="small" type="primary" icon={<PlusOutlined />} onClick={addNew}>
        {t('common:action.add')}
      </Button>
      <Modal
        centered={true}
        bodyStyle={{ paddingBottom: 0 }}
        title={props.editData?.id ? t('competition:titleEdit') : t('competition:titleAdd')}
        visible={state.toggleForm}
        destroyOnClose={true}
        closable={false}
        footer={[
          <Button form="formSubmit" key="submit" type="primary" htmlType="submit">
            {t('common:button.saveButton')}
          </Button>,
          <Button key="back" type="primary" danger={true} onClick={onCancel}>
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
              <Form.Item name="code" label={t('competition:code')} rules={validation.code}>
                <DebounceInput />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="nameVI" label={t('competition:name')} rules={validation.name}>
                <DebounceInput />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="rank" label={t('competition:rank')} rules={validation.rank}>
                <DebounceInput />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="age" label={t('competition:age')} rules={validation.age}>
                <DebounceInput />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="type" label={t('competition:type')} rules={validation.type}>
                <DebounceInput />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
