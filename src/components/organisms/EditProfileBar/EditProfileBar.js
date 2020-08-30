import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReturnButton from 'components/atoms/ReturnButton/ReturnButton';
import InputSection from 'components/molecules/InputSection/InputSection';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import BarsTitle from 'components/atoms/BarsTitle/BarsTitle';
import Message from 'components/atoms/Message/Message';
import { connect } from 'react-redux';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import { editProfile as editProfileAction, clean as cleanAction } from 'actions';
import { editProfileSchema } from 'validation';
import { useTranslation } from 'react-i18next';

const StyledWrapper = styled.aside`
  height: 100vh;
  width: 400px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.background};
  border-left: 8px solid ${({ theme }) => theme.main};
  box-shadow: ${({ isVisible }) =>
    isVisible ? '-10px 3px 20px 0px rgba(0, 0, 0, 0.16);' : 'none'};
  padding: 20px 30px;
  z-index: 1000;
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.4s ease-in-out;
  color: ${({ theme }) => theme.fontColor};

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

const StyledActionButton = styled(ActionButton)`
  margin-top: 20px;
`;

const StyledParagraph = styled.p`
  font-size: 1.2rem;
`;

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
  const { t } = useTranslation();

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
        <BarsTitle>{t('bars_title.edit_profile')}</BarsTitle>
        <StyledParagraph>
          {t('description.edit_profile')} <br /> {t('info.special_characters')}
        </StyledParagraph>
        <Formik
          validationSchema={editProfileSchema}
          initialValues={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            isDarkMode: profile.isDarkMode,
            points: profile.points,
            email: auth.email,
            socialLogIn: profile.socialLogIn,
            avatar: profile.avatar,
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
              <InputSection
                type="text"
                name="firstName"
                placeholder="account_info.first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                label="account_info.first_name"
                error={errors.firstName}
                touched={touched.firstName}
                ariaDescribedBy="firstName_error"
              />
              <InputSection
                type="text"
                name="lastName"
                placeholder="account_info.last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                label="account_info.last_name"
                error={errors.lastName}
                touched={touched.lastName}
                ariaDescribedBy="lastName_error"
              />
              <InputSection
                type="email"
                name="email"
                placeholder="account_info.email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label="account_info.email"
                error={errors.email}
                touched={touched.email}
                ariaDescribedBy="email_error"
              />
              <InputSection
                type="password"
                name="password"
                placeholder="account_info.password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                label="account_info.password"
                error={errors.password}
                touched={touched.password}
                ariaDescribedBy="password_error"
              />
              <InputSection
                type="password"
                name="confirmPassword"
                placeholder="account_info.confirm_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                label="account_info.confirm_password"
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                ariaDescribedBy="confirmPassword_error"
              />
              <StyledActionButton secondary disabled={!isValid} type="submit">
                {t('buttons.update')}
              </StyledActionButton>
              <Message error>{error}</Message>
              {error === false ? <Message>{t('info.profile_updated_success')}</Message> : null}
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
