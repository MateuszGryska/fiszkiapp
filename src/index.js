import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import Root from 'views/Root';
import { rrfProps } from 'config/config';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from 'store';
import LoadingTemplate from 'templates/LoadingTemplate';
import * as serviceWorker from './serviceWorker';

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <LoadingTemplate>Loading...</LoadingTemplate>;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <React.StrictMode>
          <AuthIsLoaded>
            <Root />
          </AuthIsLoaded>
        </React.StrictMode>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
