import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Title from 'components/atoms/Title/Title';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import Toggle from 'components/atoms/Toggle/Toggle';
import Tooltip from 'components/atoms/Tooltip/Tooltip';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import { pickNewWord } from 'utils/pick-new-word';
import { COLLECTION_TYPES } from 'helpers/constants';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Formik, Form } from 'formik';
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

const StyledMainWord = styled.p`
  padding-top: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
`;

const StyledParagraph = styled.p`
  width: 300px;
  text-align: center;
`;

const StyledInput = styled(Input)`
  margin-top: 20px;

  @media only screen and (max-width: 768px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    max-width: 90%;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledToggleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
`;

const SpellingTemplate = ({ userId, requested, requesting, addNewPoint }) => {
  const [wordPosition, setWordPosition] = useState(0);
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
    const newWordPosition = pickNewWord(length, wordPosition);
    setWordPosition(newWordPosition);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>{t('title.spelling_check')}</Title>
        <StyledParagraph>{t('description.spelling_check')}.</StyledParagraph>
        {requesting[`words/${userId}`] ? (
          <LoadingSpinner grey />
        ) : (
          <>
            <StyledToggleSection>
              <p>{t('switch')}:</p>
              <Toggle
                dataCy="switch-language-btn"
                isChecked={isChecked}
                setCheckbox={() => setCheckbox(!isChecked)}
              />
            </StyledToggleSection>
            {isChecked ? (
              <StyledMainWord data-cy="main-word">
                {wordsList.length > 0 ? wordsList[wordPosition].english : 'No words, add new ones!'}
              </StyledMainWord>
            ) : (
              <StyledMainWord data-cy="main-word">
                {wordsList.length > 0 ? wordsList[wordPosition].polish : 'Brak słówek, dodaj nowe!'}
              </StyledMainWord>
            )}

            {wordsList.length > 0 ? (
              <Tooltip description={wordsList[wordPosition].description} />
            ) : null}
            {wordsList.length > 0 ? (
              <Formik
                initialValues={{ answer: '' }}
                onSubmit={(values, { resetForm }) => {
                  if (
                    values.answer.toLowerCase().trim() ===
                      wordsList[wordPosition].english.toLowerCase().trim() ||
                    (isChecked &&
                      values.answer.toLowerCase().trim() ===
                        wordsList[wordPosition].polish.toLowerCase().trim())
                  ) {
                    addNewPoint();
                    setNewWord(wordsList.length);
                    resetForm();
                  }
                }}
              >
                {({ values, handleChange, handleBlur }) => (
                  <StyledForm>
                    <StyledInput
                      type="text"
                      name="answer"
                      placeholder={t('input.answer')}
                      value={values.answer}
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {isChecked ? (
                      <Button
                        type="submit"
                        disabled={
                          wordsList.length === 0 ||
                          values.answer.toLowerCase() !==
                            wordsList[wordPosition].polish.toLowerCase().trim()
                        }
                      >
                        {t('buttons.draw')} <br /> (+1 {t('point')})
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={
                          wordsList.length === 0 ||
                          values.answer.toLowerCase() !==
                            wordsList[wordPosition].english.toLowerCase().trim()
                        }
                      >
                        {t('buttons.draw')} <br /> (+1 {t('point')})
                      </Button>
                    )}

                    <Button
                      disabled={wordsList.length === 0}
                      type="button"
                      onClick={() => setNewWord(wordsList.length)}
                    >
                      {t('buttons.draw')}
                    </Button>
                  </StyledForm>
                )}
              </Formik>
            ) : null}
          </>
        )}
      </StyledWrapper>
    </UserPageTemplate>
  );
};

SpellingTemplate.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SpellingTemplate);
