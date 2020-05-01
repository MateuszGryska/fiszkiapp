import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import Input from 'components/atoms/Input/Input';
import Note from 'components/molecules/Note/Note';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledGrid = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 85px;

  @media (max-width: 1500px) {
    grid-gap: 45px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const StyledInput = styled(Input)`
  margin-top: 20px;
`;

class NotesTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      notes: this.props.notes,
      currentlyDisplayed: this.props.notes,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.notes !== nextProps.notes) {
      return {
        notes: nextProps.notes,
        currentlyDisplayed: nextProps.notes,
      };
    }
    return null;
  }

  onInputChange(event) {
    const notesList = this.props.notes;
    const filteredNotesList = notesList.filter((note) =>
      note.title.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    this.setState({
      search: event.target.value,
      currentlyDisplayed: filteredNotesList,
    });
  }

  render() {
    const { currentlyDisplayed, search } = this.state;

    return (
      <UserPageTemplate>
        <StyledWrapper>
          <Title>Notes</Title>
          <StyledInput search placeholder="Search" value={search} onChange={this.onInputChange} />
          <StyledGrid>
            {currentlyDisplayed.map(({ title, content, created, id }) => (
              <Note id={id} key={id} title={title} content={content} created={created} />
            ))}
          </StyledGrid>
        </StyledWrapper>
      </UserPageTemplate>
    );
  }
}

NotesTemplate.propTypes = {
  notes: PropTypes.node.isRequired,
};
export default NotesTemplate;
