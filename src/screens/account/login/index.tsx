import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Spin } from 'antd';
import { Rule } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import system from 'constant/system';
import DebounceInput from 'containers/debonceInput';
import useError from 'containers/hooks/useError';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import notification from 'utils/notification';
import { login } from './services';
import './style.less';

export default function LoginComponent(props) {
  const history = useHistory();
  const { t } = useTranslation();
  const [spin, setSpin] = useState(false);
  const { addError } = useError();

  const onFinish = async (values: Store) => {
    try {
      setSpin(true);
      const data = {
        username: values.username,
        password: values.password,
        grant_type: 'password',
        client_id: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3bef',
        client_secret: 'password',
        scope: 'offline_access',
      };
      const result = await login(data);
      if (result) {
        localStorage.setItem(system.TOKEN, `${result.token_type} ${result.access_token}`);
        history.push('/manager');
        notification.success(t('account:login.toast.success'));
      } else {
        notification.error(t('account:login.toast.error'));
        setSpin(false);
      }
    } catch (error) {
      addError(error, t('account:login.toast.error'));
      setSpin(false);
    }
  };

  const validation: { [key: string]: Rule[] } = {
    username: [{ required: true, message: t('account:login.message.username') }],
    password: [{ required: true, message: t('account:login.message.password') }],
  };

  return (
    <Spin spinning={spin} size="large" tip="Loading...">
      <Card>
        <div className="top">
          <div className="header">
            <Link to="/">
              <img alt="logo" className="logo" src={process.env.PUBLIC_URL + '/logo.png'} />
              <span className="title">{t('account:login.title')}</span>
            </Link>
          </div>
          <div className="desc">{t('account:login.subtitle')}</div>
        </div>
        <div className="main">
          <div className="login">
            <Form onFinish={onFinish}>
              <Form.Item name="username" rules={validation.username}>
                <DebounceInput
                  prefix={<UserOutlined style={{ color: '#1890ff' }} className="prefixIcon" />}
                  placeholder={t('account:login.userName')}
                  autoFocus={true}
                />
              </Form.Item>
              <Form.Item name="password" rules={validation.password}>
                <Input.Password
                  prefix={<LockTwoTone style={{ color: '#1890ff' }} className="prefixIcon" />}
                  placeholder={t('account:login.password')}
                />
              </Form.Item>
              <Button className="submit" type="primary" htmlType="submit">
                {t('account:login.signin')}
              </Button>
              <Button type="link" danger={true} style={{ float: 'right' }}>
                Quên mật khẩu?
              </Button>
            </Form>
          </div>
        </div>
      </Card>
    </Spin>
  );
}
