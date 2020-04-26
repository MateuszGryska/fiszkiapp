import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableTemplate from 'templates/TableTemplate';
import TableItem from 'components/atoms/TableItem/TableItem';

const TablePage = ({ words }) => (
  <TableTemplate>
    {words.map(({ polish, english, id }) => (
      <TableItem id={id} polish={polish} english={english} />
    ))}
  </TableTemplate>
);

TablePage.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      polish: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired,
    }),
  ),
};

TablePage.defaultProps = {
  words: [],
};

const mapStateToProps = (state) => {
  const { words } = state;
  return { words };
};
export default connect(mapStateToProps)(TablePage);
