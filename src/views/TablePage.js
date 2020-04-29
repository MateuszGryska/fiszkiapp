import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableTemplate from 'templates/TableTemplate';

const TablePage = ({ words }) => <TableTemplate words={words} />;

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
