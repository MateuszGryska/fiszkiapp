import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import Input from 'components/atoms/Input/Input';
import Note from 'components/molecules/Note/Note';

import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.section`
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInfo = styled.h1`
  width: 60vw;
  text-align: center;
`;

const StyledGrid = styled.article`
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

  @media only screen and (max-width: 768px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    max-width: 90%;
  }
`;

const NotesTemplate = ({ notes, loading }) => {
  const [searchNote, setSearchNote] = useState('');

  const handleInputChange = (e) => {
    setSearchNote(e.target.value);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>Notes</Title>
        <StyledInput
          search
          placeholder="Search by title"
          value={searchNote}
          onChange={handleInputChange}
        />
        <StyledGrid>
          {notes
            .filter((note) => note.title.toLowerCase().includes(searchNote.toLowerCase()))
            .map(({ title, content, created, id }) => (
              <Note id={id} key={id} title={title} content={content} created={created} />
            ))}
        </StyledGrid>
        {notes.length === 0 ? (
          <StyledInfo>
            {loading ? 'Loading...' : `You don't have any notes yet! Add new one!`}
          </StyledInfo>
        ) : null}
      </StyledWrapper>
    </UserPageTemplate>
  );
};

NotesTemplate.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

NotesTemplate.defaultProps = {
  notes: [],
  loading: false,
};
export default NotesTemplate;
