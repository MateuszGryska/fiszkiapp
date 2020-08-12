import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import SocialButton from 'components/atoms/SocialButton/SocialButton';
import Message from 'components/atoms/Message/Message';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import Input from 'components/atoms/Input/Input';
import background from 'assets/img/bg.png';
import logoIcon from 'assets/icons/logo.svg';
import {
  signUp as signUpAction,
  signIn as signInAction,
  recoveryPassword as recoverPasswordAction,
  clean as cleanAction,
  socialSignIn as socialSignInAction,
} from 'actions';
import { loginSchema, registerSchema, resetSchema } from 'validation';

const socialTypes = {
  facebook: 'facebook',
  google: 'google',
  twitter: 'twitter',
};

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${background});
  background-size: 100vw;
  background-color: transparent;
  background-position: 50% 20%;
  background-repeat: no-repeat;

  @media (max-width: 1980px) {
    background-size: auto 100vh;
  }
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
  height: ${({ pageContext }) => (pageContext === 'reset-password' ? '400px' : '700px')};
  margin-top: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  position: relative;

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.fontGrey};
  margin-top: 30px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled(Input)`
  @media (max-width: 480px) {
    width: 80vw;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.black};
  margin: 10px 30px 0px 30px;

  &:last-child {
    margin-bottom: 10px;
  }
`;

const StyledMessage = styled(Message)`
  margin-top: 5px;
  padding-left: 20px;
  margin-bottom: 10px;
`;

const StyledOr = styled.p`
  padding-bottom: 40px;
  margin: 0;
`;

const AuthTemplate = ({
  pageContext,
  signUp,
  signIn,
  socialSignIn,
  sendRecoverMail,
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
      <StyledLoginSection pageContext={pageContext}>
        <StyledTitle>
          {pageContext === 'login' ? 'Sign in:' : null}
          {pageContext === 'register' ? 'Create new account:' : null}
          {pageContext === 'reset-password' ? 'Type in your e-mail:' : null}
        </StyledTitle>
        <Formik
          validationSchema={() => {
            if (pageContext === 'login') {
              return loginSchema;
            }
            if (pageContext === 'register') {
              return registerSchema;
            }
            if (pageContext === 'reset-password') {
              return resetSchema;
            }
            return null;
          }}
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (pageContext === 'login') {
              signIn(values);
            } else if (pageContext === 'reset-password') {
              await sendRecoverMail(values);
            } else if (pageContext === 'register') {
              await signUp(values);
            }
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
            <StyledForm>
              {pageContext === 'login' ? (
                <>
                  <div>
                    <StyledInput
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <StyledMessage error>{errors.email}</StyledMessage>
                    ) : (
                      <StyledMessage error />
                    )}
                  </div>
                  <div>
                    <StyledInput
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password ? (
                      <StyledMessage error>{errors.password}</StyledMessage>
                    ) : (
                      <StyledMessage error />
                    )}
                  </div>
                </>
              ) : null}
              {pageContext === 'reset-password' ? (
                <>
                  <div>
                    <StyledInput
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <StyledMessage error>{errors.email}</StyledMessage>
                    ) : (
                      <StyledMessage error />
                    )}
                  </div>
                </>
              ) : null}
              {pageContext === 'register' ? (
                <>
                  <div>
                    <StyledInput
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <StyledMessage error>{errors.email}</StyledMessage>
                    ) : (
                      <StyledMessage error />
                    )}
                  </div>
                  <div>
                    <StyledInput
                      type="text"
                      name="firstName"
                      placeholder="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    {errors.firstName && touched.firstName ? (
                      <StyledMessage error>{errors.firstName}</StyledMessage>
                    ) : (
                      <StyledMessage error />
                    )}
                  </div>
                  <div>
                    <StyledInput
                      type="text"
                      name="lastName"
                      placeholder="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    {errors.lastName && touched.lastName ? (
                      <StyledMessage error>{errors.lastName}</StyledMessage>
                    ) : (
                      <StyledMessage error />
                    )}
                  </div>
                  <div>
                    <StyledInput
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password ? (
                      <StyledMessage error>{errors.password}</StyledMessage>
                    ) : (
                      <StyledMessage error />
                    )}
                  </div>
                  <div>
                    <StyledInput
                      type="password"
                      name="confirmPassword"
                      placeholder="confirm password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <StyledMessage error>{errors.confirmPassword}</StyledMessage>
                    ) : (
                      <StyledMessage error />
                    )}
                  </div>
                </>
              ) : null}
              {pageContext === 'login' ? (
                <>
                  <Button
                    disabled={!isValid}
                    loginButton={pageContext === 'login' ? 'loginButton' : null}
                    loading={loading ? 'LOGGING IN...' : null}
                    type="submit"
                  >
                    SIGN IN
                  </Button>
                </>
              ) : null}
              {pageContext === 'register' ? (
                <>
                  <Button
                    disabled={!isValid}
                    loginButton={null}
                    loading={loading ? 'SIGNING UP...' : null}
                    type="submit"
                  >
                    SIGN UP
                  </Button>
                </>
              ) : null}
              {pageContext === 'reset-password' ? (
                <>
                  <Button
                    disabled={!isValid}
                    loginButton={null}
                    recoverButton={pageContext === 'reset-password' ? 'recoverPage' : null}
                    loading={recoverLoading ? 'SENDING...' : null}
                    type="submit"
                  >
                    SEND RESET MAIL
                  </Button>
                </>
              ) : null}
              <Message error>{pageContext === 'reset-password' ? recoverError : error}</Message>
              {pageContext === 'reset-password' && recoverError === false ? (
                <Message>Recover email sent successfully!</Message>
              ) : null}
            </StyledForm>
          )}
        </Formik>
        {pageContext === 'login' ? (
          <>
            <StyledOr>OR</StyledOr>
            <SocialButton facebook onClick={() => socialSignIn(socialTypes.facebook)}>
              Log in with Facebook
            </SocialButton>
            <SocialButton google onClick={() => socialSignIn(socialTypes.google)}>
              Sign in with Google
            </SocialButton>
            <SocialButton twitter onClick={() => socialSignIn(socialTypes.twitter)}>
              Sign in with Twitter
            </SocialButton>
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

AuthTemplate.propTypes = {
  pageContext: PropTypes.oneOf([
    'login',
    'register',
    'reset-password',
    'notes',
    'words',
    'flashcards',
  ]).isRequired,
  signUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  socialSignIn: PropTypes.func.isRequired,
  sendRecoverMail: PropTypes.func.isRequired,
  cleanUp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  recoverError: PropTypes.node,
  recoverLoading: PropTypes.bool.isRequired,
  error: PropTypes.node,
};

AuthTemplate.defaultProps = {
  recoverError: null,
  error: null,
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
  socialSignIn: (type) => dispatch(socialSignInAction(type)),
  sendRecoverMail: (email) => dispatch(recoverPasswordAction(email)),
  cleanUp: () => dispatch(cleanAction()),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(AuthTemplate));
