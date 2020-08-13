import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Title from 'components/atoms/Title/Title';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import Toggle from 'components/atoms/Toggle/Toggle';
import Tooltip from 'components/atoms/Tooltip/Tooltip';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Formik, Form } from 'formik';

import { addNewPoint as addNewPointAction } from 'actions';

import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  padding: 50px 150px 25px 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMainWord = styled.h1`
  padding-top: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
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
    } while (random === wordPosition);

    setWordPosition(random);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>Spelling check</Title>
        <StyledParagraph>Write the correct translation of the word.</StyledParagraph>
        {requesting[`words/${userId}`] ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <StyledToggleSection>
              <p>Switch language:</p>
              <Toggle isChecked={isChecked} setCheckbox={() => setCheckbox(!isChecked)} />
            </StyledToggleSection>
            {isChecked ? (
              <StyledMainWord>
                {wordsList.length > 0 ? wordsList[wordPosition].english : 'No words, add new ones!'}
              </StyledMainWord>
            ) : (
              <StyledMainWord>
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
                    values.answer === wordsList[wordPosition].english ||
                    (isChecked && values.answer === wordsList[wordPosition].polish)
                  ) {
                    addNewPoint();
                    pickNewWord(wordsList.length);
                    resetForm();
                  }
                }}
              >
                {({ values, handleChange, handleBlur }) => (
                  <StyledForm>
                    <StyledInput
                      type="text"
                      name="answer"
                      placeholder="answer"
                      value={values.answer}
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {isChecked ? (
                      <Button
                        type="submit"
                        disabled={
                          wordsList.length === 0 || values.answer !== wordsList[wordPosition].polish
                        }
                      >
                        DRAW A NEW WORD <br /> (+1 POINT)
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={
                          wordsList.length === 0 ||
                          values.answer !== wordsList[wordPosition].english
                        }
                      >
                        DRAW A NEW WORD <br /> (+1 POINT)
                      </Button>
                    )}

                    <Button
                      disabled={wordsList.length === 0}
                      type="button"
                      onClick={() => pickNewWord(wordsList.length)}
                    >
                      DRAW A NEW WORD
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

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  requested: firestore.status.requested,
  requesting: firestore.status.requesting,
});

const mapDispatchToProps = (dispatch) => ({
  addNewPoint: () => dispatch(addNewPointAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpellingTemplate);