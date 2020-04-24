import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from 'routes';
// import styled from 'styled-components';
import MainTemplate from 'templates/MainTemplate';
import FlashcardsPage from './FlashcardsPage';
import NotesPage from './NotesPage';
import TablePage from './TablePage';

const Root = () => (
  <MainTemplate>
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.home} component={FlashcardsPage} />
        <Route path={routes.notes} component={NotesPage} />
        <Route path={routes.table} component={TablePage} />
      </Switch>
    </BrowserRouter>
  </MainTemplate>
);

export default Root;
