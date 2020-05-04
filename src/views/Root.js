import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import MainTemplate from 'templates/MainTemplate';
import FlashcardsPage from './FlashcardsPage';
import NotesPage from './NotesPage';
import TablePage from './TablePage';
import DetailsPage from './DetailsPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import MyAccountPage from './MyAccountPage';
import RecoverPasswordPage from './RecoverPasswordPage';

const Root = ({ loggedIn }) => {
  let routesWhenLoggedIn;

  if (loggedIn) {
    routesWhenLoggedIn = (
      <>
        <Switch>
          <Route exact path={routes.home} render={() => <Redirect to="/words" />} />
          <Route path={routes.flashcards} component={FlashcardsPage} />
          <Route path={routes.notes} component={NotesPage} />
          <Route path={routes.account} component={MyAccountPage} />
          <Route path={routes.note} component={DetailsPage} />
          <Route exact path={routes.words} component={TablePage} />
          <Route path={routes.word} component={DetailsPage} />
          <Redirect to={routes.home} />
        </Switch>
        <Route path={routes.note} component={DetailsPage} />
      </>
    );
  } else {
    routesWhenLoggedIn = (
      <Switch>
        <Route exact path={routes.home} render={() => <Redirect to="/login" />} />
        <Route path={routes.login} component={LoginPage} />
        <Route path={routes.register} component={RegisterPage} />
        <Route path={routes.reset} component={RecoverPasswordPage} />
        <Redirect to={routes.login} />
      </Switch>
    );
  }
  return <MainTemplate>{routesWhenLoggedIn}</MainTemplate>;
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid ? true : null,
});

export default connect(mapStateToProps)(Root);
