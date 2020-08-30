import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReturnButton from 'components/atoms/ReturnButton/ReturnButton';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import Avatar from 'components/atoms/Avatar/Avatar';
import Message from 'components/atoms/Message/Message';
import BarsTitle from 'components/atoms/BarsTitle/BarsTitle';
import Input from 'components/atoms/Input/Input';
import { connect } from 'react-redux';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import withContext from 'hoc/withContext';
import { uploadAvatar as uploadAvatarAction } from 'actions';
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

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  display: none;
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

const UploadAvatarBar = React.memo(
  ({ handleClose, isVisible, uploadAvatar, error }) => {
    const [file, setFile] = useState();
    const [previewURL, setPreviewURL] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();
    const { t } = useTranslation();

    useEffect(() => {
      if (!file) {
        return;
      }
      const fileReader = new window.FileReader();
      fileReader.onload = () => {
        setPreviewURL(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }, [file]);

    const pickImageHandler = () => {
      filePickerRef.current.click();
    };

    const submitHandler = async () => {
      await uploadAvatar(file);
      handleClose();
    };

    const pickedHandler = ({ target }) => {
      let pickedFile;
      // eslint-disable-next-line
      let fileIsValid = isValid;
      if (target.files || target.files.length === 1) {
        // eslint-disable-next-line
        pickedFile = target.files[0];
        setFile(pickedFile);
        setIsValid(true);
        fileIsValid = true;
      } else {
        setIsValid(false);
        fileIsValid = false;
      }
    };

    return (
      <>
        <StyledWrapper isVisible={isVisible}>
          <ReturnButton onClick={() => handleClose()} />
          <BarsTitle>{t('bars_title.upload_avatar')}!</BarsTitle>
          <StyledParagraph>{t('description.upload_avatar')}</StyledParagraph>
          <StyledForm>
            {previewURL && <Avatar alt="preview" image={previewURL} />}
            {!previewURL && <Avatar alt="preview" />}
            <StyledInput
              accept=".jpg,.png,.jpeg"
              id="raised-button-file"
              multiple
              type="file"
              ref={filePickerRef}
              onChange={pickedHandler}
            />
            <StyledActionButton secondary onClick={pickImageHandler}>
              {t('buttons.pick_image')}
            </StyledActionButton>

            <StyledActionButton secondary disabled={!isValid} type="submit" onClick={submitHandler}>
              {t('buttons.upload')}
            </StyledActionButton>
          </StyledForm>
          <StyledMessage error>{error}</StyledMessage>
        </StyledWrapper>
        <DarkerBackground isVisible={isVisible} onClick={() => handleClose()} />
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isVisible === nextProps.isVisible;
  },
);

UploadAvatarBar.propTypes = {
  isVisible: PropTypes.bool,
  uploadAvatar: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  error: PropTypes.string,
};

UploadAvatarBar.defaultProps = {
  error: null,
  isVisible: false,
};

const mapDispatchToProps = (dispatch) => ({
  uploadAvatar: (file) => dispatch(uploadAvatarAction(file)),
});

export default withContext(connect(null, mapDispatchToProps)(UploadAvatarBar));
