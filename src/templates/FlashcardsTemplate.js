import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Title from 'components/atoms/Title/Title';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Toggle from 'components/atoms/Toggle/Toggle';
import Tooltip from 'components/atoms/Tooltip/Tooltip';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import { useFirestoreConnect } from 'react-redux-firebase';
import { pickNewWord } from 'utils/pick-new-word';
import { COLLECTION_TYPES } from 'helpers/constants';
import { useTranslation } from 'react-i18next';

import { addNewPoint as addNewPointAction } from 'actions';

import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.section`
  padding: 50px 150px 25px 150px;
  color: ${({ theme }) => theme.fontColor};
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

const StyledToggleSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
`;

const FlashcardsTemplate = ({ userId, requested, requesting, addNewPoint }) => {
  const [isSmallerWordVisible, setSmallerWordVisible] = useState(false);
  const [flashcardPosition, setFlashcardPosition] = useState(0);
  const [isChecked, setCheckbox] = useState(false);
  const { t } = useTranslation();

  useFirestoreConnect([{ collection: COLLECTION_TYPES.words, doc: userId }]);
  const words = useSelector(({ firestore: { data } }) => data.words && data.words[userId]);

  let wordsList = [];
  if (!words) {
    wordsList = [];
  } else if (words.words.length === 0) {
    wordsList = [];
  } else if (requested[`words/${userId}`]) {
    wordsList = words.words;
  }

  const setNewWord = (length) => {
    const newWordPosition = pickNewWord(length, flashcardPosition);
    setFlashcardPosition(newWordPosition);
    setSmallerWordVisible(false);
  };

  const addPointAndPickNewWord = (length) => {
    setNewWord(length);
    addNewPoint();
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>{t('title.flashcards')}</Title>
        <StyledParagraph>{t('description.flashcards')}?</StyledParagraph>
        {requesting[`words/${userId}`] ? (
          <LoadingSpinner grey />
        ) : (
          <>
            <StyledToggleSection>
              <p>{t('switch')}:</p>
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
                    : 'Brak słówek, dodaj nowe!'}
                </StyledBiggerWord>
                <StyledSmallerWord isVisible={isSmallerWordVisible}>
                  {wordsList.length > 0
                    ? wordsList[flashcardPosition].english
                    : 'No words, add new ones!'}
                </StyledSmallerWord>
              </>
            )}

            <StyledShowButton onClick={() => setSmallerWordVisible(true)}>
              {t('buttons.show')}
            </StyledShowButton>
            {wordsList.length > 0 ? (
              <Tooltip description={wordsList[flashcardPosition].description} flashcards />
            ) : null}
            <Button
              disabled={wordsList.length === 0}
              onClick={() => addPointAndPickNewWord(wordsList.length)}
            >
              {t('buttons.flashcards_with_point')} <br /> (+1 {t('point')})
            </Button>
            <Button disabled={wordsList.length === 0} onClick={() => setNewWord(wordsList.length)}>
              {t('buttons.draw')}
            </Button>
          </>
        )}
      </StyledWrapper>
    </UserPageTemplate>
  );
};

FlashcardsTemplate.propTypes = {
  userId: PropTypes.string.isRequired,
  addNewPoint: PropTypes.func.isRequired,
  requested: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  requesting: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  requested: firestore.status.requested,
  requesting: firestore.status.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  addNewPoint: () => dispatch(addNewPointAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsTemplate);
