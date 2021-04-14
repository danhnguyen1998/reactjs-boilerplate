import { LockTwoTone, MailOutlined, PhoneOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Spin } from 'antd';
import { Rule, RuleObject } from 'antd/lib/form';
import { NamePath, Store, StoreValue } from 'antd/lib/form/interface';
import DebounceInput from 'containers/debonceInput';
import useError from 'containers/hooks/useError';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import notification from 'utils/notification';
import { register } from './services';
import './style.less';

export default function RegisterComponent() {
  const { t } = useTranslation();
  const history = useHistory();
  const [spin, setSpin] = useState(false);
  const { addError } = useError();

  const onFinish = async (values: Store) => {
    try {
      setSpin(true);
      const data = {
        email: values.email,
        password: values.password,
        phoneNumber: values.phone,
        unitWork: values.club,
        userName: values.username,
        fullName: values.fullname,
      };
      const result = await register(data);
      if (result) history.push('/login');
      notification.success(t('account:register.toast.success'));
      setSpin(false);
    } catch (error) {
      addError(error, t('account:register.toast.error'));
      setSpin(false);
    }
  };

  const comparePassword = (getFieldValue: (name: NamePath) => any) => (_rule: RuleObject, value: StoreValue) => {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(t('account:register.message.comparePassword'));
  };

  const validation: { [key: string]: Rule[] } = {
    fullname: [{ required: true, message: t('account:register.message.fullname') }],
    username: [{ required: true, message: t('account:register.message.username') }],
    password: [{ required: true, message: t('account:register.message.password') }],
    rePassword: [
      { required: true, message: t('account:register.message.rePassword') },
      ({ getFieldValue }) => ({ validator: comparePassword(getFieldValue) }),
    ],
    email: [{ required: true, type: 'email', message: t('account:register.message.email') }],
    phone: [{ required: true, message: t('account:register.message.phone') }],
    club: [{ required: true, message: t('account:register.message.club') }],
  };

  return (
    <Spin spinning={spin} size="large" tip="Loading...">
      <Card>
        <div className="top">
          <div className="header">
            <Link to="/">
              <img alt="logo" className="logo" src={process.env.PUBLIC_URL + '/logo.png'} />
              <span className="title">{t('account:register.title')}</span>
            </Link>
          </div>
          <div className="desc">{t('account:register.subtitle')}</div>
        </div>
        <div className="main">
          <div className="login">
            <Form onFinish={onFinish}>
              <Form.Item name="fullname" rules={validation.fullname}>
                <DebounceInput
                  prefix={<UserOutlined style={{ color: '#1890ff' }} className="prefixIcon" />}
                  placeholder={t('account:register.fullName')}
                />
              </Form.Item>
              <Form.Item name="username" rules={validation.username}>
                <DebounceInput
                  prefix={<UserOutlined style={{ color: '#1890ff' }} className="prefixIcon" />}
                  placeholder={t('account:register.userName')}
                />
              </Form.Item>
              <Form.Item name="password" rules={validation.password}>
                <Input.Password
                  prefix={<LockTwoTone style={{ color: '#1890ff' }} className="prefixIcon" />}
                  placeholder={t('account:register.password')}
                />
              </Form.Item>
              <Form.Item name="rePassword" dependencies={['password']} rules={validation.rePassword}>
                <Input.Password
                  prefix={<LockTwoTone style={{ color: '#1890ff' }} className="prefixIcon" />}
                  placeholder={t('account:register.rePassword')}
                />
              </Form.Item>
              <Form.Item name="email" rules={validation.email}>
                <DebounceInput
                  prefix={<MailOutlined style={{ color: '#1890ff' }} className="prefixIcon" />}
                  placeholder={t('account:register.email')}
                />
              </Form.Item>
              <Form.Item name="phone" rules={validation.phone}>
                <DebounceInput
                  prefix={<PhoneOutlined style={{ color: '#1890ff' }} className="prefixIcon" />}
                  placeholder={t('account:register.phone')}
                />
              </Form.Item>
              <Form.Item name="club" rules={validation.club}>
                <DebounceInput
                  prefix={<TrophyOutlined style={{ color: '#1890ff' }} className="prefixIcon" />}
                  placeholder={t('account:register.club')}
                />
              </Form.Item>
              <Button className="submit" type="primary" htmlType="submit">
                {t('account:register.signup')}
              </Button>
            </Form>
          </div>
        </div>
      </Card>
    </Spin>
  );
}
