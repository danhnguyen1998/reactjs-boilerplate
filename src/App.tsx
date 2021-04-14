import { Spin } from 'antd';
import { ConnectedRouter } from 'connected-react-router';
import system from 'constant/system';
import ErrorProvider from 'containers/hooks/errorProvider';
import CustomerLayoutRoute from 'containers/layout/CustomerLayoutRoute';
import ManagerLayoutRoute from 'containers/layout/ManagerLayoutRoute';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import './App.less';
import configureStore from './boot/configureStore';

const Login = lazy(() => import('./screens/account/login'));
const Register = lazy(() => import('./screens/account/register'));
const Home = lazy(() => import('./screens/customers/home'));
const NotFound = lazy(() => import('./containers/exception/404'));
/** trang chủ */
const ManagerHome = lazy(() => import('./screens/managers/home'));
/** quản lý tài khoản */
const ManagerType = lazy(() => import('./screens/managers/categories/types'));
/** quản lý độ tuổi */
const ManagerAge = lazy(() => import('./screens/managers/categories/age'));
/** quản lý loại điệu nhảy */
const ManagerDanceTypes = lazy(() => import('./screens/managers/categories/danceTypes'));
/** quản lý điệu nhảy */
const ManagerDance = lazy(() => import('./screens/managers/categories/dance'));
/** quản lý hạng thi đấu */
const ManagerLevel = lazy(() => import('./screens/managers/categories/level'));
/** quản lý nội dung thi đấu */
const ManagerCompetition = lazy(() => import('./screens/managers/competition'));
/** quản lý vận động viên */
const ManagerAthletes = lazy(() => import('./screens/managers/athletes'));
/** quản lý câu lạc bộ */
// const ManagerClub = lazy(() => import('./screens/managers/categories/club'));
/** quản lý tài khoản đơn vị  */
const ManagerAccounts = lazy(() => import('./screens/managers/categories/accounts'));
/** quản lý giải đấu */
const ManagerTournaments = lazy(() => import('./screens/managers/tournaments'));
/** thêm mới giải đấu */
const ManagerAddTournaments = lazy(() => import('./screens/managers/tournaments/tournamentCreated'));

const ManagerRoute = ({ match }) => {
  const token = localStorage.getItem(system.TOKEN);
  if (token)
    return (
      <Switch>
        <ManagerLayoutRoute path={match.url} exact={true} component={ManagerHome} />
        {/* <ManagerLayoutRoute path={`${match.url}/categories/club`} component={ManagerClub} /> */}
        <ManagerLayoutRoute path={`${match.url}/categories/accounts`} component={ManagerAccounts} />
        <ManagerLayoutRoute path={`${match.url}/categories/type`} component={ManagerType} />
        <ManagerLayoutRoute path={`${match.url}/categories/age`} component={ManagerAge} />
        <ManagerLayoutRoute path={`${match.url}/categories/dancetypes`} component={ManagerDanceTypes} />
        <ManagerLayoutRoute path={`${match.url}/categories/dance`} component={ManagerDance} />
        <ManagerLayoutRoute path={`${match.url}/categories/level`} component={ManagerLevel} />
        <Route path={`${match.url}/tournaments`}>
          <Switch>
            <ManagerLayoutRoute path={`${match.url}/tournaments`} exact={true} component={ManagerTournaments} />
            <ManagerLayoutRoute path={`${match.url}/tournaments/add`} component={ManagerAddTournaments} />
          </Switch>
        </Route>
        <ManagerLayoutRoute path={`${match.url}/competition`} component={ManagerCompetition} />
        <ManagerLayoutRoute path={`${match.url}/athletes`} component={ManagerAthletes} />
        <Route>
          <NotFound backHome={match.url} />
        </Route>
      </Switch>
    );
  else return <Redirect to="/login" />;
};

const store = configureStore.setup();
export default function App() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <ConnectedRouter history={configureStore.history}>
          <ErrorProvider>
            <Suspense fallback={<Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%' }} />}>
              <Switch>
                <Redirect from="/home" to="/" />
                <Redirect from="/manager/home" to="/manager" />
                <CustomerLayoutRoute exact={true} path="/" component={Home} />
                <CustomerLayoutRoute path="/login" component={Login} />
                <CustomerLayoutRoute path="/register" component={Register} />
                <Route path="/manager" component={ManagerRoute} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </ErrorProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}
