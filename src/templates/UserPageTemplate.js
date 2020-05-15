import React, { useState } from 'react';
import { connect } from 'react-redux';
import withContext from 'hoc/withContext';
import styled from 'styled-components';
import Navbar from 'components/atoms/Navbar/Navbar';
import PropTypes from 'prop-types';
import Menubar from 'components/organisms/Menubar/Menubar';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import addIcon from 'assets/icons/add-icon.svg';

const StyledWrapper = styled.div`
  padding-top: 70px;
  position: relative;
`;

const AddButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 100px;
  height: 100px;
  background-image: url(${addIcon});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 50% 50%;
  background-size: 100% 100%;
  border: none;
  cursor: pointer;
  outline: none;
  display: ${({ isButtonVisible }) => (isButtonVisible ? 'none' : 'block')};

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
  }
`;

const UserPageTemplate = ({ children, loggedIn, profileData, emailVerified, pageContext }) => {
  const [menubarVisible, setMenubarVisibility] = useState(false);
  const [newItemBarVisible, setNewItemBarVisibility] = useState(false);

  return (
    <StyledWrapper>
      {loggedIn.uid ? (
        <>
          <Navbar
            loggedIn={loggedIn}
            emailVerified={emailVerified}
            handleOpen={() => setMenubarVisibility(!menubarVisible)}
          />
          <Menubar
            loggedIn={loggedIn}
            profileData={profileData}
            isVisible={menubarVisible}
            handleClose={() => setMenubarVisibility(!menubarVisible)}
          />
          {children}
          <AddButton
            loggedIn={loggedIn}
            isButtonVisible={pageContext === 'account'}
            onClick={() => setNewItemBarVisibility(!newItemBarVisible)}
          />
          <NewItemBar
            loggedIn={loggedIn}
            isVisible={newItemBarVisible}
            handleClose={() => setNewItemBarVisibility(!newItemBarVisible)}
          />
        </>
      ) : (
        <h1>you must log in</h1>
      )}
    </StyledWrapper>
  );
};

UserPageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  loggedIn: PropTypes.shape({
    email: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  profileData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  emailVerified: PropTypes.bool.isRequired,
  pageContext: PropTypes.oneOf([
    'notes',
    'words',
    'flashcards',
    'login',
    'register',
    'account',
    'reset-password',
  ]),
};

UserPageTemplate.defaultProps = {
  profileData: {
    firstName: 'First Name',
    lastName: 'Last Name',
  },
  pageContext: 'login',
};

const mapStateToProps = ({ firebase }) => ({
  profileData: firebase.profile,
  loggedIn: firebase.auth,
  emailVerified: firebase.auth.emailVerified,
});

export default withContext(connect(mapStateToProps)(UserPageTemplate));
