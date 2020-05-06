import React from 'react';
import { connect, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import NotesTemplate from 'templates/NotesTemplate';
import { useFirestoreConnect } from 'react-redux-firebase';

const NotesPage = ({ userId, requested, requesting }) => {
  useFirestoreConnect([
    { collection: 'notes', doc: userId }, // or `todos/${props.todoId}`
  ]);
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

// NotesPage.propTypes = {
//   notes: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       content: PropTypes.string.isRequired,
//       created: PropTypes.string.isRequired,
//     }),
//   ),
// };

// NotesPage.defaultProps = {
//   notes: [],
// };

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
});
export default connect(mapStateToProps)(NotesPage);
