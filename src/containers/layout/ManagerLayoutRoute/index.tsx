import React from 'react';
import { Translation } from 'react-i18next';
import { Route } from 'react-router-dom';
import ManagerLayout from './ManagerLayout';

const ManagerLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <Translation>
        {(t, { i18n }) => (
          <ManagerLayout {...matchProps}>
            <Component {...matchProps} t={t} i18n={i18n} />
          </ManagerLayout>
        )}
      </Translation>
    )}
  />
);

export default ManagerLayoutRoute;
