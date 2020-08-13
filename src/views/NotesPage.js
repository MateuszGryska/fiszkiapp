import React from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import NotesTemplate from 'templates/NotesTemplate';
import { useFirestoreConnect } from 'react-redux-firebase';
import { COLLECTION_TYPES } from 'helpers/constants';

const NotesPage = ({ userId, requested, requesting }) => {
  useFirestoreConnect([{ collection: COLLECTION_TYPES.notes, doc: userId }]);
  const notes = useSelector(({ firestore: { data } }) => data.notes && data.notes[userId]);

  let notesList = [];

  if (!notes) {
    notesList = [];
  } else if (notes.notes.length === 0) {
    notesList = [];
  } else if (requested[`notes/${userId}`]) {
    notesList = notes.notes;
  }

  return <NotesTemplate notes={notesList} loading={requesting[`notes/${userId}`]} />;
};

NotesPage.propTypes = {
  userId: PropTypes.string.isRequired,
  requested: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  requesting: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
});
export default connect(mapStateToProps)(NotesPage);
