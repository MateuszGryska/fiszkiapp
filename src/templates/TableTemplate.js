import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import Input from 'components/atoms/Input/Input';
import TableItem from 'components/atoms/TableItem/TableItem';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.section`
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const StyledInput = styled(Input)`
  margin-top: 20px;

  @media only screen and (max-width: 768px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    max-width: 90%;
  }
`;

const StyledInfo = styled.h1`
  width: 60vw;
  text-align: center;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  position: relative;
  width: 100%;
  max-width: 60vw;
  margin-top: 30px;
  border-radius: 10px;
  overflow: hidden;
  animation: appear 0.7s ease;

  thead tr {
    background-color: ${({ theme }) => theme.main};
    text-align: left;
    color: #fff;
    width: 100%;
    font-weight: bold;
  }

  .desktophead {
    display: table-header-group;
    visibility: visible;
  }
  .mobilehead {
    display: none;
    visibility: hidden;
  }

  th,
  td:not(:last-child) {
    padding: 12px 20px;
    text-align: left;
  }
  th:last-child {
    text-align: center;
    margin: 0;
    padding: 0;
  }
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.input};
  }

  tbody tr:nth-of-type(even) {
    background-color: ${({ theme }) => theme.input};
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid ${({ theme }) => theme.main};
  }

  @media only screen and (max-width: 768px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    .desktophead {
      display: none;
      visibility: hidden;
    }
    .mobilehead {
      display: table-header-group;
      visibility: visible;

      th {
        padding: 10px 0px;
      }
    }
  }
`;

const TableTemplate = ({ words, loading }) => {
  const [searchWord, setSearchWord] = useState('');

  const handleInputChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <Title>Words list</Title>
        <StyledInput search placeholder="Search" value={searchWord} onChange={handleInputChange} />
        <StyledTable>
          <thead className="desktophead">
            <tr>
              <th>Polish</th>
              <th>English</th>
              <th>Actions</th>
            </tr>
          </thead>

          <thead className="mobilehead">
            <tr>
              <th>Words</th>
            </tr>
          </thead>
          {words.length > 0 ? (
            <tbody>
              {words
                .filter(
                  ({ polish, english }) =>
                    polish.toLowerCase().includes(searchWord.toLowerCase()) ||
                    english.toLowerCase().includes(searchWord.toLowerCase()),
                )
                .map(({ polish, english, description, id }) => (
                  <TableItem
                    id={id}
                    key={id}
                    polish={polish}
                    english={english}
                    description={description}
                  />
                ))}
            </tbody>
          ) : null}
        </StyledTable>
        {words.length === 0 ? (
          <StyledInfo>
            {loading ? 'Loading...' : `You don't have any words yet! Add new one!`}
          </StyledInfo>
        ) : null}
      </StyledWrapper>
    </UserPageTemplate>
  );
};

TableTemplate.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      polish: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired,
    }),
  ),
  loading: PropTypes.bool,
};

TableTemplate.defaultProps = {
  words: [],
  loading: false,
};

export default TableTemplate;
