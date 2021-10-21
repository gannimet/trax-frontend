import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.css';
import { rootReducer } from './state/root.reducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">Hello world</div>
    </Provider>
  );
};

export default App;
