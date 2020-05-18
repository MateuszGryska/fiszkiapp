import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Button from 'components/atoms/Button/Button';
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
  height: ${({ pageContext }) => (pageContext === 'register' ? '600px' : '500px')};
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
  @media (max-width: 480px) {
    width: 80vw;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.black};
  margin: 0px 30px 10px 30px;
`;

const StyledMessage = styled(Message)`
  margin-top: 5px;
  padding-left: 20px;
  margin-bottom: 10px;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
  password: Yup.string()
    .required('The passoword is required.')
    .min(8, 'Too short. Password must be at least 8 characters.'),
});

const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
  password: Yup.string()
    .required('The passoword is required.')
    .min(8, 'Too short. Password must be at least 8 characters.'),
  firstName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    )
    .required('The first name is required.'),
  lastName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    )
    .required('The last name is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Password doesn't match`)
    .required('You need to confirm your password.'),
});

const resetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
});

const AuthTemplate = ({
  pageContext,
  signUp,
  signIn,
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
              return LoginSchema;
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
  sendRecoverMail: (email) => dispatch(recoverPasswordAction(email)),
  cleanUp: () => dispatch(cleanAction()),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(AuthTemplate));
