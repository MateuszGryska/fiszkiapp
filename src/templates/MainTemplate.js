import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageContext from 'context';
import GlobalStyle from 'theme/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme, darkTheme } from 'theme/mainTheme';

class MainTemplate extends Component {
  state = {
    pageType: 'notes',
  };

  componentDidMount() {
    this.setCurrentPage();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setCurrentPage(prevState);
  }

  setCurrentPage = (prevState = '') => {
    const pageTypes = [
      'notes',
      'words',
      'flashcards',
      'quiz',
      'login',
      'register',
      'account',
      'reset-password',
      'spelling',
    ];
    const {
      location: { pathname },
    } = this.props;

    const [currentPage] = pageTypes.filter((page) => pathname.includes(page));

    if (prevState.pageType !== currentPage) {
      this.setState({ pageType: currentPage });
    }
  };

  render() {
    const { children, isDarkMode } = this.props;
    const { pageType } = this.state;

    const currentTheme = isDarkMode ? darkTheme : theme;

    return (
      <div>
        <PageContext.Provider value={pageType}>
          <ThemeProvider theme={currentTheme}>
            <GlobalStyle />
            {children}
          </ThemeProvider>
        </PageContext.Provider>
      </div>
    );
  }
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  isDarkMode: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

MainTemplate.defaultProps = {
  isDarkMode: false,
};

const mapStateToProps = ({ firebase }) => ({
  isDarkMode: firebase.profile.isDarkMode,
});

export default withRouter(connect(mapStateToProps)(MainTemplate));
