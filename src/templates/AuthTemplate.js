import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import SocialButton from 'components/atoms/SocialButton/SocialButton';
import InputSection from 'components/molecules/InputSection/InputSection';
import Message from 'components/atoms/Message/Message';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
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
import { PAGE_TYPES, SOCIAL_TYPES } from 'helpers/constants';
import { routes } from 'routes';

const StyledWrapper = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
`;

const StyledLogo = styled.section`
  width: 400px;
  height: 80px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 50% 50%;
  background-size: 100% 70%;
`;

const StyledLoginSection = styled.section`
  width: 500px;
  height: ${({ pageContext }) => (pageContext === PAGE_TYPES.resetPassword ? '400px' : '700px')};
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

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.fontColor};
  margin: 10px 30px 0px 30px;

  &:last-child {
    margin-bottom: 10px;
  }
`;

const StyledOr = styled.p`
  padding-bottom: 40px;
  margin: 0;
`;

const StyledFieldset = styled.fieldset`
  border: none;
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
          {pageContext === PAGE_TYPES.login ? 'Sign in:' : null}
          {pageContext === PAGE_TYPES.register ? 'Create new account:' : null}
          {pageContext === PAGE_TYPES.resetPassword ? 'Type in your e-mail:' : null}
        </StyledTitle>
        <Formik
          validationSchema={() => {
            if (pageContext === PAGE_TYPES.login) {
              return loginSchema;
            }
            if (pageContext === PAGE_TYPES.register) {
              return registerSchema;
            }
            if (pageContext === PAGE_TYPES.resetPassword) {
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
            if (pageContext === PAGE_TYPES.login) {
              signIn(values);
            } else if (pageContext === PAGE_TYPES.resetPassword) {
              await sendRecoverMail(values);
            } else if (pageContext === PAGE_TYPES.register) {
              await signUp(values);
            }
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
            <StyledForm>
              {pageContext === PAGE_TYPES.login ? (
                <StyledFieldset>
                  <InputSection
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    label="Email"
                    error={errors.email}
                    touched={touched.email}
                    ariaDescribedBy="email_error"
                  />
                  <InputSection
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    label="Password"
                    error={errors.password}
                    touched={touched.password}
                    ariaDescribedBy="password_error"
                  />
                </StyledFieldset>
              ) : null}
              {pageContext === PAGE_TYPES.resetPassword ? (
                <StyledFieldset>
                  <InputSection
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    label="Email"
                    error={errors.email}
                    touched={touched.email}
                    ariaDescribedBy="email_error"
                  />
                </StyledFieldset>
              ) : null}
              {pageContext === PAGE_TYPES.register ? (
                <StyledFieldset>
                  <InputSection
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    label="Email"
                    error={errors.email}
                    touched={touched.email}
                    ariaDescribedBy="email_error"
                  />
                  <InputSection
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    label="First name"
                    error={errors.firstName}
                    touched={touched.firstName}
                    ariaDescribedBy="firstName_error"
                  />
                  <InputSection
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    label="Last name"
                    error={errors.lastName}
                    touched={touched.lastName}
                    ariaDescribedBy="lastName_error"
                  />
                  <InputSection
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    label="Password"
                    error={errors.password}
                    touched={touched.password}
                    ariaDescribedBy="password_error"
                  />
                  <InputSection
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    label="Confirm password"
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    ariaDescribedBy="confirmPassword_error"
                  />
                </StyledFieldset>
              ) : null}
              {pageContext === PAGE_TYPES.login ? (
                <>
                  <Button
                    disabled={!isValid}
                    loginButton={pageContext === PAGE_TYPES.login ? 'loginButton' : null}
                    loading={loading ? 'LOGGING IN...' : null}
                    type="submit"
                  >
                    SIGN IN
                  </Button>
                </>
              ) : null}
              {pageContext === PAGE_TYPES.register ? (
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
              {pageContext === PAGE_TYPES.resetPassword ? (
                <>
                  <Button
                    disabled={!isValid}
                    loginButton={null}
                    recoverButton={pageContext === PAGE_TYPES.resetPassword ? 'recoverPage' : null}
                    loading={recoverLoading ? 'SENDING...' : null}
                    type="submit"
                  >
                    SEND RESET MAIL
                  </Button>
                </>
              ) : null}
              <Message error>
                {pageContext === PAGE_TYPES.resetPassword ? recoverError : error}
              </Message>
              {pageContext === PAGE_TYPES.resetPassword && recoverError === false ? (
                <Message>Recover email sent successfully!</Message>
              ) : null}
            </StyledForm>
          )}
        </Formik>
        {pageContext === PAGE_TYPES.login ? (
          <>
            <StyledOr>OR</StyledOr>
            <SocialButton facebook onClick={() => socialSignIn(SOCIAL_TYPES.facebook)}>
              Log in with Facebook
            </SocialButton>
            <SocialButton google onClick={() => socialSignIn(SOCIAL_TYPES.google)}>
              Sign in with Google
            </SocialButton>
            <SocialButton twitter onClick={() => socialSignIn(SOCIAL_TYPES.twitter)}>
              Sign in with Twitter
            </SocialButton>
            <StyledLink to={routes.register}>I WANT NEW ACCOUNT</StyledLink>
            <StyledLink to={routes.reset}>RESET PASSWORD</StyledLink>
          </>
        ) : (
          <StyledLink to={routes.login}>I ALREADY HAVE AN ACCOUNT</StyledLink>
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
  ]),
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
  pageContext: 'login',
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
