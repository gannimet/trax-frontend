import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.scss';
import ProtectedRoute from './components/ProtectedRoute/protected-route';
import {
  fullPageLayoutRoutes,
  nakedLayoutRoutes,
  Routes,
} from './constants/routes';
import FullPageLayout from './layouts/FullPageLayout/full-page.layout';
import NakedLayout from './layouts/NakedLayout/naked.layout';
import LoginPage from './pages/Login/login.page';
import OverviewPage from './pages/Overview/overview.page';
import { rootReducer } from './state/root.reducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path={nakedLayoutRoutes}>
          <NakedLayout>
            <Switch>
              <Route exact path={Routes.Login} component={LoginPage} />
            </Switch>
          </NakedLayout>
        </Route>
        <Route path={fullPageLayoutRoutes}>
          <FullPageLayout>
            <Switch>
              <ProtectedRoute
                exact
                path={Routes.Overview}
                component={OverviewPage}
              />
            </Switch>
          </FullPageLayout>
        </Route>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
