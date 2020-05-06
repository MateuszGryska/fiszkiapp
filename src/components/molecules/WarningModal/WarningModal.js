import React, { useEffect } from 'react';
import styled from 'styled-components';
import SadPhoto from 'assets/img/delete-profile-photo.jpg';
import ActionButton from 'components/atoms/ActionButton/ActionButton';
import Message from 'components/atoms/Message/Message';

const StyledWrapper = styled.div`
  position: fixed;
  left: calc((100% - var(--width)) / 2);
  right: calc((100% - var(--width)) / 2);
  top: calc((100% - var(--height)) / 2);
  bottom: calc((100% - var(--height)) / 2);
  width: 400px;
  min-width: 400px;
  height: 400px;
  padding: 20px 30px;
  background-color: white;
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

const StyledImg = styled.img`
  width: 300px;
  margin-top: 30px;
`;

const StyledButtons = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WarningModal = ({ isVisible, handleClose, error, deleteAction, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <>
      <StyledWrapper isVisible={isVisible}>
        <StyledInfo>Oh no! Are you sure?</StyledInfo>
        <StyledImg src={SadPhoto} alt="sad child" />
        <StyledButtons>
          <ActionButton secondary onClick={() => deleteAction()}>
            DO IT!
          </ActionButton>
          <ActionButton onClick={() => handleClose(false)}>Cancel</ActionButton>
        </StyledButtons>
        {error ? <Message error>{error}</Message> : null}
        {error === false ? <Message>Delete user successfully!</Message> : null}
      </StyledWrapper>
      <StyledBackground isVisible={isVisible} />
    </>
  );
};

export default WarningModal;
