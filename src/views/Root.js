import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from 'routes';
import { Provider } from 'react-redux';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import FlashcardsPage from './FlashcardsPage';
import NotesPage from './NotesPage';
import TablePage from './TablePage';

const Root = () => (
  <Provider store={store}>
    <MainTemplate>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.home} component={FlashcardsPage} />
          <Route path={routes.notes} component={NotesPage} />
          <Route path={routes.table} component={TablePage} />
        </Switch>
      </BrowserRouter>
    </MainTemplate>
  </Provider>
);

export default Root;
