import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import { Formik, Form } from 'formik';
import Input from 'components/atoms/Input/Input';
import background from 'assets/img/bg.png';
import logoIcon from 'assets/icons/logo.svg';

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
  margin-top: 100px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.black};
  margin: 20px 30px;
`;

const LoginTemplate = ({ login }) => (
  <StyledWrapper>
    <StyledLogo />
    <StyledLoginSection>
      <StyledTitle>{login ? 'Sign in:' : 'Create new account:'}</StyledTitle>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <StyledForm>
            <StyledInput
              type="username"
              name="username"
              placeholder="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <StyledInput
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <StyledButton type="submit">{login ? 'SIGN IN' : 'SIGN UP'}</StyledButton>
          </StyledForm>
        )}
      </Formik>
      {login ? (
        <StyledLink to="/register">I WANT NEW ACCOUNT</StyledLink>
      ) : (
        <StyledLink to="/login">I ALREADY HAVE AN ACCOUNT</StyledLink>
      )}
    </StyledLoginSection>
  </StyledWrapper>
);

export default LoginTemplate;
