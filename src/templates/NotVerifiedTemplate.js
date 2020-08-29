import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import { connect } from 'react-redux';
import Message from 'components/atoms/Message/Message';
import Title from 'components/atoms/Title/Title';
import {
  verifyEmail as verifyEmailAction,
  clean as cleanAction,
  signOut as signOutAction,
} from 'actions';

const StyledWrapper = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.main};
`;

const StyledModal = styled.article`
  width: 90vw;
  max-width: 700px;
  height: 500px;
  padding: 30px 20px;
  border: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledActionsButton = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled(Title)`
  padding: 0;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.l};
`;

const StyledParagraph = styled.p`
  margin-top: 30px;
  text-align: center;
`;

const StyledMessage = styled(Message)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NotVerifiedTemplate = ({ sendVerifyEmail, loading, error, signOut, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <StyledWrapper>
      <StyledModal>
        <StyledTitle>YOUR EMAIL IS NOT VERIFIED!</StyledTitle>
        <StyledParagraph>
          Check your email and verified your account. Log in again after verification. <br />
          <br /> You don&#39;t get any message? <br /> Check your spam folder or re-send email:
        </StyledParagraph>
        <StyledActionsButton>
          <Button onClick={() => sendVerifyEmail()} loading={loading ? 'SENDING...' : null}>
            RE-SEND VERIFY EMAIL
          </Button>
          {error ? <StyledMessage error>{error}</StyledMessage> : null}
          {error === false ? <StyledMessage>Verify email sent successfully!</StyledMessage> : null}
          <Button onClick={() => signOut()}>LOG OUT</Button>
        </StyledActionsButton>
      </StyledModal>
    </StyledWrapper>
  );
};

NotVerifiedTemplate.propTypes = {
  sendVerifyEmail: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  signOut: PropTypes.func.isRequired,
  cleanUp: PropTypes.func.isRequired,
};

NotVerifiedTemplate.defaultProps = {
  loading: false,
  error: null,
};

const mapStateToProps = ({ firebase, auth }) => ({
  profileData: firebase.profile,
  loading: auth.verifyEmail.loading,
  error: auth.verifyEmail.error,
});

const mapDispatchToProps = (dispatch) => ({
  sendVerifyEmail: () => dispatch(verifyEmailAction()),
  cleanUp: () => dispatch(cleanAction()),
  signOut: () => dispatch(signOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotVerifiedTemplate);
