import ProLayout, { MenuDataItem, PageHeaderWrapper } from '@ant-design/pro-layout';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';
import vi_VN from 'antd/es/locale/vi_VN';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routeManager } from 'routes';
import RightContent from './RightContent';

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

  const itemRender = (route: Route, _params: any, routes: Route[], paths: string[]) =>
    routes.indexOf(route) === 0 ? (
      <Link to={`/${paths[0]}`}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );

  return (
    <>
      <ProLayout
        title="DanceSport"
        contentWidth="Fixed"
        fixedHeader={true}
        logo={logo}
        route={routeManager(t)}
        menuItemRender={menuItemRender}
        rightContentRender={rightContentRender}
        itemRender={itemRender}
      >
        <ConfigProvider locale={state.locale}>
          <PageHeaderWrapper>{props.children}</PageHeaderWrapper>
        </ConfigProvider>
      </ProLayout>
    </>
  );
};

export default CustomerLayout;
