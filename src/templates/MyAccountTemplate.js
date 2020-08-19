import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import Toggle from 'components/atoms/Toggle/Toggle';
import {
  verifyEmail as verifyEmailAction,
  clean as cleanAction,
  deleteUser as deleteAction,
  setDarkMode as setDarkModeAction,
} from 'actions';
import Message from 'components/atoms/Message/Message';
import EditProfileBar from 'components/organisms/EditProfileBar/EditProfileBar';
import WarningModal from 'components/molecules/WarningModal/WarningModal';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.section`
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.fontColor};
  @media (max-width: 480px) {
    padding: 50px 30px;
  }
`;
const StyledDetailsList = styled.ul`
  list-style: none;
  align-self: flex-start;
  padding: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
  font-size: ${({ theme }) => theme.fontSize.m};

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const StyledDetail = styled.li`
  display: flex;
  justify-content: space-between;
  @media (max-width: 480px) {
    flex-direction: column;
    padding-top: 20px;
  }
`;

const StyledInfoItem = styled.p`
  @media (max-width: 480px) {
    margin: 0;
    padding: 0;
  }
`;

const StyledVerify = styled.p`
  color: ${({ yes }) => (yes ? 'green' : 'red')};

  @media (max-width: 480px) {
    margin: 0;
    padding: 0;
  }
`;

const StyledSeperator = styled.div`
  width: 100%;
  height: 10px;
  opacity: 0.5;
  border-top: 1px solid grey;
`;
const MyAccountTemplate = ({
  profileData,
  loggedIn,
  sendVerifyEmail,
  loading,
  words,
  notes,
  error,
  setDarkMode,
  cleanUp,
  deleteError,
  deleteUser,
}) => {
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);
  const [isDeleteWarningVisible, setDeleteWarningVisible] = useState(false);
  const [isDarkMode, setLocalDarkMode] = useState(false);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  useEffect(() => {
    if (profileData.isDarkMode === true) {
      setLocalDarkMode(true);
    }
  }, [profileData]);

  const handleClick = () => {
    setDarkMode(!isDarkMode);
    setLocalDarkMode(!isDarkMode);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>My account</Title>
        <StyledDetailsList>
          <StyledDetail>
            <StyledInfoItem>Points: </StyledInfoItem>
            <StyledInfoItem>{profileData.points || 0}</StyledInfoItem>
          </StyledDetail>
          <StyledDetail>
            <StyledInfoItem>Words: </StyledInfoItem>
            <StyledInfoItem>{words.length}</StyledInfoItem>
          </StyledDetail>
          <StyledDetail>
            <StyledInfoItem>Notes: </StyledInfoItem>
            <StyledInfoItem>{notes.length}</StyledInfoItem>
          </StyledDetail>
          <StyledSeperator />
          <StyledDetail>
            <StyledInfoItem>Dark mode: </StyledInfoItem>
            <StyledInfoItem>
              <Toggle isChecked={isDarkMode} setCheckbox={() => handleClick()} />
            </StyledInfoItem>
          </StyledDetail>
          <StyledDetail>
            <StyledInfoItem>First Name:</StyledInfoItem>
            <StyledInfoItem>{profileData.firstName}</StyledInfoItem>
          </StyledDetail>
          <StyledDetail>
            <StyledInfoItem>Last Name:</StyledInfoItem>
            <StyledInfoItem>{profileData.lastName}</StyledInfoItem>
          </StyledDetail>
          <StyledDetail>
            <StyledInfoItem>Email: </StyledInfoItem>
            <StyledInfoItem>{loggedIn.email}</StyledInfoItem>
          </StyledDetail>
          <StyledDetail>
            <StyledInfoItem>Email verified:</StyledInfoItem>
            {loggedIn.emailVerified ? (
              <StyledVerify yes>
                YES
                <span role="img" aria-label="smile">
                  😊
                </span>
              </StyledVerify>
            ) : (
              <StyledVerify>
                NO
                <span role="img" aria-label="angry">
                  😠
                </span>
              </StyledVerify>
            )}
          </StyledDetail>
        </StyledDetailsList>
        {!profileData.socialLogIn ? (
          <Button onClick={() => setEditProfileVisible(true)}>EDIT PROFILE</Button>
        ) : null}
        <Button deleteButton onClick={() => setDeleteWarningVisible(true)}>
          DELETE ACCOUNT
        </Button>
        {!loggedIn.emailVerified ? (
          <>
            <Button onClick={() => sendVerifyEmail()} loading={loading ? 'SENDING...' : null}>
              RE-SEND VERIFY EMAIL
            </Button>
            {error ? <Message error>{error}</Message> : null}
            {error === false ? <Message>Verify email sent successfully!</Message> : null}
          </>
        ) : null}

        <EditProfileBar
          isVisible={isEditProfileVisible}
          handleClose={() => setEditProfileVisible()}
        />

        <WarningModal
          isVisible={isDeleteWarningVisible}
          handleClose={() => setDeleteWarningVisible()}
          error={deleteError}
          deleteAction={deleteUser}
          cleanUp={cleanUp}
        />
      </StyledWrapper>
    </UserPageTemplate>
  );
};

MyAccountTemplate.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object),
  notes: PropTypes.arrayOf(PropTypes.object),
  profileData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    points: PropTypes.number,
    socialLogIn: PropTypes.bool,
    isDarkMode: PropTypes.bool,
  }),
  loggedIn: PropTypes.shape({
    email: PropTypes.string.isRequired,
    emailVerified: PropTypes.bool.isRequired,
  }).isRequired,
  sendVerifyEmail: PropTypes.func.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cleanUp: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteError: PropTypes.string,
  error: PropTypes.string,
};

MyAccountTemplate.defaultProps = {
  words: [],
  notes: [],
  deleteError: null,
  error: null,
  profileData: {
    firstName: 'FirstName',
    lastName: 'LastName',
    points: 0,
    socialLogIn: false,
    isDarkMode: false,
  },
};
const mapStateToProps = ({ firebase, auth }) => ({
  profileData: firebase.profile,
  loggedIn: firebase.auth,
  loading: auth.verifyEmail.loading,
  error: auth.verifyEmail.error,
  deleteError: auth.deleteUser.error,
});

const mapDispatchToProps = (dispatch) => ({
  sendVerifyEmail: () => dispatch(verifyEmailAction()),
  cleanUp: () => dispatch(cleanAction()),
  deleteUser: () => dispatch(deleteAction()),
  setDarkMode: (isDarkMode) => dispatch(setDarkModeAction(isDarkMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountTemplate);
