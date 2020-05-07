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
  position: relative;
`;

const StyledInput = styled(Input)`
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.black};
  margin: 0px 30px 10px 30px;
`;

const StyledMessage = styled(Message)`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
  password: Yup.string().required('The passoword is required.').min(8, 'Too short.'),
});

const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
  password: Yup.string().required('The passoword is required.').min(8, 'Too short.'),
  firstName: Yup.string().min(2, 'Too short.').max(25, 'Too long.'),
  lastName: Yup.string().min(2, 'Too short.').max(25, 'Too long.'),
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
      <StyledLoginSection>
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
          initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            if (pageContext === 'login') {
              await signIn(values);
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
              {pageContext === 'reset-password' ? (
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
              {pageContext === 'register' ? (
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
              {errors.email && touched.email ? (
                <StyledMessage error>{errors.email}</StyledMessage>
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
  pageContext: PropTypes.oneOf(['login', 'register', 'reset-password']).isRequired,
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
