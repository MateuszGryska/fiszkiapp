import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotesTemplate from 'templates/NotesTemplate';
// import Note from 'components/molecules/Note/Note';

const NotesPage = ({ notes }) => <NotesTemplate notes={notes} />;

NotesPage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ),
};

NotesPage.defaultProps = {
  notes: [],
};

const mapStateToProps = (state) => {
  const { notes } = state;
  return { notes };
};

export default connect(mapStateToProps)(NotesPage);
