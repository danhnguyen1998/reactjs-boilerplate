import ProLayout, { GridContent, MenuDataItem } from '@ant-design/pro-layout';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { BackTop, ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';
import vi_VN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routeCustomer } from 'routes';
import RightContent from './RightContent';
import './style.less';

const CustomerLayout = (props: any) => {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState({
    locale: vi_VN,
  });

  const changeLang = (lang: string) => {
    let locale = vi_VN;
    moment.locale('vi');
    if (lang === 'en') {
      locale = en_US;
      moment.locale('en');
    }
    setState((state) => ({ ...state, locale }));
  };
  const logo = () => <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="" />;

  const menuItemRender = (menuItemProps: MenuDataItem, defaultDom: React.ReactNode) => (
    <Link to={menuItemProps.path || ''}>{defaultDom}</Link>
  );

  const rightContentRender = (headerProps: HeaderViewProps) => (
    <RightContent {...headerProps} t={t} i18n={i18n} changeLang={changeLang} />
  );

  return (
    <>
      <ProLayout
        title="DanceSport"
        layout="top"
        contentWidth="Fixed"
        navTheme="light"
        fixedHeader={true}
        logo={logo}
        route={routeCustomer(t)}
        menuItemRender={menuItemRender}
        rightContentRender={rightContentRender}
      >
        <ConfigProvider locale={state.locale}>
          <GridContent>
            {props.children}
            <BackTop />
          </GridContent>
        </ConfigProvider>
      </ProLayout>
    </>
  );
};

export default CustomerLayout;
