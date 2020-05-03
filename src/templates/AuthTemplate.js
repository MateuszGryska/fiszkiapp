import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import { Formik, Form } from 'formik';
import Input from 'components/atoms/Input/Input';
import background from 'assets/img/bg.png';
import logoIcon from 'assets/icons/logo.svg';
import { signUp as signUpAction, signIn as signInAction, clean as cleanAction } from 'actions';

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

const StyledButton = styled(Button)`
  /* margin-top: ${({ loginPage }) => (loginPage ? '155px' : '30px')}; */
  padding-top: 50px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.black};
  margin: 0px 30px 10px 30px;
`;

const StyledError = styled.p`
  height: 10px;
  color: red;
  font-weight: ${({ theme }) => theme.light};
  font-size: 1rem;
`;

const AuthTemplate = ({ loginPage, registerPage, signUp, signIn, cleanUp, loading, error }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <StyledWrapper>
      <StyledLogo />
      <StyledLoginSection>
        <StyledTitle>{loginPage ? 'Sign in:' : 'Create new account:'}</StyledTitle>
        <Formik
          initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
          onSubmit={async (values) => {
            if (loginPage) {
              await signIn(values);
            } else {
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
                  <StyledButton
                    loginButton={loginPage ? 'loginButton' : null}
                    loginPage={loginPage ? 'loginPage' : false}
                    loading={loading ? 'LOGGING IN...' : null}
                    type="submit"
                  >
                    SIGN IN
                  </StyledButton>
                </>
              ) : (
                <>
                  <StyledButton
                    loginButton={null}
                    loginPage={false}
                    loading={loading ? 'SIGNING UP...' : null}
                    type="submit"
                  >
                    SIGN UP
                  </StyledButton>
                </>
              )}
              <StyledError>{error}</StyledError>
            </StyledForm>
          )}
        </Formik>
        {loginPage ? (
          <StyledLink to="/register">I WANT NEW ACCOUNT</StyledLink>
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
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (email, password) => dispatch(signInAction(email, password)),
  signUp: (email, password) => dispatch(signUpAction(email, password)),
  cleanUp: () => dispatch(cleanAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthTemplate);
