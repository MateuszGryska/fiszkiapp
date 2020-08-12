import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import {
  verifyEmail as verifyEmailAction,
  clean as cleanAction,
  deleteUser as deleteAction,
} from 'actions';
import Message from 'components/atoms/Message/Message';
import EditProfileBar from 'components/organisms/EditProfileBar/EditProfileBar';
import WarningModal from 'components/molecules/WarningModal/WarningModal';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

const MyAccountTemplate = ({
  profileData,
  loggedIn,
  sendVerifyEmail,
  loading,
  error,
  cleanUp,
  deleteError,
  deleteUser,
}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const [isEditProfileVisible, setEditProfileVisible] = useState(false);
  const [isDeleteWarningVisible, setDeleteWarningVisible] = useState(false);

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>My account</Title>
        <StyledDetailsList>
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
  profileData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  loggedIn: PropTypes.shape({
    email: PropTypes.string.isRequired,
    emailVerified: PropTypes.bool.isRequired,
  }).isRequired,
  sendVerifyEmail: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cleanUp: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteError: PropTypes.string,
  error: PropTypes.string,
};

MyAccountTemplate.defaultProps = {
  deleteError: null,
  error: null,
  profileData: {
    firstName: 'FirstName',
    lastName: 'LastName',
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountTemplate);
