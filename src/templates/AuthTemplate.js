import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import Message from 'components/atoms/Message/Message';
import { Formik, Form } from 'formik';
import Input from 'components/atoms/Input/Input';
import background from 'assets/img/bg.png';
import logoIcon from 'assets/icons/logo.svg';
import {
  signUp as signUpAction,
  signIn as signInAction,
  recoveryPassword as recoveryPasswordAction,
  clean as cleanAction,
} from 'actions';

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${background});
  background-color: transparent;
  background-position: 50% 20%;
  background-repeat: no-repeat;
`;

const StyledLogo = styled.div`
  width: 400px;
  height: 80px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 50% 50%;
  background-size: 100% 70%;
`;

const StyledLoginSection = styled.div`
  width: 500px;
  height: 500px;
  margin-top: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
`;

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.fontGrey};
  margin-top: 50px;
`;

const StyledForm = styled(Form)`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.black};
  margin: 0px 30px 10px 30px;
`;

const AuthTemplate = ({
  loginPage,
  registerPage,
  recoverPage,
  signUp,
  signIn,
  sendRecoveryMail,
  cleanUp,
  loading,
  error,
  recoverLoading,
  recoverError,
}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <StyledWrapper>
      <StyledLogo />
      <StyledLoginSection>
        <StyledTitle>
          {loginPage ? 'Sign in:' : null}
          {registerPage ? 'Create new account:' : null}
          {recoverPage ? 'Type in your e-mail:' : null}
        </StyledTitle>
        <Formik
          initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
          onSubmit={async (values) => {
            if (loginPage) {
              await signIn(values);
            } else if (recoverPage) {
              await sendRecoveryMail(values);
            } else if (registerPage) {
              await signUp(values);
            }
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <StyledForm>
              {loginPage ? (
                <>
                  <StyledInput
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <StyledInput
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </>
              ) : null}
              {recoverPage ? (
                <>
                  <StyledInput
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </>
              ) : null}
              {registerPage ? (
                <>
                  <StyledInput
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <StyledInput
                    type="text"
                    name="firstName"
                    placeholder="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <StyledInput
                    type="text"
                    name="lastName"
                    placeholder="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <StyledInput
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </>
              ) : null}
              {loginPage ? (
                <>
                  <Button
                    loginButton={loginPage ? 'loginButton' : null}
                    loading={loading ? 'LOGGING IN...' : null}
                    type="submit"
                  >
                    SIGN IN
                  </Button>
                </>
              ) : null}
              {registerPage ? (
                <>
                  <Button
                    loginButton={null}
                    loading={loading ? 'SIGNING UP...' : null}
                    type="submit"
                  >
                    SIGN UP
                  </Button>
                </>
              ) : null}
              {recoverPage ? (
                <>
                  <Button
                    loginButton={loginPage ? 'loginButton' : null}
                    recoverButton={recoverPage ? 'recoverPage' : null}
                    loading={recoverLoading ? 'SENDING...' : null}
                    type="submit"
                  >
                    SEND RESET MAIL
                  </Button>
                </>
              ) : null}
              <Message error>{recoverPage ? recoverError : error}</Message>
              {recoverPage && recoverError === false ? (
                <Message>Recover email sent successfully!</Message>
              ) : null}
            </StyledForm>
          )}
        </Formik>
        {loginPage ? (
          <>
            <StyledLink to="/register">I WANT NEW ACCOUNT</StyledLink>
            <StyledLink to="/reset-password">RESET PASSWORD</StyledLink>
          </>
        ) : (
          <StyledLink to="/login">I ALREADY HAVE AN ACCOUNT</StyledLink>
        )}
      </StyledLoginSection>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
  recoverLoading: auth.recoveryPassword.loading,
  recoverError: auth.recoveryPassword.error,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (email, password) => dispatch(signInAction(email, password)),
  signUp: (email, password) => dispatch(signUpAction(email, password)),
  sendRecoveryMail: (email) => dispatch(recoveryPasswordAction(email)),
  cleanUp: () => dispatch(cleanAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthTemplate);
