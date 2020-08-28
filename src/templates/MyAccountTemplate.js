import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import Toggle from 'components/atoms/Toggle/Toggle';
import Avatar from 'components/atoms/Avatar/Avatar';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import {
  verifyEmail as verifyEmailAction,
  clean as cleanAction,
  deleteUser as deleteAction,
  setDarkMode as setDarkModeAction,
} from 'actions';
import Message from 'components/atoms/Message/Message';
import EditProfileBar from 'components/organisms/EditProfileBar/EditProfileBar';
import UploadAvatarBar from 'components/organisms/UploadAvatarBar/UploadAvatarBar';
import WarningModal from 'components/molecules/WarningModal/WarningModal';
import { useFirebase } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';

import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.section`
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.fontColor};
  @media (max-width: 480px) {
    padding: 50px 30px;
  }
`;

const StyledDetailsList = styled.ul`
  list-style: none;
  align-self: flex-start;
  padding: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
  font-size: ${({ theme }) => theme.fontSize.m};

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const StyledDetail = styled.li`
  display: flex;
  justify-content: space-between;
  @media (max-width: 480px) {
    flex-direction: column;
    padding-top: 20px;
  }
`;

const StyledInfoItem = styled.p`
  @media (max-width: 480px) {
    margin: 0;
    padding: 0;
  }
`;

const StyledVerify = styled.p`
  color: ${({ yes }) => (yes ? 'green' : 'red')};

  @media (max-width: 480px) {
    margin: 0;
    padding: 0;
  }
`;

const StyledSeperator = styled.div`
  width: 100%;
  height: 10px;
  opacity: 0.5;
  border-top: 1px solid grey;
`;
const MyAccountTemplate = ({
  profileData,
  loggedIn,
  sendVerifyEmail,
  loading,
  words,
  notes,
  verifyError,
  uploadAvatarError,
  setDarkMode,
  cleanUp,
  deleteError,
  deleteUser,
}) => {
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);
  const [isUploadAvatarBarVisible, setUploadAvatarBarVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isDeleteWarningVisible, setDeleteWarningVisible] = useState(false);
  const [isDarkMode, setLocalDarkMode] = useState(false);
  const firebase = useFirebase();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  useEffect(() => {
    if (profileData.isDarkMode === true) {
      setLocalDarkMode(true);
    }
  }, [profileData]);

  useEffect(() => {
    const storage = firebase.storage();
    const gsReference = storage.refFromURL(`gs://fiszki-95d38.appspot.com`);
    const fetchAvatar = async () => {
      let avatarUrl;
      try {
        avatarUrl = await gsReference.child(profileData.avatar).getDownloadURL();
      } catch (err) {
        avatarUrl = null;
      }
      setAvatar(avatarUrl);
    };
    if (!profileData.isEmpty) {
      fetchAvatar();
    }
  }, [avatar, profileData, firebase]);

  const handleClick = () => {
    setDarkMode(!isDarkMode);
    setLocalDarkMode(!isDarkMode);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>{t('title.account')}</Title>
        {!profileData.isEmpty ? (
          <>
            <Avatar alt="avatar" image={avatar} />
            <StyledDetailsList>
              <StyledDetail>
                <StyledInfoItem>{t('account_info.points')}: </StyledInfoItem>
                <StyledInfoItem>{profileData.points || 0}</StyledInfoItem>
              </StyledDetail>
              <StyledDetail>
                <StyledInfoItem>{t('account_info.words')}: </StyledInfoItem>
                <StyledInfoItem>{words.length}</StyledInfoItem>
              </StyledDetail>
              <StyledDetail>
                <StyledInfoItem>{t('account_info.notes')}: </StyledInfoItem>
                <StyledInfoItem>{notes.length}</StyledInfoItem>
              </StyledDetail>
              <StyledSeperator />
              <StyledDetail>
                <StyledInfoItem>{t('account_info.dark_mode')}: </StyledInfoItem>
                <StyledInfoItem>
                  <Toggle isChecked={isDarkMode} setCheckbox={() => handleClick()} />
                </StyledInfoItem>
              </StyledDetail>
              <StyledDetail>
                <StyledInfoItem>{t('account_info.first_name')}:</StyledInfoItem>
                <StyledInfoItem>{profileData.firstName}</StyledInfoItem>
              </StyledDetail>
              <StyledDetail>
                <StyledInfoItem>{t('account_info.last_name')}:</StyledInfoItem>
                <StyledInfoItem>{profileData.lastName}</StyledInfoItem>
              </StyledDetail>
              <StyledDetail>
                <StyledInfoItem>{t('account_info.email')}: </StyledInfoItem>
                <StyledInfoItem>{loggedIn.email}</StyledInfoItem>
              </StyledDetail>
              <StyledDetail>
                <StyledInfoItem>{t('account_info.email_verified')}:</StyledInfoItem>
                {loggedIn.emailVerified ? (
                  <StyledVerify yes>
                    {t('yes')}
                    <span role="img" aria-label="smile">
                      😊
                    </span>
                  </StyledVerify>
                ) : (
                  <StyledVerify>
                    {t('no')}
                    <span role="img" aria-label="angry">
                      😠
                    </span>
                  </StyledVerify>
                )}
              </StyledDetail>
            </StyledDetailsList>
            {!profileData.socialLogIn ? (
              <Button onClick={() => setEditProfileVisible(true)}>
                {t('buttons.edit_profile')}
              </Button>
            ) : null}
            <Button onClick={() => setUploadAvatarBarVisible(true)}>
              {t('buttons.upload_avatar')}
            </Button>
            <Button deleteButton onClick={() => setDeleteWarningVisible(true)}>
              {t('buttons.delete_account')}
            </Button>
            {!loggedIn.emailVerified ? (
              <>
                <Button onClick={() => sendVerifyEmail()} loading={loading ? 'SENDING...' : null}>
                  {t('buttons.resend_email')}
                </Button>
                {verifyError ? <Message error>{verifyError}</Message> : null}
                {verifyError === false ? (
                  <Message>{t('info.resend_verify_success')}</Message>
                ) : null}
              </>
            ) : null}
          </>
        ) : (
          <LoadingSpinner grey />
        )}

        <EditProfileBar
          isVisible={isEditProfileVisible}
          handleClose={() => setEditProfileVisible()}
        />
        <UploadAvatarBar
          isVisible={isUploadAvatarBarVisible}
          handleClose={() => setUploadAvatarBarVisible()}
          error={uploadAvatarError}
        />

        <WarningModal
          isVisible={isDeleteWarningVisible}
          handleClose={() => setDeleteWarningVisible()}
          error={deleteError}
          deleteAction={deleteUser}
          cleanUp={cleanUp}
        />
      </StyledWrapper>
    </UserPageTemplate>
  );
};

MyAccountTemplate.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object),
  notes: PropTypes.arrayOf(PropTypes.object),
  profileData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    points: PropTypes.number,
    socialLogIn: PropTypes.bool,
    isDarkMode: PropTypes.bool,
    avatar: PropTypes.string,
    isEmpty: PropTypes.bool,
  }),
  loggedIn: PropTypes.shape({
    email: PropTypes.string.isRequired,
    emailVerified: PropTypes.bool.isRequired,
  }).isRequired,
  sendVerifyEmail: PropTypes.func.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cleanUp: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteError: PropTypes.string,
  verifyError: PropTypes.string,
  uploadAvatarError: PropTypes.string,
};

MyAccountTemplate.defaultProps = {
  words: [],
  notes: [],
  deleteError: null,
  verifyError: null,
  uploadAvatarError: null,
  profileData: {
    firstName: 'FirstName',
    lastName: 'LastName',
    points: 0,
    socialLogIn: false,
    isDarkMode: false,
    avatar: '',
    isEmpty: true,
  },
};
const mapStateToProps = ({ firebase, auth }) => ({
  profileData: firebase.profile,
  loggedIn: firebase.auth,
  loading: auth.verifyEmail.loading,
  verifyError: auth.verifyEmail.error,
  uploadAvatarError: auth.uploadAvatar.error,
  deleteError: auth.deleteUser.error,
});

const mapDispatchToProps = (dispatch) => ({
  sendVerifyEmail: () => dispatch(verifyEmailAction()),
  cleanUp: () => dispatch(cleanAction()),
  deleteUser: () => dispatch(deleteAction()),
  setDarkMode: (isDarkMode) => dispatch(setDarkModeAction(isDarkMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountTemplate);
