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

const editProfileSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.'),
  password: Yup.string().min(8, 'Too short.'),
  firstName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .matches(/^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-z])*$/g),
  lastName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .matches(/^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-z])*$/g),
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
        <Formik
          validationSchema={editProfileSchema}
          initialValues={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: auth.email,
            password: '',
          }}
          onSubmit={async (values) => {
            await updateProfile(values);

            setVisible(false);
            handleClose(false);
          }}
        >
          {({ values, handleChange, handleBlur, isValid, errors, touched }) => (
            <StyledForm>
              <StyledInput
                autoComplete="off"
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <StyledInput
                autoComplete="off"
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <StyledInput
                autoComplete="off"
                type="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <StyledInput
                autoComplete="off"
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <StyledActionButton secondary disabled={!isValid} type="submit">
                update
              </StyledActionButton>
              <Message error>{error}</Message>
              {error === false ? <Message>Profile was updated!</Message> : null}
              {errors.email && touched.email ? <Message error>{errors.email}</Message> : null}
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
