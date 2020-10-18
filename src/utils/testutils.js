import React from 'react';
import { render } from '@testing-library/react';
import '../i18n';
import { ThemeProvider } from 'styled-components';
import { rrfProps } from 'config/config';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import PageContext from 'context';
import store from 'store';
import LoadingTemplate from 'templates/LoadingTemplate';
import { theme } from 'theme/mainTheme';

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <LoadingTemplate>Loading...</LoadingTemplate>;
  return children;
}
const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <PageContext.Provider value="words">
        <ReactReduxFirebaseProvider {...rrfProps}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <React.StrictMode>
                <AuthIsLoaded>{children}</AuthIsLoaded>
              </React.StrictMode>
            </BrowserRouter>
          </ThemeProvider>
        </ReactReduxFirebaseProvider>
      </PageContext.Provider>
    </Provider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
