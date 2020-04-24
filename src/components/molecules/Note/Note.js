import React from 'react';
import styled from 'styled-components';
import ShowButton from 'components/atoms/ShowButton/ShowButton';
import ActionButton from 'components/atoms/ActionButton/ActionButton';

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.white};
  min-height: 350px;
  min-width: 400px;
  box-shadow: 0px 15px 20px 0 rgba(0, 0, 0, 0.16);
  padding: 20px 30px;
  position: relative;
  border-radius: 20px;
`;

const StyledTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.main};
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledParagraph = styled.p`
  padding-top: 50px;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const StyledShowButton = styled(ShowButton)`
  padding: 0;
  margin-top: 20px;
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const StyledActionButtons = styled.div`
  position: absolute;
  bottom: 20px;
  left: 30px;
`;
const Note = () => (
  <StyledWrapper>
    <StyledTitle>Title for note</StyledTitle>
    <StyledParagraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae urna purus.
      Praesent lectus velit…
    </StyledParagraph>
    <StyledShowButton>Show more</StyledShowButton>
    <StyledActionButtons>
      <ActionButton secondary>Edit</ActionButton>
      <ActionButton>Remove</ActionButton>
    </StyledActionButtons>
  </StyledWrapper>
);

export default Note;
