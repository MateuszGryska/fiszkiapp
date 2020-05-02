import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { routes } from 'routes';
import { Provider } from 'react-redux';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import { rrfProps } from 'config/config';
import FlashcardsPage from './FlashcardsPage';
import NotesPage from './NotesPage';
import TablePage from './TablePage';
import DetailsPage from './DetailsPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const Root = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <MainTemplate>
          <>
            <Switch>
              <Route exact path={routes.home} render={() => <Redirect to="/flashcards" />} />
              <Route path={routes.flashcards} component={FlashcardsPage} />
              <Route path={routes.notes} component={NotesPage} />
              <Route path={routes.login} component={LoginPage} />
              <Route path={routes.register} component={RegisterPage} />
              <Route path={routes.note} component={DetailsPage} />
              <Route exact path={routes.words} component={TablePage} />
              <Route path={routes.word} component={DetailsPage} />
            </Switch>
            <Route path={routes.note} component={DetailsPage} />
          </>
        </MainTemplate>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default Root;
