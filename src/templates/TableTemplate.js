import React, { Component } from 'react';
import styled from 'styled-components';
import Title from 'components/atoms/Title/Title';
import Input from 'components/atoms/Input/Input';
import TableItem from 'components/atoms/TableItem/TableItem';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  margin-top: 20px;
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
`;

class TableTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      currentlyDisplayed: this.props.words,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const show = this.props.words;
    const newShow = show.filter(
      (word) =>
        word.polish.includes(event.target.value.toLowerCase()) ||
        word.english.includes(event.target.value.toLowerCase()),
    );
    this.setState({
      search: event.target.value,
      currentlyDisplayed: newShow,
    });
  }

  render() {
    const { currentlyDisplayed, search } = this.state;

    return (
      <UserPageTemplate>
        <StyledWrapper>
          <Title>Words list</Title>
          <StyledInput search placeholder="Search" value={search} onChange={this.onInputChange} />
          <StyledTable>
            <thead>
              <tr>
                <th>Polish</th>
                <th>English</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentlyDisplayed.map(({ polish, english, id }) => (
                <TableItem id={id} key={id} polish={polish} english={english} />
              ))}
            </tbody>
          </StyledTable>
        </StyledWrapper>
      </UserPageTemplate>
    );
  }
}

export default TableTemplate;
