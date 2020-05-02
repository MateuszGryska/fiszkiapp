import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Title from 'components/atoms/Title/Title';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
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

const StyledSmallerWord = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.m};
  margin: 0;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const StyledShowButton = styled.button`
  margin-top: 0;
  margin-bottom: 100px;
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

class FlashcardsTemplate extends Component {
  state = {
    isSmallerWordVisible: false,
    flashcardPosition: 0,
  };

  showSmallerWord = () => {
    this.setState((prevState) => ({
      isSmallerWordVisible: !prevState.isSmallerWordVisible,
    }));
  };

  pickNewWord = (length) => {
    const { flashcardPosition } = this.state;
    let random = Math.floor(Math.random() * length + 0);
    if (random === flashcardPosition) {
      random = Math.floor(Math.random() * length + 0);
    }
    this.setState({
      flashcardPosition: random,
      isSmallerWordVisible: false,
    });
  };

  render() {
    const { isSmallerWordVisible, flashcardPosition } = this.state;
    const { words } = this.props;
    return (
      <UserPageTemplate>
        <StyledWrapper>
          <Title>Flashcards</Title>
          <StyledBiggerWord>
            {words.length > 0 ? words[flashcardPosition].english : 'No words, add new ones!'}
          </StyledBiggerWord>
          <StyledSmallerWord isVisible={isSmallerWordVisible}>
            {words.length > 0 ? words[flashcardPosition].polish : 'Brak słówek, dodaj nowe!'}
          </StyledSmallerWord>
          <StyledShowButton onClick={this.showSmallerWord}>Show</StyledShowButton>
          <Button onClick={() => this.pickNewWord(words.length)}>NEW WORD</Button>
        </StyledWrapper>
      </UserPageTemplate>
    );
  }
}

FlashcardsTemplate.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      polish: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => {
  const { words } = state;
  return { words };
};

export default connect(mapStateToProps)(FlashcardsTemplate);
