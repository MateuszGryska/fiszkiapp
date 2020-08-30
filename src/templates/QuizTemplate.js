import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Title from 'components/atoms/Title/Title';
import Message from 'components/atoms/Message/Message';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Tooltip from 'components/atoms/Tooltip/Tooltip';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Formik, Field, Form } from 'formik';
import { shuffle } from 'helpers/shuffle';
import { COLLECTION_TYPES } from 'helpers/constants';
import { addNewPoint as addNewPointAction } from 'actions';
import { useTranslation } from 'react-i18next';

import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.section`
  padding: 50px 150px 25px 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.fontColor};
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

const StyledRadioSection = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;

  input[type='radio'] {
    display: none;
  }
  label {
    width: 230px;
    height: 40px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.main};
    margin-top: 30px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.fontColor};
    font-size: ${({ theme }) => theme.fontSize.s};
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }

  input[type='radio']:checked + label {
    background: ${({ theme }) => theme.main};
    color: ${({ theme }) => theme.white};
  }

  label:hover {
    box-shadow: 0px 15px 20px ${({ theme }) => theme.hover};
    transform: translateY(-3px);
  }
`;

const StyledMessage = styled(Message)`
  margin-top: 20px;
  margin-bottom: 5px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const QuizTemplate = ({ userId, requested, requesting, addNewPoint }) => {
  const [wordsList, setWordsList] = useState([]);
  const [wordPosition, setWordPosition] = useState(1);
  const [firstWrongPosition, setFirstWrongPosition] = useState(0);
  const [secondWordPosition, setSecondWordPosition] = useState(2);
  const [answers, setAnswers] = useState([]);
  const [falseAnswer, setFalseAnswer] = useState(null);
  const { t } = useTranslation();

  useFirestoreConnect([{ collection: COLLECTION_TYPES.words, doc: userId }]);
  const words = useSelector(({ firestore: { data } }) => data.words && data.words[userId]);

  useEffect(() => {
    if (!words) {
      setWordsList([]);
    } else if (words.words.length === 0) {
      setWordsList([]);
    } else if (requested[`words/${userId}`]) {
      setWordsList(words.words);
      setAnswers([
        words.words[wordPosition],
        words.words[firstWrongPosition],
        words.words[secondWordPosition],
      ]);
    }
    // eslint-disable-next-line
  }, [words]);

  const pickNewWord = (length) => {
    let random;
    let firstWrongAnswer;
    let secondWrongAnswer;
    do {
      random = Math.floor(Math.random() * length);
      firstWrongAnswer = Math.floor(Math.random() * length);
      secondWrongAnswer = Math.floor(Math.random() * length);
    } while (
      random === wordPosition ||
      firstWrongAnswer === random ||
      secondWrongAnswer === random ||
      secondWrongAnswer === firstWrongAnswer
    );

    setWordPosition(random);
    const newAnswersArray = [
      wordsList[random],
      wordsList[firstWrongAnswer],
      wordsList[secondWrongAnswer],
    ];

    setAnswers(shuffle(newAnswersArray));
    setFirstWrongPosition(firstWrongAnswer);
    setSecondWordPosition(secondWrongAnswer);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>{t('title.quiz')}</Title>
        <StyledParagraph>{t('description.quiz')}.</StyledParagraph>
        {requesting[`words/${userId}`] ? (
          <LoadingSpinner grey />
        ) : (
          <>
            {' '}
            <StyledMainWord>
              {wordsList.length >= 3 ? wordsList[wordPosition].english : t('info.min_three_words')}
            </StyledMainWord>
            {wordsList.length >= 3 ? (
              <Tooltip description={wordsList[wordPosition].description} />
            ) : null}
            {wordsList.length >= 3 ? (
              <Formik
                initialValues={{
                  picked: '',
                }}
                onSubmit={(values, { resetForm }) => {
                  if (values.picked === wordsList[wordPosition].polish) {
                    addNewPoint();
                    resetForm();
                    pickNewWord(wordsList.length);
                    setFalseAnswer(null);
                  } else {
                    setFalseAnswer(t('info.incorrect_answers'));
                  }
                }}
              >
                {() => (
                  <Form>
                    <StyledRadioSection role="group" aria-labelledby="answer-radio-group">
                      {wordsList.length >= 3
                        ? answers.map((answer) => (
                            <li key={answer.id}>
                              <Field
                                type="radio"
                                id={answer.id}
                                name="picked"
                                value={answer.polish}
                              />
                              <label htmlFor={answer.id}>
                                <span>{answer.polish}</span>
                              </label>
                            </li>
                          ))
                        : null}
                    </StyledRadioSection>

                    <Button type="submit" disabled={wordsList.length < 3}>
                      {t('buttons.check')} <br /> (+1 {t('point')})
                    </Button>
                    {falseAnswer ? (
                      <StyledMessage error>{falseAnswer}</StyledMessage>
                    ) : (
                      <StyledMessage />
                    )}
                  </Form>
                )}
              </Formik>
            ) : null}
          </>
        )}
      </StyledWrapper>
    </UserPageTemplate>
  );
};

QuizTemplate.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizTemplate);
