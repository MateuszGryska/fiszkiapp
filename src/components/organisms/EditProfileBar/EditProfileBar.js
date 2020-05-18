import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';
import ReturnButton from 'components/atoms/ReturnButton/ReturnButton';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import BarsTitle from 'components/atoms/BarsTitle/BarsTitle';
import Input from 'components/atoms/Input/Input';
import Message from 'components/atoms/Message/Message';
import { connect } from 'react-redux';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import { editProfile as editProfileAction, clean as cleanAction } from 'actions';

const StyledWrapper = styled.div`
  height: 100vh;
  width: 400px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.white};
  border-left: 8px solid ${({ theme }) => theme.main};
  box-shadow: ${({ isVisible }) =>
    isVisible ? '-10px 3px 20px 0px rgba(0, 0, 0, 0.16);' : 'none'};
  padding: 20px 30px;
  z-index: 1000;
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.4s ease-in-out;

  @media (max-width: 480px) {
    width: 100vw;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  margin-top: 10px;
  width: 370px;

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const StyledActionButton = styled(ActionButton)`
  margin-top: 20px;
`;

const StyledParagraph = styled.p`
  font-size: 1.2rem;
`;

const StyledMessage = styled(Message)`
  margin-top: 0px;
  padding-left: 20px;
  margin-bottom: 5px;
`;

const editProfileSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.'),
  password: Yup.string().min(8, 'Too short. Password must be at least 8 characters.'),
  firstName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    ),
  lastName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Password doesn't match`)
    .required('You need to confirm your password.'),
});

const EditProfileBar = ({
  isVisible,
  handleClose,
  profile,
  auth,
  updateProfile,
  error,
  cleanUp,
}) => {
  const [isEditProfileVisible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  if (!profile.isLoaded) return null;

  return (
    <>
      <StyledWrapper isVisible={isEditProfileVisible}>
        <ReturnButton
          onClick={() => {
            setVisible(false);
            handleClose(false);
          }}
        />
        <BarsTitle>Edit profile</BarsTitle>
        <StyledParagraph>
          Edit what you want to change. <br />
          First and last name can have a maximum of 25 letters. Password must be at least 8
          characters. <br /> Special characters are not allowed.
        </StyledParagraph>
        <Formik
          validationSchema={editProfileSchema}
          initialValues={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: auth.email,
            password: '',
            confirmPassword: '',
          }}
          onSubmit={async (values) => {
            await updateProfile(values);

            setVisible(false);
            handleClose(false);
          }}
        >
          {({ values, handleChange, handleBlur, isValid, errors, touched }) => (
            <StyledForm>
              <div>
                <StyledInput
                  autoComplete="off"
                  type="text"
                  name="firstName"
                  placeholder="First name"
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
                  autoComplete="off"
                  type="text"
                  name="lastName"
                  placeholder="Last name"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
              <StyledActionButton secondary disabled={!isValid} type="submit">
                update
              </StyledActionButton>
              <Message error>{error}</Message>
              {error === false ? <Message>Profile was updated!</Message> : null}
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
      <DarkerBackground
        isVisible={isEditProfileVisible}
        onClick={() => {
          setVisible(false);
          handleClose(false);
        }}
      />
    </>
  );
};

EditProfileBar.propTypes = {
  isVisible: PropTypes.bool,
  cleanUp: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  profile: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  auth: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  updateProfile: PropTypes.func.isRequired,
  error: PropTypes.node,
};

EditProfileBar.defaultProps = {
  isVisible: false,
  error: null,
};

const mapStateToProps = ({ firebase, auth }) => ({
  profile: firebase.profile,
  auth: firebase.auth,
  error: auth.profileEdit.error,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (email, firstName, lastName, password) =>
    dispatch(editProfileAction(email, firstName, lastName, password)),
  cleanUp: () => dispatch(cleanAction()),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(EditProfileBar));
