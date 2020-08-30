import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SadPhoto from 'assets/img/delete-profile-photo.jpg';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import DarkerBackground from 'components/atoms/DarkerBackground/DarkerBackground';
import Message from 'components/atoms/Message/Message';
import { useTranslation } from 'react-i18next';

const StyledWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: ${({ item }) => (item ? '200px' : '400px')};
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.inputHover};
  color: ${({ theme }) => theme.fontColor};
  border-radius: 20px;
  border: none;
  z-index: 1000;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  margin: 0;
  padding: 0;
`;

const StyledImg = styled.img`
  width: 300px;
  margin-top: 30px;
`;

const StyledButtons = styled.nav`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WarningModal = React.memo(
  ({ isVisible, handleClose, error, deleteAction, cleanUp, item }) => {
    const { t } = useTranslation();

    useEffect(() => {
      return () => {
        cleanUp();
      };
    }, [cleanUp]);

    return (
      <>
        <StyledWrapper isVisible={isVisible} item={item}>
          <StyledInfo>{!item ? t('info.no_sure') : t('info.sure')}</StyledInfo>
          {!item ? (
            <picture>
              <StyledImg src={SadPhoto} alt="sad child" />
            </picture>
          ) : null}
          <StyledButtons>
            <ActionButton secondary onClick={() => deleteAction()}>
              {t('buttons.do_it')}
            </ActionButton>
            <ActionButton onClick={() => handleClose(false)}>{t('buttons.cancel')}</ActionButton>
          </StyledButtons>
          {error ? <Message error>{error}</Message> : null}
          {error === false ? <Message>{t('info.delete_user_success')}</Message> : null}
        </StyledWrapper>
        <DarkerBackground isVisible={isVisible} onClick={() => handleClose(false)} />
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isVisible === nextProps.isVisible;
  },
);

WarningModal.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  item: PropTypes.bool,
  cleanUp: PropTypes.func.isRequired,
  error: PropTypes.string,
};

WarningModal.defaultProps = {
  error: null,
  item: false,
  isVisible: false,
};
export default WarningModal;
