import { DownOutlined } from '@ant-design/icons';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { Button, Dropdown, Menu } from 'antd';
import system from 'constant/system';
import { i18n, TFunction } from 'i18next';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface IProps extends HeaderViewProps {
  t: TFunction;
  i18n: i18n;
  changeLang: (lang: string) => void;
}

const RightContent = (props: IProps) => {
  const history = useHistory();

  const gotoSignIn = () => history.push('/login');

  const gotoSignUp = () => history.push('/register');

  const handleMenuClick = (evt: any) => {
    props.i18n.changeLanguage(evt.key);
    localStorage.setItem(system.LANG, evt.key);
    props.changeLang(evt.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="vi">VI Tiếng Việt</Menu.Item>
      <Menu.Item key="en">EN English</Menu.Item>
    </Menu>
  );

  return (
    <div className="className">
      <Dropdown overlay={menu}>
        <Button type="link">
          {props.i18n.language.toUpperCase()} <DownOutlined />
        </Button>
      </Dropdown>{' '}
      <Button type="primary" danger={true} onClick={gotoSignUp}>
        {props.t('common:customer.menu.register')}
      </Button>{' '}
      <Button type="primary" onClick={gotoSignIn}>
        {props.t('common:customer.menu.signin')}
      </Button>
    </div>
  );
};

export default RightContent;
