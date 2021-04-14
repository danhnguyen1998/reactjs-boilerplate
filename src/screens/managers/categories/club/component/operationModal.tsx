import { Button, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface OperationModalProps {
  visible: boolean;
  current: Partial<{}> | undefined;
  onSubmit: (values) => void;
  onCancel: () => void;
}

const OperationModal: FC<OperationModalProps> = (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        // createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const getModalContent = () => {
    return (
      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="nameVi" label={t('manager:club.nameVi')}>
          <Input />
        </Form.Item>
        <Form.Item name="nameEng" label={t('manager:club.nameEng')}>
          <Input />
        </Form.Item>
        <Form.Item name="addressVi" label={t('manager:club.addressVi')}>
          <Input />
        </Form.Item>
        <Form.Item name="addressEng" label={t('manager:club.addressEng')}>
          <Input />
        </Form.Item>
        <Form.Item name="contactPerson" label={t('manager:club.contactPerson')}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label={t('manager:club.phone')}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label={t('manager:club.email')}>
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={`${current ? t('manager:club.titleModalEdit') : t('manager:club.titleModalAdd')}`}
      visible={visible}
      destroyOnClose={true}
      closable={false}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {t('common:button.okButton')}
        </Button>,
        <Button key="back" type="primary" danger={true} onClick={onCancel}>
          {t('common:button.cancelButton')}
        </Button>,
      ]}
    >
      {getModalContent()}
    </Modal>
  );
};
export default OperationModal;
