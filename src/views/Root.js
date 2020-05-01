import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { Provider } from 'react-redux';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import FlashcardsPage from './FlashcardsPage';
import NotesPage from './NotesPage';
import TablePage from './TablePage';
import DetailsPage from './DetailsPage';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} render={() => <Redirect to="/flashcards" />} />
          <Route path={routes.flashcards} component={FlashcardsPage} />
          <Route path={routes.notes} component={NotesPage} />
          <Route path={routes.note} component={DetailsPage} />
          <Route exact path={routes.words} component={TablePage} />
          <Route path={routes.word} component={DetailsPage} />
        </Switch>
        <Route path={routes.note} component={DetailsPage} />
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
