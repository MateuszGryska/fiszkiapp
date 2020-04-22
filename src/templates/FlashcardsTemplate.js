import React from 'react';
import Title from 'components/atoms/Title/Title';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import ShowButton from 'components/atoms/ShowButton/ShowButton';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  padding: 50px 150px 25px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledBiggerWord = styled.h1`
  padding-top: 50px;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const StyledSmallerWord = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.m};
  margin: 0;
`;

const StyledShowButton = styled(ShowButton)`
  margin-top: 0;
  margin-bottom: 100px;
`;

const FlashcardsTemplate = () => (
  <UserPageTemplate>
    <StyledWrapper>
      <Title>Flashcards</Title>
      <StyledBiggerWord>First</StyledBiggerWord>
      <StyledSmallerWord>Pierwszy</StyledSmallerWord>
      <StyledShowButton>Show</StyledShowButton>
      <Button>NEW WORD</Button>
    </StyledWrapper>
  </UserPageTemplate>
);

export default FlashcardsTemplate;
