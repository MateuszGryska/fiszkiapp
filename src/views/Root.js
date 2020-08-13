import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import LoadingTemplate from 'templates/LoadingTemplate';
import MainTemplate from 'templates/MainTemplate';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import RecoverPasswordPage from './RecoverPasswordPage';
import NotVerifiedPage from './NotVerifiedPage';

const FlashcardsPage = React.lazy(() => import('./FlashcardsPage'));
const QuizPage = React.lazy(() => import('./QuizPage'));
const SpellingPage = React.lazy(() => import('./SpellingPage'));
const NotesPage = React.lazy(() => import('./NotesPage'));
const TablePage = React.lazy(() => import('./TablePage'));
const DetailsPage = React.lazy(() => import('./DetailsPage'));
const MyAccountPage = React.lazy(() => import('./MyAccountPage'));

const Root = ({ loggedIn, emailVerified }) => {
  let routesWhenLoggedIn;

  if (loggedIn && !emailVerified) {
    routesWhenLoggedIn = (
      <Switch>
        <Route exact path={routes.home} render={() => <Redirect to="/notverified" />} />
        <Route path={routes.notverified} component={NotVerifiedPage} />
        <Redirect to={routes.home} />
      </Switch>
    );
  } else if (loggedIn && emailVerified) {
    routesWhenLoggedIn = (
      <Suspense fallback={<LoadingTemplate>Loading...</LoadingTemplate>}>
        <Switch>
          <Route exact path={routes.home} render={() => <Redirect to="/flashcards" />} />
          <Route path={routes.flashcards} component={FlashcardsPage} />
          <Route path={routes.quiz} component={QuizPage} />
          <Route path={routes.spelling} component={SpellingPage} />
          <Route path={routes.notes} component={NotesPage} />
          <Route path={routes.account} component={MyAccountPage} />
          <Route path={routes.notverified} component={NotVerifiedPage} />
          <Route path={routes.note} component={DetailsPage} />
          <Route path={routes.words} component={TablePage} />
          <Route path={routes.word} component={DetailsPage} />
          <Redirect to={routes.home} />
        </Switch>
        <Route path={routes.note} component={DetailsPage} />
      </Suspense>
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

Root.propTypes = {
  loggedIn: PropTypes.bool,
  emailVerified: PropTypes.bool,
};

Root.defaultProps = {
  loggedIn: null,
  emailVerified: null,
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid ? true : null,
  emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(Root);
