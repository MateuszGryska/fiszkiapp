import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Title from 'components/atoms/Title/Title';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Toggle from 'components/atoms/Toggle/Toggle';
import Tooltip from 'components/atoms/Tooltip/Tooltip';
import { useFirestoreConnect } from 'react-redux-firebase';

import { addNewPoint as addNewPointAction } from 'actions';

import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  padding: 50px 150px 25px 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledBiggerWord = styled.h1`
  padding-top: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const StyledSmallerWord = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.m};
  margin: 0;
  text-align: center;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const StyledShowButton = styled.button`
  margin-top: 0;
  margin-bottom: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.showButton};
  font-weight: ${({ theme }) => theme.bold};
  text-decoration: none;
  font-style: italic;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const StyledParagraph = styled.p`
  width: 300px;
  text-align: center;
`;

const StyledToggleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
`;

const FlashcardsTemplate = ({ userId, requested, points, addNewPoint }) => {
  const [isSmallerWordVisible, setSmallerWordVisible] = useState(false);
  const [flashcardPosition, setFlashcardPosition] = useState(0);
  const [isChecked, setCheckbox] = useState(false);

  useFirestoreConnect([{ collection: 'words', doc: userId }]);
  const words = useSelector(({ firestore: { data } }) => data.words && data.words[userId]);

  let wordsList = [];
  if (!words) {
    wordsList = [];
  } else if (words.words.length === 0) {
    wordsList = [];
  } else if (requested[`words/${userId}`]) {
    wordsList = words.words;
  }

  const pickNewWord = (length) => {
    let random;
    if (length === 1) {
      return;
    }
    do {
      random = Math.floor(Math.random() * length);
    } while (random === flashcardPosition);

    setFlashcardPosition(random);
    setSmallerWordVisible(false);
  };

  const addPointAndPickNewWord = (length) => {
    let random;
    if (length === 1) {
      return;
    }
    do {
      random = Math.floor(Math.random() * length);
    } while (random === flashcardPosition);

    addNewPoint();

    setFlashcardPosition(random);
    setSmallerWordVisible(false);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>Flashcards</Title>
        <StyledParagraph>Number of words: {wordsList.length}</StyledParagraph>
        <StyledParagraph>Points: {points || 0}</StyledParagraph>
        <StyledToggleSection>
          <p>Switch language:</p>
          <Toggle isChecked={isChecked} setCheckbox={() => setCheckbox(!isChecked)} />
        </StyledToggleSection>
        {isChecked ? (
          <>
            <StyledBiggerWord>
              {wordsList.length > 0
                ? wordsList[flashcardPosition].english
                : 'No words, add new ones!'}
            </StyledBiggerWord>
            <StyledSmallerWord isVisible={isSmallerWordVisible}>
              {wordsList.length > 0
                ? wordsList[flashcardPosition].polish
                : 'Brak słówek, dodaj nowe!'}
            </StyledSmallerWord>
          </>
        ) : (
          <>
            <StyledBiggerWord>
              {wordsList.length > 0
                ? wordsList[flashcardPosition].polish
                : 'No words, add new ones!'}
            </StyledBiggerWord>
            <StyledSmallerWord isVisible={isSmallerWordVisible}>
              {wordsList.length > 0
                ? wordsList[flashcardPosition].english
                : 'Brak słówek, dodaj nowe!'}
            </StyledSmallerWord>
          </>
        )}

        <StyledShowButton onClick={() => setSmallerWordVisible(true)}>Show</StyledShowButton>
        {wordsList.length > 0 ? (
          <Tooltip description={wordsList[flashcardPosition].description} flashcards />
        ) : null}
        <Button
          disabled={wordsList.length === 0}
          onClick={() => addPointAndPickNewWord(wordsList.length)}
        >
          I KNOW THIS WORD <br />
          (+1 POINT)
        </Button>
        <Button disabled={wordsList.length === 0} onClick={() => pickNewWord(wordsList.length)}>
          DRAW A NEW WORD
        </Button>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

FlashcardsTemplate.propTypes = {
  userId: PropTypes.string.isRequired,
  requested: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  points: firebase.profile.points,
  requested: firestore.status.requested,
});

const mapDispatchToProps = (dispatch) => ({
  addNewPoint: () => dispatch(addNewPointAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsTemplate);
