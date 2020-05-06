import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import backArrow from 'assets/icons/back-arrow.svg';
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
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 30px;
  border: none;
  width: 30px;
  height: 40px;
  background-color: transparent;
  background-image: url(${backArrow});
  background-size: 30px;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.fontGrey};
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
`;

const StyledActionButton = styled(ActionButton)`
  margin-top: 20px;
`;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const EditProfileBar = ({ isVisible, handleClose, firebase, updateProfile, error, cleanUp }) => {
  const [isEditProfileVisible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  if (!firebase.profile.isLoaded) return null;

  return (
    <>
      <StyledWrapper isVisible={isEditProfileVisible}>
        <StyledButton
          onClick={() => {
            setVisible(false);
            handleClose(false);
          }}
        />
        <StyledTitle>Edit profile</StyledTitle>
        <Formik
          initialValues={{
            firstName: firebase.profile.firstName,
            lastName: firebase.profile.lastName,
            email: firebase.auth.email,
            password: '',
          }}
          onSubmit={async (values) => {
            await updateProfile(values);

            setVisible(false);
            handleClose(false);
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <StyledForm>
              <StyledInput
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <StyledInput
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
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
              <StyledActionButton secondary type="submit">
                update
              </StyledActionButton>
              <Message error>{error}</Message>
              {error === false ? <Message>Profile was updated!</Message> : null}
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
      <StyledBackground
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
};

EditProfileBar.defaultProps = {
  isVisible: false,
};

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  error: auth.profileEdit.error,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (email, firstName, lastName, password) =>
    dispatch(editProfileAction(email, firstName, lastName, password)),
  cleanUp: () => dispatch(cleanAction()),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(EditProfileBar));