import React from 'react';
import { Translation } from 'react-i18next';
import { Route } from 'react-router-dom';
import CustomerLayout from './CustomerLayout';

const CustomerLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <Translation>
        {(t, { i18n }) => (
          <CustomerLayout {...matchProps}>
            <Component {...matchProps} t={t} i18n={i18n} />
          </CustomerLayout>
        )}
      </Translation>
    )}
  />
);

export default CustomerLayoutRoute;
