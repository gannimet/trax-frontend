import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.scss';
import ProtectedRoute from './components/ProtectedRoute/protected-route';
import Routes from './constants/routes';
import { StorageItem } from './constants/storage';
import FullPageLayout from './layouts/FullPageLayout/full-page.layout';
import NakedLayout from './layouts/NakedLayout/naked.layout';
import LoginPage from './pages/Login/login.page';
import OverviewPage from './pages/Overview/overview.page';
import TeamPage from './pages/Team/team.page';
import TicketPage from './pages/Ticket/ticket.page';
import { AuthActions, LoginSuccessAction } from './state/actions/auth.actions';
import { rootReducer } from './state/root.reducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const storedAccessToken = localStorage.getItem(StorageItem.AccessToken);
const storedTokenContents = localStorage.getItem(StorageItem.TokenContents);

if (storedAccessToken) {
  store.dispatch({
    type: AuthActions.LOGIN_SUCCESS,
    authenticationInfo: {
      loginResponse: { accessToken: storedAccessToken },
      tokenContents: JSON.parse(storedTokenContents ?? 'null'),
    },
  } as LoginSuccessAction);
}

const noAuthRoutePaths = Object.keys(Routes)
  .filter((routeName) => !Routes[routeName].requiresAuthentication)
  .map((routeName) => Routes[routeName].path);

const authRoutePaths = Object.keys(Routes)
  .filter((routeName) => Routes[routeName].requiresAuthentication)
  .map((routeName) => Routes[routeName].path);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path={noAuthRoutePaths}>
          <NakedLayout>
            <Switch>
              <Route exact path={Routes.Login.path} component={LoginPage} />
            </Switch>
          </NakedLayout>
        </Route>
        <Route path={authRoutePaths}>
          <FullPageLayout>
            <Switch>
              <ProtectedRoute
                exact
                path={Routes.Overview.path}
                component={OverviewPage}
              />
              <ProtectedRoute
                exact
                path={Routes.Team.path}
                component={TeamPage}
              />
              <ProtectedRoute
                exact
                path={Routes.Ticket.path}
                component={TicketPage}
              />
            </Switch>
          </FullPageLayout>
        </Route>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
