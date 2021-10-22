import React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.scss';
import ProtectedRoute from './components/ProtectedRoute/protected-route';
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
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <ProtectedRoute exact path="/overview">
            <OverviewPage />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
