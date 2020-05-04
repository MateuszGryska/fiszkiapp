import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import { verifyEmail as verifyEmailAction, clean as cleanAction } from 'actions';
import Message from 'components/atoms/Message/Message';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledDetailsList = styled.ul`
  list-style: none;
  align-self: flex-start;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.l};
`;

const StyledDetail = styled.li`
  display: flex;
  justify-content: space-between;
`;

const StyledVerify = styled.p`
  color: ${({ yes }) => (yes ? 'green' : 'red')};
`;

const MyAccountTemplate = ({ profileData, loggedIn, sendVerifyEmail, loading, error, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>My account</Title>
        <StyledDetailsList>
          <StyledDetail>
            <p>First Name:</p>
            <p>{profileData.firstName}</p>
          </StyledDetail>
          <StyledDetail>
            <p>Last Name:</p>
            <p>{profileData.lastName}</p>
          </StyledDetail>
          <StyledDetail>
            <p>Email: </p>
            <p>{loggedIn.email}</p>
          </StyledDetail>
          <StyledDetail>
            <p>Email verified:</p>
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
        {!loggedIn.emailVerified ? (
          <>
            <Button onClick={() => sendVerifyEmail()} loading={loading ? 'SENDING...' : null}>
              RE-SEND VERIFY EMAIL
            </Button>
            {error ? <Message error>{error}</Message> : null}
            {error === false ? <Message>Verify email sent successfully!</Message> : null}
          </>
        ) : null}
      </StyledWrapper>
    </UserPageTemplate>
  );
};

const mapStateToProps = ({ firebase, auth }) => ({
  profileData: firebase.profile,
  loggedIn: firebase.auth,
  loading: auth.verifyEmail.loading,
  error: auth.verifyEmail.error,
});

const mapDispatchToProps = (dispatch) => ({
  sendVerifyEmail: () => dispatch(verifyEmailAction()),
  cleanUp: () => dispatch(cleanAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountTemplate);
